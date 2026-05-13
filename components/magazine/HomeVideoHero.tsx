'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n/locales';

type HomeVideoHeroCopy = {
  issue: string;
  leadKicker: string;
  title: string;
  dek: string;
  byline: string;
};

type HomeVideoHeroProps = {
  locale: Locale;
  copy: HomeVideoHeroCopy;
};

export function HomeVideoHero({ locale, copy }: HomeVideoHeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isEnded, setIsEnded] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) {
      return;
    }

    const syncPlayback = () => {
      const rect = section.getBoundingClientRect();
      const isInView =
        rect.top < window.innerHeight * 0.72 && rect.bottom > 72;
      const shouldPlay = isInView && window.scrollY > 24 && !isEnded;

      if (shouldPlay) {
        setHasStarted(true);
        void video.play().catch(() => {
          video.pause();
        });
      } else if (!video.paused) {
        video.pause();
      }
    };

    const handleEnded = () => {
      setIsEnded(true);
      video.pause();
    };

    video.pause();
    video.addEventListener('ended', handleEnded);
    video.addEventListener('canplay', syncPlayback);
    window.addEventListener('scroll', syncPlayback, { passive: true });
    window.addEventListener('resize', syncPlayback);
    syncPlayback();

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('canplay', syncPlayback);
      window.removeEventListener('scroll', syncPlayback);
      window.removeEventListener('resize', syncPlayback);
    };
  }, [isEnded]);

  const replay = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    setIsEnded(false);
    setHasStarted(true);
    video.currentTime = 0;
    void video.play().catch(() => {
      video.pause();
    });
  };

  return (
    <section
      ref={sectionRef}
      data-masthead-hide-zone="true"
      className="relative min-h-screen overflow-hidden border-b border-hairline bg-ink text-white"
      aria-label={`${copy.title} hero film`}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover opacity-90"
        src="/media/penacova_home_pinned_scroll.mp4"
        poster="/media/penacova_home_pinned_scroll_poster.jpg"
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(8,7,6,0.82),rgba(8,7,6,0.2)_42%,rgba(8,7,6,0.58))]" />

      <Image
        src="/media/penacova_home_video_endcard.jpg"
        alt=""
        fill
        sizes="100vw"
        className={`object-cover transition-opacity duration-700 ${
          isEnded ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
      />

      <div
        className={`relative z-10 flex min-h-screen flex-col justify-between px-6 py-8 transition-opacity duration-500 sm:px-10 lg:px-14 ${
          isEnded ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="flex items-start justify-between gap-8">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-white/70">
            {copy.issue}
          </p>
          <p className="max-w-[12rem] text-right font-ui text-[10px] font-semibold uppercase tracking-[0.24em] text-white/75 sm:max-w-xs">
            Penacova Magazine
          </p>
        </div>

        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_24rem]">
          <div>
            <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.28em] text-white/75">
              {copy.leadKicker}
            </p>
            <h1 className="mt-5 max-w-5xl font-display text-5xl font-semibold leading-none text-white text-balance sm:text-7xl lg:text-8xl">
              {copy.title}
            </h1>
          </div>

          <div className="max-w-md border-t border-white/45 pt-5">
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
            {hasStarted ? 'Now Playing' : 'Scroll To Play'}
          </span>
        </div>
      </div>

      {isEnded ? (
        <button
          type="button"
          onClick={replay}
          aria-label="Replay film"
          className="absolute bottom-8 right-6 z-20 flex h-11 w-11 items-center justify-center border border-white/70 bg-black/25 text-white transition duration-200 hover:bg-black/45 sm:right-10 lg:right-14"
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M7.5 7.25H4.25V4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.55 7.1A8.25 8.25 0 1 1 3.75 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      ) : null}
    </section>
  );
}
