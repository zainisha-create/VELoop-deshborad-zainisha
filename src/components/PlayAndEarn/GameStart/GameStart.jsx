import React from 'react';
import styles from '../Game.module.css';

export const GameStart = ({
  attemptsLeft = 5,
  onStart,
  onClose
}) => {
  return (
    <div className={styles.startScreen}>
      <button
        type="button"
        className={styles.closeModalBtn}
        onClick={onClose}
        aria-label="Close game modal"
      >
        ✕
      </button>

      <div className={styles.gameLogo}>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </div>

      <h2 className={styles.startTitle}>XP CATCHER</h2>
      <p className={styles.startSubtitle}>
        Catch as many falling XP orbs & VE coins as possible before the 20-second timer runs out!
      </p>

      {/* Rules & Objectives */}
      <div className={styles.rulesCard}>
        <div className={ruleRowStyle}>
          <div className={styles.ruleIcon}>🪙</div>
          <div>
            <strong>Gold Coins:</strong> +5 Pts • Boosts your reward wallet
          </div>
        </div>

        <div className={ruleRowStyle}>
          <div className={styles.ruleIcon}>🔮</div>
          <div>
            <strong>XP Orbs:</strong> +10 Pts • Directly powers level advancement
          </div>
        </div>

        <div className={ruleRowStyle}>
          <div className={styles.ruleIcon}>💎</div>
          <div>
            <strong>Prism Gems:</strong> +25 Pts • Multiplies score streak!
          </div>
        </div>

        <div className={ruleRowStyle}>
          <div className={styles.ruleIcon}>🎮</div>
          <div>
            <strong>Controls:</strong> Drag with touch/mouse or use Left / Right Arrow keys
          </div>
        </div>
      </div>

      <div className={styles.previewFooter} style={{ width: '100%', justifyContent: 'center', marginBottom: '16px' }}>
        <span className={styles.attemptsChip}>
          Daily attempts: <strong className={styles.attemptsActive}>{attemptsLeft} / 5 remaining</strong>
        </span>
      </div>

      <button
        type="button"
        className={styles.startBtn}
        onClick={onStart}
        disabled={attemptsLeft <= 0}
      >
        {attemptsLeft > 0 ? "Start 20s Challenge" : "Out of Attempts for Today"}
      </button>
    </div>
  );
};

const ruleRowStyle = styles.ruleRow;

export default GameStart;
