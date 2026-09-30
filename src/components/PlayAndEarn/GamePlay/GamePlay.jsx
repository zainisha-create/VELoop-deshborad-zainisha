import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GAME_CONFIG } from '../../../data/mockData';
import styles from '../Game.module.css';

export const GamePlay = ({
  onFinish,
  soundEffects,
  onCancel
}) => {
  const [timeLeft, setTimeLeft] = useState(GAME_CONFIG.durationSeconds);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [fallingItems, setFallingItems] = useState([]);
  const [catchPopups, setCatchPopups] = useState([]);

  const arenaRef = useRef(null);
  const catcherRef = useRef(null);
  const arenaWidthRef = useRef(360);
  const arenaHeightRef = useRef(400);
  const catcherXRef = useRef(140);
  const catcherWidth = 84;
  const catcherHeight = 38;

  const isDraggingRef = useRef(false);
  const keysDownRef = useRef({ left: false, right: false });
  const itemsRef = useRef([]);
  const popupsRef = useRef([]);
  const nextItemIdRef = useRef(1);
  const nextPopupIdRef = useRef(1);
  const lastSpawnTimeRef = useRef(0);
  const animFrameRef = useRef(null);
  const lastTimeRef = useRef(0);
  const scoreRef = useRef(0);
  const comboRef = useRef(1);
  const isFinishedRef = useRef(false);

  // Update arena dimensions on mount and resize
  const updateDimensions = useCallback(() => {
    if (arenaRef.current) {
      const rect = arenaRef.current.getBoundingClientRect();
      arenaWidthRef.current = rect.width;
      arenaHeightRef.current = rect.height;
      // Keep catcher centered initially
      if (catcherXRef.current === 140) {
        catcherXRef.current = (rect.width - catcherWidth) / 2;
      }
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    const handleResize = () => updateDimensions();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateDimensions]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        keysDownRef.current.left = true;
        e.preventDefault();
      } else if (e.key === 'ArrowRight') {
        keysDownRef.current.right = true;
        e.preventDefault();
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowLeft') keysDownRef.current.left = false;
      if (e.key === 'ArrowRight') keysDownRef.current.right = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Pointer / Mouse / Touch listeners
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    updateCatcherPosition(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (isDraggingRef.current || e.pointerType === 'mouse') {
      updateCatcherPosition(e.clientX);
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const updateCatcherPosition = (clientX) => {
    if (!arenaRef.current) return;
    const rect = arenaRef.current.getBoundingClientRect();
    const relativeX = clientX - rect.left - catcherWidth / 2;
    const boundedX = Math.max(0, Math.min(arenaWidthRef.current - catcherWidth, relativeX));
    catcherXRef.current = boundedX;
    if (catcherRef.current) {
      catcherRef.current.style.transform = `translateX(${boundedX}px)`;
    }
  };

  // Main Game Loop using requestAnimationFrame
  useEffect(() => {
    let startTime = performance.now();
    lastTimeRef.current = startTime;
    lastSpawnTimeRef.current = startTime;
    scoreRef.current = 0;
    comboRef.current = 1;
    isFinishedRef.current = false;

    const gameLoop = (currentTime) => {
      if (isFinishedRef.current) return;

      const dt = (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;

      // Elapsed & remaining time
      const totalElapsed = (currentTime - startTime) / 1000;
      const remaining = Math.max(0, GAME_CONFIG.durationSeconds - totalElapsed);
      setTimeLeft(Math.ceil(remaining));

      if (remaining <= 0) {
        isFinishedRef.current = true;
        soundEffects?.playVictory();
        onFinish(scoreRef.current);
        return;
      }

      // Keyboard movement calculation
      if (keysDownRef.current.left !== keysDownRef.current.right) {
        const speed = 360 * dt;
        let newX = catcherXRef.current + (keysDownRef.current.right ? speed : -speed);
        newX = Math.max(0, Math.min(arenaWidthRef.current - catcherWidth, newX));
        catcherXRef.current = newX;
        if (catcherRef.current) {
          catcherRef.current.style.transform = `translateX(${newX}px)`;
        }
      }

      // Spawning new falling items every ~400ms
      if (currentTime - lastSpawnTimeRef.current > 420) {
        lastSpawnTimeRef.current = currentTime;
        const rand = Math.random() * 100;
        let itemType = 'goldCoin';
        if (rand < 50) itemType = 'goldCoin';
        else if (rand < 85) itemType = 'xpOrb';
        else itemType = 'crystalGem';

        const config = GAME_CONFIG.items[itemType];
        const randomX = Math.random() * (arenaWidthRef.current - 40);
        const randomSpeed = config.speedRange[0] + Math.random() * (config.speedRange[1] - config.speedRange[0]);

        itemsRef.current.push({
          id: nextItemIdRef.current++,
          type: config.type,
          name: config.name,
          points: config.points,
          x: randomX,
          y: -40,
          speed: randomSpeed,
          size: config.type === 'xp' ? 38 : 32
        });
      }

      // Move items and check collisions
      const basketY = arenaHeightRef.current - catcherHeight - 14;
      const basketX = catcherXRef.current;
      const remainingItems = [];

      itemsRef.current.forEach(item => {
        item.y += item.speed * dt;

        // Collision Check: item center vs basket bounding box
        const itemCenterX = item.x + item.size / 2;
        const itemBottomY = item.y + item.size;

        const isColliding =
          itemBottomY >= basketY &&
          item.y <= basketY + catcherHeight &&
          itemCenterX >= basketX &&
          itemCenterX <= basketX + catcherWidth;

        if (isColliding) {
          // Point calculation with combo multiplier
          const earned = item.points * comboRef.current;
          scoreRef.current += earned;
          setScore(scoreRef.current);

          // Audio chime
          if (item.type === 'gem') soundEffects?.playGemCatch();
          else soundEffects?.playCoinCatch();

          // Spawn floating catch label
          const popupText = item.type === 'xp' ? `+${earned} XP` : item.type === 'gem' ? `+${earned} GEM!` : `+${earned}`;
          const newPopup = {
            id: nextPopupIdRef.current++,
            text: popupText,
            x: item.x,
            y: basketY - 10
          };
          popupsRef.current.push(newPopup);
          setCatchPopups([...popupsRef.current]);

          // Cleanup popup after 600ms
          setTimeout(() => {
            popupsRef.current = popupsRef.current.filter(p => p.id !== newPopup.id);
            setCatchPopups([...popupsRef.current]);
          }, 600);

          // Increment combo (max 3x)
          comboRef.current = Math.min(3, comboRef.current + 0.2);
          setCombo(parseFloat(comboRef.current.toFixed(1)));
        } else if (item.y > arenaHeightRef.current) {
          // Missed item: reset combo
          comboRef.current = 1;
          setCombo(1);
        } else {
          remainingItems.push(item);
        }
      });

      itemsRef.current = remainingItems;
      setFallingItems([...remainingItems]);

      animFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [onFinish, soundEffects]);

  const isUrgent = timeLeft <= 5;

  return (
    <div className={styles.playScreen}>
      {/* Top Header Bar */}
      <div className={styles.playHeader}>
        <div className={styles.gameHeaderLeft}>
          <button
            type="button"
            className={styles.closeModalBtn}
            style={{ position: 'static' }}
            onClick={onCancel}
            aria-label="Exit Game"
          >
            ✕
          </button>
          <span className={styles.gameTitleText}>XP CATCHER</span>
        </div>

        <div className={`${styles.timerPill} ${isUrgent ? styles.timerUrgent : ''}`}>
          <span>⏱ 00:{String(timeLeft).padStart(2, '0')}</span>
        </div>

        <div className={styles.multiplierChip}>
          <span>{combo}X Streak</span>
        </div>
      </div>

      {/* Subtitle Instruction Banner */}
      <div className={styles.bannerSubtext}>
        <span>Catch <strong>XP Orbs & Coins</strong> • Score high for higher tier rewards!</span>
      </div>

      {/* Main Play Arena */}
      <div
        className={styles.gameArena}
        ref={arenaRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Falling Items */}
        {fallingItems.map(item => (
          <div
            key={item.id}
            className={styles.fallingItem}
            style={{
              transform: `translate(${item.x}px, ${item.y}px)`
            }}
          >
            {item.type === 'gold' && <div className={styles.goldCoinItem}>V</div>}
            {item.type === 'xp' && <div className={styles.xpOrbItem}>XP</div>}
            {item.type === 'gem' && <div className={styles.gemItem} />}
          </div>
        ))}

        {/* Floating Catch Points Popups */}
        {catchPopups.map(popup => (
          <div
            key={popup.id}
            className={styles.catchPopup}
            style={{
              transform: `translate(${popup.x}px, ${popup.y}px)`
            }}
          >
            {popup.text}
          </div>
        ))}

        {/* Catcher Basket / Collector */}
        <div
          ref={catcherRef}
          className={styles.catcherBasket}
          style={{ transform: `translateX(${catcherXRef.current}px)` }}
        >
          <div className={styles.basketRing}>
            <div className={styles.basketGlowLine} />
          </div>
        </div>
      </div>

      {/* Bottom Live Score Bar */}
      <div className={styles.playBottomBar}>
        <div className={styles.scoreGroup}>
          <span className={styles.scoreLabel}>YOUR SCORE</span>
          <span className={styles.scoreValue}>{score}</span>
        </div>

        <div className={styles.previewFooter}>
          <span className={styles.attemptsChip}>
            {combo > 1 ? `⚡ Multiplier Active` : `Collect without missing`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GamePlay;
