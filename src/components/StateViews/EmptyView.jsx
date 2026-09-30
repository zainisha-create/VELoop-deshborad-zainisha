import React from 'react';
import styles from './StateViews.module.css';

export const EmptyView = ({
  variant = 'activity', // 'activity' | 'game'
  onAction
}) => {
  if (variant === 'game') {
    return (
      <div className={styles.stateCard}>
        <div className={styles.iconCircleEmpty}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className={styles.emptyIcon}
            aria-hidden="true"
          >
            <rect x="2" y="6" width="20" height="12" rx="4" />
            <path d="M6 12h4m-2-2v4m10-2h.01m-3 2h.01" />
          </svg>
        </div>
        <h3 className={styles.title}>No Available Game</h3>
        <p className={styles.message}>New challenge coming soon. Check back tomorrow for fresh attempts!</p>
      </div>
    );
  }

  return (
    <div className={styles.stateCard}>
      <div className={styles.iconCircleEmpty}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className={styles.emptyIcon}
          aria-hidden="true"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </div>

      <h3 className={styles.title}>Your XP journey starts here.</h3>
      <p className={styles.message}>Complete daily tasks, play games, or invite friends to generate XP history.</p>

      {onAction && (
        <button
          type="button"
          className={styles.actionButton}
          onClick={onAction}
        >
          <span>Start Earning XP →</span>
        </button>
      )}
    </div>
  );
};

export default EmptyView;
