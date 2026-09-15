import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MilestoneBadge } from '../types/game';
import { Sparkles, ArrowRight, Award } from 'lucide-react';

interface BadgeAwardModalProps {
  badge: MilestoneBadge | null;
  onClaim: () => void;
}

export const BadgeAwardModal: React.FC<BadgeAwardModalProps> = ({
  badge,
  onClaim,
}) => {
  if (!badge) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg">
        <motion.div
          initial={{ scale: 0.7, opacity: 0, rotate: -5 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
          className="w-full max-w-[340px] rounded-3xl bg-gradient-to-b from-slate-900 via-purple-950 to-indigo-950 border-2 border-amber-400 p-6 text-white text-center flex flex-col items-center gap-4 relative overflow-hidden shadow-[0_0_60px_rgba(251,191,36,0.45)]"
        >
          {/* Confetti / Sparkle Rays */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-20 -left-20 w-80 h-80 bg-[radial-gradient(circle,rgba(251,191,36,0.25)_0%,transparent_70%)] pointer-events-none"
          />

          {/* Header Tag */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 text-[10px] font-black tracking-wider uppercase">
            <Sparkles className="w-3 h-3" />
            <span>YENİ NİŞAN KAZANILDI!</span>
            <Sparkles className="w-3 h-3" />
          </div>

          {/* Large Badge Medal Icon */}
          <motion.div
            initial={{ scale: 0.3, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 10, delay: 0.1 }}
            className="relative"
          >
            <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${badge.gradient} p-1 shadow-2xl flex items-center justify-center ring-4 ring-amber-300/60`}>
              <div className="w-full h-full rounded-[20px] bg-slate-950/40 backdrop-blur-sm flex items-center justify-center text-5xl">
                {badge.icon}
              </div>
            </div>
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-3xl bg-amber-400/30 blur-xl -z-10 animate-pulse" />
          </motion.div>

          {/* Badge Titles */}
          <div className="space-y-1">
            <h2 className="text-xl font-black text-amber-200 tracking-tight">
              {badge.title}
            </h2>
            <p className="text-xs font-bold text-amber-400/90 flex items-center justify-center gap-1">
              <Award className="w-3.5 h-3.5" />
              <span>{badge.subtitle}</span>
            </p>
          </div>

          {/* Description */}
          <p className="text-xs text-slate-200/90 bg-white/5 border border-white/10 rounded-2xl p-3 leading-relaxed">
            {badge.description}
          </p>

          {/* Claim Button */}
          <button
            onClick={onClaim}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-amber-500/40 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Kazanımlarıma Ekle & Devam Et</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
