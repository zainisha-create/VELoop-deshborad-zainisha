import React from 'react';
import styles from './LevelBadge.module.css';

/**
 * LevelBadge Component
 * Premium metallic fintech hexagon/shield badge based on VELOOP design reference
 */
export const LevelBadge = ({
  level = 5,
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  status = 'current', // 'completed' | 'current' | 'next' | 'locked'
  showStatusGlow = true,
  className = ''
}) => {
  const formattedLevel = String(level).padStart(2, '0');
  const isLocked = status === 'locked';
  const isCompleted = status === 'completed';

  // Tier color schemes
  const getBadgeColors = (lvl) => {
    if (lvl <= 2) return { main: '#A0AEC0', border: '#CBD5E0', glow: 'rgba(160, 174, 192, 0.4)' }; // Bronze/Silver
    if (lvl <= 4) return { main: '#E2E8F0', border: '#FFFFFF', glow: 'rgba(226, 232, 240, 0.5)' }; // Platinum
    if (lvl <= 6) return { main: '#F5C518', border: '#FFE071', glow: 'rgba(245, 197, 24, 0.55)' }; // Gold
    if (lvl <= 8) return { main: '#06B6D4', border: '#67E8F9', glow: 'rgba(6, 182, 212, 0.55)' }; // Diamond Cyan
    return { main: '#C084FC', border: '#E9D5FF', glow: 'rgba(192, 132, 252, 0.6)' }; // Mythic Purple
  };

  const colors = getBadgeColors(level);

  return (
    <div
      className={`${styles.badgeWrapper} ${styles[size]} ${styles[status]} ${className}`}
      data-level={level}
      data-status={status}
    >
      {/* Background Ambient Glow */}
      {showStatusGlow && !isLocked && (
        <div
          className={styles.glowAura}
          style={{ '--badge-glow': colors.glow }}
        />
      )}

      <svg
        viewBox="0 0 100 114"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svgBadge}
        aria-hidden="true"
      >
        <defs>
          {/* Metallic Gold Gradient */}
          <linearGradient id={`goldBorder_${level}`} x1="0" y1="0" x2="100" y2="114" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF2A3" />
            <stop offset="35%" stopColor="#F5C518" />
            <stop offset="70%" stopColor="#A6780C" />
            <stop offset="100%" stopColor="#FFD953" />
          </linearGradient>

          {/* Locked Silver Gradient */}
          <linearGradient id="lockedBorder" x1="0" y1="0" x2="100" y2="114" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#64748B" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          {/* Inner Badge Core Gradient */}
          <radialGradient id={`coreGrad_${level}`} cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#1E233D" />
            <stop offset="70%" stopColor="#121424" />
            <stop offset="100%" stopColor="#0B0D17" />
          </radialGradient>

          {/* Top Sheen */}
          <linearGradient id="topSheen" x1="50" y1="0" x2="50" y2="45" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Outer Hexagon Shield Path */}
        <path
          d="M50 4L94 28V84L50 110L6 84V28L50 4Z"
          fill={`url(#coreGrad_${level})`}
          stroke={isLocked ? 'url(#lockedBorder)' : `url(#goldBorder_${level})`}
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Inner Engraved Accent Border */}
        <path
          d="M50 10L88 31V81L50 104L12 81V31L50 10Z"
          fill="none"
          stroke={isLocked ? 'rgba(255,255,255,0.06)' : 'rgba(245, 197, 24, 0.35)'}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Top Glass Reflection */}
        <path
          d="M50 8L86 29V52L50 36L14 52V29L50 8Z"
          fill="url(#topSheen)"
        />

        {/* Star / Crest Motif on top */}
        {!isLocked && (
          <path
            d="M50 14L52 19L57 19.5L53.5 23L54.5 28L50 25.5L45.5 28L46.5 23L43 19.5L48 19L50 14Z"
            fill={colors.main}
            opacity="0.9"
          />
        )}

        {/* Completed Checkmark on bottom node */}
        {isCompleted && (
          <circle cx="50" cy="98" r="7" fill="#10B981" />
        )}
        {isCompleted && (
          <path
            d="M47 98L49 100L53 96"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>

      {/* Badge Content Overlay */}
      <div className={styles.badgeContent}>
        {isLocked ? (
          <div className={styles.lockedIconContainer}>
            <svg
              className={styles.lockIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span className={styles.lockedLabel}>LVL {formattedLevel}</span>
          </div>
        ) : (
          <div className={styles.levelInfo}>
            <span className={styles.levelPrefix}>LEVEL</span>
            <span className={styles.levelNumber}>{formattedLevel}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LevelBadge;
