import React, { useState } from 'react';
import { InfoTooltip } from '../Tooltips/InfoTooltip';
import { TOOLTIP_COPY } from '../../data/mockData';
import styles from './NextLevelReward.module.css';

export const NextLevelReward = ({
  profile,
  onInspectReward
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { nextLevel, nextLevelReward, xpToNext } = profile;
  const formattedNextLevel = String(nextLevel).padStart(2, '0');

  return (
    <section className={styles.rewardSection} aria-label="Next Level Reward Preview">
      <div className={styles.sectionHeader}>
        <div className={styles.titleGroup}>
          <h2 className={styles.sectionHeading}>
            LEVEL {formattedNextLevel} REWARDS
          </h2>
          <span className={styles.subtitle}>Amazing rewards await you!</span>
        </div>
        <InfoTooltip text={TOOLTIP_COPY.reward} title="Next Level Reward" />
      </div>

      <div
        className={styles.rewardBannerCard}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={styles.bannerGlow} />

        <div className={styles.contentLeft}>
          <div className={styles.statusPill}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.lockIcon}>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>Reach Level {formattedNextLevel} to Unlock</span>
          </div>

          <h3 className={styles.rewardTitle}>
            +{nextLevelReward.amount.toLocaleString()} {nextLevelReward.type}
            {nextLevelReward.bonusGems && (
              <span className={styles.bonusBadge}>+{nextLevelReward.bonusGems} Gems</span>
            )}
          </h3>

          <p className={styles.requirementText}>
            Progress with activities and arcades to bridge the remaining{' '}
            <strong>{xpToNext.toLocaleString()} XP</strong>.
          </p>

          <div className={styles.actionRow}>
            <button
              type="button"
              className={styles.viewRewardsBtn}
              onClick={onInspectReward}
            >
              <span>View Rewards</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.arrowIcon}>
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            <span className={styles.perkNote}>3 Exclusive Perks Included</span>
          </div>
        </div>

        {/* Vault / Treasure Chest Graphic (Fintech style with golden glow) */}
        <div className={styles.vaultContainer}>
          <div className={`${styles.vaultVisual} ${isHovered ? styles.vaultVisualHover : ''}`}>
            {/* Glowing Chest / Vault Illustration */}
            <svg
              viewBox="0 0 160 140"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.chestSvg}
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="chestGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#F5C518" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#161827" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="goldVault" x1="0" y1="0" x2="160" y2="140" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFF4B8" />
                  <stop offset="40%" stopColor="#F5C518" />
                  <stop offset="80%" stopColor="#B47B0E" />
                  <stop offset="100%" stopColor="#6C4505" />
                </linearGradient>
                <linearGradient id="bodyDark" x1="0" y1="0" x2="160" y2="140" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#2A2F4C" />
                  <stop offset="100%" stopColor="#16192C" />
                </linearGradient>
              </defs>

              {/* Ambient Radial Backlight */}
              <circle cx="80" cy="70" r="60" fill="url(#chestGlow)" />

              {/* Chest Body Base */}
              <rect x="25" y="55" width="110" height="65" rx="10" fill="url(#bodyDark)" stroke="url(#goldVault)" strokeWidth="3" />
              {/* Chest Lid */}
              <path d="M22 55C22 36 45 25 80 25C115 25 138 36 138 55H22Z" fill="url(#bodyDark)" stroke="url(#goldVault)" strokeWidth="3" />

              {/* Decorative Gold Metal Straps */}
              <rect x="42" y="27" width="12" height="92" rx="2" fill="url(#goldVault)" />
              <rect x="106" y="27" width="12" height="92" rx="2" fill="url(#goldVault)" />

              {/* Center Lock Core */}
              <circle cx="80" cy="62" r="14" fill="#0E101D" stroke="url(#goldVault)" strokeWidth="3" />
              <circle cx="80" cy="62" r="6" fill="#F5C518" />
              <path d="M80 64V71" stroke="#161827" strokeWidth="2.5" strokeLinecap="round" />

              {/* Floating VE Coins / Sparkles */}
              <circle cx="30" cy="30" r="5" fill="#FFE27A" opacity="0.8" />
              <circle cx="135" cy="35" r="4" fill="#9333EA" opacity="0.9" />
              <circle cx="140" cy="85" r="6" fill="#FFE27A" opacity="0.85" />
              <path d="M78 8L80 14L86 16L80 18L78 24L76 18L70 16L76 14L78 8Z" fill="#F5C518" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NextLevelReward;
