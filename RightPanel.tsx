import { useEffect, useRef, useState } from 'react';
import { useJarvis } from '../contexts/JarvisContext';

interface JarvisOrbProps {
  isListening: boolean;
  isProcessing: boolean;
  isIdle?: boolean;
}

const RING_CONFIGS = [
  { size: 380, speed: 'animate-spin-slow', opacity: 0.15, dashed: false, offset: 0 },
  { size: 340, speed: 'animate-spin-slow-reverse', opacity: 0.2, dashed: true, offset: 0 },
  { size: 300, speed: 'animate-spin-medium', opacity: 0.18, dashed: false, offset: 0 },
  { size: 260, speed: 'animate-spin-medium-reverse', opacity: 0.25, dashed: true, offset: 0 },
  { size: 220, speed: 'animate-spin-slow', opacity: 0.2, dashed: false, offset: 45 },
  { size: 195, speed: 'animate-spin-fast', opacity: 0.3, dashed: true, offset: 0 },
];

const PARTICLE_COUNT = 8;

export default function JarvisOrb({ isListening, isProcessing, isIdle }: JarvisOrbProps) {
  const { themeColors } = useJarvis();
  const [tick, setTick] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef(Date.now());

  const primaryColor = themeColors.primary;

  useEffect(() => {
    let running = true;
    const loop = () => {
      if (!running) return;
      setTick(Date.now() - startRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const t = tick / 1000;

  // Colors based on state
  const getColor = (baseOpacity: number) => {
    if (isIdle) return `rgba(100,100,100,${baseOpacity * 0.5})`;
    if (isListening) return `rgba(${primaryColor === '#00ff88' ? '0,255,136' : primaryColor === '#00d4ff' ? '0,212,255' : '0,136,204'},${baseOpacity})`;
    if (isProcessing) return `rgba(255,170,0,${baseOpacity})`;
    const rgb = primaryColor === '#00ff88' ? '0,255,136' : primaryColor === '#00d4ff' ? '0,212,255' : '0,136,204';
    return `rgba(${rgb},${baseOpacity})`;
  };

  const getCoreColor = () => {
    if (isIdle) {
      return 'radial-gradient(ellipse at 38% 32%, rgba(100,100,100,0.3) 0%, rgba(80,80,80,0.2) 20%, rgba(60,60,60,0.4) 55%, rgba(40,40,40,0.9) 100%)';
    }
    if (isListening) {
      const lighter = primaryColor === '#00ff88' ? 'rgba(120,255,200,0.55)' : primaryColor === '#00d4ff' ? 'rgba(120,240,255,0.55)' : 'rgba(100,200,255,0.55)';
      const mid = primaryColor === '#00ff88' ? 'rgba(0,255,136,0.4)' : primaryColor === '#00d4ff' ? 'rgba(0,212,255,0.4)' : 'rgba(0,136,204,0.4)';
      return `radial-gradient(ellipse at 38% 32%, ${lighter} 0%, ${mid} 20%, rgba(0,100,80,0.6) 55%, rgba(0,30,60,0.95) 100%)`;
    }
    if (isProcessing) {
      return 'radial-gradient(ellipse at 38% 32%, rgba(255,220,120,0.5) 0%, rgba(255,170,0,0.35) 20%, rgba(200,130,0,0.5) 55%, rgba(80,50,0,0.95) 100%)';
    }
    const lighter = primaryColor === '#00ff88' ? 'rgba(120,255,200,0.45)' : primaryColor === '#00d4ff' ? 'rgba(120,240,255,0.45)' : 'rgba(100,200,255,0.45)';
    const mid = primaryColor === '#00ff88' ? 'rgba(0,255,136,0.3)' : primaryColor === '#00d4ff' ? 'rgba(0,212,255,0.3)' : 'rgba(0,136,204,0.3)';
    return `radial-gradient(ellipse at 38% 32%, ${lighter} 0%, ${mid} 20%, rgba(0,100,80,0.5) 55%, rgba(0,30,70,0.95) 100%)`;
  };

  const getGlow = () => {
    if (isIdle) return '0 0 20px rgba(100,100,100,0.3), 0 0 40px rgba(100,100,100,0.15)';
    if (isListening) return `0 0 60px ${themeColors.glow}, 0 0 120px ${primaryColor}60, 0 0 200px ${primaryColor}40, inset 0 0 50px ${primaryColor}30`;
    if (isProcessing) return '0 0 50px rgba(255,170,0,0.8), 0 0 100px rgba(255,170,0,0.5), 0 0 160px rgba(200,130,0,0.35), inset 0 0 40px rgba(255,170,0,0.25)';
    return `0 0 40px ${themeColors.glow}, 0 0 80px ${primaryColor}40, 0 0 120px ${primaryColor}25, inset 0 0 40px ${primaryColor}20`;
  };

  const getAuraBackground = () => {
    if (isIdle) return 'radial-gradient(ellipse at center, rgba(100,100,100,0.05) 0%, rgba(80,80,80,0.03) 50%, transparent 70%)';
    if (isProcessing) return 'radial-gradient(ellipse at center, rgba(255,170,0,0.1) 0%, rgba(200,130,0,0.05) 50%, transparent 70%)';
    return `radial-gradient(ellipse at center, ${primaryColor}18 0%, ${primaryColor}08 50%, transparent 70%)`;
  };

  return (
    <div className="relative flex items-center justify-center" style={{ width: 420, height: 420 }}>
      {/* Aura / outer bloom */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 500,
          height: 500,
          background: getAuraBackground(),
          animation: 'breathe 4s ease-in-out infinite',
          transition: 'background 0.5s ease',
        }}
      />

      {/* Rotating SVG rings */}
      <svg
        className="absolute"
        width={420}
        height={420}
        viewBox="0 0 420 420"
        style={{ top: 0, left: 0, opacity: isIdle ? 0.4 : 1, transition: 'opacity 0.5s ease' }}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {RING_CONFIGS.map((ring, i) => {
          const r = ring.size / 2;
          const cx = 210;
          const cy = 210;
          const circumference = 2 * Math.PI * r;
          const dir = i % 2 === 0 ? 1 : -1;
          const speedMult = isIdle ? [0.02, 0.015, 0.03, 0.02, 0.015, 0.05][i] : [0.06, 0.04, 0.1, 0.07, 0.05, 0.18][i];
          const rotDeg = ((t * speedMult * 360 * dir) % 360 + ring.offset) % 360;
          const dashLen = ring.dashed ? circumference / 24 : circumference;
          const dashGap = ring.dashed ? circumference / 24 : 0;

          return (
            <g key={i} transform={`rotate(${rotDeg}, ${cx}, ${cy})`} filter="url(#glow)">
              <circle
                cx={cx}
                cy={cy}
                r={r - 1}
                fill="none"
                stroke={getColor(ring.opacity)}
                strokeWidth={ring.dashed ? 1 : 1.5}
                strokeDasharray={`${dashLen} ${dashGap}`}
              />
              {/* Bright accent on ring */}
              {i % 2 === 0 && !isIdle && (
                <circle
                  cx={cx}
                  cy={cy - (r - 1)}
                  r={3}
                  fill={getColor(0.9)}
                  filter="url(#glow)"
                />
              )}
            </g>
          );
        })}

        {/* Particles orbiting - hide when idle */}
        {!isIdle && Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
          const orbitR = 190;
          const angle = (i / PARTICLE_COUNT) * Math.PI * 2 + t * 0.4;
          const px = 210 + Math.cos(angle) * orbitR;
          const py = 210 + Math.sin(angle) * orbitR;
          const opacity = 0.3 + 0.7 * ((Math.sin(angle + t) + 1) / 2);

          return (
            <circle
              key={`p-${i}`}
              cx={px}
              cy={py}
              r={i % 3 === 0 ? 3 : 2}
              fill={getColor(opacity)}
              filter="url(#glow)"
            />
          );
        })}

        {/* HUD arc segments */}
        {[0, 60, 120, 180, 240, 300].map((startAngle, i) => {
          const r = 200;
          const cx = 210, cy = 210;
          const arcLen = 25;
          const rotDeg = ((t * 0.03 * (i % 2 === 0 ? 1 : -1) * 360) % 360);
          const start = ((startAngle + rotDeg) % 360) * (Math.PI / 180);
          const end = ((startAngle + rotDeg + arcLen) % 360) * (Math.PI / 180);
          const x1 = cx + r * Math.cos(start);
          const y1 = cy + r * Math.sin(start);
          const x2 = cx + r * Math.cos(end);
          const y2 = cy + r * Math.sin(end);

          return (
            <path
              key={`arc-${i}`}
              d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
              fill="none"
              stroke={getColor(0.5)}
              strokeWidth={2.5}
              filter="url(#glow)"
            />
          );
        })}

        {/* Cross-hair lines at core */}
        <line x1="210" y1="120" x2="210" y2="90" stroke={getColor(0.3)} strokeWidth="1" />
        <line x1="210" y1="300" x2="210" y2="330" stroke={getColor(0.3)} strokeWidth="1" />
        <line x1="120" y1="210" x2="90" y2="210" stroke={getColor(0.3)} strokeWidth="1" />
        <line x1="300" y1="210" x2="330" y2="210" stroke={getColor(0.3)} strokeWidth="1" />

        {/* Data readout marks */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
          const rad = deg * (Math.PI / 180);
          const ir = 175;
          const or = 185;
          const x1 = 210 + ir * Math.cos(rad);
          const y1 = 210 + ir * Math.sin(rad);
          const x2 = 210 + or * Math.cos(rad);
          const y2 = 210 + or * Math.sin(rad);
          return (
            <line
              key={`tick-${i}`}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={getColor(0.4)}
              strokeWidth={i % 2 === 0 ? 2 : 1}
            />
          );
        })}
      </svg>

      {/* Orb core */}
      <div
        className="absolute rounded-full"
        style={{
          width: 160,
          height: 160,
          background: getCoreColor(),
          boxShadow: getGlow(),
          transition: 'box-shadow 0.5s ease, background 0.5s ease',
          animation: 'pulse-orb-core 3s ease-in-out infinite',
        }}
      >
        {/* Inner highlight */}
        <div
          className="absolute rounded-full"
          style={{
            width: 60,
            height: 60,
            top: 20,
            left: 22,
            background: isIdle
              ? 'radial-gradient(ellipse at center, rgba(150,150,150,0.2) 0%, transparent 70%)'
              : isProcessing
                ? 'radial-gradient(ellipse at center, rgba(255,220,150,0.4) 0%, transparent 70%)'
                : `radial-gradient(ellipse at center, ${primaryColor}50 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* JARVIS text */}
      <div
        className="absolute flex flex-col items-center"
        style={{ zIndex: 10 }}
      >
        <span
          className="font-orbitron font-bold tracking-[0.3em] text-sm"
          style={{
            color: getColor(0.95),
            textShadow: isIdle
              ? '0 0 5px rgba(100,100,100,0.5)'
              : isProcessing
                ? '0 0 10px rgba(255,170,0,0.8), 0 0 20px rgba(255,170,0,0.5)'
                : `0 0 10px ${primaryColor}D0, 0 0 20px ${primaryColor}80`,
            letterSpacing: '0.3em',
            transition: 'color 0.5s ease, text-shadow 0.5s ease',
          }}
        >
          JARVIS
        </span>
      </div>

      {/* Listening ring */}
      {isListening && !isIdle && (
        <div
          className="absolute rounded-full border-2 animate-ping"
          style={{ width: 200, height: 200, borderColor: `${primaryColor}70` }}
        />
      )}

      {/* Processing pulse ring */}
      {isProcessing && !isIdle && (
        <div
          className="absolute rounded-full"
          style={{
            width: 200,
            height: 200,
            border: '2px solid rgba(255,170,0,0.4)',
            animation: 'breathe 1s ease-in-out infinite',
          }}
        />
      )}
    </div>
  );
}
