import React, { useState } from 'react';
import { InfoTooltip } from '../Tooltips/InfoTooltip';
import styles from './EarnMoreXP.module.css';

export const EarnMoreXP = ({
  earningFeatures,
  profile,
  onClaimFeature,
  onLaunchGame
}) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [claimedNotice, setClaimedNotice] = useState(null);

  const handleCardClick = (feature) => {
    if (feature.isComingSoon) return;

    if (feature.id === 'xp_catcher') {
      onLaunchGame?.();
      return;
    }

    if (feature.status === 'claimed') return;

    onClaimFeature?.(feature.id);
    setClaimedNotice(`Claimed ${feature.rewardText} from ${feature.title}!`);
    setTimeout(() => setClaimedNotice(null), 3000);
  };

  const filteredFeatures = earningFeatures.filter(item => {
    if (activeFilter === 'available') return !item.isComingSoon && item.status !== 'claimed';
    if (activeFilter === 'coming_soon') return item.isComingSoon;
    return true;
  });

  return (
    <section className={styles.earnSection} aria-label="Earn More XP and Rewards">
      {/* Section Header */}
      <div className={styles.sectionHeader}>
        <div className={styles.titleGroup}>
          <div className={styles.badgePill}>EARN & LEVEL UP</div>
          <h2 className={styles.heading}>Earn More XP & Rewards</h2>
        </div>

        <div className={styles.headerRight}>
          <span className={styles.subtext}>Explore fun activities and earn exciting rewards</span>
          <InfoTooltip
            text="Complete these activities to earn extra XP and accelerate your level progression. Unsupported items are marked Coming Soon."
            title="Earning Mechanisms"
          />
        </div>
      </div>

      {/* Personalized Recommendation Banner (Requirement #15 & #25) */}
      <div className={styles.recommendationBanner}>
        <div className={styles.recIconCircle}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.recIcon}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>

        <div className={styles.recContent}>
          <div className={styles.recTitle}>
            You're only <span className="text-gold-gradient">{profile.xpToNext.toLocaleString()} XP</span> away from Level {String(profile.nextLevel).padStart(2, '0')}.
          </div>
          <div className={styles.recSubtitle}>
            Complete today's challenges or play the XP Catcher arcade to unlock your +{profile.nextLevelReward.amount} {profile.nextLevelReward.type} reward vault!
          </div>
        </div>

        <button
          type="button"
          className={styles.recCtaBtn}
          onClick={onLaunchGame}
        >
          <span>Play XP Catcher →</span>
        </button>
      </div>

      {/* Claimed Toast Notice */}
      {claimedNotice && (
        <div className={styles.toastNotice} role="status">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{claimedNotice}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className={styles.filterTabs}>
        <button
          type="button"
          className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.filterBtnActive : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All Opportunities ({earningFeatures.length})
        </button>
        <button
          type="button"
          className={`${styles.filterBtn} ${activeFilter === 'available' ? styles.filterBtnActive : ''}`}
          onClick={() => setActiveFilter('available')}
        >
          Available Today
        </button>
        <button
          type="button"
          className={`${styles.filterBtn} ${activeFilter === 'coming_soon' ? styles.filterBtnActive : ''}`}
          onClick={() => setActiveFilter('coming_soon')}
        >
          Coming Soon
        </button>
      </div>

      {/* 6 Feature Cards Grid (Matches Panels 1 & 4 of page 33) */}
      <div className={styles.featuresGrid}>
        {filteredFeatures.map(item => {
          const isComingSoon = item.isComingSoon;
          const isClaimed = item.status === 'claimed';

          return (
            <div
              key={item.id}
              className={`${styles.featureCard} ${styles[`card_${item.accentColor}`]} ${isComingSoon ? styles.cardComingSoon : ''} ${isClaimed ? styles.cardClaimed : ''}`}
              onClick={() => handleCardClick(item)}
              role="button"
              tabIndex={isComingSoon ? -1 : 0}
              aria-disabled={isComingSoon}
            >
              <div className={styles.cardTopRow}>
                {/* Custom Vector Icon for each activity */}
                <div className={styles.featureIconBox}>
                  {item.icon === 'play' && (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  )}
                  {item.icon === 'check-circle' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  )}
                  {item.icon === 'users' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  )}
                  {item.icon === 'gamepad' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="6" y1="12" x2="10" y2="12" />
                      <line x1="8" y1="10" x2="8" y2="14" />
                      <line x1="15" y1="13" x2="15.01" y2="13" />
                      <line x1="18" y1="11" x2="18.01" y2="11" />
                      <rect x="2" y="6" width="20" height="12" rx="4" />
                    </svg>
                  )}
                  {item.icon === 'dices' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <circle cx="15.5" cy="8.5" r="1.5" />
                      <circle cx="15.5" cy="15.5" r="1.5" />
                      <circle cx="8.5" cy="15.5" r="1.5" />
                      <circle cx="12" cy="12" r="1.5" />
                    </svg>
                  )}
                  {item.icon === 'flame' && (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                    </svg>
                  )}
                </div>

                <div className={styles.rewardTag}>
                  {item.rewardText}
                </div>
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardSubtitle}>{item.subtitle}</p>
                <p className={styles.cardDetails}>{item.details}</p>
              </div>

              <div className={styles.cardActionRow}>
                <span className={styles.ctaLabel}>
                  {isComingSoon
                    ? "Coming Soon"
                    : isClaimed
                    ? "Claimed Today ✓"
                    : item.ctaText}
                </span>
                {!isComingSoon && !isClaimed && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.arrowIcon}>
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default EarnMoreXP;
