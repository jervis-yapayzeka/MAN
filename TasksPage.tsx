import { CheckCircle, Info, AlertTriangle, XCircle, X } from 'lucide-react';
import { useJarvis } from '../contexts/JarvisContext';

const TYPE_CONFIG = {
  success: { icon: CheckCircle, color: '#00ff88', bg: 'rgba(0,255,136,0.1)', border: 'rgba(0,255,136,0.3)' },
  info: { icon: Info, color: '#00d4ff', bg: 'rgba(0,212,255,0.1)', border: 'rgba(0,212,255,0.3)' },
  warning: { icon: AlertTriangle, color: '#ffaa00', bg: 'rgba(255,170,0,0.1)', border: 'rgba(255,170,0,0.3)' },
  error: { icon: XCircle, color: '#ff4444', bg: 'rgba(255,68,68,0.1)', border: 'rgba(255,68,68,0.3)' },
};

export default function ToastContainer() {
  const { toasts, dismissToast, themeColors } = useJarvis();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed z-[100] flex flex-col gap-2 pointer-events-none"
      style={{
        bottom: 80,
        right: 24,
        maxWidth: 320,
      }}
    >
      {toasts.map((toast) => {
        const config = TYPE_CONFIG[toast.type];
        const Icon = config.icon;

        return (
          <div
            key={toast.id}
            className="flex items-start gap-3 rounded-lg px-4 py-3 pointer-events-auto animate-slide-in"
            style={{
              background: themeColors.bgSecondary,
              border: `1px solid ${config.border}`,
              boxShadow: `0 4px 20px rgba(0,0,0,0.3), 0 0 15px ${config.bg}`,
              backdropFilter: 'blur(12px)',
            }}
          >
            <Icon size={16} color={config.color} className="flex-shrink-0 mt-0.5" />
            <p
              className="font-rajdhani flex-1"
              style={{ fontSize: 13, color: themeColors.text, lineHeight: 1.4 }}
            >
              {toast.message}
            </p>
            <button
              onClick={() => dismissToast(toast.id)}
              className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity"
            >
              <X size={14} color={themeColors.textSecondary} />
            </button>
          </div>
        );
      })}
      <style>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
