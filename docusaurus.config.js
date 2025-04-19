// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '钟·苦乐交织',
  tagline: '向后去路不知何',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.zhongwz.top',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'CN-zwz', // Usually your GitHub org/user name.
  projectName: 'Docs', // Usually your repo name.
  deploymentBranch: 'gh-pages',        // 部署分支

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-cn',
    locales: ['zh-cn'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'robots',
        content: 'noindex, nofollow',//阻止搜索引擎检索
      },
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: '钟·苦乐交织',
        logo: {
          alt: '站点Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '文档',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/CN-zwz',
            label: 'GitHub',
            position: 'right',
          },{
            href: 'https://luogu.com.cn/user/1053876',
            label: 'Luogu',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          // {
          //   title: 'Docs',
          //   items: [
          //     {
          //       label: 'Tutorial',
          //       to: '/docs/intro',
          //     },
          //   ],
          // },
          {
            title: '社交',
            items: [
              {
                label: '洛谷',
                href: 'https://luogu.com.cn/user/1053876',
              },
              {
                label: 'BiliBili',
                href: 'https://space.bilibili.com/1966773279'
              },
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: 'Docusaurus博客',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/CN-zwz',
              },{
                label: 'WordPress博客',
                href: 'https://zhongwz.top/wordpress'
              }
            ],
          },
          {
            title: '联系我',
            items: [
              {
                label: 'Email',
                href: 'mailto:zhong@zhongwz.top'
              },
            ]
            
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} 钟<br> Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      socialLinks: [
        {
          label: '洛谷',
          href: 'https://www.luogu.com.cn/user/',
          icon: {
            svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100px" height="100px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">  <image id="image0" width="100" height="100" x="0" y="0"xlink:href="data:image/png;base64,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" /></svg>`
          }
        }
      ]
    }),
    markdown: {
      format: 'detect',
      mermaid: true,
      preprocessor: ({filePath, fileContent}) => {
        return fileContent.replaceAll('{{MY_VAR}}', 'MY_VALUE');
      },
      parseFrontMatter: async (params) => {
        const result = await params.defaultParseFrontMatter(params);
        result.frontMatter.description =
          result.frontMatter.description?.replaceAll('{{MY_VAR}}', 'MY_VALUE');
        return result;
      },
      mdx1Compat: {
        comments: true,
        admonitions: true,
        headingIds: true,
      },
      anchors: {
        maintainCase: true,
      },
    },
};

export default config;
