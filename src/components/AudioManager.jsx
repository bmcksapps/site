// src/components/AudioManager.jsx
import React, { useRef, useEffect, useState } from 'react';

const AudioManager = ({
  ambientSrc,
  voiceSrc,
  fade = true,
  allowBoth = false,
  voiceMuted = false,
}) => {
  const ambientRef = useRef(null);
  const voiceRef = useRef(null);
  const [ambientKey, setAmbientKey] = useState(() => Date.now() + Math.random());
  const [voiceKey, setVoiceKey] = useState(() => Date.now() + Math.random());

  const safePlay = (audio) => {
    if (!audio) return;

    try {
      audio.pause(); // Prevent overlap
      audio.currentTime = 0;
    } catch (e) {}

    requestAnimationFrame(() => {
      setTimeout(() => {
        const playPromise = audio.play();
        if (playPromise?.catch) {
          playPromise.catch((err) => {
            if (err.name === 'AbortError') return;
            console.warn('Play error:', err);
          });
        }
      }, 100);
    });
  };

  const fadeIn = (audio) => {
    if (!fade) return safePlay(audio);

    audio.volume = 0;
    safePlay(audio);

    let vol = 0;
    const interval = setInterval(() => {
      vol = Math.min(vol + 0.05, 1);
      audio.volume = vol;
      if (vol >= 1) clearInterval(interval);
    }, 100);
  };

  const fadeOut = (audio) => {
    if (!fade) {
      audio.pause();
      return;
    }

    let vol = audio.volume;
    const interval = setInterval(() => {
      vol = Math.max(vol - 0.05, 0);
      audio.volume = vol;
      if (vol <= 0) {
        audio.pause();
        audio.currentTime = 0;
        clearInterval(interval);
      }
    }, 100);
  };

  // 🔁 Ambient handling
  useEffect(() => {
    const ambient = ambientRef.current;
    if (ambient) {
      ambient.loop = true;
      ambient.volume = 1;
      ambient.play().catch((err) => {
        if (err.name !== 'AbortError') {
          console.warn('Ambient play error:', err);
        }
      });
    }
    return () => {
      // Do NOT fade out ambient — allow infinite loop
    };
  }, [ambientKey]);

  // 🔁 Voice handling
  useEffect(() => {
    const voice = voiceRef.current;
    if (voice) {
      voice.loop = true;
      voice.muted = voiceMuted;

      if (voiceSrc) {
        if (allowBoth || !ambientSrc) {
          fadeIn(voice);
        } else {
          fadeOut(voice);
        }
      }
    }
    return () => {
      if (voiceRef.current) fadeOut(voiceRef.current);
    };
  }, [voiceKey, allowBoth, voiceMuted]);

  // 🔁 Update keys when source changes
  useEffect(() => {
    if (ambientSrc) setAmbientKey(() => Date.now() + Math.random());
  }, [ambientSrc]);

  useEffect(() => {
    if (voiceSrc) setVoiceKey(() => Date.now() + Math.random());
  }, [voiceSrc]);

  return (
    <>
      {ambientSrc && (
        <audio
          key={`ambient-${ambientKey}`}
          ref={ambientRef}
          src={ambientSrc}
          preload="auto"
          loop
        />
      )}
      {voiceSrc && (
        <audio
          key={`voice-${voiceKey}`}
          ref={voiceRef}
          src={voiceSrc}
          preload="auto"
          loop
          muted={voiceMuted}
        />
      )}
    </>
  );
};

export default AudioManager;
