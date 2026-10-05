import React, { useState, useRef, useEffect } from 'react';
import { hapticFeedback } from '../../utils/haptics';

interface ToastProps { 
  id: string; 
  message: string; 
  type?: "success" | "error" | "info" | "warning" | string; 
  onClose: (id: string) => void; 
  isClosing?: boolean; 
}

const Toast: React.FC<ToastProps> = ({
  id,
  message,
  type = 'success',
  onClose,
  isClosing = false
}) => {
  const [dragX, setDragX] = useState(0);
  const [dragY, setDragY] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const startX = useRef(0);
  const startY = useRef(0);

  useEffect(() => {
    hapticFeedback.light();
  }, []);

  const getTypeStyles = (t: string) => {
    switch (t) {
      case 'success':
        return {
          icon: 'fa-circle-check',
          badgeClass: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
          shadowClass: 'shadow-[0_16px_40px_rgba(0,0,0,0.45),0_0_25px_rgba(16,185,129,0.18)]'
        };
      case 'error':
        return {
          icon: 'fa-triangle-exclamation',
          badgeClass: 'bg-rose-500/20 text-rose-400 border border-rose-500/30',
          shadowClass: 'shadow-[0_16px_40px_rgba(0,0,0,0.45),0_0_25px_rgba(244,63,94,0.18)]'
        };
      case 'info':
        return {
          icon: 'fa-circle-info',
          badgeClass: 'bg-sky-500/20 text-sky-400 border border-sky-500/30',
          shadowClass: 'shadow-[0_16px_40px_rgba(0,0,0,0.45),0_0_25px_rgba(14,165,233,0.18)]'
        };
      case 'warning':
        return {
          icon: 'fa-bell',
          badgeClass: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
          shadowClass: 'shadow-[0_16px_40px_rgba(0,0,0,0.45),0_0_25px_rgba(245,158,11,0.18)]'
        };
      default:
        return {
          icon: 'fa-bell',
          badgeClass: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
          shadowClass: 'shadow-[0_16px_40px_rgba(0,0,0,0.45),0_0_25px_rgba(59,130,246,0.18)]'
        };
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;
    const diffX = e.touches[0].clientX - startX.current;
    const diffY = e.touches[0].clientY - startY.current;
    
    if (diffY < 0) {
      setDragY(diffY);
    }
    if (Math.abs(diffX) > Math.abs(diffY)) {
      setDragX(diffX);
    }
  };

  const dismissToast = (direction: 'up' | 'left' | 'right' | 'click' = 'up') => {
    hapticFeedback.light();
    setIsDismissed(true);
    setTimeout(() => {
      if (onClose) onClose(id);
    }, 220);
  };

  const handleTouchEnd = () => {
    if (!isSwiping) return;
    setIsSwiping(false);
    
    if (dragY < -30) {
      dismissToast('up');
    } else if (Math.abs(dragX) > 60) {
      dismissToast(dragX > 0 ? 'right' : 'left');
    } else {
      setDragX(0);
      setDragY(0);
    }
  };

  const { icon, badgeClass, shadowClass } = getTypeStyles(type);

  const opacity = Math.max(0, 1 - (Math.abs(dragX) / 180 + Math.abs(dragY) / 60));
  const transformStyle = isDismissed
    ? (dragY < -20 ? 'translateY(-120%) scale(0.9)' : `translateX(${dragX >= 0 ? '120%' : '-120%'}) scale(0.9)`)
    : `translate(${dragX}px, ${Math.min(0, dragY)}px)`;

  return (
    <div 
      id={`alert-${id}`}
      className={`dynamic-island-pill ${isClosing ? 'fade-out' : ''} ${shadowClass} flex items-center gap-3.5 px-4 py-3 sm:py-3.5 rounded-2xl bg-[#141416]/95 dark:bg-[#0a0a0c]/95 text-white backdrop-blur-md border border-white/20 dark:border-white/10 select-none cursor-grab active:cursor-grabbing w-full transition-all`}
      style={{
        transform: transformStyle,
        opacity: opacity,
        transition: isSwiping ? 'none' : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease'
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={() => dismissToast('click')}
    >
      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 ${badgeClass} shadow-inner`}>
        <i className={`fa-solid ${icon} text-sm sm:text-base`}></i>
      </div>
      <span className="text-[14.5px] sm:text-[15.5px] font-semibold text-white/95 leading-relaxed text-left flex-1 tracking-normal">
        {message}
      </span>
      <button 
        type="button"
        onClick={(e) => { e.stopPropagation(); dismissToast('click'); }}
        className="w-7 h-7 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center shrink-0 text-white/50 hover:text-white transition-all ml-1"
        aria-label="Close"
      >
        <i className="fa-solid fa-xmark text-xs"></i>
      </button>
    </div>
  );
};

export default Toast;
