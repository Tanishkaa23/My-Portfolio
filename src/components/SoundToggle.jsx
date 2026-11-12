import React, { useEffect, useRef, useState } from "react";

// A tiny, generated ambient hum built with the WebAudio API — no external
// audio file dependency, so there is nothing to fail to load. Starts muted
// and only ever produces sound after an explicit user click.
export default function SoundToggle() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef(null);
  const nodesRef = useRef(null);

  useEffect(() => {
    return () => {
      nodesRef.current?.osc1.stop();
      nodesRef.current?.osc2.stop();
      ctxRef.current?.close();
    };
  }, []);

  const toggle = () => {
    if (!on) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const gain = ctx.createGain();
      gain.gain.value = 0.0;
      gain.connect(ctx.destination);

      const osc1 = ctx.createOscillator();
      osc1.type = "sine";
      osc1.frequency.value = 96;
      const osc2 = ctx.createOscillator();
      osc2.type = "sine";
      osc2.frequency.value = 144;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 400;

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);

      osc1.start();
      osc2.start();

      gain.gain.linearRampToValueAtTime(0.035, ctx.currentTime + 1.2);

      ctxRef.current = ctx;
      nodesRef.current = { osc1, osc2, gain };
      setOn(true);
    } else {
      const { gain } = nodesRef.current || {};
      if (gain && ctxRef.current) {
        gain.gain.linearRampToValueAtTime(0, ctxRef.current.currentTime + 0.4);
      }
      setTimeout(() => {
        nodesRef.current?.osc1.stop();
        nodesRef.current?.osc2.stop();
        ctxRef.current?.close();
        nodesRef.current = null;
        ctxRef.current = null;
      }, 450);
      setOn(false);
    }
  };

  return (
    <button
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Mute ambient sound" : "Play ambient sound"}
      className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-line/80 bg-ink/70 text-paper backdrop-blur-md transition-colors hover:border-copper"
    >
      {on ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 10v4h4l5 5V5L7 10H3z" />
          <path d="M16 8a5 5 0 0 1 0 8" />
          <path d="M18.5 5.5a9 9 0 0 1 0 13" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 10v4h4l5 5V5L7 10H3z" />
          <path d="M16 9l5 6M21 9l-5 6" />
        </svg>
      )}
    </button>
  );
}
