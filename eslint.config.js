import { useState, useRef } from 'react';
import { Mic, MicOff, Send, Loader } from 'lucide-react';
import { useJarvis } from '../contexts/JarvisContext';

interface CommandInputProps {
  isListening: boolean;
  isProcessing: boolean;
  onSubmit: (text: string) => void;
  onToggleVoice: () => void;
}

export default function CommandInput({ isListening, isProcessing, onSubmit, onToggleVoice }: CommandInputProps) {
  const { t, themeColors, isVoiceListening, startVoiceListening, stopVoiceListening } = useJarvis();
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const primaryColor = themeColors.primary;
  const textColor = themeColors.text;
  const inputBg = `${primaryColor}06`;

  // Use context voice listening state if available, otherwise fall back to prop
  const voiceActive = isVoiceListening ?? isListening;

  const handleSubmit = () => {
    if (!value.trim() || isProcessing) return;
    onSubmit(value.trim());
    setValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleVoiceToggle = () => {
    if (voiceActive) {
      stopVoiceListening();
    } else {
      startVoiceListening();
    }
    onToggleVoice(); // Keep original callback for compatibility
  };

  return (
    <div className="flex items-center gap-4 w-full">
      {/* Voice button */}
      <button
        onClick={handleVoiceToggle}
        className="relative flex-shrink-0 rounded-full flex items-center justify-center transition-all duration-300 group"
        style={{
          width: 52,
          height: 52,
          background: voiceActive ? `${primaryColor}28` : `${primaryColor}10`,
          border: voiceActive ? `1px solid ${primaryColor}85` : `1px solid ${primaryColor}28`,
          boxShadow: voiceActive
            ? `0 0 22px ${themeColors.glow}, 0 0 45px ${primaryColor}30`
            : `0 0 12px ${primaryColor}18`,
          transition: 'all 0.3s ease',
        }}
      >
        {voiceActive && (
          <>
            <div
              className="absolute rounded-full animate-ping"
              style={{
                inset: -4,
                border: `1px solid ${primaryColor}45`,
                borderRadius: '50%',
              }}
            />
            <div
              className="absolute rounded-full animate-ping"
              style={{
                inset: -12,
                border: `1px solid ${primaryColor}28`,
                borderRadius: '50%',
                animationDelay: '0.3s',
              }}
            />
          </>
        )}
        {voiceActive ? (
          <MicOff size={18} color={primaryColor} />
        ) : (
          <Mic size={18} color={`${primaryColor}75`} />
        )}
      </button>

      {/* Text input */}
      <div
        className="flex-1 relative flex items-center rounded-full overflow-hidden"
        style={{
          background: inputBg,
          border: `1px solid ${primaryColor}20`,
          boxShadow: `0 0 16px ${primaryColor}10`,
          height: 52,
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* Left glow accent */}
        <div
          className="absolute left-0 top-0 bottom-0 w-px"
          style={{
            background: `linear-gradient(to bottom, transparent, ${primaryColor}65, transparent)`,
          }}
        />

        {/* Waveform decoration when listening */}
        {voiceActive && (
          <div className="absolute left-5 flex items-center gap-[3px]" style={{ height: 24 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 2,
                  height: '100%',
                  background: `${primaryColor}80`,
                  borderRadius: 1,
                  transformOrigin: 'center',
                  animation: `waveform ${0.5 + i * 0.08}s ease-in-out infinite`,
                  animationDelay: `${i * 0.06}s`,
                }}
              />
            ))}
          </div>
        )}

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={voiceActive ? t('listeningPlaceholder') : t('commandPlaceholder')}
          className="flex-1 bg-transparent text-sm font-inter outline-none placeholder-opacity-30"
          style={{
            padding: '0 60px 0 20px',
            color: textColor,
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: 15,
            letterSpacing: '0.02em',
          }}
          disabled={isProcessing}
        />

        {/* Send button */}
        <button
          onClick={handleSubmit}
          disabled={!value.trim() || isProcessing}
          className="absolute right-3 flex items-center justify-center rounded-full transition-all duration-200"
          style={{
            width: 36,
            height: 36,
            background: value.trim() && !isProcessing ? `${primaryColor}25` : 'transparent',
            border: value.trim() && !isProcessing ? `1px solid ${primaryColor}45` : '1px solid transparent',
            boxShadow: value.trim() && !isProcessing ? `0 0 10px ${primaryColor}30` : 'none',
          }}
        >
          {isProcessing ? (
            <Loader size={14} color={`${primaryColor}75`} className="animate-spin" />
          ) : (
            <Send size={14} color={value.trim() ? primaryColor : `${primaryColor}35`} />
          )}
        </button>
      </div>
    </div>
  );
}
