export const prerender = false;

import type { APIRoute } from 'astro';
import OpenAI from 'openai';
const openai = new OpenAI({
  apiKey: import.meta.env.OPENAI_API_KEY,
});

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { prompt } = body;

  try {
    const res = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size: '1024x1024',
      quality: 'hd',
      response_format: 'url',
      style: 'vivid',
    });
    return new Response(
      JSON.stringify({
        url: res.data[0].url,
        error: null,
        message: 'Image generated successfully',
      }),
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        url: null,
        error: 'Error generating image',
        message: null,
      }),
    );
  }
};
