import { useState, useEffect, useRef } from 'react';
import JarvisOrb from './components/JarvisOrb';
import LeftSidebar from './components/LeftSidebar';
import RightPanel from './components/RightPanel';
import CommandInput from './components/CommandInput';
import DevicesPage from './components/DevicesPage';
import TasksPage from './components/TasksPage';
import SettingsPage from './components/SettingsPage';
import ToastContainer from './components/ToastContainer';
import { useJarvis } from './contexts/JarvisContext';

interface Message {
  id: string;
  role: 'user' | 'jarvis';
  text: string;
  time: string;
}

const JARVIS_RESPONSES_TR = [
  "Sistemler tam kapasiteyle çalışıyor. Tüm sinir yolları açık.",
  "Talebinizi analiz ettim. İşlem tamamlandı — işte bulgularım.",
  "Tabii ki. Gerekli tanılamaları çoktan başlattım.",
  "Anlaşıldı. Sıra başlatılıyor. Lütfen bekleyin.",
  "Her şey normal görünüyor. Tam rapor birazdan hazır olacak.",
  "Simülasyonlar çalıştırılıyor. Sonuçlar 0.3 saniye içinde hazır olacak.",
  "Evet, bu yapılabilir. Süreci çoktan başlattım.",
  "Anlaşıldı. Tüm sistemler beklenen parametreler dahilinde yanıt veriyor.",
  "Verileri çapraz referansladım. Her şey mükemmel görünüyor.",
  "Görev tamamlandı. Başka bir isteğiniz var mı?",
];

const JARVIS_RESPONSES_EN = [
  "Systems operating at full capacity. All neural pathways open.",
  "Request analyzed. Operation complete — here are my findings.",
  "Certainly. Diagnostics already initiated.",
  "Understood. Sequence starting. Please stand by.",
  "Everything appears normal. Full report will be ready shortly.",
  "Running simulations. Results available in 0.3 seconds.",
  "Yes, that can be done. Process already started.",
  "Acknowledged. All systems responding within expected parameters.",
  "Cross-referenced data. Everything looks perfect.",
  "Task complete. Anything else you need?",
];

function formatTime(date: Date) {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}

function formatDate(date: Date, lang: 'tr' | 'en') {
  if (lang === 'tr') {
    return date.toLocaleDateString('tr-TR', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase();
  }
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase();
}

// 4-pointed star shape
function StarParticle({ size, opacity, style, color }: { size: number; opacity: number; style?: React.CSSProperties; color: string }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        position: 'absolute',
        opacity,
        ...style,
      }}
    >
      <svg viewBox="0 0 40 40" width={size} height={size} fill="none">
        <path
          d="M20 2 L22.5 17.5 L38 20 L22.5 22.5 L20 38 L17.5 22.5 L2 20 L17.5 17.5 Z"
          fill={color}
          filter="url(#starGlow)"
        />
        <defs>
          <filter id="starGlow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
}

