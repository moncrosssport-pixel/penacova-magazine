'use client';

import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/lib/i18n/locales';

type HomePinnedHeroCopy = {
  issue: string;
  leadKicker: string;
  title: string;
  dek: string;
  byline: string;
};

type HomePinnedHeroProps = {
  locale: Locale;
  copy: HomePinnedHeroCopy;
};

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function HomePinnedHero({ locale, copy }: HomePinnedHeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const lastProgressRef = useRef(-1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const sync = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(1, rect.height - window.innerHeight);
      const nextProgress = prefersReducedMotion ? 0 : clamp(-rect.top / scrollable);

      if (Math.abs(nextProgress - lastProgressRef.current) > 0.002) {
        lastProgressRef.current = nextProgress;
        setProgress(nextProgress);
      }

      if (video.readyState >= 1 && Number.isFinite(video.duration)) {
        const nextTime = video.duration * nextProgress;

        if (Math.abs(video.currentTime - nextTime) > 0.04) {
          try {
            video.currentTime = nextTime;
          } catch {
            // The browser can briefly reject seeks while metadata is settling.
          }
        }
      }
    };

    const requestSync = () => {
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        sync();
      });
    };

    video.pause();
    video.addEventListener('loadedmetadata', sync);
    window.addEventListener('scroll', requestSync, { passive: true });
    window.addEventListener('resize', requestSync);
    sync();

    return () => {
      video.removeEventListener('loadedmetadata', sync);
      window.removeEventListener('scroll', requestSync);
      window.removeEventListener('resize', requestSync);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const titleTransform = `translate3d(${progress * -34}vw, ${progress * -6}vh, 0)`;
  const metaTransform = `translate3d(${progress * 28}vw, ${progress * 5}vh, 0)`;
  const dekTransform = `translate3d(${progress * 22}vw, ${progress * 9}vh, 0)`;
  const opacity = Math.max(0, 1 - progress * 1.35);
  const filmOpacity = 0.62 + progress * 0.28;

  return (
    <section
      ref={sectionRef}
      className="relative h-[280vh] border-b border-hairline bg-ink text-white"
      aria-label={`${copy.title} hero film`}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="/media/penacova_home_pinned_scroll.mp4"
          poster="/media/penacova_home_pinned_scroll_poster.jpg"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          style={{ opacity: filmOpacity }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(8,7,6,0.78),rgba(8,7,6,0.18)_42%,rgba(8,7,6,0.55))]" />

        <div className="relative z-10 flex h-full flex-col justify-between px-6 py-8 sm:px-10 lg:px-14">
          <div
            className="flex items-start justify-between gap-8 transition-transform duration-100"
            style={{ opacity, transform: metaTransform }}
          >
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-white/70">
              {copy.issue}
            </p>
            <p className="max-w-[12rem] text-right font-ui text-[10px] font-semibold uppercase tracking-[0.24em] text-white/75 sm:max-w-xs">
              Penacova Magazine
            </p>
          </div>

          <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_24rem]">
            <div style={{ opacity, transform: titleTransform }}>
              <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.28em] text-white/75">
                {copy.leadKicker}
              </p>
              <h1 className="mt-5 max-w-5xl font-display text-5xl font-semibold leading-none text-white text-balance sm:text-7xl lg:text-8xl">
                {copy.title}
              </h1>
            </div>

            <div
              className="max-w-md border-t border-white/45 pt-5"
              style={{ opacity, transform: dekTransform }}
            >
              <p className="font-serif-editorial text-xl italic leading-relaxed text-white/88 sm:text-2xl">
                {copy.dek}
              </p>
              <p className="mt-6 font-ui text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">
                {copy.byline}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/30 pt-4">
            <span className="font-ui text-[10px] font-semibold uppercase tracking-[0.24em] text-white/62">
              {locale.toUpperCase()}
            </span>
            <span className="h-px flex-1 bg-white/20" aria-hidden="true" />
            <span className="font-ui text-[10px] font-semibold uppercase tracking-[0.24em] text-white/62">
              Field Film
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
