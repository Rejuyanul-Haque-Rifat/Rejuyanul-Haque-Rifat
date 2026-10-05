import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export function BKashLogo({ className = 'max-h-full max-w-full object-contain' }: LogoProps) {
  return (
    <img
      src="/icons/payment/bkash.png"
      alt="bKash"
      className={`select-none pointer-events-none ${className}`}
      loading="eager"
    />
  );
}

export function NagadLogo({ className = 'max-h-full max-w-full object-contain' }: LogoProps) {
  return (
    <img
      src="/icons/payment/nagad.png"
      alt="Nagad"
      className={`select-none pointer-events-none ${className}`}
      loading="eager"
    />
  );
}

export function RocketLogo({ className = 'max-h-full max-w-full object-contain' }: LogoProps) {
  return (
    <img
      src="/icons/payment/rocket.svg"
      alt="Rocket"
      className={`select-none pointer-events-none ${className}`}
      loading="eager"
    />
  );
}

export function UpayLogo({ className = 'max-h-full max-w-full object-contain' }: LogoProps) {
  return (
    <img
      src="/icons/payment/upay.svg"
      alt="upay"
      className={`select-none pointer-events-none ${className}`}
      loading="eager"
    />
  );
}

export function CellfinLogo({ className = 'max-h-full max-w-full object-contain' }: LogoProps) {
  return (
    <img
      src="/icons/payment/cellfin.png"
      alt="Cellfin"
      className={`select-none pointer-events-none ${className}`}
      loading="eager"
    />
  );
}

export function MCashLogo({ className = 'max-h-full max-w-full object-contain' }: LogoProps) {
  return (
    <img
      src="/icons/payment/mcash.png"
      alt="mCash"
      className={`select-none pointer-events-none ${className}`}
      loading="eager"
    />
  );
}

export function NexusPayLogo({ className = 'max-h-full max-w-full object-contain' }: LogoProps) {
  return (
    <img
      src="/icons/payment/nexuspay.png"
      alt="NexusPay"
      className={`select-none pointer-events-none ${className}`}
      loading="eager"
    />
  );
}

export function DBBLLogo({ className = 'max-h-full max-w-full object-contain' }: LogoProps) {
  return (
    <img
      src="/icons/payment/dbbl.svg"
      alt="Dutch-Bangla Bank"
      className={`select-none pointer-events-none ${className}`}
      loading="eager"
    />
  );
}

export function IBBLLogo({ className = 'max-h-full max-w-full object-contain' }: LogoProps) {
  return (
    <img
      src="/icons/payment/ibbl.png"
      alt="Islami Bank Bangladesh"
      className={`select-none pointer-events-none ${className}`}
      loading="eager"
    />
  );
}

export function AgraniBankLogo({ className = 'max-h-full max-w-full object-contain' }: LogoProps) {
  return (
    <img
      src="/icons/payment/agrani.png"
      alt="Agrani Bank"
      className={`select-none pointer-events-none ${className}`}
      loading="eager"
    />
  );
}

export function BanglaQRLogo({ className = 'max-h-full max-w-full object-contain' }: LogoProps) {
  return (
    <img
      src="/icons/payment/bangla-qr.svg"
      alt="Bangla QR"
      className={`select-none pointer-events-none ${className}`}
      loading="eager"
    />
  );
}

