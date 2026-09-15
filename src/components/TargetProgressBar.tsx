import React from 'react';
import { ItemDef, LevelCategory } from '../types/game';
import { Trophy, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CATEGORIES, getLevelDifficulty } from '../data/categories';

interface TargetProgressBarProps {
  category: LevelCategory;
  allItems: ItemDef[];
  discoveredIds: string[];
  newDiscoveryBadgeId: string | null;
  onOpenLevelSelect?: () => void;
  onShowItemRecipe?: (itemId: string) => void;
}

export const TargetProgressBar: React.FC<TargetProgressBarProps> = ({
  category,
  allItems,
  discoveredIds,
  newDiscoveryBadgeId,
  onOpenLevelSelect,
  onShowItemRecipe,
}) => {
  const discoveredCount = allItems.filter((i) => discoveredIds.includes(i.id)).length;
  const totalCount = allItems.length;
  const progressPercent = Math.round((discoveredCount / totalCount) * 100);
  const totalLevels = CATEGORIES.length;

  const is16Items = totalCount > 8;
  const difficulty = getLevelDifficulty(category.levelNumber);

  return (
    <div className="w-full max-w-[360px] sm:max-w-[390px] mx-auto px-2 py-0.5 flex flex-col gap-1 shrink-0">
      {/* Category Title & Discovery Counter & Difficulty Badge */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-xs sm:text-sm font-black text-white drop-shadow flex items-center gap-1 truncate">
            {category.titleTr}
          </span>
          <button
            onClick={onOpenLevelSelect}
            title="Bölüm Seç / Değiştir"
            className="text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full bg-white/15 hover:bg-white/25 text-slate-100 border border-white/25 shrink-0 active:scale-95 transition-all cursor-pointer"
          >
            Lv {category.levelNumber}/{totalLevels} ▾
          </button>
          {/* Level 10-19: Medium Mode (Yellow/Amber) */}
          {difficulty.isMediumMode && (
            <span
              title={`Orta Seviye: +${difficulty.challengeLevel} (Stratejik Eşleştirme)`}
              className="text-[8.5px] font-black px-1.5 py-0.5 rounded-md bg-amber-500/25 text-amber-300 border border-amber-400/50 flex items-center gap-0.5 shrink-0 shadow-sm shadow-amber-500/20"
            >
              <span>⚡ ORTA +{difficulty.challengeLevel}</span>
            </span>
          )}

          {/* Level 20+: Hard Mode (Fiery Red/Flame) */}
          {difficulty.isHardMode && (
            <span
              title={`Zorluk Seviyesi: +${difficulty.challengeLevel} (Özel Çift Kollu Sentez)`}
              className="text-[8.5px] font-black px-1.5 py-0.5 rounded-md bg-gradient-to-r from-red-600/90 to-amber-600/90 text-amber-200 border border-red-400/60 flex items-center gap-0.5 shrink-0 animate-pulse shadow-md shadow-red-500/30"
            >
              <Flame className="w-2.5 h-2.5 text-amber-300 fill-amber-300" />
              <span>ZOR +{difficulty.challengeLevel}</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-black text-amber-300 shrink-0 ml-1">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>
            {discoveredCount} / {totalCount}
          </span>
        </div>
      </div>

      {/* Mini Progress Bar Line */}
      <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.4 }}
          className={`h-full bg-gradient-to-r ${category.gradientFrom} ${category.gradientTo} rounded-full shadow-[0_0_8px_rgba(236,72,153,0.5)]`}
        />
      </div>

      {/* Target Items Container (8 or 16 items grid) */}
      <div
        className={`
          w-full rounded-2xl bg-slate-900/80 border border-white/15 shadow-inner backdrop-blur-md
          ${
            is16Items
              ? 'grid grid-cols-8 gap-x-1 gap-y-1 p-1.5'
              : 'flex items-center justify-between gap-1 p-1.5'
          }
        `}
      >
        {allItems.map((item) => {
          const isDiscovered = discoveredIds.includes(item.id);
          const isJustDiscovered = newDiscoveryBadgeId === item.id;

          return (
            <div
              key={item.id}
              onClick={() => {
                if (isDiscovered && onShowItemRecipe) {
                  onShowItemRecipe(item.id);
                }
              }}
              className={`
                relative flex flex-col items-center justify-center transition-all duration-150 select-none
                ${is16Items ? 'w-full min-w-0' : 'flex-1 min-w-[32px] max-w-[42px]'}
                ${isDiscovered ? 'cursor-pointer active:scale-95 group' : 'cursor-default pointer-events-none'}
              `}
            >
              {/* Floating "Bulundu! ✨" Badge for 1.5s */}
              <AnimatePresence>
                {isJustDiscovered && (
                  <motion.div
                    initial={{ scale: 0, y: 5, opacity: 0 }}
                    animate={{ scale: 1, y: -16, opacity: 1 }}
                    exit={{ scale: 0.8, y: -24, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute z-40 whitespace-nowrap px-1 py-0.2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[7px] font-black shadow-lg shadow-pink-500/60 border border-white flex items-center gap-0.5 pointer-events-none"
                  >
                    <span>Bulundu! ✨</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Item Card Icon */}
              <div
                title={
                  isDiscovered
                    ? `${item.name}: Sentez tarifini görmek için dokunun`
                    : 'Keşfedilmemiş Nesne'
                }
                className={`
                  w-full aspect-square rounded-lg flex items-center justify-center transition-all duration-200 select-none
                  ${is16Items ? 'max-w-[34px] sm:max-w-[38px] p-0.5' : 'p-1'}
                  ${
                    isDiscovered
                      ? 'bg-gradient-to-b from-white/20 to-white/5 border border-amber-300/80 shadow-sm shadow-amber-400/20 group-hover:border-amber-200 group-hover:scale-105 group-active:scale-95'
                      : 'bg-black/35 border border-dashed border-gray-600/50 opacity-30 grayscale'
                  }
                  ${isJustDiscovered ? 'ring-2 ring-pink-400 animate-bounce' : ''}
                `}
              >
                <span
                  className={`leading-none filter drop-shadow select-none ${
                    is16Items ? 'text-xs sm:text-sm' : 'text-base sm:text-lg'
                  }`}
                >
                  {isDiscovered ? item.icon : '❓'}
                </span>
              </div>

              {/* Item Name Label */}
              <span
                className={`truncate w-full text-center mt-0.5 leading-tight select-none ${
                  is16Items ? 'text-[6.5px] sm:text-[7.5px]' : 'text-[7.5px] sm:text-[8px]'
                } font-extrabold ${
                  isDiscovered ? 'text-slate-200 group-hover:text-amber-200' : 'text-gray-500'
                }`}
              >
                {isDiscovered ? item.name : '???'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
