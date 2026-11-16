import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { motion, type Transition } from 'framer-motion';

export interface VerticalCutRevealRef {
  startAnimation: () => void;
  reset: () => void;
}

export interface VerticalCutRevealProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  text?: string;
  reverse?: boolean;
  transition?: Transition;
  splitBy?: 'words' | 'characters' | 'lines' | string;
  staggerDuration?: number;
  staggerFrom?: 'first' | 'last' | 'center' | 'random' | number;
  containerClassName?: string;
  wordLevelClassName?: string;
  elementLevelClassName?: string;
  delay?: number;
  autoStart?: boolean;
  onStart?: () => void;
  onComplete?: () => void;
}

interface WordObject {
  characters: string[];
  needsSpace: boolean;
}

export const VerticalCutReveal = forwardRef<VerticalCutRevealRef, VerticalCutRevealProps>(
  (
    {
      children,
      text: propText,
      reverse = false,
      delay = 0.15,
      transition = {
        type: 'spring',
        stiffness: 180,
        damping: 24,
      },
      splitBy = 'words',
      staggerDuration = 0.08,
      staggerFrom = 'first',
      containerClassName = '',
      wordLevelClassName = '',
      elementLevelClassName = '',
      autoStart = true,
      onClick,
      onStart,
      onComplete,
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLSpanElement>(null);
    const rawText = propText || (typeof children === 'string' ? children : children?.toString() || '');
    const [isAnimating, setIsAnimating] = useState(false);

    const splitIntoCharacters = (str: string): string[] => {
      if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
        // @ts-expect-error Intl.Segmenter is supported in modern browsers
        const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
        return Array.from(segmenter.segment(str), ({ segment }: { segment: string }) => segment);
      }
      return Array.from(str);
    };

    const elements = useMemo(() => {
      const words = rawText.split(' ');
      if (splitBy === 'characters') {
        return words.map((word, i) => ({
          characters: splitIntoCharacters(word),
          needsSpace: i !== words.length - 1,
        }));
      }
      return splitBy === 'words'
        ? rawText.split(' ')
        : splitBy === 'lines'
          ? rawText.split('\n')
          : rawText.split(splitBy);
    }, [rawText, splitBy]);

    const getStaggerDelay = useCallback(
      (index: number) => {
        const total =
          splitBy === 'characters'
            ? (elements as WordObject[]).reduce(
                (acc, word) => acc + word.characters.length + (word.needsSpace ? 1 : 0),
                0
              )
            : elements.length;

        if (staggerFrom === 'first') return index * staggerDuration;
        if (staggerFrom === 'last') return (total - 1 - index) * staggerDuration;
        if (staggerFrom === 'center') {
          const center = Math.floor(total / 2);
          return Math.abs(center - index) * staggerDuration;
        }
        if (staggerFrom === 'random') {
          return Math.floor(Math.random() * total) * staggerDuration;
        }
        return Math.abs(Number(staggerFrom) - index) * staggerDuration;
      },
      [elements, staggerFrom, staggerDuration, splitBy]
    );

    const startAnimation = useCallback(() => {
      setIsAnimating(true);
      onStart?.();
    }, [onStart]);

    useImperativeHandle(ref, () => ({
      startAnimation,
      reset: () => setIsAnimating(false),
    }));

    useEffect(() => {
      if (autoStart) {
        startAnimation();
      }
    }, [autoStart, startAnimation]);

    const variants = {
      hidden: { y: reverse ? '-110%' : '110%', opacity: 0 },
      visible: (i: number) => ({
        y: '0%',
        opacity: 1,
        transition: {
          ...transition,
          delay: delay + getStaggerDelay(i),
        },
      }),
    };

    return (
      <span
        ref={containerRef}
        onClick={onClick}
        className={`inline-flex flex-wrap whitespace-pre-wrap ${
          splitBy === 'lines' ? 'flex-col' : ''
        } ${containerClassName}`.trim()}
        {...props}
      >
        <span className="sr-only">{rawText}</span>
        {(splitBy === 'characters'
          ? (elements as WordObject[])
          : (elements as string[]).map((el, i) => ({
              characters: [el],
              needsSpace: i !== elements.length - 1,
            }))
        ).map((wordObj, wordIndex, array) => {
          const previousCharsCount = array
            .slice(0, wordIndex)
            .reduce((sum, word) => sum + word.characters.length, 0);

          return (
            <span
              key={wordIndex}
              aria-hidden="true"
              className={`inline-flex overflow-hidden py-0.5 ${wordLevelClassName}`.trim()}
            >
              {wordObj.characters.map((char, charIndex) => (
                <span
                  key={charIndex}
                  className={`relative inline-block whitespace-pre-wrap ${elementLevelClassName}`.trim()}
                >
                  <motion.span
                    custom={previousCharsCount + charIndex}
                    initial="hidden"
                    whileInView={isAnimating ? 'visible' : undefined}
                    animate={isAnimating ? 'visible' : 'hidden'}
                    viewport={{ once: true, margin: '-40px' }}
                    variants={variants}
                    onAnimationComplete={
                      wordIndex === elements.length - 1 &&
                      charIndex === wordObj.characters.length - 1
                        ? onComplete
                        : undefined
                    }
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                </span>
              ))}
              {wordObj.needsSpace && <span>&nbsp;</span>}
            </span>
          );
        })}
      </span>
    );
  }
);

VerticalCutReveal.displayName = 'VerticalCutReveal';
