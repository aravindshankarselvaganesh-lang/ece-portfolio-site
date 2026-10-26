import React, { useEffect, useState } from 'react';

export const Grain: React.FC = () => {
  const [grainUrl, setGrainUrl] = useState<string>('');

  useEffect(() => {
    // Generate a 128x128 static film grain tile once into a canvas
    // Completely eliminates SVG feTurbulence continuous repaint lag during scroll
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgData = ctx.createImageData(128, 128);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const val = Math.random() * 255;
      data[i] = val;
      data[i + 1] = val;
      data[i + 2] = val;
      data[i + 3] = 16; // Ultra-subtle analog texture alpha
    }
    ctx.putImageData(imgData, 0, 0);
    setGrainUrl(canvas.toDataURL('image/png'));
  }, []);

  if (!grainUrl) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      style={{
        backgroundImage: `url(${grainUrl})`,
        backgroundRepeat: 'repeat',
        opacity: 0.65,
      }}
    />
  );
};
