import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ cache }) => {
  if (!cache.enabled) {
    return new Response('Cache is not enabled', {
      status: 500,
    });
  }

  await cache.invalidate({
    tags: ['wp-test'],
  });

  return new Response('Cache invalidated');
};