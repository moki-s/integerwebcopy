// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

export default defineConfig({
  site: 'https://integertraining.com',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  // Astro 5 enables CSRF (security.checkOrigin) by default in server mode,
  // which rejects multipart/form-data POSTs from same-origin pages because
  // fetch() doesn't always send Origin (some browsers omit it for same-origin
  // POSTs). The contact + course-enquiry forms hit /api/contact and
  // /api/enquiry via FormData, so checkOrigin breaks them.
  //
  // Forms have their own honeypot fields for bot protection. JSON-encoded
  // endpoints (/api/checkout, /api/checkout-subscription, etc.) are
  // unaffected by this setting and still go through.
  security: {
    checkOrigin: false,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap(),
    robotsTxt({
      policy: [
        { userAgent: '*', allow: '/' },
        { userAgent: 'GPTBot', allow: '/' },
        { userAgent: 'ChatGPT-User', allow: '/' },
        { userAgent: 'OAI-SearchBot', allow: '/' },
        { userAgent: 'ClaudeBot', allow: '/' },
        { userAgent: 'Claude-Web', allow: '/' },
        { userAgent: 'Claude-SearchBot', allow: '/' },
        { userAgent: 'PerplexityBot', allow: '/' },
        { userAgent: 'Perplexity-User', allow: '/' },
        { userAgent: 'Google-Extended', allow: '/' },
        { userAgent: 'Googlebot', allow: '/' },
        { userAgent: 'Bingbot', allow: '/' },
      ],
    }),
  ],
});
