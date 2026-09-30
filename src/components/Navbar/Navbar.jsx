import React, { useState } from 'react';
import styles from './Navbar.module.css';

export const Navbar = ({
  profile,
  activeTab = 'rewards',
  onTabChange,
  isMuted = false,
  onToggleMute,
  unreadCount = 2
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'earn', label: 'Earn', icon: 'zap' },
    { id: 'rewards', label: 'Rewards', icon: 'gift' },
    { id: 'wallet', label: 'Wallet', icon: 'wallet' },
    { id: 'profile', label: 'Profile', icon: 'user' }
  ];

  return (
    <>
      <header className={styles.navbar}>
        <div className={styles.navContainer}>
          {/* Left: Mobile Menu & Brand */}
          <div className={styles.brandGroup}>
            <button
              type="button"
              className={styles.menuButton}
              aria-label="Toggle navigation menu"
              onClick={() => setMobileMenuOpen(prev => !prev)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.icon}>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            <div className={styles.logoBadge}>
              <div className={styles.logoHex}>
                <span>V</span>
              </div>
              <div className={styles.brandText}>
                <span className={styles.brandTitle}>VELOOP</span>
                <span className={styles.brandSub}>REWARDS</span>
              </div>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className={styles.desktopNav} aria-label="Main Navigation">
            {navItems.map(item => (
              <button
                key={item.id}
                type="button"
                className={`${styles.navLink} ${activeTab === item.id ? styles.navLinkActive : ''}`}
                onClick={() => onTabChange?.(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Icons: Sound, Notifications, User Profile */}
          <div className={styles.actionsGroup}>
            {/* Audio Toggle */}
            <button
              type="button"
              className={`${styles.actionIconBtn} ${isMuted ? styles.muted : ''}`}
              title={isMuted ? "Unmute Sound" : "Mute Sound"}
              aria-label={isMuted ? "Unmute Sound" : "Mute Sound"}
              onClick={onToggleMute}
            >
              {isMuted ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.icon}>
                  <line x1="1" y1="1" x2="23" y2="23" />
                  <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
                  <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.icon}>
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              )}
            </button>

            {/* Notification Bell */}
            <button
              type="button"
              className={styles.actionIconBtn}
              aria-label={`Notifications (${unreadCount} unread)`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.icon}>
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              {unreadCount > 0 && <span className={styles.bellBadge}>{unreadCount}</span>}
            </button>

            {/* User Avatar Chip */}
            <div className={styles.userProfileChip} title={`Logged in as ${profile.username}`}>
              <div className={styles.avatar}>
                <span>VL</span>
              </div>
              <div className={styles.userInfo}>
                <span className={styles.userName}>{profile.username}</span>
                <span className={styles.userTier}>LVL {String(profile.currentLevel).padStart(2, '0')}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (as shown in PDF design Panel 1) */}
      <nav className={styles.bottomNav} aria-label="Mobile Navigation">
        {navItems.map(item => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`${styles.bottomNavItem} ${isActive ? styles.bottomNavItemActive : ''}`}
              onClick={() => onTabChange?.(item.id)}
            >
              <div className={styles.bottomNavIconWrapper}>
                {item.id === 'home' && (
                  <svg viewBox="0 0 24 24" fill={isActive ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                )}
                {item.id === 'earn' && (
                  <svg viewBox="0 0 24 24" fill={isActive ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                )}
                {item.id === 'rewards' && (
                  <svg viewBox="0 0 24 24" fill={isActive ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                    <polyline points="20 12 20 22 4 22 4 12" />
                    <rect x="2" y="7" width="20" height="5" />
                    <line x1="12" y1="22" x2="12" y2="7" />
                    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                  </svg>
                )}
                {item.id === 'wallet' && (
                  <svg viewBox="0 0 24 24" fill={isActive ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                  </svg>
                )}
                {item.id === 'profile' && (
                  <svg viewBox="0 0 24 24" fill={isActive ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                )}
              </div>
              <span className={styles.bottomNavLabel}>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};

export default Navbar;
