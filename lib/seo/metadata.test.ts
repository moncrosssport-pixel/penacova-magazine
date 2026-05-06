import { describe, expect, it } from 'vitest';
import {
  absoluteUrl,
  createPageMetadata,
} from './metadata';

describe('absoluteUrl', () => {
  it('uses the configured production fallback URL', () => {
    expect(absoluteUrl('/ko')).toBe('https://penacova-magazine.vercel.app/ko');
  });
});

describe('createPageMetadata', () => {
  it('creates canonical, alternate, Open Graph, and Twitter metadata', () => {
    const metadata = createPageMetadata({
      locale: 'en',
      pathSegments: ['editorial'],
      title: 'Editorial',
      description: 'Photo essays and fashion editorials.',
      image: 'https://cdn.sanity.io/example.jpg',
    });

    expect(metadata.title).toBe('Editorial');
    expect(metadata.alternates?.canonical).toBe('/en/editorial');
    expect(metadata.alternates?.languages).toMatchObject({
      'ko-KR': '/ko/editorial',
      'en-US': '/en/editorial',
      'ja-JP': '/jp/editorial',
    });
    expect(metadata.openGraph?.images).toEqual([
      { url: 'https://cdn.sanity.io/example.jpg', width: 1200, height: 630 },
    ]);
    expect(metadata.twitter?.card).toBe('summary_large_image');
  });
});
