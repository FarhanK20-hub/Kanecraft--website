"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const windGainRef = useRef<GainNode | null>(null);
  const windFilterRef = useRef<BiquadFilterNode | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Initialize Audio Context and Wind Sound
  const initAudio = () => {
    if (isAdmin || audioCtxRef.current || isUnlocked) return;

    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioCtxRef.current = ctx;

    // Create Wind Noise
    const bufferSize = ctx.sampleRate * 2; // 2 seconds of noise
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    
    // Generate Brown Noise roughly
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5; // Compensate for gain loss
    }

    const windSource = ctx.createBufferSource();
    windSource.buffer = buffer;
    windSource.loop = true;

    // Wind filter to make it sound muffled/soft
    const windFilter = ctx.createBiquadFilter();
    windFilter.type = "lowpass";
    windFilter.frequency.value = 400; // Base frequency
    windFilterRef.current = windFilter;

    // Wind volume
    const windGain = ctx.createGain();
    windGain.gain.value = 0; // Starts silent
    windGainRef.current = windGain;

    windSource.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(ctx.destination);

    windSource.start(0);
    
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

  // Hook into Lenis scroll velocity to scale wind sound
  useLenis(({ velocity }) => {
    if (isAdmin || !windGainRef.current || !windFilterRef.current || !audioCtxRef.current) return;

    const speed = Math.abs(velocity);
    
    // Map speed to volume (max gain 0.15 for ASMR subtlety)
    const targetGain = Math.min(0.15, speed * 0.005);
    
    // Map speed to filter cutoff frequency (brighter wind when scrolling fast)
    const targetFreq = Math.min(2000, 400 + speed * 20);

    // Smoothly ramp to the new values
    const time = audioCtxRef.current.currentTime;
    windGainRef.current.gain.setTargetAtTime(targetGain, time, 0.1);
    windFilterRef.current.frequency.setTargetAtTime(targetFreq, time, 0.1);
  });

  return <>{children}</>;
}
