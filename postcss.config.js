import { createContext, useContext, useState, useEffect, useCallback, ReactNode, useRef } from 'react';

// Translation strings
const TRANSLATIONS = {
  tr: {
    // Header
    systemOptimal: 'SİSTEM OPTİMAL',
    processing: 'İŞLENİYOR...',
    listening: 'DİNLİYORUM...',
    idle: 'BEKLEME MODU',

    // Hero
    readyMaster: 'Hazırım, Efendim.',
    waitingCommand: 'Komutunuzu bekliyorum...',
    analyzing: 'Analiz ediliyor, yanıt oluşturuluyor...',
    allSystemsActive: 'Tüm sistemler aktif. Hazırım.',

    // Navigation
    conversation: 'Sohbet',
    devices: 'Cihazlar',
    tasks: 'Görevler',
    settings: 'Ayarlar',

    // Devices
    devicesTitle: 'CİHAZLAR',
    deviceManagement: 'CİHAZ YÖNETİMİ',
    activeDevices: 'AKTİF CİHAZLAR',
    comingSoon: 'YOLDA — YAKINDA',
    online: 'ÇEVRİMİÇİ',
    standby: 'BEKLEME',
    offline: 'ÇEVRİMDIŞI',
    deviceIdle: 'BOŞTA',
    selectDevice: 'Cihaz Seçin',
    selectDeviceDesc: 'Detay ve işlemler için bir cihaz seçin',

    // Device actions
    disconnect: 'Bağlantıyı Kes',
    connect: 'Bağlan',
    activate: 'Etkinleştir',
    sync: 'Senkronize Et',
    rename: 'Yeniden Adlandır',
    renameDevice: 'Cihazı Yeniden Adlandır',
    renameDeviceDesc: 'Yeni ad girin',
    statusCheck: 'Durum Kontrol',
    diagnose: 'Tanıla',
    applied: '✓ Uygulandı',
    syncing: 'Senkronize ediliyor...',
    diagnosing: 'Tanılanıyor...',
    checking: 'Kontrol ediliyor...',

    // Voice commands
    voiceOpened: 'Ses açıldı efendim.',
    voiceClosed: 'Ses kapatıldı efendim.',
    commandExecuted: 'İsteğiniz yerine getirildi efendim.',
    deviceConnected: 'Cihaz bağlandı.',
    deviceDisconnected: 'Cihaz bağlantısı kesildi.',
    deviceIdleNotification: 'Cihaz bekleme moduna alındı.',

    // Settings
    settingsTitle: 'AYARLAR',
    systemConfig: 'SİSTEM YAPILANDIRMASI',
    audioReaction: 'SES & TEPKİ',
    audioReactionDesc: 'Sesli etkileşim ayarları',
    performance: 'PERFORMANS',
    performanceDesc: 'Sistem kaynak yönetimi',
    languageRegion: 'DİL & BÖLGE',
    languageRegionDesc: 'Yerelleştirme ayarları',
    theme: 'TEMA',
    themeDesc: 'Görsel ayarlar',
    privacy: 'GİZLİLİK',
    privacyDesc: 'Veri güvenliği ayarları',

    // Settings labels
    voiceCommand: 'Sesli Komut',
    voiceCommandDesc: 'Mikrofon ile sesli komut aktif',
    soundEffects: 'Ses Efektleri',
    soundEffectsDesc: 'Sistem sesleri ve uyarılar',
    notifications: 'Bildirimler',
    notificationsDesc: 'Anında bildirim al',
    highPerformance: 'Yüksek Performans',
    highPerformanceDesc: 'GPU hızlandırma aktif',
    autoUpdate: 'Otomatik Güncelleme',
    autoUpdateDesc: 'Sistem güncellemelerini otomatik uygula',
    language: 'Dil',
    languageDesc: 'Arayüz dili',
    responseSpeed: 'Yanıt Hızı',
    responseSpeedDesc: 'JARVIS yanıt gecikmesi',
    darkTheme: 'Karanlık Tema',
    lightTheme: 'Açık Tema',
    hackerTheme: 'Hacker Teması',
    darkThemeDesc: 'Klasik karanlık arayüz',
    lightThemeDesc: 'Açık, modern görünüm',
    hackerThemeDesc: 'Yeşil terminal stili',
    privacyMode: 'Gizlilik Modu',
    privacyModeDesc: 'Veri toplama seviyesi',
    analytics: 'Analitik',
    analyticsDesc: 'Kullanım istatistiklerini paylaş',

    // Speed options
    speedFast: 'Hızlı',
    speedNormal: 'Normal',
    speedSlow: 'Yavaş',

    // Tasks
    tasksTitle: 'GÖREVLER',
    taskManagement: 'GÖREV YÖNETİMİ',
    newTask: 'Yeni Görev',
    total: 'Toplam',
    waiting: 'Bekliyor',
    inProgress: 'Devam',
    completed: 'Tamam',

    // Misc
    live: 'CANLI',
    active: 'AKTİF',
    systemsOptimal: 'Tüm sistemler optimal çalışıyor',

    // Command input
    commandPlaceholder: "JARVIS'e bir şey sor...",
    listeningPlaceholder: 'Dinliyorum...',
    commandModes: 'SES · METİN · KOMUT',

    // Themes
    themeDark: 'Karanlık',
    themeLight: 'Açık',
    themeHacker: 'Hacker',
  },
  en: {
    // Header
    systemOptimal: 'SYSTEM OPTIMAL',
    processing: 'PROCESSING...',
    listening: 'LISTENING...',
    idle: 'IDLE MODE',

    // Hero
    readyMaster: "Ready, Sir.",
    waitingCommand: 'Waiting for your command...',
    analyzing: 'Analyzing, generating response...',
    allSystemsActive: 'All systems active. Ready.',

    // Navigation
    conversation: 'Chat',
    devices: 'Devices',
    tasks: 'Tasks',
    settings: 'Settings',

    // Devices
    devicesTitle: 'DEVICES',
    deviceManagement: 'DEVICE MANAGEMENT',
    activeDevices: 'ACTIVE DEVICES',
    comingSoon: 'COMING SOON',
    online: 'ONLINE',
    standby: 'STANDBY',
    offline: 'OFFLINE',
    deviceIdle: 'IDLE',
    selectDevice: 'Select Device',
    selectDeviceDesc: 'Select a device for details and actions',

    // Device actions
    disconnect: 'Disconnect',
    connect: 'Connect',
    activate: 'Activate',
    sync: 'Synchronize',
    rename: 'Rename',
    renameDevice: 'Rename Device',
    renameDeviceDesc: 'Enter new name',
    statusCheck: 'Status Check',
    diagnose: 'Diagnose',
    applied: '✓ Applied',
    syncing: 'Synchronizing...',
    diagnosing: 'Diagnosing...',
    checking: 'Checking...',

    // Voice commands
    voiceOpened: 'Voice opened, sir.',
    voiceClosed: 'Voice muted, sir.',
    commandExecuted: 'Your request has been fulfilled, sir.',
    deviceConnected: 'Device connected.',
    deviceDisconnected: 'Device disconnected.',
    deviceIdleNotification: 'Device has gone idle.',

    // Settings
    settingsTitle: 'SETTINGS',
    systemConfig: 'SYSTEM CONFIGURATION',
    audioReaction: 'AUDIO & RESPONSE',
    audioReactionDesc: 'Voice interaction settings',
    performance: 'PERFORMANCE',
    performanceDesc: 'System resource management',
    languageRegion: 'LANGUAGE & REGION',
    languageRegionDesc: 'Localization settings',
    theme: 'THEME',
    themeDesc: 'Visual settings',
    privacy: 'PRIVACY',
    privacyDesc: 'Data security settings',

    // Settings labels
    voiceCommand: 'Voice Command',
    voiceCommandDesc: 'Microphone voice command active',
    soundEffects: 'Sound Effects',
    soundEffectsDesc: 'System sounds and alerts',
    notifications: 'Notifications',
    notificationsDesc: 'Receive instant notifications',
    highPerformance: 'High Performance',
    highPerformanceDesc: 'GPU acceleration active',
    autoUpdate: 'Auto Update',
    autoUpdateDesc: 'Apply system updates automatically',
    language: 'Language',
    languageDesc: 'Interface language',
    responseSpeed: 'Response Speed',
    responseSpeedDesc: 'JARVIS response delay',
    darkTheme: 'Dark Theme',
    lightTheme: 'Light Theme',
    hackerTheme: 'Hacker Theme',
    darkThemeDesc: 'Classic dark interface',
    lightThemeDesc: 'Bright modern look',
    hackerThemeDesc: 'Green terminal style',
    privacyMode: 'Privacy Mode',
    privacyModeDesc: 'Data collection level',
    analytics: 'Analytics',
    analyticsDesc: 'Share usage statistics',

    // Speed options
    speedFast: 'Fast',
    speedNormal: 'Normal',
    speedSlow: 'Slow',

    // Tasks
    tasksTitle: 'TASKS',
    taskManagement: 'TASK MANAGEMENT',
    newTask: 'New Task',
    total: 'Total',
    waiting: 'Waiting',
    inProgress: 'In Progress',
    completed: 'Done',

    // Misc
    live: 'LIVE',
    active: 'ACTIVE',
    systemsOptimal: 'All systems running optimally',

    // Command input
    commandPlaceholder: "Ask JARVIS something...",
    listeningPlaceholder: 'Listening...',
    commandModes: 'VOICE · TEXT · COMMAND',

    // Themes
    themeDark: 'Dark',
    themeLight: 'Light',
    themeHacker: 'Hacker',
  },
};

