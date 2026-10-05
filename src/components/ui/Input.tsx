import React, { useEffect, useState, useRef, useImperativeHandle } from 'react';
import { hapticFeedback } from '../../utils/haptics';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { 
  label?: string; 
  icon?: string; 
  iconClassName?: string; 
  labelClassName?: string; 
  wrapperClassName?: string; 
  error?: string; 
  children?: React.ReactNode; 
  enableTextActions?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  icon,
  iconClassName = '',
  labelClassName = '',
  wrapperClassName = '',
  className = '',
  type = 'text',
  error,
  children,
  enableTextActions = false,
  ...props
}, ref) => {
  const [isShaking, setIsShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

  useEffect(() => {
    if (error) {
      hapticFeedback.warning();
      setIsShaking(false);
      const raf = requestAnimationFrame(() => {
        setIsShaking(true);
      });
      const timer = setTimeout(() => {
        setIsShaking(false);
      }, 450);
      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(timer);
      };
    } else {
      setIsShaking(false);
    }
  }, [error]);

  const defaultInputMode = props.inputMode || (
    type === 'tel' ? 'tel' :
    type === 'number' ? 'numeric' :
    type === 'email' ? 'email' : undefined
  );

  const formattedIcon = icon ? (icon.startsWith('fa-') ? icon : `fa-${icon}`) : '';

  const hasIcon = Boolean(formattedIcon);

  const handleSelectAll = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
      hapticFeedback.selection();
    }
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inputRef.current) {
      const start = inputRef.current.selectionStart ?? 0;
      const end = inputRef.current.selectionEnd ?? 0;
      const textToCopy = (start !== end) 
        ? inputRef.current.value.substring(start, end) 
        : inputRef.current.value;
      if (textToCopy) {
        try {
          await navigator.clipboard.writeText(textToCopy);
          hapticFeedback.light();
        } catch {
          document.execCommand('copy');
        }
      }
    }
  };

  const handleCut = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inputRef.current) {
      const start = inputRef.current.selectionStart ?? 0;
      const end = inputRef.current.selectionEnd ?? 0;
      const textToCut = (start !== end) 
        ? inputRef.current.value.substring(start, end) 
        : inputRef.current.value;
      if (textToCut) {
        try {
          await navigator.clipboard.writeText(textToCut);
        } catch {}
        const currentVal = inputRef.current.value;
        const nextVal = (start !== end) 
          ? (currentVal.substring(0, start) + currentVal.substring(end)) 
          : '';
        const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
        if (nativeSetter) {
          nativeSetter.call(inputRef.current, nextVal);
        } else {
          inputRef.current.value = nextVal;
        }
        inputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
        hapticFeedback.light();
      }
    }
  };

  const handlePaste = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inputRef.current) {
      try {
        const text = await navigator.clipboard.readText();
        if (text) {
          const start = inputRef.current.selectionStart ?? 0;
          const end = inputRef.current.selectionEnd ?? 0;
          const currentVal = inputRef.current.value;
          const nextVal = currentVal.substring(0, start) + text + currentVal.substring(end);
          const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
          if (nativeSetter) {
            nativeSetter.call(inputRef.current, nextVal);
          } else {
            inputRef.current.value = nextVal;
          }
          inputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
          hapticFeedback.light();
        }
      } catch {}
    }
  };

  return (
    <div className={`w-full relative ${wrapperClassName}`.trim()}>
      <div className="floating-group">
        <input
          ref={inputRef}
          type={type}
          inputMode={defaultInputMode}
          className={`form-input ${hasIcon ? 'has-icon' : ''} ${enableTextActions ? 'pr-28' : ''} ${error ? 'input-error' : ''} ${isShaking ? 'error-shake' : ''} ${className}`}
          placeholder=" "
          {...props}
        />
        {formattedIcon && (
          <i className={`fa-solid ${formattedIcon} form-input-icon ${isShaking ? 'error-shake' : ''} ${iconClassName}`}></i>
        )}
        {label && (
          <label className={`floating-label bg-white  px-2 z-20 ${labelClassName}`}>
            {label}
          </label>
        )}
        {enableTextActions && (
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1 z-20">
            <button
              type="button"
              onClick={handleSelectAll}
              className="w-6 h-6 rounded-md flex items-center justify-center text-gray-400 hover:text-gray-700 :text-gray-200 hover:bg-gray-100 :bg-gray-700/50 transition-colors cursor-pointer"
              title="সব সিলেক্ট করুন"
            >
              <i className="fa-solid fa-object-ungroup text-[11px]"></i>
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="w-6 h-6 rounded-md flex items-center justify-center text-gray-400 hover:text-gray-700 :text-gray-200 hover:bg-gray-100 :bg-gray-700/50 transition-colors cursor-pointer"
              title="কপি করুন"
            >
              <i className="fa-regular fa-copy text-[11px]"></i>
            </button>
            <button
              type="button"
              onClick={handleCut}
              className="w-6 h-6 rounded-md flex items-center justify-center text-gray-400 hover:text-gray-700 :text-gray-200 hover:bg-gray-100 :bg-gray-700/50 transition-colors cursor-pointer"
              title="কাট করুন"
            >
              <i className="fa-solid fa-scissors text-[11px]"></i>
            </button>
            <button
              type="button"
              onClick={handlePaste}
              className="w-6 h-6 rounded-md flex items-center justify-center text-gray-400 hover:text-gray-700 :text-gray-200 hover:bg-gray-100 :bg-gray-700/50 transition-colors cursor-pointer"
              title="পেস্ট করুন"
            >
              <i className="fa-regular fa-clipboard text-[11px]"></i>
            </button>
          </div>
        )}
        {children}
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1.5 ml-1 text-left font-bold animate-fade-in flex items-start gap-1">
          <i className="fa-solid fa-circle-exclamation mt-0.5"></i>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;

