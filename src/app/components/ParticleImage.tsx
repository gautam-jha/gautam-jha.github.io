import React, { useRef, useEffect, useState } from 'react';

export function ParticleImage({ src }: { src: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snapRef = useRef(false);
  const [isSnapped, setIsSnapped] = useState(false);
  const [showOriginal, setShowOriginal] = useState(true);

  const toggleSnap = () => {
    const nextSnapped = !snapRef.current;
    snapRef.current = nextSnapped;
    setIsSnapped(nextSnapped);

    if (nextSnapped) {
      // Instantly hide the original image to reveal the particles snapping
      setShowOriginal(false);
    } else {
      // Wait for particles to reassemble before showing the original image again
      setTimeout(() => {
        if (!snapRef.current) {
          setShowOriginal(true);
        }
      }, 2000); // 2 seconds gives enough time for the time stone effect
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000, radius: 50 };
    let particles: Particle[] = [];

    class Particle {
      x: number; y: number; originX: number; originY: number;
      r: number; g: number; b: number; a: number; baseA: number;
      size: number; vx: number; vy: number; ease: number;
      driftX: number; driftY: number; delay: number;
      isSnapping: boolean;

      constructor(x: number, y: number, r: number, g: number, b: number, a: number) {
        // Start perfectly assembled behind the image layer
        this.x = x;
        this.y = y;
        this.originX = x;
        this.originY = y;
        this.r = r; this.g = g; this.b = b; 
        this.baseA = a;
        this.a = a; // start fully visible behind the image
        this.size = Math.random() * 2 + 1; // Slightly smaller base particle sizes for better res
        this.vx = 0;
        this.vy = 0;
        this.ease = 0.04 + Math.random() * 0.04;
        this.driftX = Math.random() * 3 - 1.5;
        this.driftY = -Math.random() * 4 - 1; 
        // Delay before a particle reacts to the snap (creates a wave effect)
        this.delay = (x / canvas.width) * 40 + Math.random() * 20;
        this.isSnapping = false;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(${this.r},${this.g},${this.b},${this.a})`;
        ctx.fillRect(this.x, this.y, this.size, this.size);
      }

      update(frameCounter: number) {
        if (snapRef.current) {
          if (frameCounter > this.delay) {
            this.isSnapping = true;
          }
          if (this.isSnapping) {
            this.vx += this.driftX * 0.03;
            this.vy += this.driftY * 0.03;
            this.x += this.vx;
            this.y += this.vy;
            if (this.a > 0) this.a -= 0.01;
          }
        } else {
          this.isSnapping = false;
          
          this.vx *= 0.82;
          this.vy *= 0.82;
          this.x += (this.originX - this.x) * this.ease;
          this.y += (this.originY - this.y) * this.ease;
          
          this.x += this.vx;
          this.y += this.vy;
          
          if (this.a < this.baseA) this.a += 0.02;
        }
      }
    }

    const img = new Image();
    img.src = src;
    img.crossOrigin = "Anonymous";

    let frameCounter = 0;

    img.onload = () => {
      // Adjusted internal resolution to be a blocky/dust-like effect during snap
      canvas.width = 300;
      canvas.height = 375;

      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height / 2) - (img.height / 2) * scale;
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gap = 3; // Dust-like particle size

      for (let y = 0; y < canvas.height; y += gap) {
        for (let x = 0; x < canvas.width; x += gap) {
          const index = (y * canvas.width + x) * 4;
          const a = imageData.data[index + 3];
          if (a > 50) { 
            const r = imageData.data[index];
            const g = imageData.data[index + 1];
            const b = imageData.data[index + 2];
            particles.push(new Particle(x, y, r, g, b, a / 255));
          }
        }
      }

      // Sort particles by X coordinate slightly offset so the delay sweep looks right
      particles.sort((a, b) => a.x - b.x + (Math.random() * 20 - 10));

      animate();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (snapRef.current) frameCounter++;
      else frameCounter = 0;

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(frameCounter);
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Intentionally removed mouse repulsion logic based on user feedback
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [src]);

  return (
    <div className="relative w-full h-full group z-10 bg-slate-200 dark:bg-slate-800 overflow-hidden">
      {/* The original full-quality image overlaid on top */}
      <img 
        src={src} 
        alt="Profile" 
        className={`absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-300 pointer-events-none ${
          showOriginal ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      {/* The particle canvas underneath */}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-cover block absolute inset-0 z-10" 
      />
      
      {/* Controls */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30">
        <button 
          onClick={toggleSnap}
          className="pointer-events-auto flex items-center gap-2 px-4 py-2 bg-slate-900/90 backdrop-blur-md text-cyan-400 text-sm font-mono rounded-full border border-cyan-500/30 hover:bg-slate-800 hover:text-cyan-300 transition-all shadow-xl shadow-cyan-500/10 hover:shadow-cyan-500/30 hover:scale-105 active:scale-95"
        >
          {isSnapped ? "⌛ Time Stone (Restore)" : "🖐️ Thanos Snap"}
        </button>
      </div>
    </div>
  );
}
