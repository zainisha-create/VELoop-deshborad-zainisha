import React, { useState } from 'react';
import { LevelBadge } from '../../components/Badges/LevelBadge';
import { InfoTooltip } from '../../components/Tooltips/InfoTooltip';
import styles from './HomePage.module.css';

export const HomePage = ({
  profile,
  onNavigate,
  onAddXP,
  soundEffects
}) => {
  const [dailyStreakChecked, setDailyStreakChecked] = useState(false);
  const [claimedDayBonus, setClaimedDayBonus] = useState(null);

  const streakDays = [
    { day: 1, reward: '+10 XP', claimed: true },
    { day: 2, reward: '+15 XP', claimed: true },
    { day: 3, reward: '+20 XP', claimed: true },
    { day: 4, reward: '+25 XP', claimed: true },
    { day: 5, reward: '+30 XP', claimed: true },
    { day: 6, reward: '+40 XP', claimed: true },
    { day: 7, reward: '+50 XP & 2X', current: true, claimed: dailyStreakChecked }
  ];

  const handleClaimDailyCheckin = () => {
    if (dailyStreakChecked) return;
    setDailyStreakChecked(true);
    onAddXP(50, 'Day 7 Streak Check-In', 'XP', 10);
    soundEffects?.playCoinCatch();
    setClaimedDayBonus('Claimed +50 XP and +10 VEs!');
    setTimeout(() => setClaimedDayBonus(null), 3500);
  };

  const featuredQuests = [
    {
      id: 'quest_1',
      title: 'Weekend XP Sprint',
      subtitle: 'Play 3 rounds of XP Catcher',
      reward: '+75 XP',
      progress: '2/3',
      icon: 'gamepad',
      accent: 'blue',
      action: () => onNavigate('rewards')
    },
    {
      id: 'quest_2',
      title: 'Account Verification',
      subtitle: 'Complete email & 2FA security',
      reward: '+100 VEs',
      progress: '1/2',
      icon: 'shield',
      accent: 'emerald',
      action: () => onNavigate('profile')
    },
    {
      id: 'quest_3',
      title: 'Referral Champion',
      subtitle: 'Invite your first 2 friends',
      reward: '+200 XP',
      progress: '1/2',
      icon: 'users',
      accent: 'gold',
      action: () => onNavigate('earn')
    }
  ];

  return (
    <div className={styles.homeContainer}>
      {/* 1. Welcome & Portfolio Glance Card */}
      <section className={styles.welcomeHero}>
        <div className={styles.heroBackgroundAura} />
        <div className={styles.heroContent}>
          <div className={styles.userGreetingRow}>
            <div className={styles.greetingTextGroup}>
              <div className={styles.statusChip}>
                <span className={styles.statusDot} />
                <span>LEVEL 0{profile.currentLevel} • {profile.levelTitle.toUpperCase()}</span>
              </div>
              <h1 className={styles.welcomeTitle}>
                Welcome back, <span className="text-gold-gradient">{profile.username}!</span>
              </h1>
              <p className={styles.welcomeSubtitle}>
                Your loyalty ecosystem is thriving. Earn XP, collect VEs, and climb to Level 0{profile.nextLevel}.
              </p>
            </div>

            <div className={styles.badgeShowcase}>
              <LevelBadge level={profile.currentLevel} size="lg" status="current" />
            </div>
          </div>

          {/* Quick Balance Ticker */}
          <div className={styles.balancesGlanceRow}>
            <div className={styles.balanceGlanceCard}>
              <span className={styles.balanceLabel}>ESTIMATED NET WORTH</span>
              <div className={styles.balanceValueRow}>
                <span className={styles.balanceBigValue}>$2,160.00</span>
                <span className={styles.balanceChangePositive}>+12.4% this week</span>
              </div>
            </div>

            <div className={styles.miniAssetPill} onClick={() => onNavigate('wallet')}>
              <div className={styles.assetIconGold}>V</div>
              <div>
                <strong>{profile.balances.ves.toLocaleString()} VEs</strong>
                <span>Reward Tokens</span>
              </div>
            </div>

            <div className={styles.miniAssetPill} onClick={() => onNavigate('wallet')}>
              <div className={styles.assetIconPurple}>💎</div>
              <div>
                <strong>{profile.balances.gems} Gems</strong>
                <span>Vault Keys</span>
              </div>
            </div>

            <div className={styles.miniAssetPill} onClick={() => onNavigate('rewards')}>
              <div className={styles.assetIconBlue}>XP</div>
              <div>
                <strong>{profile.currentXP.toLocaleString()} XP</strong>
                <span>{profile.progressPct}% to Lvl 0{profile.nextLevel}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 7-Day Check-in Streak Banner */}
      <section className={styles.streakSection}>
        <div className={styles.sectionTitleRow}>
          <div className={styles.titleWithIcon}>
            <span className={styles.fireEmoji}>🔥</span>
            <div>
              <h2 className={styles.sectionHeading}>7-Day Daily Check-in Streak</h2>
              <p className={styles.sectionSub}>Check in consecutive days to multiply your earning power.</p>
            </div>
          </div>

          <div className={styles.streakStatusBadge}>
            <span>Day 7 of 7 • 2X Multiplier Active</span>
          </div>
        </div>

        {claimedDayBonus && (
          <div className={styles.claimedToast}>
            <span>🎉 {claimedDayBonus}</span>
          </div>
        )}

        <div className={styles.streakGrid}>
          {streakDays.map(item => (
            <div
              key={item.day}
              className={`${styles.streakDayCard} ${item.claimed ? styles.dayClaimed : ''} ${item.current && !item.claimed ? styles.dayCurrent : ''}`}
            >
              <span className={styles.dayLabel}>Day {item.day}</span>
              <div className={styles.dayIcon}>
                {item.claimed ? '✓' : item.current ? '🎁' : '⚡'}
              </div>
              <span className={styles.dayRewardText}>{item.reward}</span>
              {item.claimed && <span className={styles.claimedBadge}>Claimed</span>}
            </div>
          ))}
        </div>

        <div className={styles.streakCtaRow}>
          <button
            type="button"
            className={styles.claimStreakBtn}
            onClick={handleClaimDailyCheckin}
            disabled={dailyStreakChecked}
          >
            {dailyStreakChecked ? "Day 7 Streak Claimed ✓" : "Claim Today's Day 7 Reward (+50 XP)"}
          </button>
          <span className={styles.streakTimer}>Resets in 06:42:15</span>
        </div>
      </section>

      {/* 3. Quick Action Tiles Grid */}
      <section className={styles.quickActionSection}>
        <h2 className={styles.sectionHeading}>Quick Action Hub</h2>
        <div className={styles.quickActionsGrid}>
          <div className={`${styles.actionTile} ${styles.tileGold}`} onClick={() => onNavigate('rewards')}>
            <div className={styles.tileIcon}>🎮</div>
            <div className={styles.tileInfo}>
              <strong>Play XP Catcher</strong>
              <span>Catch falling coins for instant XP</span>
            </div>
            <span className={styles.tileArrow}>→</span>
          </div>

          <div className={`${styles.actionTile} ${styles.tileEmerald}`} onClick={() => onNavigate('earn')}>
            <div className={styles.tileIcon}>📋</div>
            <div className={styles.tileInfo}>
              <strong>Complete Daily Tasks</strong>
              <span>4 of 8 tasks ready to claim</span>
            </div>
            <span className={styles.tileArrow}>→</span>
          </div>

          <div className={`${styles.actionTile} ${styles.tilePurple}`} onClick={() => onNavigate('wallet')}>
            <div className={styles.tileIcon}>💎</div>
            <div className={styles.tileInfo}>
              <strong>Staking & Yield</strong>
              <span>Earn 12.4% APY on locked VEs</span>
            </div>
            <span className={styles.tileArrow}>→</span>
          </div>

          <div className={`${styles.actionTile} ${styles.tileBlue}`} onClick={() => onNavigate('earn')}>
            <div className={styles.tileIcon}>👥</div>
            <div className={styles.tileInfo}>
              <strong>Invite & Earn</strong>
              <span>+100 XP per active referral</span>
            </div>
            <span className={styles.tileArrow}>→</span>
          </div>
        </div>
      </section>

      {/* 4. Active Spotlight Quests */}
      <section className={styles.questsSection}>
        <div className={styles.sectionTitleRow}>
          <div>
            <h2 className={styles.sectionHeading}>Spotlight Quests</h2>
            <p className={styles.sectionSub}>High-reward missions to boost your tier progression.</p>
          </div>
          <button type="button" className={styles.viewAllBtn} onClick={() => onNavigate('earn')}>
            View All Quests →
          </button>
        </div>

        <div className={styles.questsGrid}>
          {featuredQuests.map(q => (
            <div key={q.id} className={styles.questCard} onClick={q.action}>
              <div className={styles.questHeader}>
                <div className={`${styles.questIconBox} ${styles[`icon_${q.accent}`]}`}>
                  {q.icon === 'gamepad' ? '🎮' : q.icon === 'shield' ? '🛡️' : '👥'}
                </div>
                <span className={styles.questRewardPill}>{q.reward}</span>
              </div>
              <h3 className={styles.questTitle}>{q.title}</h3>
              <p className={styles.questSubtitle}>{q.subtitle}</p>

              <div className={styles.questProgressRow}>
                <span>Progress: {q.progress}</span>
                <span className={styles.questActionText}>Continue →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Live Community Ticker */}
      <section className={styles.liveFeedSection}>
        <div className={styles.liveFeedCard}>
          <div className={styles.liveIndicator}>
            <span className={styles.livePulse} />
            <strong>LIVE ACTIVITY:</strong>
          </div>
          <div className={styles.tickerTrack}>
            <span className={styles.tickerItem}>⚡ @marcus_v reached Level 06 (+500 VEs)</span>
            <span className={styles.tickerSeparator}>•</span>
            <span className={styles.tickerItem}>🎮 @elena_99 scored 145 pts in XP Catcher</span>
            <span className={styles.tickerSeparator}>•</span>
            <span className={styles.tickerItem}>💎 @crypto_dan staked 500 SVEs</span>
            <span className={styles.tickerSeparator}>•</span>
            <span className={styles.tickerItem}>🔥 @zenith_x completed a 30-day streak</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
