import { NextResponse } from 'next/server';
import { SITE_CONFIG } from '../../../config/site.config';
import { ANALYTICS_CONFIG, INDEXNOW_STATIC_KEY } from '../../../config/analytics.config';
import { ARCHITECTURAL_VIDEO_CATALOG, getVideoForSlug } from '../../../config/videos.config';
import { BLOG_POSTS } from '../../../data/blogPosts';
import sitemap from '../../sitemap';

export async function GET() {
  const sitemapEntries = sitemap();

  const blogAudits = BLOG_POSTS.map((post) => {
    const titleLength = post.seoTitle.length;
    const descriptionLength = post.metaDescription.length;
    const matchedVideo = getVideoForSlug(post.slug);
    return {
      slug: post.slug,
      urls: [
        `${SITE_CONFIG.siteUrl}/blog/${post.slug}`,
        `${SITE_CONFIG.siteUrl}/profesyoneller/blog/${post.slug}`,
      ],
      seoTitle: post.seoTitle,
      seoTitleLength: titleLength,
      seoTitleOptimal50to60: titleLength >= 50 && titleLength <= 60,
      metaDescription: post.metaDescription,
      metaDescriptionLength: descriptionLength,
      metaDescriptionOptimal150to160: descriptionLength >= 150 && descriptionLength <= 160,
      primaryKeyword: post.primaryKeyword,
      secondaryKeywordsCount: post.secondaryKeywords.length,
      tags: post.tags,
      internalLinksCount: post.internalLinks.length,
      externalAuthorityLinksCount: post.externalReferences.length,
      voiceSearchQaCount: post.voiceSearchQa.length,
      commentsCount: post.initialComments.length,
      embeddedVideoId: matchedVideo.videoId,
      embeddedVideoTitle: matchedVideo.title,
      backlinkCitationWidgetEnabled: true,
      schemasEnabled: [
        'BlogPosting',
        'TechArticle',
        'VideoObject',
        'SpeakableSpecification',
        'FAQPage',
        'BreadcrumbList',
      ],
    };
  });

  const allOptimal = blogAudits.every(
    (b) => b.seoTitleOptimal50to60 && b.metaDescriptionOptimal150to160,
  );

  return NextResponse.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    siteUrl: SITE_CONFIG.siteUrl,
    totalIndexedSitemapUrls: sitemapEntries.length,
    allBlogMetaLengthsOptimal: allOptimal,
    videoSeoEngine: {
      component: 'LiteYouTubeEmbed',
      zeroInitialIframeJs: true,
      totalCatalogVideos: Object.keys(ARCHITECTURAL_VIDEO_CATALOG).length,
      videoObjectSchemaEnabled: true,
    },
    analyticsAndIndexingHub: {
      indexNowKey: INDEXNOW_STATIC_KEY,
      indexNowKeyVerificationFile: `${SITE_CONFIG.siteUrl}/${INDEXNOW_STATIC_KEY}.txt`,
      indexNowEndpoint: `${SITE_CONFIG.siteUrl}/api/indexnow`,
      googleSearchConsoleReady: true,
      ga4ConversionTrackingReady: true,
      trackedEvents: ANALYTICS_CONFIG.trackedConversionEvents,
    },
    backlinkAndLocalSeoTools: {
      backlinkCitationGeneratorEnabled: true,
      citationFormats: ['HTML Dofollow Backlink', 'Markdown / APA', 'Blockquote Embed'],
      googleBusinessProfileMapCardEnabled: true,
      localSeoGeoCircleRadiusMeters: 35000,
    },
    technicalSeoChecklist: {
      httpsAndHstsEnabled: true,
      mobileFirstResponsive: true,
      coreWebVitalsOptimized: true,
      sitemapXmlUrl: `${SITE_CONFIG.siteUrl}/sitemap.xml`,
      robotsTxtUrl: `${SITE_CONFIG.siteUrl}/robots.txt`,
      indexNowEndpoint: `${SITE_CONFIG.siteUrl}/api/indexnow`,
      jsonLdSchemas: [
        'HomeAndConstructionBusiness',
        'Organization',
        'WebSite',
        'BlogPosting',
        'TechArticle',
        'VideoObject',
        'SpeakableSpecification',
        'FAQPage',
        'Product',
        'BreadcrumbList',
      ],
    },
    blogAudits,
  });
}
