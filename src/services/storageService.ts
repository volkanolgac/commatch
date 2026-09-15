import { SaveData, BoardSlot, UserProfile, AppProfilesState } from '../types/game';
import { CATEGORIES } from '../data/categories';

const PROFILES_STORAGE_KEY = 'commatch_profiles_v1';
const LEGACY_V2_STORAGE_KEY = 'commatch_save_data_v2';
export const BOARD_SIZE = 16; // 4x4 grid
export const MAX_PROFILES = 5;

export const AVATAR_OPTIONS = ['🔮', '🧙‍♂️', '⚡', '👑', '🌟', '🦁', '🚀', '🧪', '💎', '🎨'];

export function createInitialBoardForLevel(levelIndex: number): (BoardSlot | null)[] {
  const category = CATEGORIES[levelIndex] || CATEGORIES[0];
  const slots: (BoardSlot | null)[] = Array(BOARD_SIZE).fill(null);

  // Fill initial 8 slots with base items of this category
  const basePool = category.baseItemIds;
  const initialFillCount = 8;

  for (let i = 0; i < initialFillCount; i++) {
    const baseId = basePool[i % basePool.length];
    slots[i] = {
      uid: `init_${i}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      itemId: baseId,
      createdAt: Date.now(),
    };
  }

  return slots;
}

export function createInitialSave(levelIndex = 0): SaveData {
  const category = CATEGORIES[levelIndex] || CATEGORIES[0];
  const initialDiscovered = [...category.baseItemIds];

  return {
    playerName: '',
    currentLevelIndex: levelIndex,
    completedLevelIndices: [],
    earnedBadgeIds: [],
    discoveredItemIds: initialDiscovered,
    gold: 50,
    boardState: createInitialBoardForLevel(levelIndex),
    isMuted: false,
    totalMerges: 0,
    lastPlayedAt: Date.now(),
  };
}

export function createNewProfile(name: string, avatarIcon?: string): UserProfile {
  const id = `profile_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  const initialData = createInitialSave(0);
  initialData.playerName = name.trim();

  return {
    id,
    name: name.trim() || 'Simyacı',
    avatarIcon: avatarIcon || AVATAR_OPTIONS[0],
    createdAt: Date.now(),
    data: initialData,
  };
}

/**
 * Loads the complete profiles state, migrating legacy save data if needed.
 */
export function loadProfilesState(): AppProfilesState {
  try {
    const raw = localStorage.getItem(PROFILES_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AppProfilesState;
      if (parsed && Array.isArray(parsed.profiles) && parsed.profiles.length > 0) {
        // Ensure active profile exists
        const activeExists = parsed.profiles.some((p) => p.id === parsed.activeProfileId);
        const activeProfileId = activeExists ? parsed.activeProfileId : parsed.profiles[0].id;
        return {
          activeProfileId,
          profiles: parsed.profiles.slice(0, MAX_PROFILES),
        };
      }
    }

    // Try migrating from legacy save
    const legacyRaw = localStorage.getItem(LEGACY_V2_STORAGE_KEY);
    if (legacyRaw) {
      try {
        const legacyParsed = JSON.parse(legacyRaw) as Partial<SaveData>;
        if (legacyParsed && typeof legacyParsed.currentLevelIndex === 'number') {
          const playerName = legacyParsed.playerName?.trim() || 'Simyacı 1';
          const initialSave = createInitialSave(legacyParsed.currentLevelIndex || 0);

          const migratedSave: SaveData = {
            ...initialSave,
            ...legacyParsed,
            playerName,
            completedLevelIndices: Array.isArray(legacyParsed.completedLevelIndices)
              ? legacyParsed.completedLevelIndices
              : [],
            earnedBadgeIds: Array.isArray(legacyParsed.earnedBadgeIds)
              ? legacyParsed.earnedBadgeIds
              : [],
          };

          const firstProfile: UserProfile = {
            id: 'profile_default_1',
            name: playerName,
            avatarIcon: '🔮',
            createdAt: Date.now(),
            data: migratedSave,
          };

          const state: AppProfilesState = {
            activeProfileId: firstProfile.id,
            profiles: [firstProfile],
          };

          saveProfilesState(state);
          return state;
        }
      } catch {
        // Ignore legacy parse error
      }
    }

    // Fresh start
    const defaultProfile = createNewProfile('', '🔮');
    const freshState: AppProfilesState = {
      activeProfileId: defaultProfile.id,
      profiles: [defaultProfile],
    };
    saveProfilesState(freshState);
    return freshState;
  } catch (e) {
    console.error('Failed to load profiles state:', e);
    const defaultProfile = createNewProfile('Simyacı', '🔮');
    return {
      activeProfileId: defaultProfile.id,
      profiles: [defaultProfile],
    };
  }
}

export function saveProfilesState(state: AppProfilesState): void {
  try {
    localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save profiles state:', e);
  }
}
