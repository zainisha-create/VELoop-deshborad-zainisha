import React, { useState } from 'react';
import styles from './DevBar.module.css';

export const DevBar = ({
  dashboardState,
  onChangeState,
  onAddXP,
  onTriggerLevelUp,
  onResetData
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`${styles.devBarWrapper} ${isExpanded ? styles.expanded : styles.collapsed}`}>
      <button
        type="button"
        className={styles.togglePill}
        onClick={() => setIsExpanded(prev => !prev)}
        aria-label="Toggle Demo State Controls"
      >
        <span className={styles.gearIcon}>⚙️</span>
        <span className={styles.toggleText}>Reviewer Mode: <strong>{dashboardState.toUpperCase()}</strong></span>
        <span className={styles.arrow}>{isExpanded ? '▼' : '▲'}</span>
      </button>

      {isExpanded && (
        <div className={styles.panelContent}>
          <div className={styles.group}>
            <span className={styles.groupLabel}>UI STATE CHECK:</span>
            <div className={styles.buttonRow}>
              <button
                type="button"
                className={`${styles.stateBtn} ${dashboardState === 'normal' ? styles.active : ''}`}
                onClick={() => onChangeState('normal')}
              >
                Normal
              </button>
              <button
                type="button"
                className={`${styles.stateBtn} ${dashboardState === 'loading' ? styles.active : ''}`}
                onClick={() => onChangeState('loading')}
              >
                Loading (Skeleton)
              </button>
              <button
                type="button"
                className={`${styles.stateBtn} ${dashboardState === 'error' ? styles.active : ''}`}
                onClick={() => onChangeState('error')}
              >
                Error State
              </button>
              <button
                type="button"
                className={`${styles.stateBtn} ${dashboardState === 'empty' ? styles.active : ''}`}
                onClick={() => onChangeState('empty')}
              >
                Empty State
              </button>
            </div>
          </div>

          <div className={styles.group}>
            <span className={styles.groupLabel}>TEST PROGRESSION:</span>
            <div className={styles.buttonRow}>
              <button
                type="button"
                className={styles.actionBtn}
                onClick={() => onAddXP(100, 'Test Bonus +100 XP')}
              >
                +100 XP
              </button>
              <button
                type="button"
                className={styles.actionBtn}
                onClick={() => onAddXP(500, 'Mission Sprint +500 XP')}
              >
                +500 XP
              </button>
              <button
                type="button"
                className={styles.levelUpBtn}
                onClick={onTriggerLevelUp}
              >
                🎉 Trigger Level-Up!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DevBar;
