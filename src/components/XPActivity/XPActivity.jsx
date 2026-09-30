import React, { useState } from 'react';
import { EmptyView } from '../StateViews/EmptyView';
import { InfoTooltip } from '../Tooltips/InfoTooltip';
import styles from './XPActivity.module.css';

export const XPActivity = ({
  activities = [],
  onStartEarning
}) => {
  const [filter, setFilter] = useState('All');

  const filteredActivities = activities.filter(item => {
    if (filter === 'All') return true;
    return item.category === filter;
  });

  // Calculate today's summary
  const totalXPEarned = activities.reduce((sum, a) => sum + (a.xpChange || 0), 0);
  const totalVEsEarned = activities.reduce((sum, a) => sum + (a.veChange || 0), 0);

  return (
    <section className={styles.activitySection} aria-label="Recent XP Activity">
      <div className={styles.sectionHeader}>
        <div className={styles.titleGroup}>
          <div className={styles.badgePill}>TRANSPARENCY</div>
          <h2 className={styles.heading}>Recent XP Activity</h2>
        </div>

        <div className={styles.headerRight}>
          {/* Category Filter Pills */}
          <div className={styles.filterPills}>
            {['All', 'Games', 'Tasks', 'Referral'].map(cat => (
              <button
                key={cat}
                type="button"
                className={`${styles.filterPill} ${filter === cat ? styles.filterPillActive : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <InfoTooltip
            text="Real-time audit log of all XP, VE tokens, and multipliers credited to your VELOOP account."
            title="Activity Ledger"
          />
        </div>
      </div>

      <div className={styles.activityCard}>
        {filteredActivities.length === 0 ? (
          <EmptyView variant="activity" onAction={onStartEarning} />
        ) : (
          <div className={styles.activityList}>
            {filteredActivities.map(item => {
              const isGold = item.rewardType === 'VEs' || item.veChange;
              return (
                <div key={item.id} className={styles.activityRow}>
                  {/* Category Icon */}
                  <div className={`${styles.iconContainer} ${isGold ? styles.iconGold : styles.iconPurple}`}>
                    {item.icon === 'users' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                      </svg>
                    )}
                    {item.icon === 'check-circle' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                    {item.icon === 'gamepad' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="6" width="20" height="12" rx="4" />
                        <path d="M6 12h4m-2-2v4" />
                      </svg>
                    )}
                    {item.icon === 'coins' && (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="9" />
                      </svg>
                    )}
                    {item.icon === 'flame' && (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                      </svg>
                    )}
                    {item.icon === 'star' && (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    )}
                    {item.icon === 'play' && (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    )}
                  </div>

                  {/* Title & Timestamp */}
                  <div className={styles.itemMeta}>
                    <div className={styles.titleText}>{item.title}</div>
                    <div className={styles.timeText}>{item.timestamp} • {item.description}</div>
                  </div>

                  {/* Reward Badge */}
                  <div className={styles.rewardPillContainer}>
                    {item.xpChange && (
                      <span className={styles.xpChangeBadge}>
                        +{item.xpChange} XP
                      </span>
                    )}
                    {item.veChange && (
                      <span className={styles.veChangeBadge}>
                        +{item.veChange} VEs
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Today's Summary Widget (Matching Panel 6 in PDF design) */}
        <div className={styles.summaryFooter}>
          <div className={styles.summaryTitle}>Today's Summary</div>
          <div className={styles.summaryBadgesRow}>
            <div className={styles.summaryChipPurple}>
              <div className={styles.summaryChipIcon}>XP</div>
              <div>
                <strong>+{totalXPEarned} XP</strong>
                <span>Total Earned</span>
              </div>
            </div>

            <div className={styles.summaryChipGold}>
              <div className={styles.summaryChipIconGold}>V</div>
              <div>
                <strong>+{totalVEsEarned} VEs</strong>
                <span>Total Earned</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default XPActivity;
