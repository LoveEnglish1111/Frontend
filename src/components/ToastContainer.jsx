import { useToast } from '../context/ToastContext';
import { X } from 'lucide-react';

export default function ToastContainer() {
    const { toasts, removeToast } = useToast();

    const bgColors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        warning: 'bg-amber-500',
        info: 'bg-blue-500',
    };

    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ',
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm">
            {toasts.map((t) => (
                <div
                    key={t.id}
                    className={`${bgColors[t.type]} text-white rounded-lg p-4 shadow-lg flex items-start gap-3 animate-slide-in`}
                >
                    <span className="text-lg font-bold flex-shrink-0 mt-0.5">
                        {icons[t.type]}
                    </span>
                    <span className="flex-1 text-sm font-medium">
                        {t.message}
                    </span>
                    <button
                        onClick={() => removeToast(t.id)}
                        className="flex-shrink-0 hover:opacity-75 transition"
                        aria-label="Close notification"
                    >
                        <X size={18} />
                    </button>
                </div>
            ))}
        </div>
    );
}
