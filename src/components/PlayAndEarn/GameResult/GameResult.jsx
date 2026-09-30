import React from 'react';
import { GAME_CONFIG } from '../../../data/mockData';
import styles from '../Game.module.css';

export const GameResult = ({
  score = 0,
  profile,
  onPlayAgain,
  onBackToDashboard,
  attemptsLeft = 4
}) => {
  // Determine tier rewards based on score
  const tier = GAME_CONFIG.tiers.find(t => score >= t.minScore) || GAME_CONFIG.tiers[GAME_CONFIG.tiers.length - 1];

  return (
    <div className={styles.resultScreen}>
      {/* Laurel Wreath Emblem (Panel 3 reference) */}
      <div className={styles.wreathEmblem}>
        <div className={styles.wreathGlow} />
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.wreathSvg}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="wreathGold" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFF4B8" />
              <stop offset="50%" stopColor="#F5C518" />
              <stop offset="100%" stopColor="#A6780C" />
            </linearGradient>
          </defs>

          {/* Left Laurel Branch */}
          <path
            d="M30 75C22 62 20 40 32 25M24 35C21 32 18 36 21 40M20 50C16 48 15 54 19 57M23 65C19 65 19 72 24 73"
            stroke="url(#wreathGold)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Right Laurel Branch */}
          <path
            d="M70 75C78 62 80 40 68 25M76 35C79 32 82 36 79 40M80 50C84 48 85 54 81 57M77 65C81 65 81 72 76 73"
            stroke="url(#wreathGold)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Central Radiant 5-Point Star */}
          <path
            d="M50 18L58 35L77 36L62 49L67 67L50 56L33 67L38 49L23 36L42 35L50 18Z"
            fill="url(#wreathGold)"
            filter="drop-shadow(0 0 8px rgba(245, 197, 24, 0.6))"
          />
        </svg>
      </div>

      <h2 className={styles.resultTitle}>CHALLENGE COMPLETE!</h2>
      <p className={styles.resultRating}>{tier.rating}</p>

      {/* Score and Reward Card */}
      <div className={styles.resultScoreCard}>
        <div className={styles.scoreRowResult}>
          <span className={styles.scoreLabel}>FINAL SCORE:</span>
          <span className={styles.finalScoreNumber}>{score}</span>
          <span className={styles.newBestPill}>New Best!</span>
        </div>

        <div className={styles.rewardsGridResult}>
          <div className={`${styles.rewardBox} ${styles.rewardBoxPurple}`}>
            <span className={styles.rewardBoxValue}>+{tier.xpReward} XP</span>
            <span className={styles.rewardBoxLabel}>Experience</span>
          </div>

          <div className={`${styles.rewardBox} ${styles.rewardBoxGold}`}>
            <span className={styles.rewardBoxValue}>+{tier.veReward} VEs</span>
            <span className={styles.rewardBoxLabel}>Your Reward</span>
          </div>
        </div>

        {/* Mini Level Progression Bar */}
        <div style={{ width: '100%', marginTop: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94A3B8', marginBottom: '4px' }}>
            <span>Level {String(profile.currentLevel).padStart(2, '0')}</span>
            <span>Level {String(profile.nextLevel).padStart(2, '0')}</span>
          </div>
          <div style={{ width: '100%', height: '6px', background: '#111322', borderRadius: '999px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${profile.progressPct}%`,
                height: '100%',
                background: 'var(--gold-gradient)',
                borderRadius: '999px'
              }}
            />
          </div>
          <div style={{ textAlign: 'center', fontSize: '10px', color: '#64748B', marginTop: '4px' }}>
            {profile.currentXP.toLocaleString()} / {profile.requiredXP.toLocaleString()} XP
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className={styles.resultActionButtons}>
        <button
          type="button"
          className={styles.playAgainBtn}
          onClick={onPlayAgain}
          disabled={attemptsLeft <= 0}
        >
          {attemptsLeft > 0 ? `Play Again (${attemptsLeft} left)` : 'No Attempts Left'}
        </button>

        <button
          type="button"
          className={styles.backDashboardBtn}
          onClick={onBackToDashboard}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default GameResult;