export type Language = 'tr' | 'en';
export type ThemeMode = 'dark' | 'light' | 'hacker';
export type SystemStatus = 'optimal' | 'processing' | 'listening' | 'idle';
export type ResponseSpeed = 'fast' | 'normal' | 'slow';
export type DeviceStatus = 'online' | 'standby' | 'offline' | 'idle';

interface Device {
  id: string;
  name: string;
  customName?: string;
  nameKey?: keyof typeof TRANSLATIONS.tr;
  type: string;
  typeKey?: keyof typeof TRANSLATIONS.tr;
  status: DeviceStatus;
  version: string;
  os: string;
  ip: string;
  lastActivity: string;
  lastActivityTime: number;
  health: number;
  battery?: number;
  volume: number;
  description: string;
  descKey?: keyof typeof TRANSLATIONS.tr;
  signal?: number;
}

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  duration?: number;
}

interface JarvisSettings {
  voiceEnabled: boolean;
  soundEffects: boolean;
  notifications: boolean;
  themeMode: ThemeMode;
  autoUpdate: boolean;
  analytics: boolean;
  highPerformance: boolean;
  language: Language;
  responseSpeed: ResponseSpeed;
  privacyMode: 'minimal' | 'standard' | 'enhanced';
}

interface JarvisContextType {
  // Settings
  settings: JarvisSettings;
  updateSetting: <K extends keyof JarvisSettings>(key: K, value: JarvisSettings[K]) => void;

