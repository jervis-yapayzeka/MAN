import { Monitor, Smartphone, Glasses, Navigation, Wifi, CheckCircle } from 'lucide-react';
import { useJarvis } from '../contexts/JarvisContext';

const DEVICE_ICONS = {
  pc: Monitor,
  phone: Smartphone,
  glass: Glasses,
  drone: Navigation,
};

const STATUS = {
  online:  { color: '#00ff88', shadow: 'rgba(0,255,136,0.5)', labelKey: 'online' },
  standby: { color: '#ffaa00', shadow: 'rgba(255,170,0,0.5)', labelKey: 'standby' },
  offline: { color: '#ff4444', shadow: 'rgba(255,68,68,0.4)', labelKey: 'offline' },
};

export default function RightPanel() {
  const { devices, t, language, themeColors, isIdle } = useJarvis();

  const primaryColor = themeColors.primary;
  const bgColor = themeColors.bgSecondary;
  const onlineCount = devices.filter(d => d.status === 'online').length;

  const quoteTR = '"Her zaman hizmetinizdeyim."';
  const quoteEN = '"Always at your service."';
  const quote = language === 'en' ? quoteEN : quoteTR;

  return (
    <div
      className="flex flex-col flex-shrink-0"
      style={{
        width: 210,
        borderLeft: `1px solid ${primaryColor}12`,
        background: bgColor,
        backdropFilter: 'blur(12px)',
        overflowY: 'auto',
        transition: 'background 0.4s ease, border-color 0.4s ease',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 flex-shrink-0"
        style={{ borderBottom: `1px solid ${primaryColor}10`, transition: 'border-color 0.3s ease' }}
      >
        <span className="font-orbitron" style={{ fontSize: 9, letterSpacing: '0.15em', color: `${primaryColor}70`, transition: 'color 0.3s ease' }}>
          {language === 'en' ? 'CONNECTED DEVICES' : 'BAĞLI CİHAZLAR'}
        </span>
        <div className="flex items-center gap-1">
          <Wifi size={9} color={`${primaryColor}55`} />
          <span className="font-rajdhani" style={{ fontSize: 9, color: `${primaryColor}55` }}>{onlineCount}</span>
        </div>
      </div>

      {/* Device list */}
      <div className="flex flex-col gap-1.5 px-3 py-3 flex-shrink-0">
        {devices.map((device) => {
          const Icon = DEVICE_ICONS[device.id as keyof typeof DEVICE_ICONS] || Monitor;
          const sc = STATUS[device.status];
          const isOnline = device.status === 'online';
          const displayName = device.customName || device.name;

          return (
            <div
              key={device.id}
              className="relative rounded px-3 py-2 group cursor-pointer transition-all duration-300"
              style={{
                background: `${primaryColor}05`,
                border: `1px solid ${primaryColor}12`,
                opacity: isOnline ? 1 : 0.6,
                transition: 'all 0.3s ease',
              }}
            >
              <div
                className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `${primaryColor}08`, border: `1px solid ${primaryColor}25` }}
              />
              <div className="flex items-center gap-2 relative z-10">
                {/* Icon */}
                <div
                  className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${primaryColor}08`,
                    border: `1px solid ${primaryColor}18`,
                    transition: 'border-color 0.3s ease',
                  }}
                >
                  <Icon size={12} color={isOnline ? `${primaryColor}90` : `${primaryColor}45`} />
                </div>

                {/* Text */}
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span
                      className="font-rajdhani font-semibold leading-none truncate"
                      style={{ fontSize: 12, color: `${primaryColor}DD`, transition: 'color 0.3s ease' }}
                    >
                      {displayName}
                    </span>
                    {/* Status dot */}
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0 ml-1"
                      style={{
                        background: sc.color,
                        boxShadow: `0 0 5px ${sc.shadow}`,
                        animation: device.status === 'online' ? 'breathe 2s ease-in-out infinite' : 'none',
                      }}
                    />
                  </div>
                  <span
                    className="font-rajdhani leading-none mt-0.5 truncate"
                    style={{ fontSize: 9, color: device.status === 'offline' ? 'rgba(255,68,68,0.5)' : device.status === 'standby' ? 'rgba(255,170,0,0.5)' : `${primaryColor}45`, transition: 'color 0.3s ease' }}
                  >
                    {isOnline && device.health > 0 ? `CPU · ${device.health}%` : device.status === 'standby' ? (language === 'en' ? 'Standby' : 'Bekleme') : (language === 'en' ? 'Offline' : 'Çevrimdışı')}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Separator */}
      <div className="mx-4" style={{ height: 1, background: `${primaryColor}10`, transition: 'background 0.3s ease' }} />

      {/* JARVIS status box */}
      <div className="flex-shrink-0 px-3 py-3">
        <div
          className="relative rounded px-3 py-3 flex flex-col items-center gap-2"
          style={{
            background: `${primaryColor}08`,
            border: `1px solid ${primaryColor}20`,
            boxShadow: `0 0 25px ${themeColors.glow}`,
            opacity: isIdle ? 0.5 : 1,
            transition: 'opacity 0.3s ease, box-shadow 0.4s ease',
          }}
        >
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-3 h-3" style={{ borderTop: `1px solid ${primaryColor}55`, borderLeft: `1px solid ${primaryColor}55` }} />
          <div className="absolute top-0 right-0 w-3 h-3" style={{ borderTop: `1px solid ${primaryColor}55`, borderRight: `1px solid ${primaryColor}55` }} />
          <div className="absolute bottom-0 left-0 w-3 h-3" style={{ borderBottom: `1px solid ${primaryColor}55`, borderLeft: `1px solid ${primaryColor}55` }} />
          <div className="absolute bottom-0 right-0 w-3 h-3" style={{ borderBottom: `1px solid ${primaryColor}55`, borderRight: `1px solid ${primaryColor}55` }} />

          {/* Mini orb indicator */}
          <div className="relative flex items-center justify-center" style={{ width: 44, height: 44 }}>
            <div
              className="absolute rounded-full"
              style={{
                inset: 0,
                border: `1px solid ${primaryColor}35`,
                animation: 'breathe 3s ease-in-out infinite',
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                inset: 6,
                border: `1px dashed ${primaryColor}25`,
                animation: 'spin-reverse 8s linear infinite',
              }}
            />
            <div
              className="rounded-full"
              style={{
                width: 18,
                height: 18,
                background: isIdle
                  ? 'radial-gradient(circle at 38% 35%, rgba(150,150,150,0.3) 0%, rgba(100,100,100,0.2) 40%, rgba(60,60,60,0.9) 100%)'
                  : `radial-gradient(circle at 38% 35%, ${primaryColor}80 0%, ${primaryColor}50 40%, rgba(0,80,140,0.9) 100%)`,
                boxShadow: `0 0 14px ${themeColors.glow}`,
                transition: 'background 0.5s ease, box-shadow 0.4s ease',
              }}
            />
          </div>

          {/* Label */}
          <span className="font-orbitron" style={{ fontSize: 10, letterSpacing: '0.2em', color: `${primaryColor}90`, transition: 'color 0.3s ease' }}>
            JARVIS
          </span>

          {/* Mini waveform */}
          {!isIdle && (
            <div className="flex items-center gap-[2px]" style={{ height: 16 }}>
              {Array.from({ length: 14 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 2,
                    height: '100%',
                    background: `linear-gradient(to top, ${primaryColor}35, ${primaryColor}90)`,
                    borderRadius: 1,
                    transformOrigin: 'bottom',
                    transform: `scaleY(${0.2 + 0.8 * Math.abs(Math.sin(i * 0.55))})`,
                    animation: `waveform ${0.7 + i * 0.07}s ease-in-out infinite`,
                    animationDelay: `${i * 0.06}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Quote */}
          <span
            className="font-rajdhani text-center leading-tight"
            style={{ fontSize: 10, color: `${primaryColor}45`, fontStyle: 'italic', transition: 'color 0.3s ease' }}
          >
            {quote}
          </span>

          {/* Status */}
          <div className="flex items-center gap-1.5">
            <CheckCircle size={9} color={isIdle ? '#666' : 'rgba(0,255,136,0.85)'} />
            <span className="font-rajdhani font-semibold tracking-widest uppercase" style={{ fontSize: 9, color: isIdle ? 'rgba(128,128,128,0.7)' : 'rgba(0,255,136,0.85)' }}>
              {isIdle ? 'IDLE' : (language === 'en' ? 'OPTIMAL' : 'OPTİMAL')}
            </span>
          </div>
        </div>
      </div>

      {/* Telemetry strip */}
      <div className="flex flex-col gap-1.5 px-4 pb-3 mt-auto flex-shrink-0">
        {[
          { label: 'NEURAL NET', labelTR: 'SİNİR AĞI', value: isIdle ? '-' : '99.8%' },
          { label: 'LATENCY', labelTR: 'GECİKME', value: isIdle ? '-' : '12ms' },
          { label: 'UPTIME', labelTR: 'ÇALIŞMA', value: isIdle ? '-' : '99.97%' },
        ].map(({ label, labelTR, value }) => (
          <div key={label} className="flex items-center justify-between">
            <span className="font-rajdhani uppercase tracking-wider" style={{ fontSize: 8, color: `${primaryColor}35`, transition: 'color 0.3s ease' }}>
              {language === 'en' ? label : labelTR}
            </span>
            <span className="font-orbitron" style={{ fontSize: 8, color: `${primaryColor}70`, transition: 'color 0.3s ease' }}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
