"use client";

import { useEffect, useRef } from "react";
import styles from "./HeroVideo.module.css";

interface HeroVideoProps {
  videoSrc?: string;
  posterSrc?: string;
  revealAt?: number;
  onReveal?: () => void;
  onEnded?: () => void;
}

export default function HeroVideo({
  videoSrc = "/video/bear-sit-to-stand.mp4",
  posterSrc = "/images/hero-poster.webp",
  revealAt = 3,
  onReveal,
  onEnded,
}: HeroVideoProps) {
  const hasRevealedRef = useRef(false);
  const hasEndedRef = useRef(false);

  // Scrolling is never blocked here — the video just plays as ambient
  // background. Once it ends (or this safety valve fires, in case a
  // scrolled-out-of-view video never fires "ended" on some mobile browsers)
  // it hands off to the scroll-driven canvas frame sequence in the parent,
  // which is already preloaded and ready regardless of video state.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!hasEndedRef.current) handleEnded();
    }, 6000);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    if (!hasRevealedRef.current && e.currentTarget.currentTime >= revealAt) {
      hasRevealedRef.current = true;
      onReveal?.();
    }
  };

  const handleEnded = () => {
    if (hasEndedRef.current) return;
    hasEndedRef.current = true;
    onEnded?.();
  };

  return (
    <section className={styles.section}>
      <video
        className={styles.video}
        src={videoSrc}
        poster={posterSrc}
        autoPlay
        muted
        playsInline
        controls={false}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      <div className={styles.scrim} />
    </section>
  );
}
