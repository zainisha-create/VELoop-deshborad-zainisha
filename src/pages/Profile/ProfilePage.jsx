import React, { useState } from 'react';
import { LevelBadge } from '../../components/Badges/LevelBadge';
import { InfoTooltip } from '../../components/Tooltips/InfoTooltip';
import styles from './ProfilePage.module.css';

export const ProfilePage = ({
  profile,
  onNavigate
}) => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  const copyRefLink = () => {
    navigator.clipboard?.writeText("https://veloop.io/ref/velooper_9921");
    setToastMessage("Referral link copied to clipboard!");
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className={styles.profileContainer}>
      {/* 1. Identity & VIP Header Card */}
      <section className={styles.identityCard}>
        <div className={styles.cardAura} />
        <div className={styles.identityContent}>
          <div className={styles.avatarGroup}>
            <div className={styles.avatarLarge}>
              <span>VL</span>
              <div className={styles.verifiedDot} title="KYC Verified" />
            </div>

            <div className={styles.userDetails}>
              <div className={styles.nameRow}>
                <h1 className={styles.displayName}>{profile.username}</h1>
                <span className={styles.verifiedPill}>✓ KYC Verified</span>
              </div>
              <span className={styles.handle}>@velooper_9921 • Member since Aug 2026</span>
              <div className={styles.tierPill}>
                <span>VIP Tier: <strong>Level 0{profile.currentLevel} ({profile.levelTitle})</strong></span>
              </div>
            </div>
          </div>

          <div className={styles.badgeShowcase}>
            <LevelBadge level={profile.currentLevel} size="lg" status="current" />
          </div>
        </div>
      </section>

      {/* Toast Alert */}
      {toastMessage && (
        <div className={styles.toast}>
          <span>✓ {toastMessage}</span>
        </div>
      )}

      {/* 2. Lifetime Statistics Matrix */}
      <section className={styles.statsSection}>
        <h2 className={styles.sectionHeading}>Lifetime Engagement Statistics</h2>
        <div className={styles.statsGrid}>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>LIFETIME XP</span>
            <div className={styles.statValue}>18,420 <span className={styles.statUnit}>XP</span></div>
            <span className={styles.statSub}>Top 5% on VELOOP</span>
          </div>

          <div className={styles.statBox}>
            <span className={styles.statLabel}>TOTAL REWARDS CLAIMED</span>
            <div className={styles.statValueGold}>4,250 <span className={styles.statUnit}>VEs</span></div>
            <span className={styles.statSub}>~$4,250.00 USD value</span>
          </div>

          <div className={styles.statBox}>
            <span className={styles.statLabel}>ARCADE ROUNDS</span>
            <div className={styles.statValue}>48 <span className={styles.statUnit}>Games</span></div>
            <span className={styles.statSub}>78% High-tier Win Rate</span>
          </div>

          <div className={styles.statBox}>
            <span className={styles.statLabel}>TOTAL REFERRALS</span>
            <div className={styles.statValueEmerald}>14 <span className={styles.statUnit}>Friends</span></div>
            <span className={styles.statSub}>+$240 in affiliate earnings</span>
          </div>
        </div>
      </section>

      {/* 3. Level 05 VIP Perks Unlocked */}
      <section className={styles.perksSection}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionHeading}>Level 0{profile.currentLevel} Active Privileges</h2>
            <p className={styles.sectionSub}>Your tier unlocks platform perks and reduced fees.</p>
          </div>
          <button type="button" className={styles.roadmapBtn} onClick={() => onNavigate('rewards')}>
            View Full Tier Roadmap →
          </button>
        </div>

        <div className={styles.perksGrid}>
          <div className={styles.perkCard}>
            <div className={styles.perkIcon}>⚡</div>
            <div>
              <strong>+25% Daily XP Limit</strong>
              <p>Cap increased from 800 to 1,000 XP daily</p>
            </div>
          </div>

          <div className={styles.perkCard}>
            <div className={styles.perkIcon}>🪙</div>
            <div>
              <strong>0.5% Fee Discount</strong>
              <p>Discounted cash-out spreads on bank wires</p>
            </div>
          </div>

          <div className={styles.perkCard}>
            <div className={styles.perkIcon}>🎁</div>
            <div>
              <strong>VIP Vault Access</strong>
              <p>Eligible for bi-weekly prism gem prize pools</p>
            </div>
          </div>

          <div className={styles.perkCard}>
            <div className={styles.perkIcon}>🛡️</div>
            <div>
              <strong>Concierge Priority</strong>
              <p>Priority customer verification & withdrawals</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Referral Program Card */}
      <section className={styles.referralSection}>
        <div className={styles.referralLeft}>
          <div className={styles.refTag}>AFFILIATE REWARD HUB</div>
          <h2 className={styles.referralTitle}>Invite Friends, Earn 10% For Life</h2>
          <p className={styles.referralDesc}>
            Receive +100 XP and 50 VEs instantly when a friend signs up and achieves Level 2, plus 10% of their platform earning points indefinitely.
          </p>

          <div className={styles.refLinkRow}>
            <input
              type="text"
              readOnly
              value="https://veloop.io/ref/velooper_9921"
              className={styles.refInput}
            />
            <button type="button" className={styles.copyBtn} onClick={copyRefLink}>
              Copy Link
            </button>
          </div>
        </div>

        <div className={styles.referralRight}>
          <div className={styles.refQrCode}>
            <svg viewBox="0 0 100 100" style={{ width: '100px', height: '100px' }}>
              <rect width="30" height="30" fill="#000" />
              <rect x="70" width="30" height="30" fill="#000" />
              <rect y="70" width="30" height="30" fill="#000" />
              <rect x="10" y="10" width="10" height="10" fill="#FFF" />
              <rect x="80" y="10" width="10" height="10" fill="#FFF" />
              <rect x="10" y="80" width="10" height="10" fill="#FFF" />
              <rect x="40" y="40" width="20" height="20" fill="#000" />
            </svg>
          </div>
          <span className={styles.scanText}>Scan with mobile</span>
        </div>
      </section>

      {/* 5. Account Security & Preferences */}
      <section className={styles.settingsSection}>
        <h2 className={styles.sectionHeading}>Security & Preferences</h2>
        <div className={styles.settingsCard}>
          <div className={styles.settingRow}>
            <div>
              <strong>Two-Factor Authentication (2FA)</strong>
              <p>Protect your reward wallet with Google Authenticator</p>
            </div>
            <button
              type="button"
              className={`${styles.toggleBtn} ${twoFactorEnabled ? styles.toggleOn : ''}`}
              onClick={() => setTwoFactorEnabled(p => !p)}
            >
              {twoFactorEnabled ? 'ENABLED' : 'DISABLED'}
            </button>
          </div>

          <div className={styles.settingRow}>
            <div>
              <strong>Email Earning Notifications</strong>
              <p>Receive alerts when daily challenges reset or quests expire</p>
            </div>
            <button
              type="button"
              className={`${styles.toggleBtn} ${emailAlerts ? styles.toggleOn : ''}`}
              onClick={() => setEmailAlerts(p => !p)}
            >
              {emailAlerts ? 'ON' : 'OFF'}
            </button>
          </div>

          <div className={styles.settingRow}>
            <div>
              <strong>Arcade Audio & Haptics</strong>
              <p>Sound synthesis during coin catches and celebration</p>
            </div>
            <button
              type="button"
              className={`${styles.toggleBtn} ${soundAlerts ? styles.toggleOn : ''}`}
              onClick={() => setSoundAlerts(p => !p)}
            >
              {soundAlerts ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
