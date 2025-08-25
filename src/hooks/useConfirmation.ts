import { useState } from 'react';

interface ConfirmationOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
}

export const useConfirmation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmationOptions>({
    title: '',
    message: ''
  });
  const [resolver, setResolver] = useState<((value: boolean) => void) | null>(null);

  const confirm = (confirmationOptions: ConfirmationOptions): Promise<boolean> => {
    setOptions(confirmationOptions);
    setIsOpen(true);

    return new Promise<boolean>((resolve) => {
      setResolver(() => resolve);
    });
  };

  const handleConfirm = () => {
    setIsOpen(false);
    if (resolver) {
      resolver(true);
      setResolver(null);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    if (resolver) {
      resolver(false);
      setResolver(null);
    }
  };

  return {
    isOpen,
    options,
    confirm,
    handleConfirm,
    handleCancel
  };
};