export default function App() {
  const {
    t,
    settings,
    systemStatus,
    setSystemStatus,
    isIdle,
    resetIdleTimer,
    theme,
    themeColors,
    getResponseDelay,
  } = useJarvis();

  const [activeNav, setActiveNav] = useState('conversation');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentResponse, setCurrentResponse] = useState(t('allSystemsActive'));
  const [orbLabel, setOrbLabel] = useState(t('readyMaster'));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-scroll messages
  useEffect(() => {
    if (messagesEndRef.current && messages.length > 0) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Get status text based on system status
  const getStatusText = () => {
    if (isIdle) return t('idle');
    switch (systemStatus) {
      case 'processing': return t('processing');
      case 'listening': return t('listening');
      default: return t('systemOptimal');
    }
  };

  // Get status color
  const getStatusColor = () => {
    if (isIdle) return '#666';
    if (isProcessing) return '#ffaa00';
    if (isListening) return themeColors.primary;
    return '#00ff88';
  };

  const handleSubmit = (text: string) => {
    if (isProcessing) return;
    resetIdleTimer();

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text,
      time: formatTime(new Date()),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsProcessing(true);
    setSystemStatus('processing');
    setOrbLabel(t('analyzing'));

    const delay = getResponseDelay();
    setTimeout(() => {
      const responses = settings.language === 'tr' ? JARVIS_RESPONSES_TR : JARVIS_RESPONSES_EN;
      const response = responses[Math.floor(Math.random() * responses.length)];
      const jarvisMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'jarvis',
        text: response,
        time: formatTime(new Date()),
      };
      setMessages((prev) => [...prev, jarvisMsg]);
      setCurrentResponse(response);
      setIsProcessing(false);
      setSystemStatus('optimal');
      setOrbLabel(t('readyMaster'));
    }, delay);
  };

  const handleToggleVoice = () => {
    if (isProcessing) return;
    resetIdleTimer();

    setIsListening((v) => {
      const next = !v;
      setSystemStatus(next ? 'listening' : 'optimal');
      setOrbLabel(next ? t('listening') : t('readyMaster'));
      if (next) {
        setTimeout(() => {
          setIsListening(false);
          setSystemStatus('optimal');
          setOrbLabel(t('readyMaster'));
        }, 4000);
      }
      return next;
    });
  };

  const hasMessages = messages.length > 0;

  // Derive colors from theme
  const cyanColor = themeColors.primary;
  const bgColor = themeColors.bg;
  const textColor = themeColors.text;
  const bgHeader = theme === 'hacker' ? 'rgba(10,15,10,0.5)' : theme === 'dark' ? 'rgba(1,8,16,0.5)' : 'rgba(255,255,255,0.8)';
  const bgFooter = theme === 'hacker' ? 'rgba(10,15,10,0.6)' : theme === 'dark' ? 'rgba(1,8,16,0.6)' : 'rgba(255,255,255,0.8)';

  // Grid opacity based on theme
  const gridOpacity = theme === 'hacker' ? 0.5 : theme === 'dark' ? 0.7 : 0.3;

  // Vignette based on theme
  const vignetteStyle = theme === 'hacker'
    ? 'radial-gradient(ellipse 70% 80% at 50% 40%, transparent 30%, rgba(10,15,10,0.8) 100%)'
    : theme === 'dark'
      ? 'radial-gradient(ellipse 70% 80% at 50% 40%, transparent 30%, rgba(1,8,16,0.75) 100%)'
      : 'radial-gradient(ellipse 70% 80% at 50% 40%, transparent 30%, rgba(240,244,248,0.5) 100%)';

  // Ambient glow
  const ambientGlow = theme === 'hacker'
    ? 'radial-gradient(ellipse at center, rgba(0,255,136,0.06) 0%, rgba(0,100,80,0.03) 45%, transparent 70%)'
    : theme === 'dark'
      ? 'radial-gradient(ellipse at center, rgba(0,212,255,0.07) 0%, rgba(0,100,160,0.04) 45%, transparent 70%)'
      : 'radial-gradient(ellipse at center, rgba(0,136,204,0.05) 0%, rgba(0,80,120,0.03) 45%, transparent 70%)';

  return (
    <div
      className="h-screen w-screen overflow-hidden flex flex-col relative select-none"
      style={{
        background: bgColor,
        fontFamily: 'Inter, sans-serif',
        transition: 'background 0.5s ease'
      }}
      onClick={resetIdleTimer}
      onMouseMove={resetIdleTimer}
      onKeyDown={resetIdleTimer}
    >
      {/* Grid background — full bleed */}
      <div
        className="absolute inset-0 grid-bg opacity-70 pointer-events-none"
        style={{ opacity: gridOpacity }}
      />

      {/* Radial vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: vignetteStyle }} />

      {/* Ambient center glow behind orb */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: '50%',
          top: '42%',
          transform: 'translate(-50%, -50%)',
          width: 700,
          height: 700,
          background: ambientGlow,
        }}
      />

      {/* Scan line */}
      <div className="scan-line pointer-events-none" />

      {/* Star particles - only for dark and hacker themes */}
      {(theme === 'dark' || theme === 'hacker') && (
        <>
          <StarParticle size={28} opacity={0.55} style={{ bottom: 80, right: 220 }} color={themeColors.primary} />
          <StarParticle size={14} opacity={0.35} style={{ bottom: 120, right: 260 }} color={themeColors.primary} />
        </>
      )}

      {/* ═══ HEADER ═══ */}
      <header
        className="relative flex flex-shrink-0 z-20"
        style={{
          height: 56,
          padding: '0 20px',
          borderBottom: `1px solid ${cyanColor}15`,
          background: bgHeader,
          backdropFilter: 'blur(12px)',
          transition: 'background 0.4s ease, border-color 0.4s ease',
        }}
      >
        {/* Left: Time/Date */}
        <div className="flex items-center" style={{ flex: '1 1 0', minWidth: 140, justifyContent: 'flex-start' }}>
          <div className="flex flex-col justify-center">
            <span
              className="font-orbitron font-bold leading-none"
              style={{ fontSize: 26, color: cyanColor, letterSpacing: '0.04em', transition: 'color 0.4s ease' }}
            >
              {formatTime(currentTime)}
            </span>
            <span
              className="font-rajdhani uppercase tracking-widest"
              style={{ fontSize: 9, color: `${cyanColor}60`, marginTop: 2, transition: 'color 0.4s ease' }}
            >
              {formatDate(currentTime, settings.language)}
            </span>
          </div>
        </div>

        {/* Center: JARVIS logo - perfectly centered */}
        <div className="flex flex-col items-center justify-center" style={{ flex: '0 0 auto', padding: '0 20px' }}>
          <span
            className="font-orbitron font-bold shimmer-text"
            style={{
              fontSize: 18,
              letterSpacing: '0.5em',
              whiteSpace: 'nowrap',
              background: `linear-gradient(90deg, ${cyanColor}, #ffffff, ${cyanColor})`,
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 4s linear infinite',
            }}
          >
            JARVIS
          </span>
          <div className="flex items-center gap-2 mt-1">
            <div style={{ height: 1, width: 28, background: `${cyanColor}50`, transition: 'background 0.4s ease' }} />
            <span
              className="font-rajdhani uppercase tracking-[0.25em]"
              style={{ fontSize: 9, color: `${cyanColor}70`, transition: 'color 0.4s ease' }}
            >
              AI OS V0.1
            </span>
            <div style={{ height: 1, width: 28, background: `${cyanColor}50`, transition: 'background 0.4s ease' }} />
          </div>
        </div>

        {/* Right: Status */}
        <div className="flex items-center gap-2" style={{ flex: '1 1 0', minWidth: 140, justifyContent: 'flex-end' }}>
          <div
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{
              background: isIdle ? '#666' : getStatusColor(),
              boxShadow: isIdle
                ? 'none'
                : isProcessing
                  ? '0 0 12px #ffaa00, 0 0 24px rgba(255,170,0,0.5)'
                  : isListening
                    ? `0 0 12px ${cyanColor}, 0 0 24px ${themeColors.glow}`
                    : '0 0 8px #00ff88, 0 0 16px rgba(0,255,136,0.3)',
              animation: 'breathe 2s ease-in-out infinite',
              transition: 'all 0.3s ease',
            }}
          />
          <span
            className="font-orbitron"
            style={{
              fontSize: 9,
              letterSpacing: '0.12em',
              color: isIdle
                ? 'rgba(128,128,128,0.7)'
                : getStatusColor(),
              transition: 'color 0.3s ease',
            }}
          >
            {getStatusText()}
          </span>
        </div>
      </header>

      {/* ═══ BODY ═══ */}
      <div className="flex flex-1 overflow-hidden z-10 min-h-0">

        {/* Left sidebar */}
        <LeftSidebar activeNav={activeNav} onNavChange={setActiveNav} />

        {/* Devices page */}
        {activeNav === 'devices' && <DevicesPage />}

        {/* Tasks page */}
        {activeNav === 'tasks' && <TasksPage />}

        {/* Settings page */}
        {activeNav === 'settings' && <SettingsPage />}

        {/* Center column — conversation view */}
        <div
          className="flex-1 flex flex-col items-center overflow-hidden min-w-0 relative"
          style={{ display: ['devices', 'tasks', 'settings'].includes(activeNav) ? 'none' : 'flex' }}
        >

          {/* Orb section — grows to fill available space above input */}
          <div
            className="flex flex-col items-center justify-center"
            style={{
              flex: hasMessages ? '0 0 auto' : '1 1 auto',
              paddingTop: hasMessages ? 16 : 0,
              paddingBottom: 8,
            }}
          >
            <JarvisOrb isListening={isListening} isProcessing={isProcessing} isIdle={isIdle} />

            {/* Status text */}
            <div className="flex flex-col items-center text-center" style={{ marginTop: 16, gap: 6 }}>
              <h2
                className="font-rajdhani font-semibold"
                style={{
                  fontSize: 28,
                  color: textColor,
                  letterSpacing: '0.05em',
                  lineHeight: 1.1,
                  transition: 'color 0.3s ease',
                }}
              >
                {isIdle ? t('idle') : orbLabel}
              </h2>
              <p
                className="font-rajdhani"
                style={{
                  fontSize: 14,
                  color: `${cyanColor}B0`,
                  letterSpacing: '0.03em',
                  maxWidth: 380,
                  lineHeight: 1.5,
                  opacity: isIdle ? 0.5 : 1,
                  transition: 'opacity 0.3s ease, color 0.3s ease',
                }}
              >
                {isListening
                  ? t('waitingCommand')
                  : isProcessing
                    ? t('analyzing')
                    : isIdle
                      ? '...'
                      : currentResponse}
              </p>
            </div>

            {/* HUD divider */}
            <div className="flex items-center gap-3 mt-4" style={{ width: 280 }}>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${cyanColor}35)`, transition: 'background 0.4s ease' }} />
              <div style={{
                width: 4,
                height: 4,
                background: cyanColor,
                borderRadius: '50%',
                boxShadow: `0 0 6px ${themeColors.glow}`,
                transition: 'background 0.4s ease, box-shadow 0.4s ease',
              }} />
              <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${cyanColor}35)`, transition: 'background 0.4s ease' }} />
            </div>
          </div>

          {/* Message history — only rendered when there are messages */}
          {hasMessages && (
            <div
              className="flex-1 w-full overflow-y-auto flex flex-col justify-end gap-2 px-6 py-2 min-h-0"
              style={{
                maxWidth: 560,
                maskImage: 'linear-gradient(to bottom, transparent, black 18%)',
              }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                    style={{
                      background: msg.role === 'jarvis' ? `${cyanColor}15` : 'rgba(255,255,255,0.05)',
                      border: msg.role === 'jarvis' ? `1px solid ${cyanColor}40` : '1px solid rgba(255,255,255,0.08)',
                      transition: 'background 0.3s ease, border-color 0.3s ease',
                    }}
                  >
                    <span className="font-orbitron" style={{ fontSize: 6, color: msg.role === 'jarvis' ? cyanColor : 'rgba(255,255,255,0.5)' }}>
                      {msg.role === 'jarvis' ? 'J' : 'U'}
                    </span>
                  </div>
                  <div
                    className="max-w-xs rounded-lg px-3 py-1.5"
                    style={{
                      background: msg.role === 'jarvis' ? `${cyanColor}08` : 'rgba(255,255,255,0.03)',
                      border: msg.role === 'jarvis' ? `1px solid ${cyanColor}15` : '1px solid rgba(255,255,255,0.06)',
                      transition: 'background 0.3s ease, border-color 0.3s ease',
                    }}
                  >
                    <p
                      className="font-rajdhani"
                      style={{
                        fontSize: 12,
                        lineHeight: 1.5,
                        color: msg.role === 'jarvis' ? `${cyanColor}DD` : textColor,
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {msg.text}
                    </p>
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex gap-2">
                  <div
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: `${cyanColor}15`, border: `1px solid ${cyanColor}40`, transition: 'background 0.3s ease, border-color 0.3s ease' }}
                  >
                    <span className="font-orbitron" style={{ fontSize: 6, color: cyanColor }}>J</span>
                  </div>
                  <div
                    className="rounded-lg px-3 py-2 flex items-center gap-1.5"
                    style={{ background: `${cyanColor}08`, border: `1px solid ${cyanColor}15`, transition: 'background 0.3s ease, border-color 0.3s ease' }}
                  >
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-1 h-1 rounded-full"
                        style={{
                          background: `${cyanColor}99`,
                          animation: `breathe 0.9s ease-in-out infinite`,
                          animationDelay: `${i * 0.2}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Input area */}
          <div
            className="flex-shrink-0 w-full flex flex-col items-center"
            style={{ padding: '10px 20px 14px' }}
          >
            <div style={{ width: '100%', maxWidth: 560 }}>
              <CommandInput
                isListening={isListening}
                isProcessing={isProcessing}
                onSubmit={handleSubmit}
                onToggleVoice={handleToggleVoice}
              />
            </div>
            <span
              className="font-rajdhani uppercase tracking-widest mt-2"
              style={{ fontSize: 8, color: `${cyanColor}40`, transition: 'color 0.3s ease' }}
            >
              {t('commandModes')}
            </span>
          </div>
        </div>

        {/* Right panel — hidden on devices, tasks, settings pages */}
        {activeNav === 'conversation' && <RightPanel />}
      </div>

      {/* ═══ FOOTER ═══ */}
      <div
        className="relative flex items-center justify-between flex-shrink-0 z-20"
        style={{
          height: 24,
          padding: '0 20px',
          borderTop: `1px solid ${cyanColor}08`,
          background: bgFooter,
          transition: 'background 0.4s ease, border-color 0.4s ease',
        }}
      >
        <span className="font-orbitron" style={{ fontSize: 7, letterSpacing: '0.12em', color: `${cyanColor}30`, transition: 'color 0.3s ease' }}>
          SIS://CORE/NEURAL/ACTIVE · ENCRYPTED · SECURE
        </span>
        <div
          style={{
            width: 5,
            height: 5,
            background: `${cyanColor}50`,
            transform: 'rotate(45deg)',
            boxShadow: `0 0 5px ${themeColors.glow}`,
            transition: 'background 0.3s ease, box-shadow 0.3s ease',
          }}
        />
        <span className="font-orbitron" style={{ fontSize: 7, letterSpacing: '0.12em', color: `${cyanColor}30`, transition: 'color 0.3s ease' }}>
          POWER 100% · NETWORK 847ms · SECURITY LEVEL 5
        </span>
      </div>

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
}
