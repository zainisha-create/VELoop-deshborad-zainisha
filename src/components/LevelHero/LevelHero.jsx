import React, { useEffect, useState, useRef } from 'react';
import { LevelBadge } from '../Badges/LevelBadge';
import { InfoTooltip } from '../Tooltips/InfoTooltip';
import { TOOLTIP_COPY } from '../../data/mockData';
import styles from './LevelHero.module.css';

export const LevelHero = ({
  profile,
  onOpenArcade,
  onOpenWaysToEarn
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [displayedXP, setDisplayedXP] = useState(0);
  const animFrameRef = useRef(null);

  useEffect(() => {
    // Animate progress smoothly on mount or when profile.progressPct changes
    const timer = setTimeout(() => {
      setAnimatedProgress(profile.progressPct);
    }, 150);

    // Number counting animation for XP
    const startXP = 0;
    const endXP = profile.currentXP;
    const duration = 1200;
    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayedXP(Math.floor(easeProgress * (endXP - startXP) + startXP));

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      }
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      clearTimeout(timer);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [profile.progressPct, profile.currentXP]);

  const formattedLevel = String(profile.currentLevel).padStart(2, '0');
  const formattedNextLevel = String(profile.nextLevel).padStart(2, '0');

  return (
    <section className={styles.heroSection} aria-label="Level Progress Summary">
      {/* Background Decorative Aura */}
      <div className={styles.heroBackgroundAura} aria-hidden="true" />

      {/* Greeting and Header Bar */}
      <div className={styles.greetingHeader}>
        <div>
          <h1 className={styles.greetingTitle}>
            Good Morning, <span className="text-gold-gradient">{profile.username}!</span>
          </h1>
          <p className={styles.greetingSubtitle}>
            Level up your journey and unlock epic rewards every day.
          </p>
        </div>

        <div className={styles.levelTagPill}>
          <span className={styles.pulseDot} />
          <span>Tier {profile.currentLevel} • {profile.levelTitle}</span>
          <InfoTooltip text={TOOLTIP_COPY.level} title="Platform Level System" />
        </div>
      </div>

      {/* Main Premium Level Card (Matches page 33 reference design) */}
      <div className={styles.levelCard}>
        <div className={styles.cardGlowBorder} />
        
        <div className={styles.cardInner}>
          <div className={styles.badgeColumn}>
            <LevelBadge
              level={profile.currentLevel}
              size="lg"
              status="current"
            />
          </div>

          <div className={styles.progressColumn}>
            {/* Top Metrics Row */}
            <div className={styles.metricsTopRow}>
              <div className={styles.currentXPBlock}>
                <div className={styles.labelWithTooltip}>
                  <span className={styles.metricLabel}>CURRENT XP</span>
                  <InfoTooltip text={TOOLTIP_COPY.xp} size="sm" />
                </div>
                <div className={styles.xpNumberRow}>
                  <span className={styles.xpBigValue}>
                    {displayedXP.toLocaleString()}
                  </span>
                  <span className={styles.xpUnit}>XP</span>
                </div>
              </div>

              <div className={styles.targetBlock}>
                <span className={styles.targetLabel}>TO REACH LEVEL {formattedNextLevel}</span>
                <span className={styles.neededXPBadge}>
                  <strong>{profile.xpToNext.toLocaleString()} XP</strong> remaining
                </span>
              </div>
            </div>

            {/* XP Progress Bar (Highly Visual Fintech Bar) */}
            <div className={styles.progressBarSection}>
              <div className={styles.progressTrackWrapper}>
                <div
                  className={styles.progressTrack}
                  role="progressbar"
                  aria-valuenow={profile.progressPct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className={styles.progressFill}
                    style={{ width: `${animatedProgress}%` }}
                  >
                    <div className={styles.progressShimmer} />
                  </div>
                </div>

                {/* Animated Percentage Badge on the bar */}
                <div
                  className={styles.progressThumbPill}
                  style={{ left: `clamp(24px, ${animatedProgress}%, calc(100% - 24px))` }}
                >
                  <span>{Math.round(animatedProgress)}%</span>
                  <div className={styles.thumbArrow} />
                </div>
              </div>

              {/* Progress Bar Footer Labels */}
              <div className={styles.progressFooterLabels}>
                <span className={styles.startLevelLabel}>
                  Level {formattedLevel} ({profile.baseLevelXP.toLocaleString()} XP)
                </span>
                <span className={styles.progressFractionLabel}>
                  <strong>{profile.currentXP.toLocaleString()}</strong> / {profile.requiredXP.toLocaleString()} XP
                </span>
                <span className={styles.endLevelLabel}>
                  Level {formattedNextLevel} ({profile.requiredXP.toLocaleString()} XP)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Bar under Hero Card */}
        <div className={styles.heroFooterActions}>
          <div className={styles.recommendationSnippet}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.sparkleIcon}>
              <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z" />
            </svg>
            <span>
              You're only <strong>{profile.xpToNext.toLocaleString()} XP</strong> away from Level {formattedNextLevel}!
            </span>
          </div>

          <div className={styles.ctaButtonGroup}>
            <button
              type="button"
              className={styles.playHeroBtn}
              onClick={onOpenArcade}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className={styles.btnIcon}>
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <span>Play & Earn XP</span>
            </button>

            <button
              type="button"
              className={styles.waysHeroBtn}
              onClick={onOpenWaysToEarn}
            >
              <span>View Ways to Earn →</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LevelHero;
