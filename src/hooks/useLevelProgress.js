import { useState, useCallback } from 'react';
import {
  INITIAL_USER_PROFILE,
  LEVEL_ROADMAP,
  INITIAL_XP_ACTIVITIES,
  EARNING_FEATURES
} from '../data/mockData';

export function useLevelProgress(soundEffects) {
  const [profile, setProfile] = useState(INITIAL_USER_PROFILE);
  const [roadmap, setRoadmap] = useState(LEVEL_ROADMAP);
  const [activities, setActivities] = useState(INITIAL_XP_ACTIVITIES);
  const [earningFeatures, setEarningFeatures] = useState(EARNING_FEATURES);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [justLevelledUpData, setJustLevelledUpData] = useState(null);
  
  // UI test states ('normal' | 'loading' | 'error' | 'empty')
  const [dashboardState, setDashboardState] = useState('normal');

  /**
   * Add XP to user profile with automatic level-up detection
   */
  const addXP = useCallback((amount, sourceTitle = 'Bonus XP', rewardType = 'XP', extraVEs = 0) => {
    setProfile(prev => {
      const newXP = prev.currentXP + amount;
      let newLevel = prev.currentLevel;
      let newRequiredXP = prev.requiredXP;
      let didLevelUp = false;
      let levelUpInfo = null;

      // Check if currentXP >= requiredXP
      if (newXP >= prev.requiredXP) {
        didLevelUp = true;
        newLevel = prev.currentLevel + 1;
        newRequiredXP = Math.round(prev.requiredXP * 1.5);
        levelUpInfo = {
          fromLevel: prev.currentLevel,
          toLevel: newLevel,
          reward: prev.nextLevelReward,
          newXP
        };
      }

      const xpToNext = Math.max(0, newRequiredXP - newXP);
      const baseXP = prev.baseLevelXP;
      const progressPct = Math.min(100, Math.max(0, ((newXP - baseXP) / (newRequiredXP - baseXP)) * 100));

      const updatedBalances = {
        ...prev.balances,
        ves: prev.balances.ves + extraVEs
      };

      if (didLevelUp) {
        setTimeout(() => {
          setJustLevelledUpData(levelUpInfo);
          setShowLevelUpModal(true);
          soundEffects?.playLevelUp();
        }, 600);
      }

      return {
        ...prev,
        currentLevel: newLevel,
        currentXP: newXP,
        requiredXP: newRequiredXP,
        nextLevel: newLevel + 1,
        xpToNext,
        progressPct: parseFloat(progressPct.toFixed(1)),
        balances: updatedBalances,
        todaysBoost: {
          ...prev.todaysBoost,
          xpEarnedToday: prev.todaysBoost.xpEarnedToday + amount
        }
      };
    });

    // Append to XP activities log
    const newActivity = {
      id: `act_${Date.now()}`,
      type: 'bonus',
      title: sourceTitle,
      description: `Earned via ${sourceTitle}`,
      timestamp: 'Just now',
      xpChange: amount,
      veChange: extraVEs > 0 ? extraVEs : undefined,
      rewardType: extraVEs > 0 ? 'VEs' : 'XP',
      icon: extraVEs > 0 ? 'coins' : 'star',
      category: 'Bonus'
    };

    setActivities(prev => [newActivity, ...prev]);
  }, [soundEffects]);

  /**
   * Manually trigger level-up celebration for review/demo purposes
   */
  const triggerManualLevelUp = useCallback(() => {
    const levelUpInfo = {
      fromLevel: profile.currentLevel,
      toLevel: profile.currentLevel + 1,
      reward: profile.nextLevelReward,
      newXP: profile.requiredXP
    };
    setJustLevelledUpData(levelUpInfo);
    setShowLevelUpModal(true);
    soundEffects?.playLevelUp();
  }, [profile, soundEffects]);

  /**
   * Close level-up modal and apply claim rewards
   */
  const claimLevelUp = useCallback(() => {
    if (justLevelledUpData) {
      setProfile(prev => ({
        ...prev,
        balances: {
          ...prev.balances,
          ves: prev.balances.ves + (justLevelledUpData.reward?.amount || 500),
          gems: prev.balances.gems + (justLevelledUpData.reward?.bonusGems || 25),
          spins: prev.balances.spins + (justLevelledUpData.reward?.bonusSpins || 2)
        }
      }));

      // Update roadmap current node
      setRoadmap(prev =>
        prev.map(item => {
          if (item.level < justLevelledUpData.toLevel) return { ...item, status: 'completed' };
          if (item.level === justLevelledUpData.toLevel) return { ...item, status: 'current' };
          if (item.level === justLevelledUpData.toLevel + 1) return { ...item, status: 'next' };
          return { ...item, status: 'locked' };
        })
      );
    }
    setShowLevelUpModal(false);
    setJustLevelledUpData(null);
  }, [justLevelledUpData]);

  /**
   * Claim an earning feature reward
   */
  const claimFeature = useCallback((featureId) => {
    const feat = earningFeatures.find(f => f.id === featureId);
    if (!feat || feat.isComingSoon || feat.status === 'claimed') return;

    addXP(feat.xpReward, feat.title, 'XP');
    soundEffects?.playCoinCatch();

    // Set cooldown
    setEarningFeatures(prev =>
      prev.map(f => (f.id === featureId ? { ...f, status: 'claimed' } : f))
    );
  }, [earningFeatures, addXP, soundEffects]);

  /**
   * Reset / Retry from Error state
   */
  const retryDashboard = useCallback(() => {
    setDashboardState('loading');
    setTimeout(() => {
      setDashboardState('normal');
    }, 700);
  }, []);

  return {
    profile,
    roadmap,
    activities,
    earningFeatures,
    showLevelUpModal,
    justLevelledUpData,
    dashboardState,
    setDashboardState,
    setShowLevelUpModal,
    addXP,
    triggerManualLevelUp,
    claimLevelUp,
    claimFeature,
    retryDashboard
  };
}
