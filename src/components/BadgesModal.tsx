import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MILESTONE_BADGES } from '../data/badges';
import { X, Trophy, Lock, CheckCircle2, Sparkles } from 'lucide-react';

interface BadgesModalProps {
  isOpen: boolean;
  earnedBadgeIds: string[];
  completedLevelIndices: number[];
  onClose: () => void;
}

export const BadgesModal: React.FC<BadgesModalProps> = ({
  isOpen,
  earnedBadgeIds,
  completedLevelIndices,
  onClose,
}) => {
  if (!isOpen) return null;

  const totalEarned = MILESTONE_BADGES.filter((b) =>
    earnedBadgeIds.includes(b.id) || completedLevelIndices.includes(b.levelRequired - 1)
  ).length;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-[390px] max-h-[85vh] rounded-3xl bg-slate-900 border-2 border-amber-500/40 shadow-2xl flex flex-col overflow-hidden text-white"
        >
          {/* Header */}
          <div className="p-3.5 border-b border-white/10 flex items-center justify-between bg-amber-950/40">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-xl">
                🎖️
              </div>
              <div>
                <h3 className="text-sm font-black text-white flex items-center gap-1.5">
                  <span>Kazanımlarım & Nişanlar</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/30 text-amber-300 border border-amber-400/40">
                    {totalEarned} / {MILESTONE_BADGES.length}
                  </span>
                </h3>
                <span className="text-[10px] text-slate-300">
                  Her 10. seviyede özel bir nişan kazanırsın
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Badges List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
            {MILESTONE_BADGES.map((badge) => {
              const isEarned =
                earnedBadgeIds.includes(badge.id) ||
                completedLevelIndices.includes(badge.levelRequired - 1);

              return (
                <div
                  key={badge.id}
                  className={`
                    p-3 rounded-2xl border transition-all flex items-start gap-3 relative overflow-hidden
                    ${
                      isEarned
                        ? `bg-gradient-to-r ${badge.gradient}/15 border-amber-400/50 shadow-md shadow-amber-500/10`
                        : 'bg-white/5 border-white/10 opacity-70 grayscale-[30%]'
                    }
                  `}
                >
                  {/* Badge Icon */}
                  <div
                    className={`
                      w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center text-2xl relative
                      ${
                        isEarned
                          ? `bg-gradient-to-br ${badge.gradient} shadow-lg ring-2 ring-white/30 text-white`
                          : 'bg-slate-800 text-slate-500 border border-white/10'
                      }
                    `}
                  >
                    {isEarned ? (
                      badge.icon
                    ) : (
                      <Lock className="w-5 h-5 text-slate-400" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4
                        className={`text-xs font-black truncate ${
                          isEarned ? 'text-amber-200' : 'text-slate-300'
                        }`}
                      >
                        {badge.title}
                      </h4>
                      {isEarned ? (
                        <span className="shrink-0 text-[9px] font-black text-emerald-400 flex items-center gap-0.5 bg-emerald-500/20 px-1.5 py-0.5 rounded-md border border-emerald-500/30">
                          <CheckCircle2 className="w-2.5 h-2.5" /> Kazanıldı
                        </span>
                      ) : (
                        <span className="shrink-0 text-[9px] font-bold text-slate-400 bg-white/5 px-1.5 py-0.5 rounded-md">
                          Bölüm {badge.levelRequired}
                        </span>
                      )}
                    </div>

                    <p className="text-[9.5px] text-amber-300/80 font-semibold mt-0.5">
                      {badge.subtitle}
                    </p>

                    <p className="text-[10px] text-slate-300/90 leading-tight mt-1">
                      {badge.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-2.5 border-t border-white/10 bg-slate-950/60 text-center">
            <button
              onClick={onClose}
              className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-xs shadow-md active:scale-95 transition-all"
            >
              Tamam
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
