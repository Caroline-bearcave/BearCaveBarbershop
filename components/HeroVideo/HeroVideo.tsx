"use client";

import { useEffect, useRef, useState } from "react";
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
  const [ended, setEnded] = useState(false);
  const hasRevealedRef = useRef(false);

  // Scroll is locked as soon as the video mounts and released the moment it
  // ends, so the visitor can't scroll past the intro mid-playback.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    if (!hasRevealedRef.current && e.currentTarget.currentTime >= revealAt) {
      hasRevealedRef.current = true;
      onReveal?.();
    }
  };

  const handleEnded = () => {
    setEnded(true);
    document.body.style.overflow = "";
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

      {!ended && <div className={styles.scrollCue}>Hold tight</div>}
    </section>
  );
}
