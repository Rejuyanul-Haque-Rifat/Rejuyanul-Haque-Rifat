import React from 'react';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'default';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  icon?: string;
}

export default function Badge({ children, variant = 'default', size = 'sm', className = '', icon }: BadgeProps) {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-full transition-colors';
  
  const variants = {
    success: 'bg-green-100 text-green-700   border border-green-200 ',
    warning: 'bg-amber-100 text-amber-700   border border-amber-200 ',
    error: 'bg-red-100 text-red-700   border border-red-200 ',
    info: 'bg-blue-100 text-blue-700   border border-blue-200 ',
    default: 'bg-gray-100 text-gray-700   border border-gray-200 '
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5'
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
      {icon && <i className={`fa-solid ${icon} mr-1.5`}></i>}
      {children}
    </span>
  );
}

export function VerifiedBadge({ size = 17, title = 'ভেরিফাইড রক্তদাতা', className = '' }: { size?: number; title?: string; className?: string }) {
  const checkSize = Math.round(size * 0.588);
  return (
    <span className={`inline-flex items-center justify-center relative ml-1.5 shrink-0 select-none align-middle ${className}`} title={title}>
      <i className="fa-solid fa-certificate text-[#F59E0B] drop-shadow-sm" style={{ fontSize: `${size}px` }}></i>
      <i className="fa-solid fa-check absolute text-white fa-check-bold" style={{ fontSize: `${checkSize}px`, WebkitTextStroke: '1px currentColor' }}></i>
    </span>
  );
}

