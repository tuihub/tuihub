// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'TuiHub',
  tagline: 'Tui In One',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.tuihub.org',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'tuihub', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  staticDirectories: ['static'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/tuihub/docs/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/tuihub/docs/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
  plugins: ['docusaurus-plugin-sass'],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/social-card.jpg',
      navbar: {
        title: 'TuiHub',
        logo: {
          alt: 'TuiHub Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'doc',
            label: '用户指南',
            docId: 'user/index',
          },
          {
            type: 'doc',
            label: '开发文档',
            docId: 'developer/index',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://github.com/tuihub',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'QQ群: 737582680',
                href: "https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=lQezO1qvG0iGMi5PjhIlJo_mzCkXsNmV&group_code=737582680",
              },
              {
                label: 'Telegram',
                href: 'https://t.me/TuiHub',
              },
            ],
          },
          {
            title: 'Side Projects',
            items: [
              {
                label: 'go-vndb',
                href: 'https://github.com/tuihub/go-vndb',
              },
              {
                label: 'bangumi-db',
                href: 'https://github.com/tuihub/bangumi-db',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} TuiHub Org. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash'],
      },
    }),
};

export default config;
