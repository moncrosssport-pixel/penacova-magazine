'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);

type FullscreenVideoElement = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
  webkitRequestFullscreen?: () => Promise<void> | void;
};

export function HomeVideoHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isEnded, setIsEnded] = useState(false);
  const [frameProgress, setFrameProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) {
      return;
    }

    const syncPlayback = () => {
      const rect = section.getBoundingClientRect();
      const progress = clamp(
        (window.innerHeight * 0.12 - rect.top) / (window.innerHeight * 0.58),
      );

      setFrameProgress(progress);
    };

    const handleEnded = () => {
      setIsEnded(true);
      video.pause();
    };

    const startPlayback = () => {
      if (isEnded) {
        return;
      }

      void video.play().catch(() => {
        video.pause();
      });
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('canplay', syncPlayback);
    video.addEventListener('canplay', startPlayback);
    window.addEventListener('scroll', syncPlayback, { passive: true });
    window.addEventListener('resize', syncPlayback);
    syncPlayback();
    startPlayback();

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('canplay', syncPlayback);
      video.removeEventListener('canplay', startPlayback);
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
    video.currentTime = 0;
    void video.play().catch(() => {
      video.pause();
    });
  };

  const openFullscreen = () => {
    const video = videoRef.current as FullscreenVideoElement | null;

    if (!video) {
      return;
    }

    if (video.webkitEnterFullscreen) {
      video.webkitEnterFullscreen();
      return;
    }

    if (video.requestFullscreen) {
      void video.requestFullscreen();
      return;
    }

    if (video.webkitRequestFullscreen) {
      void video.webkitRequestFullscreen();
    }
  };

  const frameInsetY = (1 - frameProgress) * 7;
  const frameInsetX = (1 - frameProgress) * 6;
  const frameRadius = (1 - frameProgress) * 28;
  const frameShadowOpacity = (1 - frameProgress) * 0.38;

  return (
    <section
      ref={sectionRef}
      data-masthead-hide-zone="true"
      className="relative h-[190vh] overflow-visible border-b border-hairline bg-ink text-white"
      aria-label="Penacova hero film"
    >
      <div
        className="sticky top-0 h-screen overflow-hidden bg-black"
      >
        <div
          data-testid="home-video-frame"
          className="absolute overflow-hidden bg-black transition-[border-radius,box-shadow] duration-100 ease-out"
          style={{
            inset: `${frameInsetY}vh ${frameInsetX}vw`,
            borderRadius: `${frameRadius}px`,
            boxShadow: `0 28px 90px rgba(0, 0, 0, ${frameShadowOpacity})`,
          }}
        >
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src="/media/penacova_home_pinned_scroll.mp4"
            poster="/media/penacova_home_pinned_scroll_poster.jpg"
            muted
            playsInline
            autoPlay
            preload="auto"
            aria-hidden="true"
          />

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
        </div>

        <button
          type="button"
          onClick={openFullscreen}
          aria-label="Open film fullscreen"
          className="absolute bottom-6 right-[4.25rem] z-20 flex h-10 w-10 items-center justify-center border border-white/70 bg-black/30 text-white transition duration-200 hover:bg-black/50 sm:bottom-8 sm:right-[5.25rem]"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M8.25 4.75H4.75V8.25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.75 4.75H19.25V8.25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.25 19.25H4.75V15.75"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.75 19.25H19.25V15.75"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {isEnded ? (
          <button
            type="button"
            onClick={replay}
            aria-label="Replay film"
            className="absolute bottom-6 right-5 z-20 flex h-10 w-10 items-center justify-center border border-white/70 bg-black/30 text-white transition duration-200 hover:bg-black/50 sm:bottom-8 sm:right-8"
          >
            <svg
              width="18"
              height="18"
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
      </div>
    </section>
  );
}
