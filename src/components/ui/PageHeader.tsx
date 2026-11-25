import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { ARCHITECTURAL_EASE } from '@/components/ui/MotionPrimitives';

interface PageHeaderProps {
  title: string;
  category?: string;
  description?: string;
  breadcrumbs: { label: string; href?: string }[];
  onNavigate?: (path: string) => void;
  imageUrl?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  category,
  description,
  breadcrumbs,
  onNavigate,
  imageUrl = '/images/New-Asset/Hotel/Lobby.png',
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href?: string) => {
    if (!href) return;
    if (onNavigate && href.startsWith('/')) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  return (
    <div className="relative bg-[#0F1117] text-white py-16 sm:py-24 border-b border-stone-800 overflow-hidden text-left">
      {/* Architectural Photograph Backdrop with Calm Settle Motion */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={imageUrl}
          alt={title}
          initial={{ scale: 1.07, opacity: 0.14 }}
          animate={{ scale: 1, opacity: 0.28 }}
          transition={{ duration: 1.1, ease: ARCHITECTURAL_EASE }}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1117]/95 via-[#161217]/90 to-[#2A0E13]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 space-y-6">
        {/* Breadcrumb Trail */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: ARCHITECTURAL_EASE }}
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-stone-400 font-medium"
        >
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;

            return (
              <React.Fragment key={idx}>
                {idx > 0 && <ChevronRight className="h-3.5 w-3.5 text-stone-600 shrink-0" />}
                {isLast || !crumb.href ? (
                  <span className="text-white font-semibold">{crumb.label}</span>
                ) : (
                  <a
                    href={crumb.href}
                    onClick={(e) => handleClick(e, crumb.href)}
                    className="hover:text-white transition-colors"
                  >
                    {crumb.label}
                  </a>
                )}
              </React.Fragment>
            );
          })}
        </motion.nav>

        {/* Page Category Eyebrow & Title */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: ARCHITECTURAL_EASE }}
          className="max-w-3xl space-y-2"
        >
          {category && (
            <p className="text-xs tracking-widest uppercase text-neutral-400 font-medium">
              {category}
            </p>
          )}
          <h1 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight leading-tight">
            {title}
          </h1>
          {description && (
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-normal pt-1 max-w-2xl">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};
