import React from 'react';
import { HintInfo } from '../types/game';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Lightbulb, ArrowRight, X, Sprout } from 'lucide-react';

interface HintOverlayProps {
  hint: HintInfo | null;
  onClose?: () => void;
}

export const HintOverlay: React.FC<HintOverlayProps> = ({ hint, onClose }) => {
  return (
    <AnimatePresence>
      {hint && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-3 cursor-pointer"
        >
          {/* Backdrop Subtle Vignette */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
          />

          {/* Central Animated Floating Hint Card */}
          <motion.div
            key={hint.id}
            initial={{ scale: 0.75, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.85, y: -30, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 450, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[350px] rounded-3xl bg-slate-900/95 border-2 border-amber-400/80 shadow-[0_0_40px_rgba(245,158,11,0.45)] ring-4 ring-purple-500/30 p-3.5 flex flex-col items-center gap-2.5 overflow-hidden"
          >
            {/* 3-Second Visual Countdown Timer Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-black/50 overflow-hidden">
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 3, ease: 'linear' }}
                className="h-full bg-gradient-to-r from-amber-400 via-pink-500 to-cyan-400"
              />
            </div>

            {/* Header Title */}
            <div className="flex items-center justify-between w-full pt-1 px-1">
              <div className="flex items-center gap-1.5">
                <div className="p-1 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/40">
                  {hint.isBaseItem ? (
                    <Sprout className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                  ) : (
                    <Lightbulb className="w-4 h-4 animate-pulse fill-amber-300 text-amber-300" />
                  )}
                </div>
                <h3 className="text-xs font-black tracking-wider uppercase bg-gradient-to-r from-amber-300 via-pink-200 to-cyan-300 bg-clip-text text-transparent">
                  {hint.title || 'Sentez Formülü'}
                </h3>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-400/20 text-amber-200 font-black border border-amber-400/30">
                  3s
                </span>
                {onClose && (
                  <button
                    onClick={onClose}
                    className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Content Display */}
            {hint.isBaseItem || !hint.itemA || !hint.itemB ? (
              /* Base Item Info Display */
              <div className="w-full flex flex-col items-center justify-center p-2 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-purple-950/40 to-slate-900/60 border border-emerald-400/40 shadow-inner gap-1.5">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 border-2 border-emerald-400 flex items-center justify-center text-3xl shadow-lg shadow-emerald-500/20">
                    {hint.targetItem.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-white">{hint.targetItem.name}</span>
                    <span className="text-[10px] font-bold text-emerald-300 flex items-center gap-1">
                      🌱 Temel Başlangıç Nesnesi
                    </span>
                    <span className="text-[9.5px] text-slate-300 max-w-[200px] leading-tight mt-0.5">
                      {hint.targetItem.description}
                    </span>
                  </div>
                </div>
                <p className="text-[10px] text-amber-200 font-bold text-center mt-1">
                  "➕ DOLDUR" butonu ile doğrudan tahtaya üretilir.
                </p>
              </div>
            ) : (
              /* Dual Synthesis Recipe Formula Equation */
              <div className="w-full flex items-center justify-between gap-1.5 px-1 py-1">
                {/* Item A Box */}
                <div className="flex-1 flex flex-col items-center justify-center p-2 rounded-2xl bg-white/10 border border-white/20 shadow-inner">
                  <span className="text-2xl sm:text-3xl filter drop-shadow animate-bounce">
                    {hint.itemA?.icon}
                  </span>
                  <span className="text-[9.5px] font-black text-white truncate max-w-[65px] mt-0.5">
                    {hint.itemA?.name}
                  </span>
                </div>

                {/* Plus Sign */}
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 font-black text-sm shrink-0 shadow-sm animate-pulse">
                  ➕
                </div>

                {/* Item B Box */}
                <div className="flex-1 flex flex-col items-center justify-center p-2 rounded-2xl bg-white/10 border border-white/20 shadow-inner">
                  <span className="text-2xl sm:text-3xl filter drop-shadow animate-bounce">
                    {hint.itemB?.icon}
                  </span>
                  <span className="text-[9.5px] font-black text-white truncate max-w-[65px] mt-0.5">
                    {hint.itemB?.name}
                  </span>
                </div>

                {/* Arrow Sign */}
                <div className="text-cyan-300 shrink-0">
                  <ArrowRight className="w-4 h-4 stroke-[3] animate-pulse" />
                </div>

                {/* Result Target Item Box */}
                <div className="flex-1 flex flex-col items-center justify-center p-2 rounded-2xl bg-gradient-to-br from-pink-500/30 via-purple-600/30 to-amber-500/30 border-2 border-amber-300 ring-2 ring-pink-400/50 shadow-lg shadow-pink-500/30">
                  <div className="relative">
                    <span className="text-2xl sm:text-3xl filter drop-shadow-md">
                      {hint.targetItem.icon}
                    </span>
                    <span className="absolute -top-1.5 -right-2 text-[8px] font-black px-1 rounded-full bg-pink-500 text-white border border-white">
                      {hint.badgeLabel || 'Sonuç'}
                    </span>
                  </div>
                  <span className="text-[9.5px] font-black text-amber-200 truncate max-w-[65px] mt-0.5">
                    {hint.targetItem.name}
                  </span>
                </div>
              </div>
            )}

            {/* Bottom Mini Tip */}
            {!hint.isBaseItem && hint.itemA && hint.itemB && (
              <p className="text-[10.5px] text-slate-300 font-bold text-center flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-300 shrink-0" />
                <span>
                  <b className="text-amber-300">{hint.itemA.name}</b> ile{' '}
                  <b className="text-amber-300">{hint.itemB.name}</b> birleşiminden oluşur.
                </span>
              </p>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
