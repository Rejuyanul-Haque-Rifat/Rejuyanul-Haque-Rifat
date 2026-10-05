import React from 'react';
import { Check } from 'lucide-react';
import Badge from './Badge';
import { hapticFeedback } from '../../utils/haptics';

export interface PaymentChannelCardProps {
  id: string;
  name?: string;
  logo: React.ReactNode;
  isSelected: boolean;
  isActive?: boolean;
  showStatusBadge?: boolean;
  onClick: () => void;
  className?: string;
}

interface ChannelTheme {
  border: string;
  bg: string;
  checkBg: string;
  shadow: string;
  textColor: string;
}

const CHANNEL_THEMES: Record<string, ChannelTheme> = {
  bkash: {
    border: 'border-[#E2136E]',
    bg: 'bg-pink-50/70 ',
    checkBg: 'bg-[#E2136E] text-white',
    shadow: 'shadow-pink-500/15',
    textColor: 'text-[#E2136E] '
  },
  nagad: {
    border: 'border-[#F7941D]',
    bg: 'bg-orange-50/70 ',
    checkBg: 'bg-[#F7941D] text-white',
    shadow: 'shadow-orange-500/15',
    textColor: 'text-[#F7941D] '
  },
  rocket: {
    border: 'border-[#8C3494]',
    bg: 'bg-purple-50/70 ',
    checkBg: 'bg-[#8C3494] text-white',
    shadow: 'shadow-purple-500/15',
    textColor: 'text-[#8C3494] '
  },
  upay: {
    border: 'border-[#0054A6]',
    bg: 'bg-blue-50/70 ',
    checkBg: 'bg-[#0054A6] text-white',
    shadow: 'shadow-blue-500/15',
    textColor: 'text-[#0054A6] '
  },
  cellfin: {
    border: 'border-[#00843D]',
    bg: 'bg-emerald-50/70 ',
    checkBg: 'bg-[#00843D] text-white',
    shadow: 'shadow-emerald-500/15',
    textColor: 'text-[#00843D] '
  },
  mcash: {
    border: 'border-[#008752]',
    bg: 'bg-teal-50/70 ',
    checkBg: 'bg-[#008752] text-white',
    shadow: 'shadow-teal-500/15',
    textColor: 'text-[#008752] '
  },
  nexus_pay: {
    border: 'border-[#0070E0]',
    bg: 'bg-blue-50/70 ',
    checkBg: 'bg-[#0070E0] text-white',
    shadow: 'shadow-blue-500/15',
    textColor: 'text-[#0070E0] '
  },
  dbbl: {
    border: 'border-[#006633]',
    bg: 'bg-emerald-50/70 ',
    checkBg: 'bg-[#006633] text-white',
    shadow: 'shadow-emerald-500/15',
    textColor: 'text-[#006633] '
  },
  ibbl: {
    border: 'border-[#007A3D]',
    bg: 'bg-emerald-50/70 ',
    checkBg: 'bg-[#007A3D] text-white',
    shadow: 'shadow-emerald-500/15',
    textColor: 'text-[#007A3D] '
  },
  agrani: {
    border: 'border-[#008444]',
    bg: 'bg-emerald-50/70 ',
    checkBg: 'bg-[#008444] text-white',
    shadow: 'shadow-emerald-500/15',
    textColor: 'text-[#008444] '
  }
};

const DEFAULT_THEME: ChannelTheme = {
  border: 'border-[#0070E0]',
  bg: 'bg-[#EEF4FF] ',
  checkBg: 'bg-[#0070E0] text-white',
  shadow: 'shadow-blue-500/10',
  textColor: 'text-[#0070E0] '
};

export default function PaymentChannelCard({
  id,
  name,
  logo,
  isSelected,
  isActive,
  showStatusBadge = false,
  onClick,
  className = ''
}: PaymentChannelCardProps) {
  const theme = CHANNEL_THEMES[id] || DEFAULT_THEME;

  return (
    <button
      type="button"
      onClick={() => {
        hapticFeedback.selection();
        onClick();
      }}
      className={`relative rounded-2xl border-[2.5px] transition-all flex flex-col items-center justify-center cursor-pointer active:scale-95 shadow-2xs ${
        isSelected
          ? `${theme.border} ${theme.bg} shadow-xs ${theme.shadow}`
          : 'border-gray-200/80  bg-white  hover:border-gray-300 :border-white/20'
      } ${className}`}
    >
      {isSelected && (
        <div className={`absolute top-1.5 right-1.5 w-4 h-4 rounded-full ${theme.checkBg} flex items-center justify-center shadow-xs z-10 animate-scale-up`}>
          <Check className="w-2.5 h-2.5 stroke-[3]" />
        </div>
      )}

      <div className="w-full flex items-center justify-center p-0.5 flex-1 min-h-[32px]">
        {logo}
      </div>

      {name && (
        <span
          className={`text-[11px] font-bold truncate max-w-full px-1 text-center mt-1 leading-tight ${
            isSelected ? theme.textColor : 'text-gray-700 '
          }`}
        >
          {name}
        </span>
      )}

      {showStatusBadge && isActive !== undefined && (
        <div className="mt-1.5">
          <Badge
            variant={isActive ? 'success' : 'default'}
            size="sm"
            className="!text-[9px] !px-1.5 !py-0 leading-none"
          >
            {isActive ? 'চালু' : 'বন্ধ'}
          </Badge>
        </div>
      )}
    </button>
  );
}

