import React, { useEffect } from 'react';
import { LevelBadge } from '../Badges/LevelBadge';
import styles from './LevelUpModal.module.css';

export const LevelUpModal = ({
  levelUpData,
  onClaim,
  onClose
}) => {
  const targetLevel = levelUpData?.toLevel || 5;
  const reward = levelUpData?.reward || { amount: 500, type: 'VEs', bonusGems: 25 };

  // Lock body scroll while modal is active
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-labelledby="levelUpTitle">
      <div className={styles.modalContainer}>
        {/* Close Button */}
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close celebration modal"
        >
          ✕
        </button>

        {/* Ambient Celebration Light Rays */}
        <div className={styles.rayOfLight} aria-hidden="true" />
        <div className={styles.starburst} aria-hidden="true" />

        <div className={styles.celebrationContent}>
          {/* Headline */}
          <div className={styles.headerGroup}>
            <span className={styles.sparkleTag}>✨ MILESTONE UNLOCKED ✨</span>
            <h2 id="levelUpTitle" className={styles.celebrateHeading}>
              LEVEL UP!
            </h2>
            <p className={styles.reachText}>
              You've reached
            </p>
          </div>

          {/* Animated Badge Display */}
          <div className={styles.badgeShowcase}>
            <div className={styles.badgeBackdropGlow} />
            <LevelBadge
              level={targetLevel}
              size="xl"
              status="current"
            />
          </div>

          {/* Unlocked Reward Cards (Panel 5 reference) */}
          <div className={styles.rewardCardsGrid}>
            <div className={`${styles.rewardPillCard} ${styles.goldPill}`}>
              <div className={styles.coinStackIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <ellipse cx="12" cy="7" rx="8" ry="3" />
                  <path d="M4 7v5c0 1.66 3.58 3 8 3s8-1.34 8-3V7" />
                  <path d="M4 12v5c0 1.66 3.58 3 8 3s8-1.34 8-3v-5" />
                </svg>
              </div>
              <div className={styles.rewardPillInfo}>
                <span className={styles.rewardValue}>+{reward.amount.toLocaleString()} VEs</span>
                <span className={styles.rewardSub}>Added to Wallet</span>
              </div>
            </div>

            {reward.bonusGems && (
              <div className={`${styles.rewardPillCard} ${styles.purplePill}`}>
                <div className={styles.gemIcon}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="6 3 18 3 22 9 12 22 2 9 6 3" />
                  </svg>
                </div>
                <div className={styles.rewardPillInfo}>
                  <span className={styles.rewardValue}>+{reward.bonusGems} Gems</span>
                  <span className={styles.rewardSub}>Premium Tokens</span>
                </div>
              </div>
            )}
          </div>

          {/* Unlocked Perks List */}
          <div className={styles.perksListCard}>
            <div className={styles.perkItem}>
              <span className={styles.perkIcon}>📈</span>
              <span>Higher daily XP limit (+25%)</span>
            </div>
            <div className={styles.perkItem}>
              <span className={styles.perkIcon}>🎯</span>
              <span>Access to new Tier-{targetLevel} challenges</span>
            </div>
            <div className={styles.perkItem}>
              <span className={styles.perkIcon}>🎁</span>
              <span>Better VIP reward opportunities & multipliers</span>
            </div>
          </div>

          {/* Claim CTA */}
          <button
            type="button"
            className={styles.claimButton}
            onClick={onClaim}
          >
            <span>Claim Rewards</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.btnArrow}>
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LevelUpModal;
