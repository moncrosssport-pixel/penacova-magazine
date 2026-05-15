import { describe, expect, it } from 'vitest';
import { canShowInternalLaunchPages } from './internalRoutes';

describe('canShowInternalLaunchPages', () => {
  it('keeps launch tooling visible outside production', () => {
    expect(canShowInternalLaunchPages({ NODE_ENV: 'development' })).toBe(true);
    expect(canShowInternalLaunchPages({ NODE_ENV: 'test' })).toBe(true);
  });

  it('hides launch tooling in production by default', () => {
    expect(canShowInternalLaunchPages({ NODE_ENV: 'production' })).toBe(false);
  });

  it('allows an explicit production override for internal reviews', () => {
    expect(
      canShowInternalLaunchPages({
        NODE_ENV: 'production',
        PENACOVA_SHOW_INTERNAL_LAUNCH_PAGES: '1',
      }),
    ).toBe(true);
  });
});
