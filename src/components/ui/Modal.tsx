import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';
import CachedImage from './CachedImage';
import { hapticFeedback } from '../../utils/haptics';

interface ModalButton { 
  text: string; 
  type?: "primary" | "secondary" | "danger" | "outline" | "warning" | "custom"; 
  onClick: (e?: any) => void; 
  className?: string;
  loading?: boolean;
}

interface ModalProps { 
  isOpen: boolean; 
  onClose: (fromButton?: boolean) => void; 
  title?: string; 
  message?: string; 
  icon?: string; 
  iconColor?: string; 
  image?: string; 
  imageAlt?: string; 
  buttons?: ModalButton[]; 
  confirmText?: string; 
  cancelText?: string; 
  onConfirm?: () => void; 
  onCancel?: () => void; 
  isClosing?: boolean; 
  children?: React.ReactNode; 
  maxWidth?: string;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  icon,
  iconColor = 'text-blue-500',
  image,
  imageAlt = 'Modal Image',
  buttons = [],
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  isClosing = false,
  children,
  maxWidth,
  className = ''
}) => {
  const [mounted, setMounted] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setDragY(0);
      setIsDragging(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const diffY = e.touches[0].clientY - startY.current;
    if (diffY > 0) {
      setDragY(diffY);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragY > 60) {
      hapticFeedback.light();
      onClose(false);
    } else {
      setDragY(0);
    }
  };

  if (!isOpen || !mounted) return null;

  const content = (
    <div 
      className={`fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-200 ease-out ${isClosing ? 'opacity-0' : 'opacity-100'}`}
      onClick={() => onClose(false)}
    >
      <div 
        className={`custom-alert-box relative w-full ${maxWidth || 'max-w-lg sm:max-w-md'} rounded-t-3xl rounded-b-none sm:rounded-3xl border-t sm:border border-white/20 dark:border-white/10 p-6 pb-8 sm:p-6 shadow-2xl pb-safe transition-transform duration-200 ease-out ${isClosing ? 'translate-y-full sm:scale-95 sm:translate-y-0 opacity-0' : 'animate-slide-up sm:animate-scale-up'} ${className}`}
        style={{
          transform: dragY > 0 ? `translateY(${dragY}px)` : undefined,
          transition: isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div 
          className="w-full flex justify-center pt-1 pb-3 cursor-grab active:cursor-grabbing sm:hidden touch-none select-none shrink-0"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-12 h-1.5 bg-gray-300/80 dark:bg-gray-700 rounded-full" />
        </div>

        {(image || icon || title || message) ? (
          <div className="text-center mt-1">
            {image ? (
              <CachedImage
                src={image}
                alt={imageAlt || title || 'Modal image'}
                fallbackIcon="fa-image"
                className="w-full h-48 rounded-2xl mb-4 shadow-sm border border-gray-100 dark:border-gray-800"
                imageClassName="w-full h-full object-cover"
              />
            ) : icon ? (
              <div className={`w-14 h-14 mx-auto mb-3.5 rounded-2xl flex items-center justify-center ${
                iconColor?.includes('emerald')
                  ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800/40'
                  : iconColor?.includes('red')
                  ? 'bg-red-50/80 dark:bg-red-950/40 border border-red-100 dark:border-red-800/40'
                  : iconColor?.includes('amber') || iconColor?.includes('orange') || iconColor?.includes('yellow')
                  ? 'bg-amber-50/80 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-800/40'
                  : 'bg-blue-50/80 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/40'
              } shadow-inner`}>
                <i className={`${icon.includes('fa-brands') ? icon : 'fa-solid ' + icon} ${iconColor} text-2xl`}></i>
              </div>
            ) : null}
            {title ? <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{title}</h3> : null}
            {message && (
              <div 
                className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 text-left p-3.5 bg-gray-50/90 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700/50" 
                dangerouslySetInnerHTML={{ __html: message }}
              />
            )}
            {children}
          </div>
        ) : (
          children
        )}
        
        {buttons && buttons.length > 0 ? (
          <div className={`flex ${buttons.length === 2 ? 'gap-2.5 sm:gap-3' : 'flex-col gap-2.5'} w-full mt-4`}>
            {buttons.map((btn, idx) => {
              let btnClass = `${buttons.length === 2 ? 'flex-1' : 'w-full'} h-11 sm:h-12 rounded-2xl font-bold transition-all active:scale-[0.98] flex items-center justify-center text-sm shadow-sm `;
              if (btn.type === 'primary') {
                btnClass += "text-white bg-blue-600 hover:bg-blue-700 shadow-blue-500/20";
              } else if (btn.type === 'danger' || btn.text?.includes('বাতিল')) {
                btnClass += "bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 border border-red-200/60 dark:border-red-900/40";
              } else if (btn.type === 'warning') {
                btnClass += "text-white bg-amber-500 hover:bg-amber-600 shadow-amber-500/20";
              } else {
                btnClass += "border border-gray-200/80 dark:border-gray-700/80 text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800/80 hover:bg-gray-100 dark:hover:bg-gray-700";
              }

              if (buttons.length === 2) {
                const b0 = buttons[0];
                const b1 = buttons[1];
                const other = idx === 0 ? b1 : b0;

                const isExplicitAction = (b: ModalButton) =>
                  b.type === 'primary' || b.type === 'danger' || b.type === 'warning' || b.type === 'custom';
                const isExplicitCancel = (b: ModalButton) =>
                  b.type === 'secondary' || b.type === 'outline';

                const hasCancelText = (text?: string) =>
                  Boolean(text && /^(বাতিল|বাতিল করুন|না\b|বাদ দিন|পরে\b|পরে করবো|ফিরে যান|ফিরে আসুন|cancel|close|dismiss|skip|এড়িয়ে যান)/i.test(text.trim()) && !/^(হ্যাঁ|yes|confirm)/i.test(text.trim()));

                let isCancel = false;
                if (isExplicitAction(btn) && !isExplicitAction(other)) {
                  isCancel = false;
                } else if (isExplicitCancel(btn) && !isExplicitCancel(other)) {
                  isCancel = true;
                } else if (isExplicitAction(other) && !isExplicitAction(btn)) {
                  isCancel = true;
                } else if (isExplicitCancel(other) && !isExplicitCancel(btn)) {
                  isCancel = false;
                } else if (hasCancelText(btn.text) && !hasCancelText(other.text)) {
                  isCancel = true;
                } else if (hasCancelText(other.text) && !hasCancelText(btn.text)) {
                  isCancel = false;
                } else {
                  isCancel = idx === 0;
                }

                btnClass += isCancel ? " order-1" : " order-2";
              }

              if (btn.className) {
                btnClass += ` ${btn.className}`;
              }
              
              return (
                <Button 
                  key={idx} 
                  isLoading={btn.loading}
                  onClick={async (e) => { 
                    e.stopPropagation(); 
                    hapticFeedback.light();
                    if (btn.onClick) await btn.onClick(() => onClose(true)); 
                    else onClose(true); 
                  }} 
                  className={btnClass}
                >
                  {btn.text}
                </Button>
              );
            })}
          </div>
        ) : (
          (confirmText || cancelText) && (
            <div className="flex gap-2.5 sm:gap-3 w-full mt-4">
              {cancelText && (
                <Button 
                  onClick={async (e) => { 
                    e.stopPropagation(); 
                    hapticFeedback.light();
                    if (onCancel) await onCancel(); 
                    onClose(true); 
                  }} 
                  className="flex-1 h-11 sm:h-12 rounded-2xl bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 border border-red-200/60 dark:border-red-900/40 font-bold transition-all active:scale-[0.98] text-sm"
                >
                  {cancelText}
                </Button>
              )}
              {confirmText && (
                <Button 
                  onClick={async (e) => { 
                    e.stopPropagation(); 
                    hapticFeedback.light();
                    if (onConfirm) await onConfirm(); 
                    onClose(true); 
                  }} 
                  className="flex-1 h-11 sm:h-12 rounded-2xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-blue-500/20 transition-all active:scale-[0.98] text-sm"
                >
                  {confirmText}
                </Button>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );

  return createPortal(content, document.body);
};

export default Modal;


