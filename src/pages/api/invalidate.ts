import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ cache }) => {
  if (!cache.enabled) {
    return new Response('Cache is not enabled', {
      status: 500,
    });
  }

  await cache.invalidate({
    tags: ['test'],
  });

  const warmResponse = await fetch(
    'https://astro7-route-cache-test.vercel.app/test'
  );

  if (!warmResponse.ok) {
    return new Response('Cache invalidated, but warming failed', {
      status: 500,
    });
  }

  const html = await warmResponse.text();

  return Response.json({
    message: 'Cache invalidated and warmed',
    warmedHtml: html,
  });
};