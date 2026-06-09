"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Initialize Audio Context and Wind Sound
  const initAudio = () => {
    if (isAdmin || audioCtxRef.current || isUnlocked) return;

    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioCtxRef.current = ctx;

    setIsUnlocked(true);
  };


  // Play a slightly deeper pop for clicks
  const playClickSound = () => {
    if (isAdmin) return;
    const ctx = audioCtxRef.current;
    if (!ctx || ctx.state !== "running") return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  };

  // Attach global event listeners for ASMR interactions
  useEffect(() => {
    if (isAdmin) {
      // Clean up audio if we navigate to admin panel
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
         audioCtxRef.current.suspend();
      }
      return;
    }

    const handleInteraction = () => {
      initAudio();
      if (audioCtxRef.current?.state === "suspended") {
        audioCtxRef.current.resume();
      }
    };


    const handleClick = (e: MouseEvent) => {
      // Initialize on first click if not done
      handleInteraction();
      
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        playClickSound();
      }
    };

    window.addEventListener("pointerdown", handleInteraction, { once: true });
    window.addEventListener("keydown", handleInteraction, { once: true });
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isUnlocked, isAdmin]);

  return <>{children}</>;
}
