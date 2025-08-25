import { useState } from 'react';

// ============================================
// TOAST LOGIC HOOK - REUSABLE
// ============================================

export type ToastType = 'success' | 'error' | 'info';

interface ToastState {
  isVisible: boolean;
  message: string;
  type: ToastType;
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastState>({
    isVisible: false,
    message: '',
    type: 'success'
  });

  // Show toast with message and type
  const showToast = (message: string, type: ToastType = 'success') => {
    setToast({
      isVisible: true,
      message,
      type
    });
  };

  // Hide toast
  const hideToast = () => {
    setToast(prev => ({
      ...prev,
      isVisible: false
    }));
  };

  // Show specific toast types (shortcuts)
  const showSuccess = (message: string) => showToast(message, 'success');
  const showError = (message: string) => showToast(message, 'error');
  const showInfo = (message: string) => showToast(message, 'info');

  return {
    toast,
    showToast,
    hideToast,
    showSuccess,
    showError,
    showInfo,
  };
};