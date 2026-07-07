import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ cache, request }) => {
  const secret = import.meta.env.WEBHOOK_SECRET;
  const authorization = request.headers.get('authorization');

  if (!secret) {
    return new Response('WEBHOOK_SECRET is not configured', {
      status: 500,
    });
  }

  if (authorization !== `Bearer ${secret}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

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