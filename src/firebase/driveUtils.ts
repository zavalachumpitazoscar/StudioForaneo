/**
 * Utilities to transform and detect Google Drive, YouTube, and Vimeo URLs
 * so they can be embedded directly without downloading files to Firebase Storage.
 */

export function extractGoogleDriveId(url: string): string | null {
  if (!url) return null;
  
  // Format: https://drive.google.com/file/d/FILE_ID/view...
  const matchFileD = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (matchFileD && matchFileD[1]) return matchFileD[1];

  // Format: https://drive.google.com/open?id=FILE_ID or ?id=FILE_ID
  const matchIdParam = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (matchIdParam && matchIdParam[1]) return matchIdParam[1];

  // Format: https://drive.google.com/uc?id=FILE_ID
  const matchUc = url.match(/\/uc\?[^&]*id=([a-zA-Z0-9_-]+)/);
  if (matchUc && matchUc[1]) return matchUc[1];

  return null;
}

export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  // youtu.be/ID
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];

  // youtube.com/watch?v=ID
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];

  // youtube.com/shorts/ID
  const shortsMatch = url.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch) return shortsMatch[1];

  // youtube.com/embed/ID
  const embedMatch = url.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];

  return null;
}

export function extractVimeoId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)/);
  if (match && match[3]) return match[3];
  return null;
}

/**
 * Returns a displayable image URL. If Google Drive, converts to direct thumbnail/preview.
 */
export function getDirectImageUrl(url: string): string {
  if (!url) return '';
  const driveId = extractGoogleDriveId(url);
  if (driveId) {
    // High-resolution Google Drive direct image link
    return `https://lh3.googleusercontent.com/d/${driveId}`;
  }
  return url;
}

export type VideoType = 'youtube' | 'drive' | 'vimeo' | 'direct' | 'unknown';

export interface ParsedVideoInfo {
  type: VideoType;
  embedUrl: string | null;
  originalUrl: string;
  driveId?: string;
  youtubeId?: string;
  vimeoId?: string;
}

export function parseVideoUrl(url: string): ParsedVideoInfo {
  if (!url) {
    return { type: 'unknown', embedUrl: null, originalUrl: url };
  }

  const youtubeId = extractYouTubeId(url);
  if (youtubeId) {
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`,
      youtubeId,
      originalUrl: url
    };
  }

  const driveId = extractGoogleDriveId(url);
  if (driveId) {
    return {
      type: 'drive',
      embedUrl: `https://drive.google.com/file/d/${driveId}/preview`,
      driveId,
      originalUrl: url
    };
  }

  const vimeoId = extractVimeoId(url);
  if (vimeoId) {
    return {
      type: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${vimeoId}`,
      vimeoId,
      originalUrl: url
    };
  }

  if (/\.(mp4|webm|ogg)($|\?)/i.test(url)) {
    return {
      type: 'direct',
      embedUrl: url,
      originalUrl: url
    };
  }

  return {
    type: 'unknown',
    embedUrl: null,
    originalUrl: url
  };
}
