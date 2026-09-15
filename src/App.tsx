/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCommatchGame } from './hooks/useCommatchGame';
import { HomeScreen } from './components/HomeScreen';
import { HUD } from './components/HUD';
import { TargetProgressBar } from './components/TargetProgressBar';
import { GameBoard } from './components/GameBoard';
import { BottomControls } from './components/BottomControls';
import { LevelCompleteModal } from './components/LevelCompleteModal';
import { LevelSelectModal } from './components/LevelSelectModal';
import { BadgesModal } from './components/BadgesModal';
import { BadgeAwardModal } from './components/BadgeAwardModal';
import { OnboardingModal } from './components/OnboardingModal';
import { SettingsModal } from './components/SettingsModal';
import { FloatingTextsOverlay } from './components/FloatingTextsOverlay';
import { HintOverlay } from './components/HintOverlay';

export default function App() {
  const [isLevelSelectOpen, setIsLevelSelectOpen] = useState(false);
  const [isBadgesOpen, setIsBadgesOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);

  const {
    saveData,
    profilesState,
    activeProfile,
    switchProfile,
    addNewProfile,
    deleteProfile,
    screenMode,
    setScreenMode,
    setPlayerName,
    currentCategory,
    allCategoryItems,
    isCurrentCategoryFullyDiscovered,
    dragState,
    selectedSlotIndex,
    floatingTexts,
    newDiscoveryBadgeId,
    newEarnedBadge,
    dismissBadgeAward,
    activeHint,
    isLevelCompleteModalOpen,
    isGameFinishedModalOpen,
    isRefilling,
    handlePointerDown,
    handleSlotClick,
    performRefill,
    triggerHint,
    showItemRecipeInfo,
    closeHint,
    advanceToNextLevel,
    selectLevel,
    toggleMute,
    resetCurrentProfile,
  } = useCommatchGame();

  // First time prompt if no player name is set yet
  const showOnboarding = !saveData.playerName || isEditingName;

  return (
    <div className="relative w-full h-[100dvh] bg-gradient-to-b from-[#150a30] via-[#1e0d44] to-[#0c0520] text-white flex flex-col justify-between overflow-hidden select-none touch-none font-sans">
      {/* Dynamic Animated Ambient Glow Lights */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-fuchsia-600/25 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-500/20 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating Animated Coin & Discovery Text Overlay */}
      <FloatingTextsOverlay texts={floatingTexts} />

      {/* 3-Second Visual Hint / Recipe Info Overlay */}
      <HintOverlay hint={activeHint} onClose={closeHint} />

      {/* VIEW SWITCH: HOME / WELCOME SCREEN vs IN-GAME BOARD */}
      {screenMode === 'home' ? (
        <HomeScreen
          playerName={saveData.playerName || ''}
          avatarIcon={activeProfile.avatarIcon || '🔮'}
          currentLevelIndex={saveData.currentLevelIndex}
          completedLevelIndices={saveData.completedLevelIndices}
          earnedBadgeIds={saveData.earnedBadgeIds}
          gold={saveData.gold}
          totalMerges={saveData.totalMerges}
          onPlayCurrentLevel={() => setScreenMode('game')}
          onOpenMap={() => setIsLevelSelectOpen(true)}
          onOpenBadges={() => setIsBadgesOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onEditName={() => setIsEditingName(true)}
        />
      ) : (
        <div className="w-full h-full flex flex-col justify-between overflow-hidden">
          {/* Header HUD: Logo, Coins, Badges, Level Map, Sound, Home */}
          <header className="z-10 w-full shrink-0">
            <HUD
              saveData={saveData}
              category={currentCategory}
              onToggleMute={toggleMute}
              onOpenHome={() => setScreenMode('home')}
              onOpenBadges={() => setIsBadgesOpen(true)}
              onOpenLevelSelect={() => setIsLevelSelectOpen(true)}
            />
          </header>

          {/* Middle Game Area: Target Progress Bar + 4x4 Grid Board */}
          <main className="flex-1 min-h-0 flex flex-col justify-center items-center z-10 w-full px-2 gap-1 sm:gap-2">
            {/* Level Target Progress Bar */}
            <TargetProgressBar
              category={currentCategory}
              allItems={allCategoryItems}
              discoveredIds={saveData.discoveredItemIds}
              newDiscoveryBadgeId={newDiscoveryBadgeId}
              onOpenLevelSelect={() => setIsLevelSelectOpen(true)}
              onShowItemRecipe={showItemRecipeInfo}
            />

            {/* 4x4 Square Framed Game Board */}
            <GameBoard
              board={saveData.boardState}
              category={currentCategory}
              dragState={dragState}
              selectedSlotIndex={selectedSlotIndex}
              activeHint={activeHint}
              onPointerDown={handlePointerDown}
              onSlotClick={handleSlotClick}
            />
          </main>

          {/* Bottom Controls: Refill, Hint Button & Item Info Screen */}
          <footer className="z-10 w-full shrink-0">
            <BottomControls
              board={saveData.boardState}
              category={currentCategory}
              selectedSlotIndex={selectedSlotIndex}
              dragState={dragState}
              isRefilling={isRefilling}
              isAllDiscovered={isCurrentCategoryFullyDiscovered}
              onRefill={() => performRefill(true)}
              onTriggerHint={triggerHint}
            />
          </footer>
        </div>
      )}

      {/* Onboarding / Name Prompt Modal (Shown on 1st launch or when editing) */}
      <OnboardingModal
        isOpen={showOnboarding}
        initialName={saveData.playerName || ''}
        isEditMode={Boolean(saveData.playerName && isEditingName)}
        onSaveName={(name) => {
          setPlayerName(name);
          setIsEditingName(false);
        }}
        onClose={() => setIsEditingName(false)}
      />

      {/* Badges Modal (Kazanımlarım) */}
      <BadgesModal
        isOpen={isBadgesOpen}
        earnedBadgeIds={saveData.earnedBadgeIds}
        completedLevelIndices={saveData.completedLevelIndices}
        onClose={() => setIsBadgesOpen(false)}
      />

      {/* Milestone Celebratory Award Modal (Opens first on milestone level completions) */}
      <BadgeAwardModal
        badge={newEarnedBadge}
        onClaim={() => {
          dismissBadgeAward();
        }}
      />

      {/* Settings & Multi-User Profile Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        isMuted={saveData.isMuted}
        profiles={profilesState.profiles}
        activeProfileId={profilesState.activeProfileId}
        onSwitchProfile={(id) => switchProfile(id)}
        onAddNewProfile={(name, avatar) => addNewProfile(name, avatar)}
        onDeleteProfile={(id) => deleteProfile(id)}
        onToggleMute={toggleMute}
        onEditName={() => setIsEditingName(true)}
        onResetGame={resetCurrentProfile}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* Level Complete / Game Complete Modal (Opens after badge claim or on normal levels) */}
      <LevelCompleteModal
        category={currentCategory}
        isOpen={isLevelCompleteModalOpen || isGameFinishedModalOpen}
        isFinalLevel={isGameFinishedModalOpen}
        onNextLevel={() => {
          advanceToNextLevel();
        }}
      />

      {/* Level Select Map (1 - 100 Levels) */}
      <LevelSelectModal
        isOpen={isLevelSelectOpen}
        currentLevelIndex={saveData.currentLevelIndex}
        completedLevelIndices={saveData.completedLevelIndices}
        onSelectLevel={(idx) => {
          selectLevel(idx);
          setScreenMode('game');
        }}
        onClose={() => setIsLevelSelectOpen(false)}
      />
    </div>
  );
}
