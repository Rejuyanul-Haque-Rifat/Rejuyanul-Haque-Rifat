import React, { useState, useEffect, useRef, useCallback } from 'react';
import { hapticFeedback } from '../../utils/haptics';

export interface SegmentedControlOption {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  options: SegmentedControlOption[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  scrollable?: boolean;
  color?: 'primary' | 'emerald' | 'rose' | 'red' | 'blue' | 'indigo' | 'amber';
  fullWidth?: boolean;
}

export default function SegmentedControl({
  options,
  activeId,
  onChange,
  className = '',
  size = 'md',
  scrollable = true,
  color = 'primary',
  fullWidth = true
}: SegmentedControlProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const isInitialMount = useRef(true);

  const [indicator, setIndicator] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
    ready: boolean;
  }>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    ready: false
  });

  const updateIndicator = useCallback(() => {
    const activeBtn = buttonRefs.current[activeId];
    if (!activeBtn) return;

    setIndicator({
      left: activeBtn.offsetLeft,
      top: activeBtn.offsetTop,
      width: activeBtn.offsetWidth,
      height: activeBtn.offsetHeight,
      ready: true
    });
  }, [activeId]);

  useEffect(() => {
    updateIndicator();

    const container = containerRef.current;
    const activeBtn = buttonRefs.current[activeId];
    if (container && activeBtn && scrollable) {
      const containerWidth = container.clientWidth;
      const targetScrollLeft = activeBtn.offsetLeft - (containerWidth / 2) + (activeBtn.offsetWidth / 2);
      if (isInitialMount.current) {
        isInitialMount.current = false;
        container.scrollLeft = Math.max(0, targetScrollLeft);
      } else {
        container.scrollTo({
          left: Math.max(0, targetScrollLeft),
          behavior: 'smooth'
        });
      }
    }
  }, [activeId, updateIndicator, scrollable]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleResize = () => {
      updateIndicator();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    window.addEventListener('resize', handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [updateIndicator]);

  const handleSelect = (id: string, disabled?: boolean) => {
    if (disabled || id === activeId) return;
    hapticFeedback.selection();
    onChange(id);
  };

  const sizeClasses = {
    xs: {
      button: 'py-1 px-2.5 text-[11px] gap-1',
      icon: 'w-3 h-3',
      container: 'p-1 rounded-xl',
      pill: 'rounded-[8px]'
    },
    sm: {
      button: 'py-1.5 sm:py-2 px-3 sm:px-3.5 text-xs sm:text-[13px] gap-1.5',
      icon: 'w-3.5 h-3.5',
      container: 'p-1 rounded-2xl',
      pill: 'rounded-xl'
    },
    md: {
      button: 'py-2 sm:py-2.5 px-3.5 sm:px-4 text-xs sm:text-sm gap-2',
      icon: 'w-4 h-4',
      container: 'p-1 rounded-2xl',
      pill: 'rounded-xl'
    },
    lg: {
      button: 'py-2.5 sm:py-3 px-4 sm:px-5 text-sm sm:text-base gap-2',
      icon: 'w-4.5 h-4.5',
      container: 'p-1.5 rounded-2xl',
      pill: 'rounded-xl'
    }
  }[size];

  const activeTextColor = {
    emerald: 'text-emerald-700 ',
    primary: 'text-blue-600 ',
    blue: 'text-blue-600 ',
    rose: 'text-rose-600 ',
    red: 'text-red-600 ',
    amber: 'text-amber-700 ',
    indigo: 'text-indigo-600 '
  }[color] || 'text-blue-600 ';

  return (
    <div
      ref={containerRef}
      className={`relative bg-gray-100  backdrop-blur-md border border-gray-200/60  shadow-inner select-none font-anek ${
        sizeClasses.container
      } ${
        scrollable ? 'overflow-x-auto scrollbar-hide touch-pan-x' : 'overflow-hidden'
      } ${className}`}
    >
      <div className={`relative flex items-center gap-1 ${scrollable ? 'min-w-full w-max' : 'w-full'}`}>
        <div
          aria-hidden="true"
          style={{
            transform: `translate3d(${indicator.left}px, ${indicator.top}px, 0)`,
            width: `${indicator.width}px`,
            height: `${indicator.height}px`,
            opacity: indicator.ready ? 1 : 0
          }}
          className={`absolute top-0 left-0 bg-white  ${sizeClasses.pill} shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)] (0,0,0,0.4)] pointer-events-none transition-[transform,width,height,opacity] duration-250 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-[transform,width]`}
        />

        {options.map((option) => {
          const isActive = option.id === activeId;
          return (
            <button
              key={option.id}
              ref={(el) => {
                buttonRefs.current[option.id] = el;
              }}
              type="button"
              disabled={option.disabled}
              onClick={() => handleSelect(option.id, option.disabled)}
              className={`relative z-10 shrink-0 ${
                fullWidth ? (scrollable ? 'flex-1 min-w-fit' : 'flex-1 min-w-0') : ''
              } flex items-center justify-center font-bold cursor-pointer select-none transition-colors duration-200 active:scale-[0.98] ${
                sizeClasses.button
              } ${sizeClasses.pill} ${
                option.disabled ? 'opacity-40 cursor-not-allowed' : ''
              } ${
                isActive
                  ? activeTextColor
                  : 'text-gray-500  hover:text-gray-800 :text-gray-200'
              }`}
            >
              {option.icon && (
                <span
                  className={`transition-transform duration-200 shrink-0 ${
                    isActive ? 'scale-105' : 'opacity-80'
                  }`}
                >
                  {option.icon}
                </span>
              )}
              <span className="whitespace-nowrap">{option.label}</span>
              {option.badge && (
                <span className="shrink-0">{option.badge}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}


