import { useState } from 'react';
import {
  Volume2, VolumeX, Bell, BellOff, Moon, Sun, Globe, Shield,
  Cpu, Zap, Eye, EyeOff, Terminal
} from 'lucide-react';
import { useJarvis, ThemeMode } from '../contexts/JarvisContext';

interface SettingToggleProps {
  label: string;
  description: string;
  value: boolean;
  onChange: (value: boolean) => void;
  icon: typeof Volume2;
  primaryColor: string;
  bgSecondary: string;
  textPrimary: string;
}

function SettingToggle({ label, description, value, onChange, icon: Icon, primaryColor, bgSecondary, textPrimary }: SettingToggleProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [flash, setFlash] = useState(false);

  const handleChange = () => {
    const newValue = !value;
    onChange(newValue);
    setFlash(true);
    setTimeout(() => setFlash(false), 300);
  };

  return (
    <div
      className="relative rounded overflow-hidden transition-all duration-300"
      style={{
        background: flash
          ? `${primaryColor}15`
          : isHovered
            ? `${primaryColor}08`
            : bgSecondary,
        border: flash
          ? `1px solid ${primaryColor}50`
          : `1px solid ${isHovered ? `${primaryColor}30` : `${primaryColor}15`}`,
        boxShadow: flash ? `0 0 20px ${primaryColor}30` : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0 transition-all duration-300"
            style={{
              background: value ? `${primaryColor}18` : `${primaryColor}08`,
              border: value ? `1px solid ${primaryColor}45` : `1px solid ${primaryColor}20`,
              boxShadow: value ? `0 0 10px ${primaryColor}35` : 'none',
            }}
          >
            <Icon size={14} color={value ? primaryColor : `${primaryColor}60`} />
          </div>
          <div>
            <p className="font-rajdhani font-semibold" style={{ fontSize: 13, color: textPrimary }}>
              {label}
            </p>
            <p className="font-rajdhani" style={{ fontSize: 10, color: `${primaryColor}50` }}>
              {description}
            </p>
          </div>
        </div>

        {/* Toggle */}
        <button
          onClick={handleChange}
          className="relative flex-shrink-0 rounded-full transition-all duration-300"
          style={{
            width: 44,
            height: 24,
            background: value ? `${primaryColor}30` : `${primaryColor}10`,
            border: `1px solid ${value ? `${primaryColor}60` : `${primaryColor}25`}`,
            boxShadow: value ? `0 0 12px ${primaryColor}50` : 'none',
          }}
        >
          <div
            className="absolute top-0.5 rounded-full transition-all duration-300"
            style={{
              width: 18,
              height: 18,
              left: value ? 24 : 2,
              background: value ? primaryColor : `${primaryColor}50`,
              boxShadow: value ? `0 0 8px ${primaryColor}90` : 'none',
            }}
          />
        </button>
      </div>
    </div>
  );
}

interface SettingSelectProps {
  label: string;
  description: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  icon: typeof Globe;
  primaryColor: string;
  bgSecondary: string;
  bgPrimary: string;
}

function SettingSelect({ label, description, value, options, onChange, icon: Icon, primaryColor, bgSecondary, bgPrimary }: SettingSelectProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [flash, setFlash] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
    setFlash(true);
    setTimeout(() => setFlash(false), 300);
  };

  return (
    <div
      className="relative rounded overflow-hidden transition-all duration-300"
      style={{
        background: flash
          ? `${primaryColor}15`
          : isHovered
            ? `${primaryColor}08`
            : bgSecondary,
        border: flash
          ? `1px solid ${primaryColor}50`
          : `1px solid ${isHovered ? `${primaryColor}30` : `${primaryColor}15`}`,
        boxShadow: flash ? `0 0 20px ${primaryColor}30` : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
            style={{
              background: `${primaryColor}08`,
              border: `1px solid ${primaryColor}20`,
            }}
          >
            <Icon size={14} color={`${primaryColor}70`} />
          </div>
          <div>
            <p className="font-rajdhani font-semibold" style={{ fontSize: 13, color: 'rgba(224,250,255,0.9)' }}>
              {label}
            </p>
            <p className="font-rajdhani" style={{ fontSize: 10, color: `${primaryColor}50` }}>
              {description}
            </p>
          </div>
        </div>

        <select
          value={value}
          onChange={handleChange}
          className="rounded px-3 py-1.5 outline-none cursor-pointer transition-all duration-200"
          style={{
            background: `${primaryColor}12`,
            border: `1px solid ${primaryColor}30`,
            color: primaryColor,
            fontFamily: 'Orbitron, monospace',
            fontSize: 10,
            letterSpacing: '0.05em',
          }}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} style={{ background: bgPrimary }}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

interface ThemeCardProps {
  themeMode: ThemeMode;
  label: string;
  description: string;
  icon: typeof Moon;
  isSelected: boolean;
  onClick: () => void;
  primaryColor: string;
  previewColor: string;
}

function ThemeCard({ themeMode, label, description, icon: Icon, isSelected, onClick, primaryColor, previewColor }: ThemeCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      className="relative rounded overflow-hidden text-left transition-all duration-300 w-full"
      style={{
        background: isSelected ? `${primaryColor}12` : isHovered ? `${primaryColor}06` : 'rgba(4,20,36,0.4)',
        border: isSelected ? `1px solid ${primaryColor}50` : `1px solid ${isHovered ? `${primaryColor}25` : `${primaryColor}10`}`,
        boxShadow: isSelected ? `0 0 20px ${primaryColor}25` : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          {/* Preview circle */}
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${previewColor}20, ${previewColor}08)`,
              border: `1px solid ${previewColor}40`,
              boxShadow: isSelected ? `0 0 12px ${previewColor}40` : 'none',
            }}
          >
            <Icon size={18} color={previewColor} />
          </div>
          <div className="flex-1">
            <p className="font-rajdhani font-semibold" style={{ fontSize: 13, color: 'rgba(224,250,255,0.9)' }}>
              {label}
            </p>
            <p className="font-rajdhani" style={{ fontSize: 10, color: `${primaryColor}45` }}>
              {description}
            </p>
          </div>
          {/* Selected indicator */}
          {isSelected && (
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{
                background: `${primaryColor}20`,
                border: `1px solid ${primaryColor}60`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: primaryColor,
                  boxShadow: `0 0 6px ${primaryColor}`,
                }}
              />
            </div>
          )}
        </div>

        {/* Mini preview bar */}
        <div className="flex items-center gap-2">
          <div
            className="h-1.5 rounded-full flex-1"
            style={{ background: `${previewColor}30` }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${themeMode === 'dark' ? 70 : themeMode === 'light' ? 60 : 80}%`,
                background: `linear-gradient(to right, ${previewColor}60, ${previewColor})`,
              }}
            />
          </div>
        </div>
      </div>
    </button>
  );
}

function SectionHeader({ title, subtitle, primaryColor }: { title: string; subtitle: string; primaryColor: string }) {
  return (
    <div className="flex items-center gap-2 mb-3 mt-6 first:mt-0">
      <div style={{ width: 12, height: 1, background: `${primaryColor}50`, transition: 'background 0.3s ease' }} />
      <div>
        <p className="font-orbitron" style={{ fontSize: 9, color: `${primaryColor}80`, letterSpacing: '0.15em', transition: 'color 0.3s ease' }}>
          {title}
        </p>
        <p className="font-rajdhani" style={{ fontSize: 9, color: `${primaryColor}35`, transition: 'color 0.3s ease' }}>
          {subtitle}
        </p>
      </div>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${primaryColor}15, transparent)`, transition: 'background 0.3s ease' }} />
    </div>
  );
}

export default function SettingsPage() {
  const {
    settings,
    updateSetting,
    t,
    theme,
    setTheme,
    language,
    setLanguage,
    themeColors,
  } = useJarvis();

  const primaryColor = themeColors.primary;
  const bgSecondary = themeColors.bgSecondary;
  const bgPrimary = themeColors.bg;
  const textPrimary = themeColors.text;

  const themes: { mode: ThemeMode; label: string; description: string; icon: typeof Moon; previewColor: string }[] = [
    { mode: 'dark', label: t('darkTheme'), description: t('darkThemeDesc'), icon: Moon, previewColor: '#00d4ff' },
    { mode: 'light', label: t('lightTheme'), description: t('lightThemeDesc'), icon: Sun, previewColor: '#0088cc' },
    { mode: 'hacker', label: t('hackerTheme'), description: t('hackerThemeDesc'), icon: Terminal, previewColor: '#00ff88' },
  ];

  return (
    <div className="flex-1 overflow-hidden flex min-h-0">
      {/* Main content */}
      <div className="flex-1 overflow-y-auto" style={{ padding: '24px 28px' }}>
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <div style={{ width: 16, height: 1, background: `${primaryColor}50`, transition: 'background 0.3s ease' }} />
            <span className="font-orbitron" style={{ fontSize: 8, color: `${primaryColor}55`, letterSpacing: '0.25em', transition: 'color 0.3s ease' }}>
              // {t('systemConfig')}
            </span>
          </div>
          <h1 className="font-orbitron font-bold" style={{ fontSize: 22, color: textPrimary, letterSpacing: '0.08em', transition: 'color 0.4s ease' }}>
            {t('settingsTitle')}
          </h1>
        </div>

        {/* System Status */}
        <div
          className="relative rounded overflow-hidden mb-4 transition-all duration-300"
          style={{
            background: `${primaryColor}08`,
            border: `1px solid ${primaryColor}25`,
            boxShadow: `0 0 15px ${primaryColor}15`,
          }}
        >
          <div className="flex items-center gap-3 px-4 py-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: `radial-gradient(circle at 38% 35%, ${primaryColor}60 0%, ${primaryColor}30 40%, ${primaryColor}90 100%)`,
                boxShadow: `0 0 18px ${primaryColor}70`,
              }}
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-orbitron font-bold" style={{ fontSize: 12, color: primaryColor, letterSpacing: '0.1em', transition: 'color 0.3s ease' }}>
                  JARVIS AI OS
                </span>
                <span
                  className="font-rajdhani rounded px-2 py-0.5"
                  style={{ fontSize: 8, background: 'rgba(0,255,136,0.15)', color: 'rgba(0,255,136,0.85)', letterSpacing: '0.1em' }}
                >
                  v0.1
                </span>
              </div>
              <p className="font-rajdhani mt-0.5" style={{ fontSize: 10, color: `${primaryColor}50`, transition: 'color 0.3s ease' }}>
                {t('systemsOptimal')}
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: '#00ff88',
                  boxShadow: '0 0 8px #00ff88',
                  animation: 'breathe 2s ease-in-out infinite'
                }}
              />
              <span className="font-orbitron" style={{ fontSize: 8, color: 'rgba(0,255,136,0.75)', letterSpacing: '0.1em' }}>
                {t('active')}
              </span>
            </div>
          </div>
        </div>

        {/* Audio Settings */}
        <SectionHeader title={t('audioReaction')} subtitle={t('audioReactionDesc')} primaryColor={primaryColor} />
        <div className="flex flex-col gap-2">
          <SettingToggle
            label={t('voiceCommand')}
            description={t('voiceCommandDesc')}
            value={settings.voiceEnabled}
            onChange={(v) => updateSetting('voiceEnabled', v)}
            icon={settings.voiceEnabled ? Volume2 : VolumeX}
            primaryColor={primaryColor}
            bgSecondary={bgSecondary}
            textPrimary={textPrimary}
          />
          <SettingToggle
            label={t('soundEffects')}
            description={t('soundEffectsDesc')}
            value={settings.soundEffects}
            onChange={(v) => updateSetting('soundEffects', v)}
            icon={Zap}
            primaryColor={primaryColor}
            bgSecondary={bgSecondary}
            textPrimary={textPrimary}
          />
          <SettingToggle
            label={t('notifications')}
            description={t('notificationsDesc')}
            value={settings.notifications}
            onChange={(v) => updateSetting('notifications', v)}
            icon={settings.notifications ? Bell : BellOff}
            primaryColor={primaryColor}
            bgSecondary={bgSecondary}
            textPrimary={textPrimary}
          />
        </div>

        {/* Performance */}
        <SectionHeader title={t('performance')} subtitle={t('performanceDesc')} primaryColor={primaryColor} />
        <div className="flex flex-col gap-2">
          <SettingToggle
            label={t('highPerformance')}
            description={t('highPerformanceDesc')}
            value={settings.highPerformance}
            onChange={(v) => updateSetting('highPerformance', v)}
            icon={Cpu}
            primaryColor={primaryColor}
            bgSecondary={bgSecondary}
            textPrimary={textPrimary}
          />
          <SettingToggle
            label={t('autoUpdate')}
            description={t('autoUpdateDesc')}
            value={settings.autoUpdate}
            onChange={(v) => updateSetting('autoUpdate', v)}
            icon={Zap}
            primaryColor={primaryColor}
            bgSecondary={bgSecondary}
            textPrimary={textPrimary}
          />
        </div>

        {/* Language & Region */}
        <SectionHeader title={t('languageRegion')} subtitle={t('languageRegionDesc')} primaryColor={primaryColor} />
        <div className="flex flex-col gap-2">
          <SettingSelect
            label={t('language')}
            description={t('languageDesc')}
            value={language}
            options={[
              { value: 'tr', label: 'Türkçe' },
              { value: 'en', label: 'English' },
            ]}
            onChange={(v) => setLanguage(v as 'tr' | 'en')}
            icon={Globe}
            primaryColor={primaryColor}
            bgSecondary={bgSecondary}
            bgPrimary={bgPrimary}
          />
          <SettingSelect
            label={t('responseSpeed')}
            description={t('responseSpeedDesc')}
            value={settings.responseSpeed}
            options={[
              { value: 'fast', label: t('speedFast') },
              { value: 'normal', label: t('speedNormal') },
              { value: 'slow', label: t('speedSlow') },
            ]}
            onChange={(v) => updateSetting('responseSpeed', v as 'fast' | 'normal' | 'slow')}
            icon={Zap}
            primaryColor={primaryColor}
            bgSecondary={bgSecondary}
            bgPrimary={bgPrimary}
          />
        </div>

        {/* Theme Selection */}
        <SectionHeader title={t('theme')} subtitle={t('themeDesc')} primaryColor={primaryColor} />
        <div className="grid grid-cols-3 gap-3">
          {themes.map((themeOption) => (
            <ThemeCard
              key={themeOption.mode}
              themeMode={themeOption.mode}
              label={themeOption.label}
              description={themeOption.description}
              icon={themeOption.icon}
              isSelected={theme === themeOption.mode}
              onClick={() => setTheme(themeOption.mode)}
              primaryColor={primaryColor}
              previewColor={themeOption.previewColor}
            />
          ))}
        </div>

        {/* Privacy */}
        <SectionHeader title={t('privacy')} subtitle={t('privacyDesc')} primaryColor={primaryColor} />
        <div className="flex flex-col gap-2">
          <SettingSelect
            label={t('privacyMode')}
            description={t('privacyModeDesc')}
            value={settings.privacyMode}
            options={[
              { value: 'minimal', label: language === 'tr' ? 'Minimum' : 'Minimal' },
              { value: 'standard', label: language === 'tr' ? 'Standart' : 'Standard' },
              { value: 'enhanced', label: language === 'tr' ? 'Gelişmiş' : 'Enhanced' },
            ]}
            onChange={(v) => updateSetting('privacyMode', v as 'minimal' | 'standard' | 'enhanced')}
            icon={Shield}
            primaryColor={primaryColor}
            bgSecondary={bgSecondary}
            bgPrimary={bgPrimary}
          />
          <SettingToggle
            label={t('analytics')}
            description={t('analyticsDesc')}
            value={settings.analytics}
            onChange={(v) => updateSetting('analytics', v)}
            icon={settings.analytics ? Eye : EyeOff}
            primaryColor={primaryColor}
            bgSecondary={bgSecondary}
            textPrimary={textPrimary}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <div style={{ height: 1, width: 40, background: `linear-gradient(to right, transparent, ${primaryColor}30)`, transition: 'background 0.3s ease' }} />
          <span className="font-orbitron" style={{ fontSize: 7, color: `${primaryColor}30`, letterSpacing: '0.15em', transition: 'color 0.3s ease' }}>
            JARVIS AI OS v0.1 · STARK INDUSTRIES
          </span>
          <div style={{ height: 1, width: 40, background: `linear-gradient(to left, transparent, ${primaryColor}30)`, transition: 'background 0.3s ease' }} />
        </div>
      </div>
    </div>
  );
}
