import React from 'react';
import Button from '../ui/Button';
import { useRouter } from 'next/navigation';
import { hapticFeedback } from '../../utils/haptics';

interface PageHeaderProps {
  title: React.ReactNode;
  onBack?: () => void;
  className?: string;
  showBack?: boolean;
  fallbackPath?: string;
  rightElement?: React.ReactNode;
}

export default function PageHeader({
  title,
  onBack,
  className = '',
  showBack = true,
  fallbackPath = '/',
  rightElement
}: PageHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    hapticFeedback.light();
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <header className={`sub-page-header min-h-[60px] sm:min-h-[65px] flex items-center px-4 border-b border-white/10 ${className}`}>
      {showBack && (
        <button onClick={handleBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-white mr-3 transition-colors">
          <i className="fa-solid fa-arrow-left text-xl"></i>
        </button>
      )}
      <h1 className="text-lg font-bold text-white flex-1">{title}</h1>
      {rightElement}
    </header>
  );
}

