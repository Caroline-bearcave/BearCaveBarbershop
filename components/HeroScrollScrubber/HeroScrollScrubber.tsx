"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";
import Image from "next/image";
import HeroVideo from "@/components/HeroVideo";
import IconFeatureStrip from "@/components/IconFeatureStrip";
import styles from "./HeroScrollScrubber.module.css";

interface HeroScrollScrubberProps {
  frameCount?: number;
  getFrameSrc?: (frameNumber: number) => string;
  scrollDistance?: string;
  videoSrc?: string;
  posterSrc?: string;
  revealAt?: number;
  welcomeImageSrc?: string;
  onSequenceEnd?: () => void;
  // When true, the intro video is skipped entirely (jumps straight to the
  // "finished" state) — used for repeat visits within the same tab session
  // so navigating back to "/" doesn't force a replay.
  skipIntro?: boolean;
}

const defaultFrameSrc = (frameNumber: number) =>
  `/frames/sequence-b/frame_${String(frameNumber).padStart(3, "0")}.webp`;

export default function HeroScrollScrubber({
  frameCount = 37,
  getFrameSrc = defaultFrameSrc,
  scrollDistance = "300svh",
  videoSrc,
  posterSrc,
  revealAt,
  welcomeImageSrc = "/welcometo_logo.webp",
  onSequenceEnd,
  skipIntro = false,
}: HeroScrollScrubberProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(1);
  const hasEndedRef = useRef(false);

  const [ready, setReady] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [videoEnded, setVideoEnded] = useState(skipIntro);
  const [revealed, setRevealed] = useState(skipIntro);

  // frameNumber is 1-based (frame_001 .. frame_037); the image array is 0-based.
  const drawFrame = useCallback((frameNumber: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[frameNumber - 1];
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !img || !img.complete || img.naturalWidth === 0) {
      return;
    }
    currentFrameRef.current = frameNumber;

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      drawHeight = canvas.height;
      drawWidth = drawHeight * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    } else {
      drawWidth = canvas.width;
      drawHeight = drawWidth / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // Preload all 37 frames up front, starting immediately on mount — well
  // before the 4s hero video finishes — so the canvas is ready to take over
  // the instant the video ends. Both load and error resolve the promise so
  // a missing frame can't hang loading forever. Runs regardless of skipIntro
  // so scroll-driven frame scrubbing still works on repeat visits.
  useEffect(() => {
    let cancelled = false;
    let settled = 0;
    const images: HTMLImageElement[] = [];

    const promises = Array.from({ length: frameCount }, (_, i) => {
      const frameNumber = i + 1;
      return new Promise<void>((resolve) => {
        const img = new window.Image();
        img.src = getFrameSrc(frameNumber);
        const onSettle = () => {
          settled += 1;
          if (!cancelled) setLoadedCount(settled);
          resolve();
        };
        img.onload = onSettle;
        img.onerror = onSettle;
        images[i] = img;
      });
    });

    Promise.all(promises).then(() => {
      if (cancelled) return;
      imagesRef.current = images;
      setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, [frameCount, getFrameSrc]);

  // Repeat visits within the same session skip the intro outright — jump
  // straight to the "sequence finished" state (reveals the nav) instead of
  // replaying the video.
  useEffect(() => {
    if (skipIntro) onSequenceEnd?.();
  }, [skipIntro, onSequenceEnd]);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const frameIndexMV = useTransform(scrollYProgress, (progress) =>
    Math.min(frameCount, Math.max(1, Math.ceil(progress * frameCount)))
  );

  // Size the canvas to the viewport (accounting for DPR) and keep the
  // current frame drawn across resizes.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      if (ready) drawFrame(currentFrameRef.current);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [ready, drawFrame]);

  // Once preload completes, paint whatever frame the current scroll position
  // calls for (frame_001 at rest, if the visitor hasn't scrolled yet) — this
  // is what's revealed the moment the video ends.
  useEffect(() => {
    if (ready) drawFrame(frameIndexMV.get());
  }, [ready, drawFrame, frameIndexMV]);

  useMotionValueEvent(frameIndexMV, "change", (latest) => {
    if (!ready) return;
    if (latest !== currentFrameRef.current) drawFrame(latest);
    if (latest >= frameCount && !hasEndedRef.current) {
      hasEndedRef.current = true;
      onSequenceEnd?.();
    }
  });

  const progressPct = Math.round((loadedCount / frameCount) * 100);

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
      style={{ height: scrollDistance }}
    >
      <div className={styles.sticky}>
        <canvas ref={canvasRef} className={styles.canvas} />

        {!videoEnded && (
          <HeroVideo
            videoSrc={videoSrc}
            posterSrc={posterSrc}
            revealAt={revealAt}
            onReveal={() => setRevealed(true)}
            onEnded={() => setVideoEnded(true)}
          />
        )}

        {/* Rendered here (not inside HeroVideo) so it survives HeroVideo
            unmounting and stays put once the canvas takes over. */}
        <div className={styles.revealWrap}>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={
              revealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }
            }
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className={styles.revealImageWrap}
          >
            <Image
              src={welcomeImageSrc}
              alt="Welcome to the Bear Cave"
              width={1000}
              height={1000}
              priority
              className={styles.revealImage}
            />
          </motion.div>
        </div>

        <div className={styles.featureStripWrap}>
          <IconFeatureStrip revealed={revealed} />
        </div>

        {videoEnded && !ready && (
          <div className={styles.loading}>
            <Image
              src={welcomeImageSrc}
              alt="Welcome to the Bear Cave"
              width={1000}
              height={1000}
              className={styles.loadingLogo}
            />
            <div className={styles.loadingTrack}>
              <div
                className={styles.loadingFill}
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
