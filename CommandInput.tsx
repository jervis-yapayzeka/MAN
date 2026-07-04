import { useState } from 'react';
import { Monitor, Smartphone, Glasses, Navigation, Radio, Cpu, Activity, Battery, Clock, Wifi, RefreshCw, Link2, Unlink, CreditCard as Edit3, ChevronRight, Shield, Lock, AlertTriangle, CheckCircle2, Loader, Volume2 } from 'lucide-react';
import { useJarvis, DeviceStatus } from '../contexts/JarvisContext';

interface DeviceIconMap {
  pc: typeof Monitor;
  phone: typeof Smartphone;
  glass: typeof Glasses;
  drone: typeof Navigation;
}

const DEVICE_ICONS: DeviceIconMap = {
  pc: Monitor,
  phone: Smartphone,
  glass: Glasses,
  drone: Navigation,
};

interface FutureDevice {
  id: string;
  name: string;
  nameKey: string;
  type: string;
  typeKey: string;
  icon: typeof Monitor;
  description: string;
  descKey: string;
  eta: string;
}

const FUTURE_DEVICES: FutureDevice[] = [
  {
    id: 'glass-v2',
    name: 'Jarvis Glass v2',
    nameKey: 'glassV2',
    type: 'Nöral AR Ekran',
    typeKey: 'neuralAR',
    icon: Glasses,
    description: 'Doğrudan nöral arayüz entegrasyonu ile yeni nesil AR deneyimi',
    descKey: 'neuralARDesc',
    eta: '2026 Q4',
  },
  {
    id: 'flipper',
    name: 'Flipper Zero',
    nameKey: 'flipperZero',
    type: 'Çok Amaçlı RF Araç',
    typeKey: 'rfTool',
    icon: Radio,
    description: 'Çoklu protokol siber güvenlik ve RF sinyal analiz cihazı',
    descKey: 'rfToolDesc',
    eta: '2026 Q3',
  },
  {
    id: 'neural',
    name: 'Nöral Bağlantı',
    nameKey: 'neuralLink',
    type: 'BCI Arayüzü',
    typeKey: 'bciInterface',
    icon: Cpu,
    description: 'Doğrudan nöral sinyal okuma ve Jarvis entegrasyonu',
    descKey: 'bciDesc',
    eta: '2027 Q1',
  },
];

const STATUS_CONFIG: Record<DeviceStatus, { labelKey: string; color: string; glow: string; dim: string }> = {
  online:  { labelKey: 'online', color: '#00ff88', glow: 'rgba(0,255,136,0.5)',  dim: 'rgba(0,255,136,0.12)' },
  standby: { labelKey: 'standby', color: '#ffaa00', glow: 'rgba(255,170,0,0.5)',   dim: 'rgba(255,170,0,0.1)'  },
  offline: { labelKey: 'offline', color: '#ff4444', glow: 'rgba(255,68,68,0.4)',   dim: 'rgba(255,68,68,0.08)' },
  idle:    { labelKey: 'deviceIdle', color: '#888888', glow: 'rgba(136,136,136,0.4)', dim: 'rgba(136,136,136,0.1)' },
};

// Corner bracket decorator
function Brackets({ children, color = 'rgba(0,212,255,0.4)' }: { children: React.ReactNode; color?: string }) {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 w-3 h-3" style={{ borderTop: `1px solid ${color}`, borderLeft: `1px solid ${color}` }} />
      <div className="absolute top-0 right-0 w-3 h-3" style={{ borderTop: `1px solid ${color}`, borderRight: `1px solid ${color}` }} />
      <div className="absolute bottom-0 left-0 w-3 h-3" style={{ borderBottom: `1px solid ${color}`, borderLeft: `1px solid ${color}` }} />
      <div className="absolute bottom-0 right-0 w-3 h-3" style={{ borderBottom: `1px solid ${color}`, borderRight: `1px solid ${color}` }} />
      {children}
    </div>
  );
}

// Health bar
function HealthBar({ value, color, primaryColor }: { value: number; color: string; primaryColor: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 rounded-full overflow-hidden" style={{ height: 3, background: `${primaryColor}08` }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${value}%`,
            background: `linear-gradient(to right, ${color}80, ${color})`,
            boxShadow: `0 0 6px ${color}`,
          }}
        />
      </div>
      <span className="font-orbitron flex-shrink-0" style={{ fontSize: 9, color: `${primaryColor}70` }}>
        %{value}
      </span>
    </div>
  );
}

