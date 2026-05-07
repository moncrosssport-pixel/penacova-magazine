'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  createMagazineAnalyticsEvent,
  isMagazineAnalyticsEventName,
  readDepthEventNameForSurface,
  type MagazineAnalyticsEvent,
  type MagazineAnalyticsEventName,
  type MagazineAnalyticsPayload,
} from '@/lib/analytics/events';

type QueuedMagazineAnalyticsEvent = MagazineAnalyticsEvent & {
  path: string;
  timestamp: string;
};

declare global {
  interface Window {
    gtag?: (
      command: 'event',
      name: MagazineAnalyticsEventName,
      payload: MagazineAnalyticsPayload,
    ) => void;
    penacovaAnalyticsQueue?: QueuedMagazineAnalyticsEvent[];
  }
}

const readDepthThresholds = [25, 50, 75, 100] as const;

export function MagazineAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const element = target.closest<HTMLElement>('[data-analytics-event]');
      const eventName = element?.dataset.analyticsEvent;

      if (!element || !isMagazineAnalyticsEventName(eventName)) {
        return;
      }

      trackMagazineEvent(eventName, payloadFromElement(element));
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    const surface = document.querySelector<HTMLElement>(
      '[data-analytics-surface]',
    );
    const eventName = readDepthEventNameForSurface(
      surface?.dataset.analyticsSurface,
    );

    if (!surface || !eventName) {
      return;
    }

    const trackedSurface = surface;
    const readDepthEventName = eventName;
    let animationFrame = 0;
    const sentThresholds = new Set<number>();

    function measure() {
      animationFrame = 0;

      const depth = readDepthPercent(trackedSurface);

      for (const threshold of readDepthThresholds) {
        if (depth >= threshold && !sentThresholds.has(threshold)) {
          sentThresholds.add(threshold);
          trackMagazineEvent(readDepthEventName, {
            ...payloadFromElement(trackedSurface),
            depth: threshold,
          });
        }
      }
    }

    function scheduleMeasure() {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(measure);
      }
    }

    scheduleMeasure();
    window.addEventListener('scroll', scheduleMeasure, { passive: true });
    window.addEventListener('resize', scheduleMeasure);

    return () => {
      window.removeEventListener('scroll', scheduleMeasure);
      window.removeEventListener('resize', scheduleMeasure);

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [pathname]);

  return null;
}

function payloadFromElement(element: HTMLElement): Record<string, unknown> {
  const href =
    element.dataset.analyticsHref ||
    (element instanceof HTMLAnchorElement ? element.href : undefined);

  return {
    label: element.dataset.analyticsLabel,
    locale: element.dataset.analyticsLocale,
    category: element.dataset.analyticsCategory,
    slug: element.dataset.analyticsSlug,
    href,
  };
}

function readDepthPercent(surface: HTMLElement) {
  const rect = surface.getBoundingClientRect();
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const elementTop = rect.top + scrollTop;
  const elementHeight = surface.scrollHeight || rect.height;

  if (elementHeight <= 0) {
    return 0;
  }

  const viewportBottom = scrollTop + window.innerHeight;
  const readPixels = viewportBottom - elementTop;

  return Math.max(
    0,
    Math.min(100, Math.floor((readPixels / elementHeight) * 100)),
  );
}

function trackMagazineEvent(
  name: MagazineAnalyticsEventName,
  payload: Record<string, unknown>,
) {
  const event = createMagazineAnalyticsEvent(name, payload);
  const queuedEvent = {
    ...event,
    path: window.location.pathname,
    timestamp: new Date().toISOString(),
  };

  window.penacovaAnalyticsQueue = window.penacovaAnalyticsQueue ?? [];
  window.penacovaAnalyticsQueue.push(queuedEvent);

  if (typeof window.gtag === 'function') {
    window.gtag('event', event.name, event.payload);
  }
}
