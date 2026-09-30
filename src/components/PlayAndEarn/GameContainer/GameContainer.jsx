import React, { useState } from 'react';
import { GameStart } from '../GameStart/GameStart';
import { GamePlay } from '../GamePlay/GamePlay';
import { GameResult } from '../GameResult/GameResult';
import { InfoTooltip } from '../../Tooltips/InfoTooltip';
import { TOOLTIP_COPY, GAME_CONFIG } from '../../../data/mockData';
import styles from '../Game.module.css';

export const GameContainer = ({
  profile,
  onRewardEarned,
  soundEffects,
  isGameAvailable = true,
  isOpenByDefault = false,
  onCloseExternal
}) => {
  // Game states: 'idle' | 'start' | 'playing' | 'result'
  const [gameState, setGameState] = useState(isOpenByDefault ? 'start' : 'idle');
  const [attemptsLeft, setAttemptsLeft] = useState(GAME_CONFIG.maxDailyAttempts);
  const [lastScore, setLastScore] = useState(0);

  const handleOpenGame = () => {
    if (attemptsLeft <= 0) return;
    setGameState('start');
  };

  const handleCloseModal = () => {
    setGameState('idle');
    onCloseExternal?.();
  };

  const handleStartGame = () => {
    setGameState('playing');
  };

  const handleFinishGame = (finalScore) => {
    setLastScore(finalScore);
    const newAttempts = Math.max(0, attemptsLeft - 1);
    setAttemptsLeft(newAttempts);

    // Calculate reward tier
    const tier = GAME_CONFIG.tiers.find(t => finalScore >= t.minScore) || GAME_CONFIG.tiers[GAME_CONFIG.tiers.length - 1];

    // Award XP and VEs to user profile
    onRewardEarned?.(tier.xpReward, 'XP Catcher Game', 'XP', tier.veReward);

    setGameState('result');
  };

  const handlePlayAgain = () => {
    if (attemptsLeft > 0) {
      setGameState('playing');
    }
  };

  return (
    <section className={styles.gameSection} aria-label="Play and Earn Arcade">
      <div className={styles.sectionHeader}>
        <div className={styles.titleGroup}>
          <div className={styles.badgePill}>ARCADE</div>
          <h2 className={styles.heading}>Play & Earn</h2>
        </div>
        <InfoTooltip text={TOOLTIP_COPY.game} title="Skill-Based Arcade" />
      </div>

      {/* Main Dashboard Preview Card */}
      <div className={styles.gamePreviewCard}>
        <div className={styles.previewGlow} />

        <div className={styles.previewContent}>
          <div className={styles.previewPill}>
            <span>Skill Challenge • 20s</span>
          </div>

          <h3 className={styles.previewTitle}>XP Catcher Challenge</h3>
          <p className={styles.previewDesc}>
            Catch falling XP orbs, VE coins, and prism gems. Score high to earn up to{' '}
            <strong>+30 XP</strong> and <strong>+12 VEs</strong> directly into your wallet!
          </p>

          <div className={styles.previewFooter}>
            <button
              type="button"
              className={styles.playNowBtn}
              onClick={handleOpenGame}
              disabled={!isGameAvailable || attemptsLeft <= 0}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}>
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <span>{attemptsLeft > 0 ? "Play Now" : "Out of Attempts"}</span>
            </button>

            <span className={styles.attemptsChip}>
              Attempts left:{' '}
              <strong className={attemptsLeft > 0 ? styles.attemptsActive : ''}>
                {attemptsLeft} / {GAME_CONFIG.maxDailyAttempts}
              </strong>
            </span>
          </div>
        </div>

        {/* Visual Game Controller / Magnet Graphic */}
        <div className={styles.previewVisual}>
          <svg
            viewBox="0 0 120 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.controllerSvg}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="controllerGrad" x1="0" y1="0" x2="120" y2="100" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#1E40AF" />
              </linearGradient>
            </defs>
            <rect x="10" y="25" width="100" height="58" rx="16" fill="url(#controllerGrad)" stroke="#60A5FA" strokeWidth="2.5" />
            <circle cx="35" cy="54" r="14" fill="#0F172A" />
            <path d="M35 44v20M25 54h20" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" />
            <circle cx="85" cy="46" r="5" fill="#F5C518" />
            <circle cx="95" cy="58" r="5" fill="#10B981" />
            <circle cx="75" cy="58" r="5" fill="#EF4444" />
            <circle cx="85" cy="70" r="5" fill="#3B82F6" />
          </svg>
        </div>
      </div>

      {/* Active Game Modal Container */}
      {gameState !== 'idle' && (
        <div className={styles.gameModalOverlay} role="dialog" aria-modal="true">
          <div className={styles.gameModalContainer}>
            {gameState === 'start' && (
              <GameStart
                attemptsLeft={attemptsLeft}
                onStart={handleStartGame}
                onClose={handleCloseModal}
              />
            )}

            {gameState === 'playing' && (
              <GamePlay
                onFinish={handleFinishGame}
                soundEffects={soundEffects}
                onCancel={handleCloseModal}
              />
            )}

            {gameState === 'result' && (
              <GameResult
                score={lastScore}
                profile={profile}
                attemptsLeft={attemptsLeft}
                onPlayAgain={handlePlayAgain}
                onBackToDashboard={handleCloseModal}
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default GameContainer;
