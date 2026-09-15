import { useState, useEffect, useRef, useCallback } from 'react';
import {
  SaveData,
  BoardSlot,
  ItemDef,
  FloatingCoinText,
  DraggingInfo,
  HintInfo,
  MilestoneBadge,
  AppProfilesState,
  UserProfile,
} from '../types/game';
import {
  CATEGORIES,
  resolveCategoryMerge,
  getHintForCategory,
  getItemRecipeInfo,
} from '../data/categories';
import { MILESTONE_BADGES, getBadgeForLevel } from '../data/badges';
import {
  loadProfilesState,
  saveProfilesState,
  createNewProfile,
  createInitialBoardForLevel,
  createInitialSave,
  MAX_PROFILES,
} from '../services/storageService';
import { audio } from '../services/audioService';
import confetti from 'canvas-confetti';

export function useCommatchGame() {
  // Master multi-profile state
  const [profilesState, setProfilesState] = useState<AppProfilesState>(() => loadProfilesState());

  // Active profile helper
  const activeProfile =
    profilesState.profiles.find((p) => p.id === profilesState.activeProfileId) ||
    profilesState.profiles[0];

  // Active SaveData
  const [saveData, setSaveData] = useState<SaveData>(() => activeProfile.data);

  const [screenMode, setScreenMode] = useState<'home' | 'game'>('home');
  const [dragState, setDragState] = useState<DraggingInfo | null>(null);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null);
  const [floatingTexts, setFloatingTexts] = useState<FloatingCoinText[]>([]);
  const [newDiscoveryBadgeId, setNewDiscoveryBadgeId] = useState<string | null>(null);
  const [newEarnedBadge, setNewEarnedBadge] = useState<MilestoneBadge | null>(null);
  const [isLevelCompleteModalOpen, setIsLevelCompleteModalOpen] = useState<boolean>(false);
  const [isGameFinishedModalOpen, setIsGameFinishedModalOpen] = useState<boolean>(false);
  const [isRefilling, setIsRefilling] = useState<boolean>(false);
  const [activeHint, setActiveHint] = useState<HintInfo | null>(null);
  const hintTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dragStartPosRef = useRef<{ x: number; y: number } | null>(null);
  const hasDraggedRef = useRef<boolean>(false);
  const lastDragEndTimeRef = useRef<number>(0);

  const stateRef = useRef(saveData);
  stateRef.current = saveData;

  const profilesRef = useRef(profilesState);
  profilesRef.current = profilesState;

  const currentCategory = CATEGORIES[saveData.currentLevelIndex] || CATEGORIES[0];
  const allCategoryItems = currentCategory.items;
  const discoveredInCurrentCategory = allCategoryItems.filter((i) =>
    saveData.discoveredItemIds.includes(i.id)
  );
  const isCurrentCategoryFullyDiscovered =
    discoveredInCurrentCategory.length === allCategoryItems.length;

  // Sync audio mute state
  useEffect(() => {
    audio.setMuted(saveData.isMuted);
  }, [saveData.isMuted]);

  // Persist save data into active profile whenever saveData changes
  useEffect(() => {
    setProfilesState((prev) => {
      const updatedProfiles = prev.profiles.map((p) => {
        if (p.id === prev.activeProfileId) {
          return {
            ...p,
            name: saveData.playerName || p.name,
            data: saveData,
          };
        }
        return p;
      });

      const nextState: AppProfilesState = {
        ...prev,
        profiles: updatedProfiles,
      };

      saveProfilesState(nextState);
      return nextState;
    });
  }, [saveData]);

  // Switch Active User Profile
  const switchProfile = useCallback((profileId: string) => {
    const target = profilesRef.current.profiles.find((p) => p.id === profileId);
    if (!target) return;

    audio.playPop();
    setProfilesState((prev) => {
      const nextState = {
        ...prev,
        activeProfileId: profileId,
      };
      saveProfilesState(nextState);
      return nextState;
    });

    setSaveData(target.data);
    setSelectedSlotIndex(null);
    setIsLevelCompleteModalOpen(false);
    setIsGameFinishedModalOpen(false);
    setNewEarnedBadge(null);
    setActiveHint(null);
  }, []);

  // Add a new profile (up to 5)
  const addNewProfile = useCallback((name: string, avatarIcon?: string): boolean => {
    const current = profilesRef.current;
    if (current.profiles.length >= MAX_PROFILES) {
      return false;
    }

    const newProf = createNewProfile(name, avatarIcon);
    audio.playDiscoverySound();

    const nextState: AppProfilesState = {
      activeProfileId: newProf.id,
      profiles: [...current.profiles, newProf],
    };

    setProfilesState(nextState);
    saveProfilesState(nextState);
    setSaveData(newProf.data);
    setSelectedSlotIndex(null);
    setIsLevelCompleteModalOpen(false);
    setIsGameFinishedModalOpen(false);
    setNewEarnedBadge(null);
    setActiveHint(null);

    return true;
  }, []);

  // Delete a profile
  const deleteProfile = useCallback((profileId: string): boolean => {
    const current = profilesRef.current;
    if (current.profiles.length <= 1) {
      return false; // Cannot delete last remaining profile
    }

    const remaining = current.profiles.filter((p) => p.id !== profileId);
    const nextActiveId =
      current.activeProfileId === profileId ? remaining[0].id : current.activeProfileId;
    const nextActive = remaining.find((p) => p.id === nextActiveId) || remaining[0];

    const nextState: AppProfilesState = {
      activeProfileId: nextActiveId,
      profiles: remaining,
    };

    setProfilesState(nextState);
    saveProfilesState(nextState);
    setSaveData(nextActive.data);
    audio.playPop();

    return true;
  }, []);

  // Update profile name / avatar
  const setPlayerName = useCallback((name: string, avatarIcon?: string) => {
    const cleanName = name.trim();
    setSaveData((prev) => ({
      ...prev,
      playerName: cleanName,
    }));

    setProfilesState((prev) => {
      const updatedProfiles = prev.profiles.map((p) => {
        if (p.id === prev.activeProfileId) {
          return {
            ...p,
            name: cleanName || p.name,
            avatarIcon: avatarIcon || p.avatarIcon,
          };
        }
        return p;
      });
      const nextState = { ...prev, profiles: updatedProfiles };
      saveProfilesState(nextState);
      return nextState;
    });
  }, []);

  // Add floating text
  const addFloatingText = useCallback((x: number, y: number, text: string, color?: string) => {
    const id = `fl_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    setFloatingTexts((prev) => [...prev.slice(-6), { id, x, y, text, color }]);
    setTimeout(() => {
      setFloatingTexts((prev) => prev.filter((item) => item.id !== id));
    }, 1200);
  }, []);

  // Confetti trigger
  const triggerConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 90,
        spread: 95,
        origin: { y: 0.55 },
        colors: ['#38bdf8', '#f43f5e', '#10b981', '#fbbf24', '#a855f7'],
      });
    } catch {
      // Ignore
    }
  }, []);

  // Auto/Smart Refill when board items count <= 3
  const performRefill = useCallback(
    (showSound = true) => {
      const state = stateRef.current;
      const cat = CATEGORIES[state.currentLevelIndex] || CATEGORIES[0];
      const basePool = cat.baseItemIds;

      setIsRefilling(true);
      if (showSound) {
        audio.playRefillSound();
      }

      setSaveData((prev) => {
        const nextBoard = [...prev.boardState];
        nextBoard.forEach((slot, idx) => {
          if (!slot) {
            const randomBaseId = basePool[Math.floor(Math.random() * basePool.length)];
            nextBoard[idx] = {
              uid: `refill_${idx}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
              itemId: randomBaseId,
              createdAt: Date.now(),
              isNew: true,
            };
          }
        });

        return {
          ...prev,
          boardState: nextBoard,
        };
      });

      setTimeout(() => {
        setIsRefilling(false);
      }, 400);
    },
    []
  );

  // Check Level Completion with Badge-First Modal Flow
  const checkLevelCompletion = useCallback(
    (discoveredIds: string[], targetCategoryIndex: number) => {
      const cat = CATEGORIES[targetCategoryIndex] || CATEGORIES[0];
      const allDiscovered = cat.items.every((i) => discoveredIds.includes(i.id));

      if (allDiscovered) {
        const levelNumber = cat.levelNumber;
        const milestoneBadge = getBadgeForLevel(levelNumber);
        const alreadyEarnedBadge = stateRef.current.earnedBadgeIds.includes(milestoneBadge?.id || '');

        // Update save data
        setSaveData((prev) => {
          const nextCompleted = prev.completedLevelIndices.includes(targetCategoryIndex)
            ? prev.completedLevelIndices
            : [...prev.completedLevelIndices, targetCategoryIndex];

          let nextBadges = prev.earnedBadgeIds;
          if (milestoneBadge && !nextBadges.includes(milestoneBadge.id)) {
            nextBadges = [...nextBadges, milestoneBadge.id];
          }

          return {
            ...prev,
            completedLevelIndices: nextCompleted,
            earnedBadgeIds: nextBadges,
          };
        });

        // Trigger celebratory audio and modals
        setTimeout(() => {
          audio.playLevelCompleteSound();
          triggerConfetti();

          // BADGE FIRST ORDER:
          // If level has a milestone badge (10, 20, 30...) and hasn't been awarded yet in this session,
          // display the BadgeAwardModal first! The LevelCompleteModal will open when user claims the badge.
          if (milestoneBadge && !alreadyEarnedBadge) {
            setNewEarnedBadge(milestoneBadge);
            setIsLevelCompleteModalOpen(false);
            setIsGameFinishedModalOpen(false);
          } else {
            if (targetCategoryIndex >= CATEGORIES.length - 1) {
              setIsGameFinishedModalOpen(true);
            } else {
              setIsLevelCompleteModalOpen(true);
            }
          }
        }, 500);
      }
    },
    [triggerConfetti]
  );

  // Dismiss Badge Award Modal and transition to Level Complete Modal
  const dismissBadgeAward = useCallback(() => {
    setNewEarnedBadge(null);
    // After claiming badge, immediately display level complete screen!
    if (stateRef.current.currentLevelIndex >= CATEGORIES.length - 1) {
      setIsGameFinishedModalOpen(true);
    } else {
      setIsLevelCompleteModalOpen(true);
    }
  }, []);

  // Execute Merge between two slot indexes
  const executeMerge = useCallback(
    (sourceIdx: number, targetIdx: number, clientX?: number, clientY?: number) => {
      const state = stateRef.current;
      const sourceSlot = state.boardState[sourceIdx];
      const targetSlot = state.boardState[targetIdx];
      if (!sourceSlot || !targetSlot) return;

      const cat = CATEGORIES[state.currentLevelIndex] || CATEGORIES[0];
      const resultItemDef: ItemDef = resolveCategoryMerge(
        cat,
        sourceSlot.itemId,
        targetSlot.itemId,
        state.discoveredItemIds
      );

      const isFirstDiscovery = !state.discoveredItemIds.includes(resultItemDef.id);
      const coinReward = isFirstDiscovery ? 35 : 5;

      const newSlot: BoardSlot = {
        uid: `merged_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        itemId: resultItemDef.id,
        createdAt: Date.now(),
        isNew: true,
      };

      // Sound & floating feedback
      if (isFirstDiscovery) {
        audio.playDiscoverySound();
        audio.playCoinSound();
        setNewDiscoveryBadgeId(resultItemDef.id);
        setTimeout(() => {
          setNewDiscoveryBadgeId(null);
        }, 1800);
      } else {
        audio.playMergeSound();
      }

      if (clientX && clientY) {
        addFloatingText(
          clientX,
          clientY - 20,
          `+${coinReward} 🪙`,
          isFirstDiscovery ? '#f43f5e' : '#fbbf24'
        );
      }

      const updatedDiscovered = isFirstDiscovery
        ? [...state.discoveredItemIds, resultItemDef.id]
        : state.discoveredItemIds;

      setSaveData((prev) => {
        const nextBoard = [...prev.boardState];
        nextBoard[targetIdx] = newSlot;
        nextBoard[sourceIdx] = null;

        return {
          ...prev,
          boardState: nextBoard,
          discoveredItemIds: updatedDiscovered,
          gold: prev.gold + coinReward,
          totalMerges: prev.totalMerges + 1,
        };
      });

      setSelectedSlotIndex(null);

      // Check level completion
      checkLevelCompletion(updatedDiscovered, state.currentLevelIndex);

      // Check smart refill if remaining items <= 3
      setTimeout(() => {
        const remainingCount = stateRef.current.boardState.filter((s) => s !== null).length;
        if (remainingCount <= 3) {
          performRefill(true);
        }
      }, 350);
    },
    [addFloatingText, checkLevelCompletion, performRefill]
  );

  // Move item to empty slot
  const moveItem = useCallback((sourceIdx: number, targetIdx: number) => {
    audio.playPop();
    setSaveData((prev) => {
      const nextBoard = [...prev.boardState];
      const sourceSlot = nextBoard[sourceIdx];
      if (!sourceSlot) return prev;

      nextBoard[targetIdx] = {
        ...sourceSlot,
        uid: `move_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      };
      nextBoard[sourceIdx] = null;

      return {
        ...prev,
        boardState: nextBoard,
      };
    });
    setSelectedSlotIndex(null);
  }, []);

  // Find closest slot using bounding boxes
  const findClosestSlotIndex = (clientX: number, clientY: number, excludeIdx: number): number | null => {
    const slotElements = document.querySelectorAll('[data-slot-index]');
    let closestIdx: number | null = null;
    let minDistance = 65; // 65px magnetic tolerance

    slotElements.forEach((el) => {
      const idx = Number(el.getAttribute('data-slot-index'));
      if (idx === excludeIdx) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dist = Math.hypot(clientX - centerX, clientY - centerY);

      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = idx;
      }
    });

    return closestIdx;
  };

  // Pointer drag start
  const handlePointerDown = useCallback((slotIndex: number, clientX: number, clientY: number) => {
    const state = stateRef.current;
    const slot = state.boardState[slotIndex];
    if (!slot) return;

    audio.playPop();
    dragStartPosRef.current = { x: clientX, y: clientY };
    hasDraggedRef.current = false;

    setDragState({
      isDragging: true,
      sourceIndex: slotIndex,
      itemId: slot.itemId,
      x: clientX,
      y: clientY,
      hoverIndex: null,
    });
  }, []);

  // Pointer drag move
  const handlePointerMove = useCallback((clientX: number, clientY: number) => {
    setDragState((prev) => {
      if (!prev || !prev.isDragging) return null;

      if (dragStartPosRef.current) {
        const moveDist = Math.hypot(
          clientX - dragStartPosRef.current.x,
          clientY - dragStartPosRef.current.y
        );
        if (moveDist > 6) {
          hasDraggedRef.current = true;
        }
      }

      const closestSlot = findClosestSlotIndex(clientX, clientY, prev.sourceIndex);

      return {
        ...prev,
        x: clientX,
        y: clientY,
        hoverIndex: closestSlot,
      };
    });
  }, []);

  // Pointer drag release / drop
  const handlePointerUp = useCallback(() => {
    const wasDragging = hasDraggedRef.current;
    lastDragEndTimeRef.current = Date.now();

    setDragState((prevDrag) => {
      if (!prevDrag || !prevDrag.isDragging) return null;

      const { sourceIndex, hoverIndex, x, y } = prevDrag;
      const state = stateRef.current;

      if (wasDragging && hoverIndex !== null && hoverIndex !== sourceIndex) {
        const targetSlot = state.boardState[hoverIndex];
        if (targetSlot === null) {
          moveItem(sourceIndex, hoverIndex);
        } else {
          executeMerge(sourceIndex, hoverIndex, x, y);
        }
      } else if (!wasDragging) {
        // Simple tap without dragging
        const clickedSlot = state.boardState[sourceIndex];
        setSelectedSlotIndex((prevSelected) => {
          if (prevSelected === null) {
            if (clickedSlot) {
              audio.playClick();
              return sourceIndex;
            }
            return null;
          } else if (prevSelected === sourceIndex) {
            audio.playClick();
            return null;
          } else {
            const sourceSlot = state.boardState[prevSelected];
            if (!sourceSlot) {
              return sourceIndex;
            }
            if (!clickedSlot) {
              moveItem(prevSelected, sourceIndex);
            } else {
              executeMerge(prevSelected, sourceIndex, x, y);
            }
            return null;
          }
        });
      } else {
        audio.playClick();
      }

      return null;
    });

    dragStartPosRef.current = null;
    hasDraggedRef.current = false;
  }, [executeMerge, moveItem]);

  // Global window listeners for drag
  useEffect(() => {
    const onWindowMove = (e: PointerEvent) => {
      if (dragState?.isDragging) {
        handlePointerMove(e.clientX, e.clientY);
      }
    };
    const onWindowUp = () => {
      if (dragState?.isDragging) {
        handlePointerUp();
      }
    };

    window.addEventListener('pointermove', onWindowMove);
    window.addEventListener('pointerup', onWindowUp);
    window.addEventListener('pointercancel', onWindowUp);

    return () => {
      window.removeEventListener('pointermove', onWindowMove);
      window.removeEventListener('pointerup', onWindowUp);
      window.removeEventListener('pointercancel', onWindowUp);
    };
  }, [dragState?.isDragging, handlePointerMove, handlePointerUp]);

  // Click-to-merge / Tap support
  const handleSlotClick = useCallback(
    (slotIndex: number) => {
      if (Date.now() - lastDragEndTimeRef.current < 350) {
        return;
      }

      const state = stateRef.current;
      const clickedSlot = state.boardState[slotIndex];

      if (selectedSlotIndex === null) {
        if (clickedSlot) {
          audio.playClick();
          setSelectedSlotIndex(slotIndex);
        }
      } else if (selectedSlotIndex === slotIndex) {
        audio.playClick();
        setSelectedSlotIndex(null);
      } else {
        const sourceSlot = state.boardState[selectedSlotIndex];
        if (!sourceSlot) {
          setSelectedSlotIndex(slotIndex);
          return;
        }

        if (!clickedSlot) {
          moveItem(selectedSlotIndex, slotIndex);
        } else {
          executeMerge(selectedSlotIndex, slotIndex);
        }
      }
    },
    [selectedSlotIndex, executeMerge, moveItem]
  );

  // Switch or Jump directly to any Level
  const selectLevel = useCallback((levelIndex: number) => {
    const targetCat = CATEGORIES[levelIndex] || CATEGORIES[0];
    const newBoard = createInitialBoardForLevel(levelIndex);
    audio.playPop();

    setSaveData((prev) => ({
      ...prev,
      currentLevelIndex: levelIndex,
      boardState: newBoard,
      discoveredItemIds: Array.from(new Set([...targetCat.baseItemIds])),
    }));

    setSelectedSlotIndex(null);
    setIsLevelCompleteModalOpen(false);
    setIsGameFinishedModalOpen(false);
  }, []);

  // Advance to next level
  const advanceToNextLevel = useCallback(() => {
    const nextLevelIndex = (stateRef.current.currentLevelIndex + 1) % CATEGORIES.length;
    selectLevel(nextLevelIndex);
  }, [selectLevel]);

  // Toggle Mute
  const toggleMute = useCallback(() => {
    const nextMuted = audio.toggleMute();
    setSaveData((prev) => ({ ...prev, isMuted: nextMuted }));
  }, []);

  // Trigger visual hint
  const triggerHint = useCallback(() => {
    const state = stateRef.current;
    const cat = CATEGORIES[state.currentLevelIndex] || CATEGORIES[0];
    const hintData = getHintForCategory(cat, state.discoveredItemIds);

    if (!hintData) {
      addFloatingText(window.innerWidth / 2, window.innerHeight / 2, 'Tüm Nesneler Keşfedildi! ✨', '#38bdf8');
      return;
    }

    if (hintTimeoutRef.current) {
      clearTimeout(hintTimeoutRef.current);
    }

    audio.playPop();
    setActiveHint({
      ...hintData,
      id: `hint_${Date.now()}`,
      createdAt: Date.now(),
    });

    hintTimeoutRef.current = setTimeout(() => {
      setActiveHint(null);
      hintTimeoutRef.current = null;
    }, 3000);
  }, [addFloatingText]);

  // Show recipe info
  const showItemRecipeInfo = useCallback((itemId: string) => {
    const state = stateRef.current;
    if (!state.discoveredItemIds.includes(itemId)) {
      return;
    }

    const cat = CATEGORIES[state.currentLevelIndex] || CATEGORIES[0];
    const recipeInfo = getItemRecipeInfo(cat, itemId);
    if (!recipeInfo) return;

    if (hintTimeoutRef.current) {
      clearTimeout(hintTimeoutRef.current);
    }

    audio.playPop();
    setActiveHint({
      targetItem: recipeInfo.targetItem,
      itemA: recipeInfo.itemA,
      itemB: recipeInfo.itemB,
      isBaseItem: recipeInfo.isBaseItem,
      title: recipeInfo.isBaseItem
        ? 'Temel Başlangıç Nesnesi'
        : `${recipeInfo.targetItem.name} Sentez Tarifi`,
      badgeLabel: recipeInfo.isBaseItem ? 'Temel' : 'Tarif',
      id: `recipe_${itemId}_${Date.now()}`,
      createdAt: Date.now(),
    });

    hintTimeoutRef.current = setTimeout(() => {
      setActiveHint(null);
      hintTimeoutRef.current = null;
    }, 3000);
  }, []);

  const closeHint = useCallback(() => {
    if (hintTimeoutRef.current) {
      clearTimeout(hintTimeoutRef.current);
      hintTimeoutRef.current = null;
    }
    setActiveHint(null);
  }, []);

  // Clean up timer on level change or unmount
  useEffect(() => {
    return () => {
      if (hintTimeoutRef.current) {
        clearTimeout(hintTimeoutRef.current);
      }
    };
  }, [saveData.currentLevelIndex]);

  // Reset Game for Current Profile Only
  const resetCurrentProfile = useCallback(() => {
    if (hintTimeoutRef.current) {
      clearTimeout(hintTimeoutRef.current);
      setActiveHint(null);
    }
    const freshSave = createInitialSave(0);
    freshSave.playerName = saveData.playerName;
    setSaveData(freshSave);
    selectLevel(0);
  }, [saveData.playerName, selectLevel]);

  return {
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
    discoveredInCurrentCategory,
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
    setIsLevelCompleteModalOpen,
    setIsGameFinishedModalOpen,
  };
}
