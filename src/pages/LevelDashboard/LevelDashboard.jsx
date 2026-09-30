import React, { useRef } from 'react';
import { Navbar } from '../../components/Navbar/Navbar';
import { LevelHero } from '../../components/LevelHero/LevelHero';
import { TodaysBoost } from '../../components/TodaysBoost/TodaysBoost';
import { NextLevelReward } from '../../components/NextLevelReward/NextLevelReward';
import { LevelRoadmap } from '../../components/LevelRoadmap/LevelRoadmap';
import { GameContainer } from '../../components/PlayAndEarn/GameContainer/GameContainer';
import { EarnMoreXP } from '../../components/EarnMoreXP/EarnMoreXP';
import { XPActivity } from '../../components/XPActivity/XPActivity';
import { LevelUpModal } from '../../components/LevelUpModal/LevelUpModal';
import { DashboardSkeleton } from '../../components/Skeleton/Skeleton';
import { ErrorView } from '../../components/StateViews/ErrorView';
import { DevBar } from '../../components/DevBar/DevBar';
import { useLevelProgress } from '../../hooks/useLevelProgress';
import { useSoundEffects } from '../../hooks/useSoundEffects';
import styles from './LevelDashboard.module.css';

export const LevelDashboard = ({
  profile: propProfile,
  roadmap: propRoadmap,
  activities: propActivities,
  earningFeatures: propEarningFeatures,
  dashboardState: propDashboardState,
  onAddXP: propAddXP,
  onClaimFeature: propClaimFeature,
  onTriggerLevelUp: propTriggerLevelUp,
  soundEffects: propSoundEffects,
  onRetry: propOnRetry,
  isStandalone = true
}) => {
  const localSoundEffects = useSoundEffects();
  const soundEffects = propSoundEffects || localSoundEffects;

  const hookState = useLevelProgress(soundEffects);

  const profile = propProfile || hookState.profile;
  const roadmap = propRoadmap || hookState.roadmap;
  const activities = propActivities || hookState.activities;
  const earningFeatures = propEarningFeatures || hookState.earningFeatures;
  const dashboardState = propDashboardState || hookState.dashboardState;
  const addXP = propAddXP || hookState.addXP;
  const claimFeature = propClaimFeature || hookState.claimFeature;
  const triggerManualLevelUp = propTriggerLevelUp || hookState.triggerManualLevelUp;
  const retryDashboard = propOnRetry || hookState.retryDashboard;

  const earnSectionRef = useRef(null);
  const gameSectionRef = useRef(null);

  const scrollToEarnSection = () => {
    earnSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToGameSection = () => {
    gameSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.pageWrapper} style={isStandalone ? {} : { paddingBottom: 0 }}>
      {/* Top Navbar only if rendered standalone */}
      {isStandalone && (
        <Navbar
          profile={profile}
          activeTab="rewards"
          isMuted={soundEffects.isMuted}
          onToggleMute={soundEffects.toggleMute}
        />
      )}

      <div className={isStandalone ? styles.mainContainer : styles.subContainer}>
        {/* Render Skeleton if state is 'loading' */}
        {dashboardState === 'loading' && <DashboardSkeleton />}

        {/* Render Error State if state is 'error' */}
        {dashboardState === 'error' && (
          <div className={styles.errorContainer}>
            <ErrorView onRetry={retryDashboard} />
          </div>
        )}

        {/* Render Main Functional Dashboard if state is 'normal' or 'empty' */}
        {dashboardState !== 'loading' && dashboardState !== 'error' && (
          <>
            {/* Desktop 2-Column Hero & Next Reward Grid */}
            <div className={styles.topSectionGrid}>
              <div className={styles.heroColumn}>
                <LevelHero
                  profile={profile}
                  onOpenArcade={scrollToGameSection}
                  onOpenWaysToEarn={scrollToEarnSection}
                />
              </div>

              <div className={styles.rewardColumn}>
                <NextLevelReward
                  profile={profile}
                  onInspectReward={triggerManualLevelUp}
                />
              </div>
            </div>

            {/* Today's Boost Stats Row */}
            <TodaysBoost
              todaysBoost={profile.todaysBoost}
              onOpenTasks={scrollToEarnSection}
            />

            {/* Level Progression Roadmap (Full Width Interactive Track) */}
            <LevelRoadmap
              roadmap={roadmap}
              currentLevel={profile.currentLevel}
            />

            {/* 2-Column Split: Play & Earn Arcade (Left) + XP Activity (Right) */}
            <div className={styles.midSectionGrid}>
              <div ref={gameSectionRef} className={styles.gameColumn}>
                <GameContainer
                  profile={profile}
                  onRewardEarned={addXP}
                  soundEffects={soundEffects}
                  isGameAvailable={dashboardState !== 'empty'}
                />
              </div>

              <div className={styles.activityColumn}>
                <XPActivity
                  activities={dashboardState === 'empty' ? [] : activities}
                  onStartEarning={scrollToEarnSection}
                />
              </div>
            </div>

            {/* Dedicated Earn More XP & Rewards Section (Full Width) */}
            <div ref={earnSectionRef} className={styles.earnSectionContainer}>
              <EarnMoreXP
                earningFeatures={earningFeatures}
                profile={profile}
                onClaimFeature={claimFeature}
                onLaunchGame={scrollToGameSection}
              />
            </div>
          </>
        )}
      </div>

      {/* Level-Up Celebration Modal only if standalone */}
      {isStandalone && hookState.showLevelUpModal && (
        <LevelUpModal
          levelUpData={hookState.justLevelledUpData}
          onClaim={hookState.claimLevelUp}
          onClose={() => hookState.setShowLevelUpModal(false)}
        />
      )}

      {/* Reviewer Dev Bar only if standalone */}
      {isStandalone && (
        <DevBar
          dashboardState={dashboardState}
          onChangeState={hookState.setDashboardState}
          onAddXP={addXP}
          onTriggerLevelUp={triggerManualLevelUp}
        />
      )}
    </div>
  );
};

export default LevelDashboard;
