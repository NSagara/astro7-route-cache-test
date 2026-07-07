import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async () => {
  const warmResponse = await fetch(
    'https://astro7-route-cache-test.vercel.app/test'
  );

  if (!warmResponse.ok) {
    return new Response('Warming failed', {
      status: 500,
    });
  }

  const html = await warmResponse.text();

  return Response.json({
    message: 'Cache warmed',
    warmedHtml: html,
    headers: {
      age: warmResponse.headers.get('age'),
      date: warmResponse.headers.get('date'),
      xVercelCache: warmResponse.headers.get('x-vercel-cache'),
      xVercelId: warmResponse.headers.get('x-vercel-id'),
    },
  });
};
