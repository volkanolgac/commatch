import React, { useState } from 'react';
import { CATEGORIES, getDifficultyTier } from '../data/categories';
import { X, Lock, CheckCircle2, Star, Sparkles, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LevelSelectModalProps {
  isOpen: boolean;
  currentLevelIndex: number;
  completedLevelIndices: number[];
  onSelectLevel: (index: number) => void;
  onClose: () => void;
}

export const LevelSelectModal: React.FC<LevelSelectModalProps> = ({
  isOpen,
  currentLevelIndex,
  completedLevelIndices,
  onSelectLevel,
  onClose,
}) => {
  const [selectedDecade, setSelectedDecade] = useState<number>(() => {
    return Math.floor(currentLevelIndex / 10); // 0 for 1-10, 1 for 11-20, etc.
  });

  if (!isOpen) return null;

  // Furthest reachable level index is max(completedIndex + 1, currentLevelIndex)
  const maxCompletedIdx = completedLevelIndices.length > 0
    ? Math.max(...completedLevelIndices)
    : -1;
  const maxUnlockedIndex = Math.max(0, maxCompletedIdx + 1, currentLevelIndex);

  const displayedLevels = CATEGORIES.slice(selectedDecade * 10, (selectedDecade + 1) * 10);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-[390px] max-h-[85vh] rounded-3xl bg-slate-900 border-2 border-cyan-500/50 shadow-2xl flex flex-col overflow-hidden text-white"
        >
          {/* Modal Header */}
          <div className="p-3.5 border-b border-white/10 flex items-center justify-between bg-slate-950/80">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-xl">
                🗺️
              </div>
              <div>
                <h3 className="text-sm font-black text-white flex items-center gap-1.5">
                  <span>Bölüm Haritası</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                    {completedLevelIndices.length} / 100
                  </span>
                </h3>
                <span className="text-[10px] text-slate-300">
                  Açtığın tüm bölümleri dilediğin zaman tekrar oynayabilirsin
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Decade Tabs (1-10, 11-20, ... 91-100) */}
          <div className="flex items-center gap-1.5 p-2 px-3 overflow-x-auto bg-white/5 border-b border-white/10 custom-scrollbar shrink-0">
            {Array.from({ length: 10 }).map((_, dIdx) => {
              const startLvl = dIdx * 10 + 1;
              const endLvl = (dIdx + 1) * 10;
              const isSelected = selectedDecade === dIdx;
              const hasUnlocked = startLvl - 1 <= maxUnlockedIndex;

              return (
                <button
                  key={dIdx}
                  onClick={() => setSelectedDecade(dIdx)}
                  className={`
                    px-2.5 py-1 rounded-xl text-[11px] font-black shrink-0 transition-all cursor-pointer
                    ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                        : hasUnlocked
                        ? 'bg-white/10 text-slate-300 hover:bg-white/15'
                        : 'bg-white/5 text-slate-500 opacity-60'
                    }
                  `}
                >
                  {startLvl}-{endLvl}
                </button>
              );
            })}
          </div>

          {/* Levels List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
            {displayedLevels.map((cat) => {
              const idx = cat.levelNumber - 1;
              const isUnlocked = idx <= maxUnlockedIndex;
              const isCompleted = completedLevelIndices.includes(idx);
              const isCurrent = idx === currentLevelIndex;
              const difficulty = getDifficultyTier(idx);

              return (
                <button
                  key={cat.id}
                  disabled={!isUnlocked}
                  onClick={() => {
                    if (isUnlocked) {
                      onSelectLevel(idx);
                      onClose();
                    }
                  }}
                  className={`
                    w-full p-2.5 rounded-2xl border transition-all flex items-center justify-between text-left relative overflow-hidden
                    ${
                      !isUnlocked
                        ? 'bg-white/[0.02] border-white/5 opacity-45 cursor-not-allowed'
                        : isCurrent
                        ? 'bg-gradient-to-r from-pink-500/30 to-purple-600/30 border-pink-400 ring-2 ring-pink-500/40 cursor-pointer shadow-md'
                        : isCompleted
                        ? 'bg-emerald-950/30 hover:bg-emerald-950/50 border-emerald-500/40 cursor-pointer'
                        : 'bg-white/5 hover:bg-white/10 border-white/10 cursor-pointer'
                    }
                  `}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`
                        w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0
                        ${
                          !isUnlocked
                            ? 'bg-slate-800 text-slate-500'
                            : isCompleted
                            ? 'bg-emerald-500/20 border border-emerald-400/40'
                            : 'bg-indigo-500/20 border border-indigo-400/40'
                        }
                      `}
                    >
                      {!isUnlocked ? <Lock className="w-4 h-4 text-slate-500" /> : cat.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-white truncate">
                          Bölüm {cat.levelNumber}: {cat.name}
                        </span>
                        {isCurrent && (
                          <span className="text-[8.5px] px-1.5 py-0.2 rounded bg-pink-500 text-white font-bold shrink-0">
                            Şu Anki
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 block truncate">
                        {isUnlocked ? `${cat.items.length} Eşya &bull; 6 Kademe Simya` : 'Kilitli'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 ml-2">
                    {isCompleted && (
                      <span className="text-[9px] font-black px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-0.5">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Geçildi
                      </span>
                    )}

                    {!isCompleted && isUnlocked && (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                        Oyna
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-2.5 border-t border-white/10 bg-slate-950/60 text-center">
            <button
              onClick={onClose}
              className="w-full py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-xs shadow-md active:scale-95 transition-all cursor-pointer"
            >
              Kapat
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
