import React, { useState, useRef, useEffect } from 'react';
import styles from './InfoTooltip.module.css';

/**
 * InfoTooltip Component
 * Accessible, keyboard-navigable information popup with smooth animation
 */
export const InfoTooltip = ({
  text,
  title,
  placement = 'top', // 'top' | 'bottom' | 'left' | 'right'
  className = '',
  size = 'md' // 'sm' | 'md'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className={`${styles.tooltipContainer} ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        className={`${styles.infoTrigger} ${styles[size]}`}
        aria-label="More information"
        aria-expanded={isOpen}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(prev => !prev);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.infoIcon}
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      </button>

      {isOpen && (
        <div
          role="tooltip"
          className={`${styles.tooltipBubble} ${styles[placement]}`}
        >
          {title && <div className={styles.tooltipTitle}>{title}</div>}
          <p className={styles.tooltipText}>{text}</p>
          <div className={styles.arrow} />
        </div>
      )}
    </div>
  );
};

export default InfoTooltip;
