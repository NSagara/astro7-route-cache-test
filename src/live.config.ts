import { defineLiveCollection, z } from "astro:content";
import type { LiveLoader } from "astro/loaders";
import type { WpWork } from '../type/wp';

const worksLoader: LiveLoader<WpWork, { id: string }> = {
  name: "wp-works-loader",

  loadCollection: async () => {
    const response = await fetch(
      "https://images.tatemono.photo/wp-json/wp/v2/works?per_page=100",
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch works: ${response.status}`);
    }

    const works: WpWork[] = await response.json();

    return {
      entries: works.map((work) => ({
        id: String(work.id),
        data: work,
      })),
    };
  },

  loadEntry: async ({ filter }) => {
    const id = filter.id;
    const response = await fetch(
      `https://images.tatemono.photo/wp-json/wp/v2/works/${encodeURIComponent(id)}`,
    );

    if (response.status === 404) {
      return undefined;
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch work: ${response.status}`);
    }

    const work: WpWork = await response.json();

    return {
      id: String(work.id),
      data: work,
    };
  },
};

const works = defineLiveCollection({
  loader: worksLoader,
  schema: z.object({
    id: z.number(),
    slug: z.string(),
    date: z.string(),
    modified: z.string(),
    link: z.string(),
    title: z.object({
      rendered: z.string(),
    }),
    acf: z.object({
      content: z.string(),
    }),
  }),
});

export const collections = { works };