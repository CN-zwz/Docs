import React from 'react';
import clsx from 'clsx';
import { HtmlClassNameProvider, ThemeClassNames } from '@docusaurus/theme-common';
import {
  BlogPostProvider,
  useBlogPost,
} from '@docusaurus/plugin-content-blog/client';
import BlogLayout from '@theme/BlogLayout';
import BlogPostItem from '@theme/BlogPostItem';
import BlogPostPaginator from '@theme/BlogPostPaginator';
import BlogPostPageMetadata from '@theme/BlogPostPage/Metadata';
import BlogPostPageStructuredData from '@theme/BlogPostPage/StructuredData';
import TOC from '@theme/TOC';
import ContentVisibility from '@theme/ContentVisibility';

function BlogPostPageContent({ sidebar, children }) {
  const { metadata, toc } = useBlogPost();
  const { nextItem, prevItem, frontMatter } = metadata;
  const {
    hide_table_of_contents: hideTableOfContents,
    toc_min_heading_level: tocMinHeadingLevel,
    toc_max_heading_level: tocMaxHeadingLevel,
  } = frontMatter;
  return (
    <BlogLayout
      sidebar={sidebar}
      toc={
        !hideTableOfContents && toc.length > 0 ? (
          <TOC
            toc={toc}
            minHeadingLevel={tocMinHeadingLevel}
            maxHeadingLevel={tocMaxHeadingLevel}
          />
        ) : undefined
      }>
      <ContentVisibility metadata={metadata} />

      <BlogPostItem>{children}</BlogPostItem>

      {/* 2. 在这里添加 Waline 评论组件 */}
      <div className="container margin-vert--lg">
        <div id="waline">
          <button
            className="button button--secondary"
            style={{
              marginBottom: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              background: 'linear-gradient(90deg, #6a5af9 0%, #f857a6 100%)',
              color: '#fff',
              border: 'none',
              padding: '12px 32px',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'transform 0.1s',
            }}
            onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
            id='waline-load-button'
            onClick={() => window.initWaline && window.initWaline()}
          >
            加载评论
          </button>
        </div>
      </div>

      {(nextItem || prevItem) && (
        <BlogPostPaginator nextItem={nextItem} prevItem={prevItem} />
      )}
    </BlogLayout>
  );
}
export default function BlogPostPage(props) {
  const BlogPostContent = props.content;
  return (
    <BlogPostProvider content={props.content} isBlogPostPage>
      <HtmlClassNameProvider
        className={clsx(
          ThemeClassNames.wrapper.blogPages,
          ThemeClassNames.page.blogPostPage,
        )}>
        <BlogPostPageMetadata />
        <BlogPostPageStructuredData />
        <BlogPostPageContent sidebar={props.sidebar}>
          <BlogPostContent />
        </BlogPostPageContent>
      </HtmlClassNameProvider>
    </BlogPostProvider>
  );
}
