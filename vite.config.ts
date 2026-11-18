import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv, type Plugin, type HtmlTagDescriptor } from 'vite';
import {
  validateSiteUrl,
  generateRobotsTxt,
  generateSitemapXml,
  generateStructuredData,
} from './src/utils/seo.ts';

function seoPlugin(): Plugin {
  let siteUrl: string | null = null;
  let isProductionBuild = false;

  return {
    name: 'vite-plugin-technical-seo',
    configResolved(config) {
      isProductionBuild = config.command === 'build';
      const env = loadEnv(config.mode, process.cwd(), '');
      const rawUrl = env.VITE_SITE_URL || process.env.VITE_SITE_URL || '';
      siteUrl = validateSiteUrl(rawUrl);
    },
    buildStart() {
      if (isProductionBuild && !siteUrl) {
        console.warn(
          '\x1b[33m%s\x1b[0m',
          '\n[SEO] Warning: VITE_SITE_URL is not configured or is empty. Canonical URL, sitemap.xml, and absolute social metadata will not be generated until a valid production URL is configured in your environment.\n'
        );
      }
    },
    transformIndexHtml() {
      const tags: HtmlTagDescriptor[] = [];

      if (siteUrl) {
        tags.push(
          {
            tag: 'link',
            attrs: { rel: 'canonical', href: `${siteUrl}/` },
            injectTo: 'head',
          },
          {
            tag: 'meta',
            attrs: { property: 'og:url', content: `${siteUrl}/` },
            injectTo: 'head',
          },
          {
            tag: 'meta',
            attrs: { property: 'og:image', content: `${siteUrl}/images/law-office.png` },
            injectTo: 'head',
          },
          {
            tag: 'meta',
            attrs: { property: 'og:image:width', content: '1200' },
            injectTo: 'head',
          },
          {
            tag: 'meta',
            attrs: { property: 'og:image:height', content: '630' },
            injectTo: 'head',
          },
          {
            tag: 'meta',
            attrs: { property: 'og:image:alt', content: 'Nertren Law Associates office and law library' },
            injectTo: 'head',
          },
          {
            tag: 'meta',
            attrs: { name: 'twitter:image', content: `${siteUrl}/images/law-office.png` },
            injectTo: 'head',
          },
          {
            tag: 'meta',
            attrs: { name: 'twitter:image:alt', content: 'Nertren Law Associates office and law library' },
            injectTo: 'head',
          }
        );
      }

      // Always inject verified Schema.org LegalService structured data
      tags.push({
        tag: 'script',
        attrs: { type: 'application/ld+json' },
        children: JSON.stringify(generateStructuredData(siteUrl)),
        injectTo: 'head',
      });

      return tags;
    },
    generateBundle() {
      // Emit robots.txt in dist
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: generateRobotsTxt(siteUrl),
      });

      // Emit sitemap.xml only when valid production URL is configured
      const sitemap = generateSitemapXml(siteUrl);
      if (sitemap) {
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: sitemap,
        });
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), seoPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, 'src'),
      },
      dedupe: ['react', 'react-dom'],
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