interface DeviceCardProps {
  device: {
    id: string;
    name: string;
    customName?: string;
    type: string;
    status: DeviceStatus;
    version: string;
    os: string;
    ip: string;
    lastActivity: string;
    health: number;
    battery?: number;
    description: string;
    signal?: number;
    volume: number;
  };
  isSelected: boolean;
  onSelect: () => void;
  t: (key: string) => string;
  primaryColor: string;
  textPrimary: string;
  bgSecondary: string;
}

function DeviceCard({ device, isSelected, onSelect, t, primaryColor, textPrimary, bgSecondary }: DeviceCardProps) {
  const sc = STATUS_CONFIG[device.status];
  const Icon = DEVICE_ICONS[device.id as keyof DeviceIconMap] || Monitor;
  const displayName = device.customName || device.name;
  const isIdle = device.status === 'idle';

  return (
    <button
      onClick={onSelect}
      className="w-full text-left transition-all duration-300 group"
      style={{ outline: 'none', opacity: isIdle ? 0.6 : 1 }}
    >
      <div
        className="relative rounded overflow-hidden"
        style={{
          background: isSelected
            ? `${primaryColor}08`
            : bgSecondary,
          border: isSelected
            ? `1px solid ${primaryColor}45`
            : `1px solid ${primaryColor}15`,
          boxShadow: isSelected
            ? `0 0 25px ${primaryColor}20, inset 0 0 15px ${primaryColor}05`
            : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Status color stripe on left */}
        <div
          className="absolute left-0 top-0 bottom-0"
          style={{
            width: 3,
            background: `linear-gradient(to bottom, transparent, ${sc.color}, transparent)`,
            boxShadow: `0 0 8px ${sc.glow}`,
          }}
        />

        {/* Card content */}
        <div className="pl-5 pr-4 py-4">
          {/* Top row */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              {/* Icon box */}
              <div
                className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0 transition-all duration-300"
                style={{
                  background: sc.dim,
                  border: `1px solid ${sc.color}35`,
                  boxShadow: isSelected ? `0 0 14px ${sc.glow}` : 'none',
                }}
              >
                <Icon size={18} color={sc.color} />
              </div>

              <div>
                <p
                  className="font-rajdhani font-semibold leading-none"
                  style={{ fontSize: 15, color: textPrimary }}
                >
                  {displayName}
                </p>
                <p
                  className="font-rajdhani leading-none mt-0.5"
                  style={{ fontSize: 10, color: `${primaryColor}55`, letterSpacing: '0.06em' }}
                >
                  {device.type}
                </p>
              </div>
            </div>

            {/* Status badge */}
            <div
              className="flex items-center gap-1.5 rounded-full px-2 py-1 flex-shrink-0"
              style={{ background: sc.dim, border: `1px solid ${sc.color}45` }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: sc.color,
                  boxShadow: `0 0 5px ${sc.glow}`,
                  animation: device.status === 'online' ? 'breathe 2s ease-in-out infinite' : 'none'
                }}
              />
              <span className="font-orbitron" style={{ fontSize: 7, color: sc.color, letterSpacing: '0.1em' }}>
                {t(sc.labelKey)}
              </span>
            </div>
          </div>

          {/* Description */}
          <p
            className="font-rajdhani mb-3"
            style={{ fontSize: 11, color: `${primaryColor}45`, lineHeight: 1.4 }}
          >
            {device.description}
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1">
              <Wifi size={9} color={`${primaryColor}55`} />
              <span className="font-rajdhani" style={{ fontSize: 10, color: `${primaryColor}65` }}>
                {device.ip}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={9} color={`${primaryColor}55`} />
              <span className="font-rajdhani" style={{ fontSize: 10, color: `${primaryColor}65` }}>
                {device.lastActivity}
              </span>
            </div>
            {device.battery !== undefined && device.battery > 0 && (
              <div className="flex items-center gap-1">
                <Battery size={9} color={device.battery < 20 ? '#ff4444' : `${primaryColor}55`} />
                <span className="font-rajdhani" style={{ fontSize: 10, color: device.battery < 20 ? 'rgba(255,68,68,0.7)' : `${primaryColor}65` }}>
                  %{device.battery}
                </span>
              </div>
            )}
          </div>

          {/* Health bar */}
          {device.health > 0 && (
            <div className="flex items-center gap-2 mb-1">
              <span className="font-orbitron flex-shrink-0" style={{ fontSize: 7, color: `${primaryColor}45`, letterSpacing: '0.1em' }}>
                HEALTH
              </span>
              <HealthBar value={device.health} color={sc.color} primaryColor={primaryColor} />
            </div>
          )}
        </div>

        {/* Select prompt */}
        <div
          className="flex items-center justify-end gap-1 px-4 py-1.5"
          style={{ borderTop: `1px solid ${primaryColor}08` }}
        >
          <span className="font-rajdhani" style={{ fontSize: 9, color: isSelected ? `${primaryColor}85` : `${primaryColor}35`, transition: 'color 0.2s ease' }}>
            {isSelected ? 'SELECTED' : 'Details'}
          </span>
          <ChevronRight size={10} color={isSelected ? `${primaryColor}85` : `${primaryColor}35`} />
        </div>
      </div>
    </button>
  );
}

function FutureDeviceCard({ device, primaryColor }: { device: FutureDevice; primaryColor: string }) {
  const Icon = device.icon;

  return (
    <div
      className="relative rounded overflow-hidden"
      style={{
        background: 'rgba(4,20,36,0.4)',
        border: `1px solid ${primaryColor}10`,
        transition: 'border-color 0.3s ease',
      }}
    >
      {/* Dim left stripe */}
      <div
        className="absolute left-0 top-0 bottom-0"
        style={{ width: 2, background: `linear-gradient(to bottom, transparent, ${primaryColor}35, transparent)` }}
      />

      {/* YAKINDA badge */}
      <div
        className="absolute top-3 right-3 flex items-center gap-1 rounded-full px-2 py-0.5"
        style={{ background: `${primaryColor}08`, border: `1px solid ${primaryColor}30` }}
      >
        <Lock size={7} color={`${primaryColor}65`} />
        <span className="font-orbitron" style={{ fontSize: 7, color: `${primaryColor}65`, letterSpacing: '0.1em' }}>
          COMING
        </span>
      </div>

      <div className="pl-5 pr-4 py-4">
        {/* Icon + name */}
        <div
          className="w-10 h-10 rounded flex items-center justify-center mb-3"
          style={{
            background: `${primaryColor}08`,
            border: `1px solid ${primaryColor}18`,
          }}
        >
          <Icon size={18} color={`${primaryColor}45`} />
        </div>

        <p className="font-rajdhani font-semibold leading-none mb-1" style={{ fontSize: 14, color: 'rgba(224,250,255,0.55)' }}>
          {device.name}
        </p>
        <p className="font-rajdhani leading-none mb-2" style={{ fontSize: 9, color: `${primaryColor}35`, letterSpacing: '0.06em' }}>
          {device.type}
        </p>

        <p className="font-rajdhani mb-3" style={{ fontSize: 10, color: `${primaryColor}35`, lineHeight: 1.45 }}>
          {device.description}
        </p>

        <div className="flex items-center gap-1.5">
          <div className="w-1 h-1 rounded-full" style={{ background: `${primaryColor}40` }} />
          <span className="font-orbitron" style={{ fontSize: 8, color: `${primaryColor}45`, letterSpacing: '0.1em' }}>
            ETA: {device.eta}
          </span>
        </div>
      </div>
    </div>
  );
}

// Rename Modal
function RenameModal({ device, onClose, onRename, primaryColor, t }: { device: any; onClose: () => void; onRename: (name: string) => void; primaryColor: string; t: (key: string) => string }) {
  const [name, setName] = useState(device.customName || device.name);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.75)' }}>
      <div
        className="rounded overflow-hidden"
        style={{
          width: 340,
          background: 'rgba(10,20,30,0.95)',
          border: `1px solid ${primaryColor}30`,
          boxShadow: `0 0 30px ${primaryColor}20`,
        }}
      >
        <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${primaryColor}15` }}>
          <span className="font-orbitron" style={{ fontSize: 10, color: `${primaryColor}80`, letterSpacing: '0.15em' }}>
            {t('renameDevice')}
          </span>
          <button onClick={onClose} style={{ color: `${primaryColor}40`, fontSize: 12 }}>✕</button>
        </div>
        <div className="px-4 py-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded px-3 py-2 outline-none"
            style={{
              background: `${primaryColor}08`,
              border: `1px solid ${primaryColor}25`,
              color: 'rgba(224,250,255,0.9)',
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: 14,
            }}
            placeholder={t('renameDeviceDesc')}
          />
        </div>
        <div className="flex justify-end gap-2 px-4 py-3" style={{ borderTop: `1px solid ${primaryColor}12` }}>
          <button
            onClick={onClose}
            className="font-rajdhani px-4 py-2 rounded"
            style={{ background: `${primaryColor}08`, border: `1px solid ${primaryColor}20`, color: `${primaryColor}60`, fontSize: 12 }}
          >
            {t('cancelLabel') || 'Cancel'}
          </button>
          <button
            onClick={() => { onRename(name); onClose(); }}
            className="font-rajdhani px-4 py-2 rounded"
            style={{ background: `${primaryColor}20`, border: `1px solid ${primaryColor}40`, color: `${primaryColor}CC`, fontSize: 12 }}
          >
            {t('saveLabel') || 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

function DeviceDetail({ device, onClose, t, primaryColor, bgSecondary, textPrimary }: { device: any; onClose: () => void; t: (key: string) => string; primaryColor: string; bgSecondary: string; textPrimary: string }) {
  const sc = STATUS_CONFIG[device.status];
  const Icon = DEVICE_ICONS[device.id as keyof DeviceIconMap] || Monitor;
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const { connectDevice, removeDevice, syncDevice, diagnoseDevice, checkDeviceStatus, renameDevice, setDeviceVolume, getActionDelay } = useJarvis();

  const displayName = device.customName || device.name;

  const executeAction = async (label: string, actionFn: () => Promise<void> | void) => {
    setActiveAction(label);
    await actionFn();
    const delay = getActionDelay() * 0.5;
    setTimeout(() => setActiveAction(null), delay);
  };

  const handleDisconnect = () => executeAction(t('disconnect'), () => { removeDevice(device.id); onClose(); });

  const actions = device.status === 'online' ? [
    { icon: Unlink, label: t('disconnect'), danger: true, action: handleDisconnect },
    { icon: RefreshCw, label: t('sync'), danger: false, action: () => executeAction(t('sync'), () => syncDevice(device.id)) },
    { icon: Edit3, label: t('rename'), danger: false, action: () => setShowRenameModal(true) },
    { icon: Activity, label: t('statusCheck'), danger: false, action: () => executeAction(t('statusCheck'), () => checkDeviceStatus(device.id)) },
  ] : device.status === 'idle' ? [
    { icon: RefreshCw, label: t('activate'), danger: false, action: () => executeAction(t('activate'), () => connectDevice(device.id)) },
    { icon: Unlink, label: t('disconnect'), danger: true, action: handleDisconnect },
    { icon: Edit3, label: t('rename'), danger: false, action: () => setShowRenameModal(true) },
    { icon: Activity, label: t('statusCheck'), danger: false, action: () => executeAction(t('statusCheck'), () => checkDeviceStatus(device.id)) },
  ] : device.status === 'standby' ? [
    { icon: Link2, label: t('activate'), danger: false, action: () => executeAction(t('activate'), () => connectDevice(device.id)) },
    { icon: RefreshCw, label: t('sync'), danger: false, action: () => executeAction(t('sync'), () => syncDevice(device.id)) },
    { icon: Edit3, label: t('rename'), danger: false, action: () => setShowRenameModal(true) },
    { icon: Activity, label: t('statusCheck'), danger: false, action: () => executeAction(t('statusCheck'), () => checkDeviceStatus(device.id)) },
  ] : [
    { icon: Link2, label: t('connect'), danger: false, action: () => executeAction(t('connect'), () => connectDevice(device.id)) },
    { icon: Activity, label: t('statusCheck'), danger: false, action: () => executeAction(t('statusCheck'), () => checkDeviceStatus(device.id)) },
    { icon: Edit3, label: t('rename'), danger: false, action: () => setShowRenameModal(true) },
    { icon: Shield, label: t('diagnose'), danger: false, action: () => executeAction(t('diagnose'), () => diagnoseDevice(device.id)) },
  ];

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div
        className="flex-shrink-0 px-4 py-4"
        style={{ borderBottom: `1px solid ${primaryColor}12` }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="font-orbitron" style={{ fontSize: 8, color: `${primaryColor}50`, letterSpacing: '0.2em' }}>
            DEVICE DETAIL
          </span>
          <button
            onClick={onClose}
            className="font-orbitron transition-colors duration-200"
            style={{ fontSize: 8, color: `${primaryColor}40`, letterSpacing: '0.1em' }}
          >
            ✕ CLOSE
          </button>
        </div>

        {/* Device header card */}
        <Brackets color={sc.color + '70'}>
          <div
            className="rounded px-3 py-3"
            style={{
              background: sc.dim,
              border: `1px solid ${sc.color}30`,
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0"
                style={{
                  background: sc.dim,
                  border: `1px solid ${sc.color}45`,
                  boxShadow: `0 0 14px ${sc.glow}`,
                }}
              >
                <Icon size={16} color={sc.color} />
              </div>
              <div>
                <p className="font-rajdhani font-semibold leading-none" style={{ fontSize: 13, color: textPrimary }}>
                  {displayName}
                </p>
                <p className="font-rajdhani" style={{ fontSize: 9, color: `${primaryColor}55`, letterSpacing: '0.06em' }}>
                  {device.type}
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: sc.color, boxShadow: `0 0 6px ${sc.glow}`, animation: 'breathe 2s ease-in-out infinite' }}
              />
              <span className="font-orbitron" style={{ fontSize: 8, color: sc.color, letterSpacing: '0.12em' }}>
                {t(sc.labelKey)}
              </span>
            </div>
          </div>
        </Brackets>
      </div>

      {/* Info grid */}
      <div className="flex-shrink-0 px-4 py-3" style={{ borderBottom: `1px solid ${primaryColor}10` }}>
        <span className="font-orbitron" style={{ fontSize: 7, color: `${primaryColor}40`, letterSpacing: '0.2em' }}>
          SYSTEM INFO
        </span>
        <div className="flex flex-col gap-2 mt-2">
          {[
            { label: 'VERSION', value: device.version },
            { label: 'OS', value: device.os },
            { label: 'IP', value: device.ip },
            { label: 'LAST ACTIVITY', value: device.lastActivity },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-start justify-between gap-2">
              <span className="font-rajdhani flex-shrink-0" style={{ fontSize: 9, color: `${primaryColor}40`, letterSpacing: '0.08em' }}>
                {label}
              </span>
              <span className="font-rajdhani text-right" style={{ fontSize: 10, color: `${primaryColor}CC`, letterSpacing: '0.04em' }}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Metrics */}
      {device.health > 0 && (
        <div className="flex-shrink-0 px-4 py-3" style={{ borderBottom: `1px solid ${primaryColor}10` }}>
          <span className="font-orbitron" style={{ fontSize: 7, color: `${primaryColor}35`, letterSpacing: '0.2em' }}>
            CONNECTION METRICS
          </span>
          <div className="flex flex-col gap-2.5 mt-2">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-rajdhani" style={{ fontSize: 9, color: `${primaryColor}45` }}>Connection Health</span>
                <span className="font-orbitron" style={{ fontSize: 8, color: sc.color }}>%{device.health}</span>
              </div>
              <HealthBar value={device.health} color={sc.color} primaryColor={primaryColor} />
            </div>

            {device.battery !== undefined && device.battery > 0 && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-rajdhani" style={{ fontSize: 9, color: `${primaryColor}45` }}>Battery</span>
                  <span className="font-orbitron" style={{ fontSize: 8, color: device.battery < 20 ? '#ff4444' : `${primaryColor}CC` }}>
                    %{device.battery}
                  </span>
                </div>
                <HealthBar value={device.battery} color={device.battery < 20 ? '#ff4444' : primaryColor} primaryColor={primaryColor} />
              </div>
            )}

            {device.signal !== undefined && device.signal > 0 && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-rajdhani" style={{ fontSize: 9, color: `${primaryColor}45` }}>Signal Strength</span>
                  <span className="font-orbitron" style={{ fontSize: 8, color: `${primaryColor}CC` }}>%{device.signal}</span>
                </div>
                <HealthBar value={device.signal} color={primaryColor} primaryColor={primaryColor} />
              </div>
            )}

            {/* Volume control */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-rajdhani flex items-center gap-1" style={{ fontSize: 9, color: `${primaryColor}45` }}>
                  <Volume2 size={9} color={`${primaryColor}55`} />
                  Volume
                </span>
                <span className="font-orbitron" style={{ fontSize: 8, color: `${primaryColor}CC` }}>%{device.volume}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={device.volume}
                onChange={(e) => setDeviceVolume(device.id, parseInt(e.target.value))}
                className="w-full h-1 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${primaryColor}60 ${device.volume}%, ${primaryColor}15 ${device.volume}%)`,
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex-shrink-0 px-4 py-3">
        <span className="font-orbitron" style={{ fontSize: 7, color: `${primaryColor}35`, letterSpacing: '0.2em' }}>
          DEVICE ACTIONS
        </span>
        <div className="flex flex-col gap-1.5 mt-2">
          {actions.map(({ icon: ActionIcon, label, danger }) => {
            const isActive = activeAction === label;
            return (
              <button
                key={label}
                onClick={() => !activeAction && actions.find(a => a.label === label)?.action()}
                disabled={activeAction !== null}
                className="flex items-center gap-2.5 rounded px-3 py-2 transition-all duration-300 w-full"
                style={{
                  background: isActive
                    ? (danger ? 'rgba(255,68,68,0.15)' : `${primaryColor}18`)
                    : `${primaryColor}06`,
                  border: isActive
                    ? (danger ? '1px solid rgba(255,68,68,0.50)' : `1px solid ${primaryColor}50`)
                    : (danger ? '1px solid rgba(255,68,68,0.15)' : `1px solid ${primaryColor}12`),
                  boxShadow: isActive
                    ? (danger ? '0 0 18px rgba(255,68,68,0.30)' : `0 0 18px ${primaryColor}30`)
                    : 'none',
                  opacity: activeAction && !isActive ? 0.5 : 1,
                  cursor: activeAction ? 'wait' : 'pointer',
                }}
              >
                {isActive ? (
                  <Loader size={12} color={danger ? '#ff4444' : primaryColor} className="animate-spin" />
                ) : (
                  <ActionIcon
                    size={12}
                    color={danger ? 'rgba(255,68,68,0.60)' : `${primaryColor}60`}
                  />
                )}
                <span
                  className="font-rajdhani font-medium"
                  style={{
                    fontSize: 11,
                    color: danger
                      ? (isActive ? 'rgba(255,68,68,0.95)' : 'rgba(255,68,68,0.70)')
                      : (isActive ? `${primaryColor}DD` : `${primaryColor}80`),
                    letterSpacing: '0.03em',
                  }}
                >
                  {isActive ? (danger ? t('disconnect') + '...' : t('syncing')) : label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Rename Modal */}
      {showRenameModal && (
        <RenameModal
          device={device}
          onClose={() => setShowRenameModal(false)}
          onRename={(name) => renameDevice(device.id, name)}
          primaryColor={primaryColor}
          t={t}
        />
      )}
    </div>
  );
}

function EmptyDetail({ t, primaryColor }: { t: (key: string) => string; primaryColor: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center gap-4">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{
          background: `${primaryColor}08`,
          border: `1px solid ${primaryColor}25`,
        }}
      >
        <Cpu size={18} color={`${primaryColor}45`} />
      </div>
      <div>
        <p className="font-rajdhani font-semibold" style={{ fontSize: 13, color: `${primaryColor}65` }}>
          {t('selectDevice')}
        </p>
        <p className="font-rajdhani mt-1" style={{ fontSize: 10, color: `${primaryColor}35`, lineHeight: 1.5 }}>
          {t('selectDeviceDesc')}
        </p>
      </div>
      {/* Decorative scan lines */}
      <div className="flex flex-col gap-2 w-full" style={{ opacity: 0.3 }}>
        {[40, 65, 30, 55].map((w, i) => (
          <div key={i} className="h-px" style={{ width: `${w}%`, background: `${primaryColor}60`, margin: '0 auto' }} />
        ))}
      </div>
    </div>
  );
}

export default function DevicesPage() {
  const { t, devices, theme, themeColors, selectedDeviceId, setSelectedDeviceId } = useJarvis();
  const selected = devices.find((d) => d.id === selectedDeviceId) ?? null;

  const onlineCount = devices.filter((d) => d.status === 'online').length;
  const standbyCount = devices.filter((d) => d.status === 'standby').length;
  const offlineCount = devices.filter((d) => d.status === 'offline').length;
  const idleCount = devices.filter((d) => d.status === 'idle').length;

  const primaryColor = themeColors.primary;
  const bgSecondary = themeColors.bgSecondary;
  const textPrimary = themeColors.text;

  const bgPanel = theme === 'hacker' ? 'rgba(10,20,10,0.75)' : 'rgba(1,8,16,0.65)';

  return (
    <div className="flex flex-1 overflow-hidden min-h-0">

      {/* ── Center: device grid ── */}
      <div className="flex-1 overflow-y-auto min-w-0" style={{ padding: '24px 28px 24px 28px' }}>

        {/* Page header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div style={{ width: 16, height: 1, background: `${primaryColor}55`, transition: 'background 0.3s ease' }} />
              <span className="font-orbitron" style={{ fontSize: 8, color: `${primaryColor}55`, letterSpacing: '0.25em', transition: 'color 0.3s ease' }}>
                // {t('deviceManagement')}
              </span>
            </div>
            <h1 className="font-orbitron font-bold" style={{ fontSize: 22, color: textPrimary, letterSpacing: '0.08em', transition: 'color 0.4s ease' }}>
              {t('devicesTitle')}
            </h1>
          </div>

          {/* Summary badges */}
          <div className="flex items-center gap-2">
            {[
              { count: onlineCount, label: t('online'), color: '#00ff88' },
              { count: idleCount, label: t('deviceIdle'), color: '#888888' },
              { count: standbyCount, label: t('standby'), color: '#ffaa00' },
              { count: offlineCount, label: t('offline'), color: '#ff4444' },
            ].filter(b => b.count > 0).map(({ count, label, color }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 rounded-full px-2.5 py-1"
                style={{ background: `${color}12`, border: `1px solid ${color}35` }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 5px ${color}` }} />
                <span className="font-rajdhani" style={{ fontSize: 10, color: `${color}DD` }}>
                  {count} {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Active */}
        <div className="mb-2">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 size={10} color={`${primaryColor}65`} />
            <span className="font-orbitron" style={{ fontSize: 8, color: `${primaryColor}55`, letterSpacing: '0.2em', transition: 'color 0.3s ease' }}>
              {t('activeDevices')}
            </span>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${primaryColor}18, transparent)`, transition: 'background 0.3s ease' }} />
          </div>

          <div className="grid gap-3" style={{ gridTemplateColumns: '1fr 1fr' }}>
            {devices.map((device) => (
              <DeviceCard
                key={device.id}
                device={device}
                isSelected={selectedDeviceId === device.id}
                onSelect={() => setSelectedDeviceId(selectedDeviceId === device.id ? null : device.id)}
                t={t}
                primaryColor={primaryColor}
                textPrimary={textPrimary}
                bgSecondary={bgSecondary}
              />
            ))}
          </div>
        </div>

        {/* Section: Coming Soon */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={10} color={`${primaryColor}50`} />
            <span className="font-orbitron" style={{ fontSize: 8, color: `${primaryColor}50`, letterSpacing: '0.2em', transition: 'color 0.3s ease' }}>
              {t('comingSoon')}
            </span>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${primaryColor}12, transparent)`, transition: 'background 0.3s ease' }} />
          </div>

          <div className="grid gap-3" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
            {FUTURE_DEVICES.map((device) => (
              <FutureDeviceCard key={device.id} device={device} primaryColor={primaryColor} />
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <div style={{ height: 1, width: 40, background: `linear-gradient(to right, transparent, ${primaryColor}30)`, transition: 'background 0.3s ease' }} />
          <span className="font-orbitron" style={{ fontSize: 7, color: `${primaryColor}30`, letterSpacing: '0.15em', transition: 'color 0.3s ease' }}>
            JARVIS DEVICE NETWORK v6.1
          </span>
          <div style={{ height: 1, width: 40, background: `linear-gradient(to left, transparent, ${primaryColor}30)`, transition: 'background 0.3s ease' }} />
        </div>
      </div>

      {/* ── Right: detail panel ── */}
      <div
        className="flex-shrink-0"
        style={{
          width: 240,
          borderLeft: `1px solid ${primaryColor}12`,
          background: bgPanel,
          backdropFilter: 'blur(12px)',
          transition: 'border-color 0.3s ease, background 0.3s ease',
        }}
      >
        {selected ? (
          <DeviceDetail device={selected} onClose={() => setSelectedDeviceId(null)} t={t} primaryColor={primaryColor} bgSecondary={bgSecondary} textPrimary={textPrimary} />
        ) : (
          <EmptyDetail t={t} primaryColor={primaryColor} />
        )}
      </div>
    </div>
  );
}
