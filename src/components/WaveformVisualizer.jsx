// components/WaveformVisualizer.jsx
import React, { useEffect, useRef } from 'react';

const WaveformVisualizer = ({ audioSrc }) => {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioSrc) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const audio = new Audio(audioSrc);
    audioRef.current = audio;

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;

    const source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const draw = () => {
      analyser.getByteTimeDomainData(dataArray);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#00FFFF';

      let x = 0;
      const sliceWidth = canvas.width / dataArray.length;
      for (let i = 0; i < dataArray.length; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
      requestAnimationFrame(draw);
    };

    draw();
    audio.play();

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audioRef.current = null;
    };
  }, [audioSrc]);

  return <canvas ref={canvasRef} className="w-full h-24 bg-transparent" />;
};

export default WaveformVisualizer;