  // Translations
  t: (key: keyof typeof TRANSLATIONS.tr) => string;
  language: Language;
  setLanguage: (lang: Language) => void;

  // Theme
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  themeColors: {
    primary: string;
    primaryDim: string;
    bg: string;
    bgSecondary: string;
    text: string;
    textSecondary: string;
    glow: string;
  };

  // Response timing
  getResponseDelay: () => number;
  getActionDelay: () => number;

  // System status
  systemStatus: SystemStatus;
  setSystemStatus: (status: SystemStatus) => void;

  // Devices
  devices: Device[];
  selectedDeviceId: string | null;
  setSelectedDeviceId: (id: string | null) => void;
  updateDeviceStatus: (deviceId: string, status: DeviceStatus) => void;
  connectDevice: (deviceId: string) => void;
  disconnectDevice: (deviceId: string) => void;
  removeDevice: (deviceId: string) => void;
  renameDevice: (deviceId: string, newName: string) => void;
  syncDevice: (deviceId: string) => Promise<void>;
  diagnoseDevice: (deviceId: string) => Promise<void>;
  checkDeviceStatus: (deviceId: string) => Promise<void>;
  setDeviceVolume: (deviceId: string, volume: number) => void;
  recordDeviceActivity: (deviceId: string) => void;

  // Voice control
  isVoiceListening: boolean;
  startVoiceListening: () => void;
  stopVoiceListening: () => void;
  lastVoiceCommand: string | null;

