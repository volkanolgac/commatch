export interface ItemDef {
  id: string;
  name: string;
  icon: string;
  tier: number;
  isBase?: boolean;
  colorBg?: string;
  description: string;
}

export interface LevelCategory {
  id: string;
  levelNumber: number;
  name: string;
  titleTr: string;
  icon: string;
  themeColor: string;
  gradientFrom: string;
  gradientTo: string;
  badgeBg: string;
  baseItemIds: string[];
  items: ItemDef[];
  recipes: {
    a: string;
    b: string;
    result: string;
  }[];
}

export interface BoardSlot {
  uid: string;
  itemId: string;
  createdAt: number;
  isNew?: boolean;
}

export interface FloatingCoinText {
  id: string;
  x: number;
  y: number;
  text: string;
  color?: string;
}

export interface DraggingInfo {
  isDragging: boolean;
  sourceIndex: number;
  itemId: string;
  x: number;
  y: number;
  hoverIndex: number | null;
}

export interface MilestoneBadge {
  id: string;
  levelRequired: number;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  color: string;
  gradient: string;
  rarity: 'rare' | 'epic' | 'legendary' | 'mythic';
}

export interface SaveData {
  playerName?: string;
  currentLevelIndex: number;
  completedLevelIndices: number[];
  earnedBadgeIds: string[];
  discoveredItemIds: string[];
  gold: number;
  boardState: (BoardSlot | null)[];
  isMuted: boolean;
  totalMerges: number;
  lastPlayedAt?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  avatarIcon: string;
  createdAt: number;
  data: SaveData;
}

export interface AppProfilesState {
  activeProfileId: string;
  profiles: UserProfile[];
}

export interface HintInfo {
  targetItem: ItemDef;
  itemA: ItemDef | null;
  itemB: ItemDef | null;
  id: string;
  createdAt: number;
  isBaseItem?: boolean;
  title?: string;
  badgeLabel?: string;
}
