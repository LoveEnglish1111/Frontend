import { createContext, useContext, useState, useCallback } from 'react';

// Toast Context
const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    // Thêm toast mới
    const addToast = useCallback((message, type = 'info', duration = 3000) => {
        const id = `toast_${Date.now()}_${Math.random()}`;
        const newToast = { id, message, type };

        setToasts((prev) => [...prev, newToast]);

        // Auto remove sau duration ms
        if (duration > 0) {
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, duration);
        }

        return id;
    }, []);

    // Xóa toast
    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    // Shortcuts
    const toast = {
        success: (msg, duration) => addToast(msg, 'success', duration),
        error: (msg, duration) => addToast(msg, 'error', duration),
        warning: (msg, duration) => addToast(msg, 'warning', duration),
        info: (msg, duration) => addToast(msg, 'info', duration),
    };

    const value = { toasts, addToast, removeToast, toast };
    return (
        <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
    );
};

// Hook để dùng Toast
export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
};
