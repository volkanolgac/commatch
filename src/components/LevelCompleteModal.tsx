import React from 'react';
import { LevelCategory } from '../types/game';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Coins, ArrowRight, Trophy, Flame } from 'lucide-react';
import { CATEGORIES, getLevelDifficulty } from '../data/categories';

interface LevelCompleteModalProps {
  category: LevelCategory;
  isOpen: boolean;
  isFinalLevel: boolean;
  onNextLevel: () => void;
}

export const LevelCompleteModal: React.FC<LevelCompleteModalProps> = ({
  category,
  isOpen,
  isFinalLevel,
  onNextLevel,
}) => {
  if (!isOpen) return null;

  const nextIndex = category.levelNumber < CATEGORIES.length ? category.levelNumber : 0;
  const nextCategory = CATEGORIES[nextIndex];
  const nextDifficulty = nextCategory ? getLevelDifficulty(nextCategory.levelNumber) : null;
  const currentDifficulty = getLevelDifficulty(category.levelNumber);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.7, opacity: 0, y: 25 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="relative w-full max-w-xs overflow-hidden rounded-3xl bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950 p-6 text-center border-2 border-pink-400 shadow-[0_0_60px_rgba(244,63,94,0.45)] text-white"
        >
          {/* Header Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400/60 text-pink-300 text-xs font-black tracking-wider uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin" />
            <span>{isFinalLevel ? '🏆 TÜM 100 SEVİYE TAMAMLANDI!' : `LEVEL ${category.levelNumber} TAMAMLANDI!`}</span>
            <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin" />
          </div>

          {/* Big Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1.1, rotate: 0 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
            className="my-3 flex items-center justify-center"
          >
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 p-0.5 shadow-2xl shadow-purple-500/50">
              <div className="w-full h-full rounded-[22px] bg-slate-900 flex items-center justify-center text-5xl">
                {isFinalLevel ? '👑' : category.icon}
              </div>
            </div>
          </motion.div>

          <h2 className="text-2xl font-black text-white">
            🎉 HARİKA İŞ!
          </h2>
          <p className="text-sm font-bold text-pink-300 mt-1 mb-3">
            [{category.name}] {category.items.length} Nesnesiyle Tamamen Keşfedildi!
          </p>

          <div className="p-3 mb-3 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center gap-2">
            <Coins className="w-5 h-5 text-amber-400 animate-bounce" />
            <span className="text-xs font-bold text-slate-200">Seviye Ödülü:</span>
            <span className="text-base font-black text-amber-300">+{currentDifficulty.goldReward} 🪙 Altın</span>
          </div>

          {/* Next Category Teaser with Challenge rating */}
          {!isFinalLevel && nextCategory && (
            <div className="mb-4 text-xs font-bold text-slate-300 flex flex-col gap-1 bg-white/5 py-2 px-2.5 rounded-2xl border border-white/10 text-center">
              <div className="flex items-center justify-center gap-1 text-[11px] sm:text-xs text-slate-300 truncate w-full">
                <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-slate-400 font-medium shrink-0">Sıradaki:</span>
                <span className="text-cyan-300 font-black truncate max-w-[190px]">
                  {nextCategory.titleTr}
                </span>
              </div>
              {nextDifficulty && nextDifficulty.isHardMode && (
                <div className="flex items-center justify-center gap-1 text-[10px] text-amber-300 font-extrabold truncate w-full">
                  <Flame className="w-3 h-3 text-red-400 fill-red-400 shrink-0" />
                  <span>Zorluk +{nextDifficulty.challengeLevel} (Stratejik Eşleşme)</span>
                </div>
              )}
            </div>
          )}

          <button
            onClick={onNextLevel}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 hover:from-pink-400 hover:to-cyan-300 text-white font-black text-sm shadow-xl shadow-purple-500/40 active:scale-95 transition-transform flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{isFinalLevel ? 'Yeniden Baştan Oyna' : `Level ${nextCategory.levelNumber}'e Geç`}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
