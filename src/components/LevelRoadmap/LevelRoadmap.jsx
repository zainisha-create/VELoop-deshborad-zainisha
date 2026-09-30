import React, { useState, useRef } from 'react';
import { LevelBadge } from '../Badges/LevelBadge';
import { InfoTooltip } from '../Tooltips/InfoTooltip';
import { TOOLTIP_COPY } from '../../data/mockData';
import styles from './LevelRoadmap.module.css';

export const LevelRoadmap = ({
  roadmap,
  currentLevel = 5,
  onSelectLevel
}) => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const scrollRef = useRef(null);

  const scrollRoadmap = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -240 : 240;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleNodeClick = (node) => {
    setSelectedLevel(node.level === selectedLevel?.level ? null : node);
    onSelectLevel?.(node);
  };

  return (
    <section className={styles.roadmapSection} aria-label="Level Progression Roadmap">
      <div className={styles.sectionHeader}>
        <div className={styles.titleGroup}>
          <div className={styles.badgePill}>PROGRESSION</div>
          <h2 className={styles.heading}>Level Progression Roadmap</h2>
        </div>

        <div className={styles.headerActions}>
          <InfoTooltip text={TOOLTIP_COPY.roadmap} title="Tier Milestones" />
          <div className={styles.scrollControls}>
            <button
              type="button"
              className={styles.scrollBtn}
              onClick={() => scrollRoadmap('left')}
              aria-label="Scroll roadmap left"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              className={styles.scrollBtn}
              onClick={() => scrollRoadmap('right')}
              aria-label="Scroll roadmap right"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Progression Track with Conduit line */}
      <div className={styles.scrollerOuter}>
        <div className={styles.trackContainer} ref={scrollRef}>
          {/* Connecting Conduit Line */}
          <div className={styles.conduitLine} aria-hidden="true" />

          {roadmap.map((item, index) => {
            const isCurrent = item.level === currentLevel;
            const isNext = item.level === currentLevel + 1;
            const isCompleted = item.level < currentLevel;
            const isLocked = item.level > currentLevel + 1;
            const isSelected = selectedLevel?.level === item.level;

            return (
              <div
                key={item.level}
                className={`${styles.levelNode} ${styles[item.status]} ${isCurrent ? styles.nodeCurrent : ''} ${isSelected ? styles.nodeSelected : ''}`}
                onClick={() => handleNodeClick(item)}
                role="button"
                tabIndex={0}
                aria-label={`Level ${item.level}: ${item.title}, Status: ${item.status}`}
              >
                {/* Status Indicator Callout Tag */}
                <div className={styles.tagWrapper}>
                  {isCurrent && (
                    <div className={styles.currentTag}>
                      <span>YOU ARE HERE</span>
                      <div className={styles.tagArrow} />
                    </div>
                  )}
                  {isNext && (
                    <div className={styles.nextTag}>
                      <span>NEXT GOAL</span>
                    </div>
                  )}
                  {isCompleted && (
                    <div className={styles.completedTag}>
                      <span>✓ COMPLETED</span>
                    </div>
                  )}
                  {isLocked && (
                    <div className={styles.lockedTag}>
                      <span>LOCKED</span>
                    </div>
                  )}
                </div>

                {/* Badge Visual */}
                <div className={styles.badgeWrapper}>
                  <LevelBadge
                    level={item.level}
                    size="md"
                    status={item.status}
                    showStatusGlow={isCurrent || isNext}
                  />
                </div>

                {/* Level Title and XP */}
                <div className={styles.nodeMeta}>
                  <span className={styles.nodeTitle}>{item.title}</span>
                  <span className={styles.nodeXP}>{item.requiredXP.toLocaleString()} XP</span>
                </div>

                {/* Reward Pill */}
                <div className={styles.rewardChip}>
                  <span className={styles.rewardAmount}>
                    {item.reward.amount ? `${item.reward.amount.toLocaleString()} ${item.reward.type}` : item.reward.title}
                  </span>
                  {item.reward.bonusGems && (
                    <span className={styles.bonusChip}>+{item.reward.bonusGems} Gems</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Node Details Drawer */}
      {selectedLevel && (
        <div className={styles.detailsDrawer}>
          <div className={styles.drawerHeader}>
            <div className={styles.drawerTitleRow}>
              <span className={styles.drawerLevelPill}>Level {String(selectedLevel.level).padStart(2, '0')}</span>
              <h3 className={styles.drawerTitle}>{selectedLevel.title} Tier Details</h3>
            </div>
            <button
              type="button"
              className={styles.closeDrawerBtn}
              onClick={() => setSelectedLevel(null)}
              aria-label="Close tier details"
            >
              ✕
            </button>
          </div>

          <div className={styles.drawerContentGrid}>
            <div className={styles.drawerInfoBlock}>
              <span className={styles.drawerLabel}>REQUIRED XP</span>
              <span className={styles.drawerValue}>{selectedLevel.requiredXP.toLocaleString()} XP</span>
            </div>

            <div className={styles.drawerInfoBlock}>
              <span className={styles.drawerLabel}>TIER REWARD</span>
              <span className={styles.drawerValueGold}>
                {selectedLevel.reward.amount ? `${selectedLevel.reward.amount.toLocaleString()} ${selectedLevel.reward.type}` : selectedLevel.reward.title}
              </span>
            </div>

            <div className={styles.drawerInfoBlock}>
              <span className={styles.drawerLabel}>STATUS</span>
              <span className={`${styles.statusBadge} ${styles[selectedLevel.status]}`}>
                {selectedLevel.status.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LevelRoadmap;
