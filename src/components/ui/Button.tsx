import React, { useRef } from 'react';
import { hapticFeedback } from '../../utils/haptics';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { 
  variant?: "primary" | "secondary" | "danger" | "success" | "outline" | "ghost" | "custom"; 
  size?: "small" | "medium" | "large" | "custom"; 
  isLoading?: boolean; 
  loadingText?: string; 
  showShimmer?: boolean; 
  spinnerOnly?: boolean; 
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  type = "button",
  variant = "custom",
  size = "custom",
  className = "", 
  isLoading = false, 
  loadingText = "প্রসেসিং...", 
  disabled = false,
  showShimmer = true,
  spinnerOnly = false,
  ...props 
}) => {
  const buttonRef = useRef(null);
  const [internalLoading, setInternalLoading] = React.useState(false);

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-tint-blue border-0",
    secondary: "bg-gray-100  text-gray-700  hover:bg-gray-200 :bg-gray-700 border border-gray-200 ",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-tint-red border-0",
    success: "bg-green-500 hover:bg-green-600 text-white shadow-tint-green border-0",
    outline: "bg-transparent border border-gray-200  text-gray-700  hover:bg-gray-50 :bg-gray-800",
    ghost: "bg-transparent text-gray-600  hover:bg-gray-100 :bg-gray-800 border-0",
    custom: ""
  };

  const sizes = {
    small: "py-1.5 px-3 text-xs rounded-lg",
    medium: "py-2.5 px-4 text-sm rounded-xl",
    large: "py-3 px-6 text-base rounded-2xl",
    custom: ""
  };

  const variantClasses = variants[variant] || variants.custom;
  const sizeClasses = sizes[size] || sizes.custom;

  const isCurrentlyLoading = isLoading || internalLoading;

  const isSmall = React.useMemo(() => {
    if (spinnerOnly) return true;
    if (size === 'small') return true;
    if (/(?:^|\s)(w-[56789]|w-1[012]|w-\[\d+px\]|h-[56789]|h-1[012]|h-\[\d+px\]|text-xs|text-\[\d+px\]|px-[123]|px-2\.5|p-1|p-1\.5|p-2|!p-0)(?:$|\s)/.test(className)) {
      return true;
    }
    let hasText = false;
    const checkText = (nodes) => {
      React.Children.forEach(nodes, child => {
        if (typeof child === 'string' && child.trim().length > 0) hasText = true;
        if (typeof child === 'number') hasText = true;
        if (React.isValidElement(child) && child.props && (child.props as any).children) {
          checkText((child.props as any).children);
        }
      });
    };
    checkText(children);
    return !hasText;
  }, [spinnerOnly, size, className, children]);

  const getAutoLoadingText = (childText, fallback) => {
    if (typeof childText !== 'string') return fallback;
    const text = childText.trim();
    if (text === 'সেভ করুন' || text === 'পরিবর্তন সেভ করুন') return 'সেভ হচ্ছে...';
    if (text === 'তৈরি করুন') return 'তৈরি হচ্ছে...';
    if (text === 'আপডেট করুন' || text === 'ফোর্স আপডেট করুন') return 'আপডেট হচ্ছে...';
    if (text === 'ডিলিট করুন' || text === 'ডিলিট' || text === 'হ্যাঁ, মুছুন' || text === 'রিমুভ করুন' || text === 'হ্যাঁ, ডিলিট করুন') return 'মোছা হচ্ছে...';
    if (text === 'লগইন') return 'লগইন হচ্ছে...';
    if (text === 'লগআউট') return 'লগআউট হচ্ছে...';
    if (text === 'রিসেট করুন') return 'রিসেট হচ্ছে...';
    if (text === 'সাবমিট করুন') return 'সাবমিট হচ্ছে...';
    if (text === 'সার্চ করুন' || text === 'খুঁজুন') return 'খোঁজা হচ্ছে...';
    if (text === 'যোগ করুন') return 'যোগ করা হচ্ছে...';
    if (text === 'অ্যাকাউন্ট খুলুন') return 'অ্যাকাউন্ট খোলা হচ্ছে...';
    if (text === 'স্ট্যাটাস চালু করুন') return 'চালু হচ্ছে...';
    if (text === 'পাবলিক করুন') return 'পাবলিক হচ্ছে...';
    if (text === 'হাইড করুন') return 'হাইড হচ্ছে...';
    return fallback;
  };

  const finalLoadingText = getAutoLoadingText(children, loadingText);

  const hasPosition = className.includes('absolute') || className.includes('fixed') || className.includes('relative') || className.includes('sticky');
  const positionClass = hasPosition ? '' : 'relative';

  const baseStructure = variant !== 'custom' ? 'inline-flex items-center justify-center font-bold gap-2' : '';

  const createRipple = (event) => {
    const button = buttonRef.current;
    if (!button) return;

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const rect = button.getBoundingClientRect();
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add("ripple-span");
    
    const existingRipple = button.querySelector(".ripple-span");
    if (existingRipple) {
      existingRipple.remove();
    }

    button.appendChild(circle);
    
    setTimeout(() => {
      circle.remove();
    }, 600);
  };

  const handleClick = (e) => {
    if (isCurrentlyLoading || disabled) return;
    if (variant === 'danger') {
      hapticFeedback.medium();
    } else {
      hapticFeedback.light();
    }
    createRipple(e);
    if (onClick) {
      const result = onClick(e) as any;
      if (result && typeof (result as any).then === 'function') {
        setInternalLoading(true);
        result.finally(() => setInternalLoading(false));
      }
    }
  };

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={handleClick}
      disabled={disabled}
      aria-disabled={disabled || isCurrentlyLoading}
      className={`${positionClass} overflow-hidden transition-all ${baseStructure} ${variantClasses} ${sizeClasses} ${className} ${(isCurrentlyLoading || disabled) ? 'opacity-80 cursor-not-allowed pointer-events-none' : 'active:scale-[0.98]'} outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus:ring-0`}
      {...props}
    >
      {showShimmer && !isCurrentlyLoading && !disabled && (
        <div className={`absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-transparent ${['primary', 'danger', 'success'].includes(variant) ? 'via-white/40' : 'via-white/40 '} to-transparent pointer-events-none animate-shimmer-btn`}></div>
      )}

      {isCurrentlyLoading ? (
        isSmall ? (
          <span className="flex items-center justify-center h-full w-full">
            <i className="fa-solid fa-spinner fa-spin text-[inherit]"></i>
          </span>
        ) : variant !== 'custom' ? (
          <>
            <span className="text-[inherit] font-[inherit]">{finalLoadingText}</span>
            <i className="fa-solid fa-spinner fa-spin"></i>
          </>
        ) : (
          <span className="flex items-center justify-center gap-2 h-full w-full">
            <span className="text-[inherit] font-[inherit]">{finalLoadingText}</span>
            <i className="fa-solid fa-spinner fa-spin"></i>
          </span>
        )
      ) : (
        variant !== 'custom' ? (
          <>{children}</>
        ) : (
          children
        )
      )}
    </button>
  );
};

export default Button;