  // Toast notifications
  toasts: Toast[];
  showToast: (message: string, type?: Toast['type'], duration?: number) => void;
  dismissToast: (id: string) => void;

  // Idle detection
  isIdle: boolean;
  resetIdleTimer: () => void;
}

const JarvisContext = createContext<JarvisContextType | null>(null);

const DEFAULT_SETTINGS: JarvisSettings = {
  voiceEnabled: true,
  soundEffects: true,
  notifications: true,
  themeMode: 'dark',
  autoUpdate: true,
  analytics: false,
  highPerformance: true,
  language: 'tr',
  responseSpeed: 'normal',
  privacyMode: 'standard',
};

const INITIAL_DEVICES: Device[] = [
  {
    id: 'pc',
    name: 'Ana Bilgisayar',
    type: 'Çekirdek Sistem',
    status: 'offline',
    version: 'v22H2',
    os: 'Windows 11 Pro',
    ip: '192.168.1.10',
    lastActivity: '-',
    lastActivityTime: 0,
    health: 0,
    description: 'Birincil komut ve kontrol birimi',
    signal: 0,
    volume: 75,
  },
  {
    id: 'phone',
    name: 'Telefon',
    type: 'iOS Cihaz',
    status: 'offline',
    version: 'iOS 17.4',
    os: 'iPhone 15 Pro',
    ip: '192.168.1.15',
    lastActivity: '-',
    lastActivityTime: 0,
    health: 0,
    battery: 0,
    description: 'Taşınabilir komut terminali',
    signal: 0,
    volume: 50,
  },
  {
    id: 'glass',
    name: 'Jarvis Gözlüğü',
    type: 'AR Ekran',
    status: 'offline',
    version: 'AR OS 3.1',
    os: 'Jarvis AR Platform',
    ip: '192.168.1.20',
    lastActivity: '-',
    lastActivityTime: 0,
    health: 0,
    battery: 0,
    description: 'Artırılmış gerçeklik arayüzü',
    signal: 0,
    volume: 80,
  },
  {
    id: 'drone',
    name: 'Drone',
    type: 'Gözetleme Birimi',
    status: 'offline',
    version: 'Air OS 2.0',
    os: 'Jarvis Air Platform',
    ip: '192.168.1.25',
    lastActivity: '-',
    lastActivityTime: 0,
    health: 0,
    battery: 0,
    description: 'Havadan gözetleme aracı',
    signal: 0,
    volume: 60,
  },
];

const IDLE_TIMEOUT = 60000; // 60 seconds for app idle
const DEVICE_IDLE_TIMEOUT = 300000; // 5 minutes for device idle

// Theme color configurations
const THEME_COLORS = {
  dark: {
    primary: '#00d4ff',
    primaryDim: 'rgba(0,212,255,0.6)',
    bg: '#010810',
    bgSecondary: 'rgba(4,20,36,0.7)',
    text: 'rgba(224,250,255,0.92)',
    textSecondary: 'rgba(224,250,255,0.65)',
    glow: 'rgba(0,212,255,0.5)',
  },
  light: {
    primary: '#0088cc',
    primaryDim: 'rgba(0,136,204,0.6)',
    bg: '#f0f4f8',
    bgSecondary: 'rgba(255,255,255,0.9)',
    text: 'rgba(26,42,58,0.92)',
    textSecondary: 'rgba(26,42,58,0.7)',
    glow: 'rgba(0,136,204,0.4)',
  },
  hacker: {
    primary: '#00ff88',
    primaryDim: 'rgba(0,255,136,0.6)',
    bg: '#0a0f0a',
    bgSecondary: 'rgba(10,20,10,0.8)',
    text: 'rgba(0,255,136,0.92)',
    textSecondary: 'rgba(0,255,136,0.65)',
    glow: 'rgba(0,255,136,0.5)',
  },
};

// Response speed delays (in ms)
const RESPONSE_DELAYS = {
  fast: { min: 400, max: 800 },
  normal: { min: 1000, max: 1800 },
  slow: { min: 2000, max: 3500 },
};

