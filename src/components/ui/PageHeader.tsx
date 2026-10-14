import React from 'react';
import { ChevronRight } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs: { label: string; href?: string }[];
  onNavigate?: (path: string) => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  breadcrumbs,
  onNavigate,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href?: string) => {
    if (!href) return;
    if (onNavigate && href.startsWith('/')) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  return (
    <div className="relative bg-[#141824] text-white py-16 sm:py-24 border-b border-stone-800 overflow-hidden">
      {/* Subtle architectural vignette background */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#141824] via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 space-y-4">
        {/* Breadcrumb Trail */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-stone-400 font-medium">
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;

            return (
              <React.Fragment key={idx}>
                {idx > 0 && <ChevronRight className="h-3.5 w-3.5 text-stone-600 shrink-0" />}
                {isLast || !crumb.href ? (
                  <span className="text-[#A68253] font-semibold">{crumb.label}</span>
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
        </nav>

        {/* Page Title & Narrative */}
        <div className="max-w-3xl space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            {title}
          </h1>
          {description && (
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-normal pt-1">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
