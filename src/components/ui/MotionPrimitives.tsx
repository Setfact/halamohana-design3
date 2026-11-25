import React from 'react';
import { motion } from 'framer-motion';

/**
 * Standard easing curve for luxury hospitality & architectural interfaces:
 * Swift initial movement with a long, serene settle and zero bounce.
 */
export const ARCHITECTURAL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface ArchitecturalRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
}

export const ArchitecturalReveal: React.FC<ArchitecturalRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 22,
  duration = 0.65,
}) => {
  const offset =
    direction === 'up'
      ? { y: distance, x: 0 }
      : direction === 'down'
        ? { y: -distance, x: 0 }
        : direction === 'left'
          ? { x: distance, y: 0 }
          : direction === 'right'
            ? { x: -distance, y: 0 }
            : { x: 0, y: 0 };

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration,
        delay,
        ease: ARCHITECTURAL_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ArchitecturalStaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
}

export const ArchitecturalStagger: React.FC<ArchitecturalStaggerProps> = ({
  children,
  className = '',
  staggerDelay = 0.08,
  delayChildren = 0.05,
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.06 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ArchitecturalStaggerItemProps {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}

export const ArchitecturalStaggerItem: React.FC<ArchitecturalStaggerItemProps> = ({
  children,
  className = '',
  distance = 18,
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: distance },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.58,
            ease: ARCHITECTURAL_EASE,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ImageFrameRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Editorial photography entrance: settles smoothly from subtle zoom into exact frame.
 */
export const ImageFrameReveal: React.FC<ImageFrameRevealProps> = ({
  children,
  className = '',
  delay = 0.1,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.045 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.85,
        delay,
        ease: ARCHITECTURAL_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface HairlineRuleProps {
  className?: string;
  accent?: boolean;
  delay?: number;
}

/**
 * Precision 1px architectural divider that draws smoothly from left to right.
 */
export const HairlineRule: React.FC<HairlineRuleProps> = ({
  className = '',
  accent = false,
  delay = 0.1,
}) => {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: ARCHITECTURAL_EASE }}
      className={`origin-left h-[1px] ${accent ? 'bg-[#8B1E24]' : 'bg-[#E5E5E5]'} ${className}`}
    />
  );
};
