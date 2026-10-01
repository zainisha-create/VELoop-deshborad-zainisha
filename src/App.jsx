import React, { useState } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { HomePage } from './pages/Home/HomePage';
import { EarnPage } from './pages/Earn/EarnPage';
import { LevelDashboard } from './pages/LevelDashboard/LevelDashboard';
import { WalletPage } from './pages/Wallet/WalletPage';
import { ProfilePage } from './pages/Profile/ProfilePage';
import { LevelUpModal } from './components/LevelUpModal/LevelUpModal';
import { GameContainer } from './components/PlayAndEarn/GameContainer/GameContainer';
import { DevBar } from './components/DevBar/DevBar';
import { useLevelProgress } from './hooks/useLevelProgress';
import { useSoundEffects } from './hooks/useSoundEffects';

export const App = () => {
  // Navigation tabs: 'home' | 'earn' | 'rewards' | 'wallet' | 'profile'
  const [activeTab, setActiveTab] = useState('rewards');
  const [arcadeModalOpen, setArcadeModalOpen] = useState(false);

  const soundEffects = useSoundEffects();
  const {
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
  } = useLevelProgress(soundEffects);

  const handleLaunchArcade = () => {
    setArcadeModalOpen(true);
  };

  return (
    <div
      className="veloop-app"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* Persistent Top Navbar & Mobile Bottom Nav */}
      <Navbar
        profile={profile}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isMuted={soundEffects.isMuted}
        onToggleMute={soundEffects.toggleMute}
      />

      {/* Screen Render based on activeTab */}
      <main
        style={{
          flex: "1 0 auto",
          width: "100%",
          maxWidth: "var(--content-max-width)",
          margin: "0 auto",
          padding: "24px 20px 60px",
          boxSizing: "border-box",
          minHeight: 0,
          overflow: "visible",
        }}
      >
        {activeTab === "home" && (
          <HomePage
            profile={profile}
            onNavigate={setActiveTab}
            onAddXP={addXP}
            soundEffects={soundEffects}
          />
        )}

        {activeTab === "earn" && (
          <EarnPage
            profile={profile}
            onAddXP={addXP}
            onLaunchGame={handleLaunchArcade}
            soundEffects={soundEffects}
          />
        )}

        {activeTab === "rewards" && (
          <LevelDashboard
            profile={profile}
            roadmap={roadmap}
            activities={activities}
            earningFeatures={earningFeatures}
            dashboardState={dashboardState}
            onAddXP={addXP}
            onClaimFeature={claimFeature}
            onTriggerLevelUp={triggerManualLevelUp}
            soundEffects={soundEffects}
            onRetry={retryDashboard}
            isStandalone={false}
          />
        )}

        {activeTab === "wallet" && (
          <WalletPage
            profile={profile}
            onAddXP={addXP}
            soundEffects={soundEffects}
          />
        )}

        {activeTab === "profile" && (
          <ProfilePage profile={profile} onNavigate={setActiveTab} />
        )}
      </main>

      {/* Global Arcade Game Modal */}
      {arcadeModalOpen && (
        <GameContainer
          profile={profile}
          onRewardEarned={addXP}
          soundEffects={soundEffects}
          isOpenByDefault={true}
          onCloseExternal={() => setArcadeModalOpen(false)}
        />
      )}

      {/* Global Level-Up Celebration Modal */}
      {showLevelUpModal && (
        <LevelUpModal
          levelUpData={justLevelledUpData}
          onClaim={claimLevelUp}
          onClose={() => setShowLevelUpModal(false)}
        />
      )}

      {/* Reviewer / Inspection Toolbar */}
      <DevBar
        dashboardState={dashboardState}
        onChangeState={setDashboardState}
        onAddXP={addXP}
        onTriggerLevelUp={triggerManualLevelUp}
      />
    </div>
  );
};

export default App;
