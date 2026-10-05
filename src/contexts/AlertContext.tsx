import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import Modal from '../components/ui/Modal';
import Toast from '../components/ui/Toast';

export interface AlertMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning' | string;
}

export interface PopupOptions {
  title?: string;
  message?: string;
  icon?: string;
  iconColor?: string;
  image?: string;
  imageAlt?: string;
  buttons?: any[];
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onModalClose?: () => void;
  closeModal?: () => void;
}

export interface AlertContextState {
  showCustomAlert: (message: string, type?: 'success' | 'error' | 'info' | 'warning' | string, duration?: number) => void;
  showPopUpAlert: (options: PopupOptions) => void;
}

const AlertContext = createContext<AlertContextState | undefined>(undefined);

export function useAlert(): AlertContextState {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
}

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<AlertMessage[]>([]);
  const [popup, setPopup] = useState<PopupOptions | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const showCustomAlert = useCallback((message: string, type = 'success', duration = 4500) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setAlerts(prev => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeAlert(id);
      }, duration);
    }
  }, []);

  const removeAlert = useCallback((id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  }, []);

  const closePopupWithAnim = useCallback((fromButton = false) => {
    setIsClosing(true);
    setTimeout(() => {
      setPopup(prev => {
        if (prev && fromButton !== true && prev.onModalClose) {
          prev.onModalClose();
        }
        return null;
      });
      setIsClosing(false);
    }, 300);
  }, []);

  const showPopUpAlert = useCallback((options: PopupOptions) => {
    setIsClosing(false);
    setPopup({
      title: options.title !== undefined ? options.title : 'Attention',
      message: options.message || '',
      icon: options.icon,
      iconColor: options.iconColor || 'text-blue-500',
      image: options.image,
      imageAlt: options.imageAlt || 'Popup Image',
      buttons: options.buttons || [],
      confirmText: options.confirmText,
      cancelText: options.cancelText,
      onConfirm: () => {
        if (options.onConfirm) options.onConfirm();
        closePopupWithAnim(true);
      },
      onCancel: () => {
        if (options.onCancel) options.onCancel();
        closePopupWithAnim(true);
      },
      onModalClose: options.onModalClose,
      closeModal: () => closePopupWithAnim(true)
    });
  }, [closePopupWithAnim]);

  return (
    <AlertContext.Provider value={{ showCustomAlert, showPopUpAlert }}>
      {children}
      
      <div id="alert-container">
        {alerts.map(alert => (
          <Toast
            key={alert.id}
            id={alert.id}
            message={alert.message}
            type={alert.type}
            onClose={(id: string) => {
              const el = document.getElementById(`alert-${id}`);
              if (el) {
                el.classList.add('fade-out');
                setTimeout(() => removeAlert(id), 500);
              } else {
                removeAlert(id);
              }
            }}
          />
        ))}
      </div>

      <Modal
        isOpen={!!popup}
        isClosing={isClosing}
        onClose={closePopupWithAnim}
        title={popup?.title}
        message={popup?.message}
        icon={popup?.icon}
        iconColor={popup?.iconColor}
        image={popup?.image}
        imageAlt={popup?.imageAlt}
        buttons={popup?.buttons as any}
        confirmText={popup?.confirmText}
        cancelText={popup?.cancelText}
        onConfirm={popup?.onConfirm}
        onCancel={popup?.onCancel}
        children={null}
      />
    </AlertContext.Provider>
  );
}
