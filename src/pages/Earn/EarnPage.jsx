import React, { useState } from 'react';
import { LevelBadge } from '../../components/Badges/LevelBadge';
import { InfoTooltip } from '../../components/Tooltips/InfoTooltip';
import styles from './EarnPage.module.css';

export const EarnPage = ({
  profile,
  onAddXP,
  onLaunchGame,
  soundEffects
}) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [claimedTasks, setClaimedTasks] = useState(new Set());
  const [activeModal, setActiveModal] = useState(null); // 'watch' | 'referral' | 'survey'
  const [watchProgress, setWatchProgress] = useState(0);

  const activities = [
    {
      id: 'act_watch',
      category: 'Video',
      title: 'Watch & Earn',
      desc: 'Watch quick sponsored clips and earn instant XP.',
      rewardText: '+50 XP',
      xp: 50,
      icon: 'play',
      badgeColor: 'purple',
      actionType: 'watch'
    },
    {
      id: 'act_daily',
      category: 'Missions',
      title: 'Daily Missions',
      desc: 'Complete today\'s 4 essential ecosystem tasks.',
      rewardText: '+30 XP',
      xp: 30,
      icon: 'check-circle',
      badgeColor: 'emerald',
      actionType: 'claim'
    },
    {
      id: 'act_refer',
      category: 'Referrals',
      title: 'Refer & Earn',
      desc: 'Invite friends & colleagues to join VELOOP.',
      rewardText: '+100 XP',
      xp: 100,
      icon: 'users',
      badgeColor: 'gold',
      actionType: 'referral'
    },
    {
      id: 'act_arcade',
      category: 'Arcade',
      title: 'XP Catcher Mini-Game',
      desc: 'Catch falling coins and orbs in the 20s challenge.',
      rewardText: '+10 to +35 XP',
      xp: 25,
      icon: 'gamepad',
      badgeColor: 'blue',
      actionType: 'game'
    },
    {
      id: 'act_streak',
      category: 'Missions',
      title: 'Streak Bonus',
      desc: 'Maintain consecutive daily check-in streaks.',
      rewardText: '+25 XP',
      xp: 25,
      icon: 'flame',
      badgeColor: 'coral',
      actionType: 'claim'
    },
    {
      id: 'act_mini_games',
      category: 'Arcade',
      title: 'Trivia & Puzzle Sprint',
      desc: 'New competitive skill games in beta testing.',
      rewardText: '+75 XP',
      xp: 75,
      icon: 'dices',
      badgeColor: 'cyan',
      isComingSoon: true
    },
    {
      id: 'act_web3',
      category: 'Missions',
      title: 'Web3 Wallet Connect',
      desc: 'Connect your MetaMask or Phantom wallet.',
      rewardText: '+150 XP',
      xp: 150,
      icon: 'wallet',
      badgeColor: 'emerald',
      actionType: 'claim'
    },
    {
      id: 'act_survey',
      category: 'Missions',
      title: 'Ecosystem Feedback Survey',
      desc: 'Help shape future VELOOP token rewards.',
      rewardText: '+80 XP',
      xp: 80,
      icon: 'message',
      badgeColor: 'purple',
      actionType: 'survey'
    }
  ];

  const handleAction = (item) => {
    if (item.isComingSoon || claimedTasks.has(item.id)) return;

    if (item.actionType === 'game') {
      onLaunchGame?.();
      return;
    }

    if (item.actionType === 'watch') {
      setActiveModal('watch');
      setWatchProgress(0);
      let p = 0;
      const interval = setInterval(() => {
        p += 20;
        setWatchProgress(p);
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setActiveModal(null);
            onAddXP(item.xp, item.title);
            soundEffects?.playCoinCatch();
            setClaimedTasks(prev => new Set(prev).add(item.id));
          }, 400);
        }
      }, 500);
      return;
    }

    if (item.actionType === 'referral') {
      setActiveModal('referral');
      return;
    }

    if (item.actionType === 'survey') {
      setActiveModal('survey');
      return;
    }

    // Direct claim
    onAddXP(item.xp, item.title);
    soundEffects?.playCoinCatch();
    setClaimedTasks(prev => new Set(prev).add(item.id));
  };

  const filteredActivities = activities.filter(a => {
    if (activeCategory === 'All') return true;
    return a.category === activeCategory;
  });

  return (
    <div className={styles.earnContainer}>
      {/* Top Banner (Panel 4 Reference) */}
      <section className={styles.headerHero}>
        <div className={styles.headerLeft}>
          <div className={styles.pillLabel}>ENGAGEMENT HUB</div>
          <h1 className={styles.pageTitle}>EARN & LEVEL UP</h1>
          <p className={styles.pageSubtitle}>
            Complete activities. Earn XP. Climb levels. Unlock premium rewards.
          </p>
        </div>

        {/* Mini Level Status Card */}
        <div className={styles.levelStatusCard}>
          <LevelBadge level={profile.currentLevel} size="md" status="current" />
          <div className={styles.statusInfo}>
            <span className={styles.statusRankTitle}>LEVEL 0{profile.currentLevel} • {profile.levelTitle}</span>
            <div className={styles.miniXpBar}>
              <div className={styles.miniXpFill} style={{ width: `${profile.progressPct}%` }} />
            </div>
            <span className={styles.statusXpText}>
              <strong>{profile.currentXP.toLocaleString()}</strong> / {profile.requiredXP.toLocaleString()} XP ({profile.xpToNext.toLocaleString()} XP needed)
            </span>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <div className={styles.categoriesBar}>
        {['All', 'Missions', 'Arcade', 'Video', 'Referrals'].map(cat => (
          <button
            key={cat}
            type="button"
            className={`${styles.categoryBtn} ${activeCategory === cat ? styles.categoryBtnActive : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Activities Card List (Matching Panel 4 in PDF) */}
      <div className={styles.activitiesList}>
        {filteredActivities.map(item => {
          const isClaimed = claimedTasks.has(item.id);
          const isComingSoon = item.isComingSoon;

          return (
            <div
              key={item.id}
              className={`${styles.activityRowCard} ${isClaimed ? styles.rowClaimed : ''} ${isComingSoon ? styles.rowComingSoon : ''}`}
              onClick={() => handleAction(item)}
              role="button"
              tabIndex={isComingSoon ? -1 : 0}
            >
              {/* Category Icon */}
              <div className={`${styles.iconBox} ${styles[`box_${item.badgeColor}`]}`}>
                {item.icon === 'play' && '▶'}
                {item.icon === 'check-circle' && '✓'}
                {item.icon === 'users' && '👥'}
                {item.icon === 'gamepad' && '🎮'}
                {item.icon === 'flame' && '🔥'}
                {item.icon === 'dices' && '🎲'}
                {item.icon === 'wallet' && '💳'}
                {item.icon === 'message' && '💬'}
              </div>

              {/* Title & Description */}
              <div className={styles.rowContent}>
                <div className={styles.rowTitleRow}>
                  <h3 className={styles.rowTitle}>{item.title}</h3>
                  <span className={styles.rowRewardBadge}>{item.rewardText}</span>
                </div>
                <p className={styles.rowDesc}>{item.desc}</p>
              </div>

              {/* CTA Action */}
              <div className={styles.rowAction}>
                <button
                  type="button"
                  className={`${styles.actionBtn} ${isClaimed ? styles.btnClaimed : ''}`}
                  disabled={isComingSoon || isClaimed}
                >
                  {isComingSoon ? 'Coming Soon' : isClaimed ? 'Claimed ✓' : 'Start →'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Encouragement Footer Banner (Panel 4 reference) */}
      <div className={styles.encouragementBanner}>
        <span className={styles.trophyIcon}>🏆</span>
        <span className={styles.encouragementText}>
          Keep going! You're doing great! Complete 2 more activities to reach Level 0{profile.nextLevel}.
        </span>
      </div>

      {/* Watch & Earn Simulation Modal */}
      {activeModal === 'watch' && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>Watching Partner Clip...</h3>
            <p style={{ color: '#94A3B8', fontSize: '13px', marginBottom: '16px' }}>Simulating sponsor view. Reward will credit in seconds.</p>
            <div style={{ width: '100%', height: '10px', background: '#111322', borderRadius: '999px', overflow: 'hidden', marginBottom: '14px' }}>
              <div style={{ width: `${watchProgress}%`, height: '100%', background: 'var(--gold-gradient)', transition: 'width 0.4s ease' }} />
            </div>
            <span style={{ fontSize: '12px', color: '#FFE071', fontWeight: 700 }}>{watchProgress}% Completed</span>
          </div>
        </div>
      )}

      {/* Referral Link Modal */}
      {activeModal === 'referral' && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Invite Friends & Earn</h3>
              <button onClick={() => setActiveModal(null)} style={{ color: '#94A3B8' }}>✕</button>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '13px', marginBottom: '16px' }}>
              Share your personal link. Earn <strong>+100 XP</strong> and <strong>50 VEs</strong> for each verified sign-up!
            </p>
            <div style={{ background: '#111322', padding: '12px', borderRadius: '10px', fontSize: '13px', color: '#67E8F9', marginBottom: '16px', wordBreak: 'break-all' }}>
              https://veloop.io/ref/velooper_9921
            </div>
            <button
              style={{ background: 'var(--gold-gradient)', color: '#121424', padding: '10px 20px', borderRadius: '999px', fontWeight: 800, width: '100%' }}
              onClick={() => {
                navigator.clipboard?.writeText('https://veloop.io/ref/velooper_9921');
                alert('Referral link copied to clipboard!');
                setActiveModal(null);
                onAddXP(100, 'Friend Referral Bonus', 'XP', 50);
              }}
            >
              Copy Link & Claim Test Referral (+100 XP)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EarnPage;
