import React from 'react';
import { InfoTooltip } from '../Tooltips/InfoTooltip';
import { TOOLTIP_COPY } from '../../data/mockData';
import styles from './TodaysBoost.module.css';

export const TodaysBoost = ({
  todaysBoost,
  onOpenTasks
}) => {
  const {
    xpEarnedToday = 215,
    xpDailyGoal = 300,
    tasksDone = 4,
    totalTasks = 8,
    streakDays = 7,
    streakMultiplier = "2X Multiplier"
  } = todaysBoost || {};

  const taskPct = Math.round((tasksDone / totalTasks) * 100);
  const xpGoalPct = Math.min(100, Math.round((xpEarnedToday / xpDailyGoal) * 100));

  return (
    <section className={styles.boostSection} aria-label="Today's Boost Statistics">
      <div className={styles.sectionHeader}>
        <div className={styles.titleRow}>
          <span className={styles.boltIcon}>⚡</span>
          <h2 className={styles.heading}>TODAY'S BOOST</h2>
        </div>
        <InfoTooltip text={TOOLTIP_COPY.boost} title="Daily Multipliers & Streaks" />
      </div>

      <div className={styles.boostGrid}>
        {/* Card 1: XP Earned */}
        <div className={`${styles.boostCard} ${styles.cardGold}`}>
          <div className={styles.cardHeader}>
            <div className={styles.iconCircle}>
              <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <span className={styles.statLabel}>XP Earned</span>
          </div>

          <div className={styles.metricRow}>
            <span className={styles.primaryMetric}>{xpEarnedToday}</span>
            <span className={styles.metricSub}>XP</span>
          </div>

          <div className={styles.miniProgressTrack}>
            <div className={styles.miniProgressFillGold} style={{ width: `${xpGoalPct}%` }} />
          </div>

          <div className={styles.cardFooter}>
            <span>Goal: {xpDailyGoal} XP</span>
            <span className={styles.badgeSuccess}>+{Math.max(0, xpEarnedToday - 180)} vs yesterday</span>
          </div>
        </div>

        {/* Card 2: Tasks Done */}
        <div
          className={`${styles.boostCard} ${styles.cardEmerald}`}
          onClick={onOpenTasks}
          role="button"
          tabIndex={0}
          title="Click to view daily tasks"
        >
          <div className={styles.cardHeader}>
            <div className={styles.iconCircle}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.icon}>
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                <polyline points="13 15 15 17 20 12" />
              </svg>
            </div>
            <span className={styles.statLabel}>Tasks Done</span>
          </div>

          <div className={styles.metricRow}>
            <span className={styles.primaryMetric}>{tasksDone}</span>
            <span className={styles.metricSub}>/ {totalTasks}</span>
          </div>

          <div className={styles.miniProgressTrack}>
            <div className={styles.miniProgressFillEmerald} style={{ width: `${taskPct}%` }} />
          </div>

          <div className={styles.cardFooter}>
            <span>{taskPct}% Completed</span>
            <span className={styles.linkText}>View Missions →</span>
          </div>
        </div>

        {/* Card 3: Streak */}
        <div className={`${styles.boostCard} ${styles.cardCoral}`}>
          <div className={styles.cardHeader}>
            <div className={styles.iconCircle}>
              <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
              </svg>
            </div>
            <span className={styles.statLabel}>Streak</span>
          </div>

          <div className={styles.metricRow}>
            <span className={styles.primaryMetric}>{streakDays}</span>
            <span className={styles.metricSub}>Days</span>
          </div>

          <div className={styles.streakDots}>
            {[1, 2, 3, 4, 5, 6, 7].map(day => (
              <span
                key={day}
                className={`${styles.streakDot} ${day <= streakDays ? styles.streakDotActive : ''}`}
                title={`Day ${day}`}
              />
            ))}
          </div>

          <div className={styles.cardFooter}>
            <span className={styles.multiplierBadge}>{streakMultiplier}</span>
            <span className={styles.streakTimeRemaining}>Reset in 6h</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TodaysBoost;
