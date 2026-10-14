import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'warm' | 'slate' | 'success' | 'warning' | 'danger' | 'neutral';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold',
  };

  const variantClasses = {
    primary: 'bg-[#FBF2F4] text-[#7A152E] border border-[#F2DCE1]',
    secondary: 'bg-[#F1F7F4] text-[#2D5A43] border border-[#E1EFE7]',
    warm: 'bg-[#FAF6F0] text-[#8F6E41] border border-[#EFE7DC]',
    slate: 'bg-stone-100 text-stone-800 border border-stone-200',
    success: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200',
    danger: 'bg-red-50 text-red-800 border border-red-200',
    neutral: 'bg-stone-50 text-stone-600 border border-stone-200',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