const ACTION_DELAYS = {
  fast: 600,
  normal: 1200,
  slow: 2000,
};

export function JarvisProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<JarvisSettings>(() => {
    const saved = localStorage.getItem('jarvis-settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if ('darkMode' in parsed && !('themeMode' in parsed)) {
          parsed.themeMode = parsed.darkMode ? 'dark' : 'light';
          delete parsed.darkMode;
        }
        return { ...DEFAULT_SETTINGS, ...parsed };
      } catch {
        return DEFAULT_SETTINGS;
      }
    }
    return DEFAULT_SETTINGS;
  });

  const [devices, setDevices] = useState<Device[]>(INITIAL_DEVICES);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [systemStatus, setSystemStatus] = useState<SystemStatus>('optimal');
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [isIdle, setIsIdle] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Voice control state
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [lastVoiceCommand, setLastVoiceCommand] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Persist settings to localStorage
  useEffect(() => {
    localStorage.setItem('jarvis-settings', JSON.stringify(settings));
  }, [settings]);

  // Apply theme CSS variables
  useEffect(() => {
    const root = document.documentElement;
    const colors = THEME_COLORS[settings.themeMode];

    root.style.setProperty('--bg-primary', colors.bg);
    root.style.setProperty('--bg-secondary', colors.bgSecondary);
    root.style.setProperty('--text-primary', colors.text);
    root.style.setProperty('--text-secondary', colors.textSecondary);
    root.style.setProperty('--cyan', colors.primary);
    root.style.setProperty('--cyan-dim', colors.primaryDim);
    root.style.setProperty('--glow-color', colors.glow);
  }, [settings.themeMode]);

  // App idle detection
  useEffect(() => {
    const handleActivity = () => {
      setLastActivity(Date.now());
      if (isIdle) {
        setIsIdle(false);
        setSystemStatus('optimal');
      }
    };

    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click'];
    events.forEach((event) => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    const idleCheck = setInterval(() => {
      const now = Date.now();
      if (now - lastActivity > IDLE_TIMEOUT && systemStatus !== 'processing' && systemStatus !== 'listening') {
        setIsIdle(true);
        setSystemStatus('idle');
      }
    }, 1000);

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
      clearInterval(idleCheck);
    };
  }, [lastActivity, isIdle, systemStatus]);

  // Device idle detection - check every 30 seconds
  useEffect(() => {
    const deviceIdleCheck = setInterval(() => {
      const now = Date.now();
      setDevices((prevDevices) =>
        prevDevices.map((device) => {
          if (device.status === 'online' && device.lastActivityTime > 0) {
            const timeSinceActivity = now - device.lastActivityTime;
            if (timeSinceActivity > DEVICE_IDLE_TIMEOUT) {
              // Device has been idle for 5 minutes
              return {
                ...device,
                status: 'idle' as DeviceStatus,
                lastActivity: settings.language === 'tr' ? 'Boşta' : 'Idle',
              };
            }
          }
          return device;
        })
      );
    }, 30000);

    return () => clearInterval(deviceIdleCheck);
  }, [settings.language]);

  // Simulate device connections on mount
  useEffect(() => {
    // Simulate devices connecting automatically after a short delay
    const connectTimeouts = INITIAL_DEVICES.map((device, index) => {
      return setTimeout(() => {
        recordDeviceActivity(device.id);
        setDevices((prev) =>
          prev.map((d) =>
            d.id === device.id
              ? {
                  ...d,
                  status: 'online',
                  lastActivity: settings.language === 'tr' ? 'Şimdi' : 'Now',
                  lastActivityTime: Date.now(),
                  health: 85 + Math.floor(Math.random() * 15),
                  signal: 50 + Math.floor(Math.random() * 50),
                  battery: d.battery !== undefined ? 50 + Math.floor(Math.random() * 50) : undefined,
                }
              : d
          )
        );
      }, 1000 + index * 800); // Stagger connections
    });

    return () => connectTimeouts.forEach(clearTimeout);
  }, [settings.language]);

  const updateSetting = useCallback(<K extends keyof JarvisSettings>(key: K, value: JarvisSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setLastActivity(Date.now());
  }, []);

  const t = useCallback((key: keyof typeof TRANSLATIONS.tr): string => {
    return TRANSLATIONS[settings.language][key] || key;
  }, [settings.language]);

  const setLanguage = useCallback((lang: Language) => {
    updateSetting('language', lang);
  }, [updateSetting]);

  const setTheme = useCallback((theme: ThemeMode) => {
    updateSetting('themeMode', theme);
  }, [updateSetting]);

  const getResponseDelay = useCallback(() => {
    const { min, max } = RESPONSE_DELAYS[settings.responseSpeed];
    return min + Math.random() * (max - min);
  }, [settings.responseSpeed]);

  const getActionDelay = useCallback(() => {
    return ACTION_DELAYS[settings.responseSpeed];
  }, [settings.responseSpeed]);

  const showToast = useCallback((message: string, type: Toast['type'] = 'success', duration = 3000) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const recordDeviceActivity = useCallback((deviceId: string) => {
    setDevices((prev) =>
      prev.map((d) =>
        d.id === deviceId
          ? {
              ...d,
              lastActivity: settings.language === 'tr' ? 'Şimdi' : 'Now',
              lastActivityTime: Date.now(),
              status: d.status === 'idle' ? 'online' : d.status,
            }
          : d
      )
    );
    setLastActivity(Date.now());
  }, [settings.language]);

  const updateDeviceStatus = useCallback((deviceId: string, status: DeviceStatus) => {
    setDevices((prev) =>
      prev.map((d) =>
        d.id === deviceId
          ? {
              ...d,
              status,
              lastActivity: status === 'online' ? (settings.language === 'tr' ? 'Şimdi' : 'Now') : '-',
              lastActivityTime: status === 'online' ? Date.now() : 0,
              health: status === 'online' ? 85 + Math.floor(Math.random() * 15) : 0,
              signal: status === 'online' ? 50 + Math.floor(Math.random() * 50) : 0,
              battery: d.battery !== undefined ? (status === 'online' ? 50 + Math.floor(Math.random() * 50) : 0) : undefined,
            }
          : d
      )
    );
    setLastActivity(Date.now());
  }, [settings.language]);

  const connectDevice = useCallback((deviceId: string) => {
    updateDeviceStatus(deviceId, 'online');
    showToast(t('deviceConnected'), 'success');
  }, [updateDeviceStatus, showToast, t]);

  const disconnectDevice = useCallback((deviceId: string) => {
    updateDeviceStatus(deviceId, 'offline');
    showToast(t('deviceDisconnected'), 'info');
    if (selectedDeviceId === deviceId) {
      setSelectedDeviceId(null);
    }
  }, [updateDeviceStatus, showToast, t, selectedDeviceId]);

  const removeDevice = useCallback((deviceId: string) => {
    setDevices((prev) => prev.filter((d) => d.id !== deviceId));
    if (selectedDeviceId === deviceId) {
      setSelectedDeviceId(null);
    }
    setLastActivity(Date.now());
  }, [selectedDeviceId]);

  const renameDevice = useCallback((deviceId: string, newName: string) => {
    setDevices((prev) =>
      prev.map((d) =>
        d.id === deviceId ? { ...d, customName: newName } : d
      )
    );
    setLastActivity(Date.now());
  }, []);

  const setDeviceVolume = useCallback((deviceId: string, volume: number) => {
    setDevices((prev) =>
      prev.map((d) =>
        d.id === deviceId ? { ...d, volume: Math.max(0, Math.min(100, volume)) } : d
      )
    );
    setLastActivity(Date.now());
  }, []);

  const syncDevice = useCallback(async (deviceId: string) => {
    const delay = getActionDelay();
    await new Promise((resolve) => setTimeout(resolve, delay));
    recordDeviceActivity(deviceId);
    const device = devices.find(d => d.id === deviceId);
    if (device) {
      updateDeviceStatus(deviceId, device.status === 'idle' ? 'online' : device.status);
    }
  }, [getActionDelay, recordDeviceActivity, updateDeviceStatus, devices]);

  const diagnoseDevice = useCallback(async (deviceId: string) => {
    const delay = getActionDelay() * 1.5;
    await new Promise((resolve) => setTimeout(resolve, delay));
    recordDeviceActivity(deviceId);
  }, [getActionDelay, recordDeviceActivity]);

  const checkDeviceStatus = useCallback(async (deviceId: string) => {
    const delay = getActionDelay() * 0.8;
    await new Promise((resolve) => setTimeout(resolve, delay));
    recordDeviceActivity(deviceId);
  }, [getActionDelay, recordDeviceActivity]);

  // Voice control implementation
  const startVoiceListening = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      showToast(settings.language === 'tr' ? 'Ses tanıma desteklenmiyor.' : 'Speech recognition not supported.', 'error');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = settings.language === 'tr' ? 'tr-TR' : 'en-US';

    recognition.onstart = () => {
      setIsVoiceListening(true);
      setSystemStatus('listening');
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setLastVoiceCommand(transcript);

      // Process voice commands
      const activeDevice = devices.find(d => d.id === selectedDeviceId && d.status === 'online') ||
                          devices.find(d => d.status === 'online');

      if (activeDevice) {
        // Turkish commands
        if (settings.language === 'tr') {
          if (transcript.includes('sesi aç') || transcript.includes('ses aç')) {
            setDeviceVolume(activeDevice.id, 100);
            showToast(t('voiceOpened'), 'success');
          } else if (transcript.includes('sesi kapat') || transcript.includes('ses kapat')) {
            setDeviceVolume(activeDevice.id, 0);
            showToast(t('voiceClosed'), 'success');
          } else if (transcript.includes('bağlan')) {
            connectDevice(activeDevice.id);
          } else if (transcript.includes('bağlantıyı kes')) {
            disconnectDevice(activeDevice.id);
          }
        } else {
          // English commands
          if (transcript.includes('voice on') || transcript.includes('volume up') || transcript.includes('unmute')) {
            setDeviceVolume(activeDevice.id, 100);
            showToast(t('voiceOpened'), 'success');
          } else if (transcript.includes('voice off') || transcript.includes('volume down') || transcript.includes('mute')) {
            setDeviceVolume(activeDevice.id, 0);
            showToast(t('voiceClosed'), 'success');
          } else if (transcript.includes('connect')) {
            connectDevice(activeDevice.id);
          } else if (transcript.includes('disconnect')) {
            disconnectDevice(activeDevice.id);
          }
        }
      }

      showToast(t('commandExecuted'), 'success');
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsVoiceListening(false);
      setSystemStatus('optimal');
    };

    recognition.onend = () => {
      setIsVoiceListening(false);
      setSystemStatus('optimal');
    };

    recognition.start();
    recognitionRef.current = recognition;
  }, [settings.language, devices, selectedDeviceId, setDeviceVolume, connectDevice, disconnectDevice, showToast, t]);

  const stopVoiceListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsVoiceListening(false);
    setSystemStatus('optimal');
  }, []);

  const resetIdleTimer = useCallback(() => {
    setLastActivity(Date.now());
    if (isIdle) {
      setIsIdle(false);
      setSystemStatus('optimal');
    }
  }, [isIdle]);

  const value: JarvisContextType = {
    settings,
    updateSetting,
    t,
    language: settings.language,
    setLanguage,
    theme: settings.themeMode,
    setTheme,
    themeColors: THEME_COLORS[settings.themeMode],
    getResponseDelay,
    getActionDelay,
    systemStatus,
    setSystemStatus,
    devices,
    selectedDeviceId,
    setSelectedDeviceId,
    updateDeviceStatus,
    connectDevice,
    disconnectDevice,
    removeDevice,
    renameDevice,
    syncDevice,
    diagnoseDevice,
    checkDeviceStatus,
    setDeviceVolume,
    recordDeviceActivity,
    isVoiceListening,
    startVoiceListening,
    stopVoiceListening,
    lastVoiceCommand,
    toasts,
    showToast,
    dismissToast,
    isIdle,
    resetIdleTimer,
  };

  return <JarvisContext.Provider value={value}>{children}</JarvisContext.Provider>;
}

export function useJarvis() {
  const context = useContext(JarvisContext);
  if (!context) {
    throw new Error('useJarvis must be used within a JarvisProvider');
  }
  return context;
}

export { TRANSLATIONS, THEME_COLORS };
