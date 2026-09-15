import React from 'react';
import { motion } from 'motion/react';
import { LevelCategory } from '../types/game';
import { CATEGORIES, getDifficultyTier } from '../data/categories';
import { MILESTONE_BADGES } from '../data/badges';
import {
  Play,
  Map,
  Trophy,
  Settings,
  Sparkles,
  Coins,
  Flame,
  Award,
  ChevronRight,
  User,
  Users,
  Zap,
} from 'lucide-react';

interface HomeScreenProps {
  playerName: string;
  avatarIcon?: string;
  currentLevelIndex: number;
  completedLevelIndices: number[];
  earnedBadgeIds: string[];
  gold: number;
  totalMerges: number;
  onPlayCurrentLevel: () => void;
  onOpenMap: () => void;
  onOpenBadges: () => void;
  onOpenSettings: () => void;
  onEditName: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  playerName,
  avatarIcon = '🔮',
  currentLevelIndex,
  completedLevelIndices,
  earnedBadgeIds,
  gold,
  totalMerges,
  onPlayCurrentLevel,
  onOpenMap,
  onOpenBadges,
  onOpenSettings,
  onEditName,
}) => {
  const currentCategory = CATEGORIES[currentLevelIndex] || CATEGORIES[0];
  const difficulty = getDifficultyTier(currentLevelIndex);

  const diffLabel =
    difficulty === 'easy'
      ? 'Temel Kademe'
      : difficulty === 'medium'
      ? 'Orta Kademe'
      : 'Zor & Stratejik';

  const diffColor =
    difficulty === 'easy'
      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
      : difficulty === 'medium'
      ? 'bg-amber-500/20 text-amber-300 border-amber-400/30'
      : 'bg-rose-500/20 text-rose-300 border-rose-400/30';

  const completedCount = completedLevelIndices.length;
  const badgesCount = MILESTONE_BADGES.filter((b) =>
    earnedBadgeIds.includes(b.id) || completedLevelIndices.includes(b.levelRequired - 1)
  ).length;

  return (
    <div className="w-full h-full flex flex-col items-center justify-between p-4 py-6 max-w-md mx-auto text-white select-none relative overflow-y-auto custom-scrollbar">
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute top-10 -left-12 w-48 h-48 bg-fuchsia-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-12 w-48 h-48 bg-cyan-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar: Commatch Branding & Settings */}
      <div className="w-full flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500 via-purple-600 to-cyan-400 p-[2px] shadow-lg shadow-pink-500/25">
            <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center text-xl">
              🔮
            </div>
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent leading-none">
              Commatch!
            </h1>
            <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
              Simya & Birleştirme
            </span>
          </div>
        </div>

        {/* Currency & Settings */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-black shadow-sm">
            <Coins className="w-3.5 h-3.5" />
            <span>{gold}</span>
          </div>
          <button
            onClick={onOpenSettings}
            className="w-9 h-9 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-slate-200 hover:text-white transition-all active:scale-90 cursor-pointer"
            title="Ayarlar & Profiller"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Greeting Banner with User Profile Badge */}
      <div className="w-full my-4 z-10">
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-slate-900/40 border border-purple-500/30 backdrop-blur-sm flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-xl shadow-inner">
              {avatarIcon}
            </div>
            <div>
              <div className="text-[10.5px] text-purple-300/80 font-bold flex items-center gap-1">
                <span>✨ Hoş geldin,</span>
              </div>
              <div className="text-sm font-black text-white tracking-wide">
                {playerName || 'Simyacı'}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={onOpenSettings}
              className="px-2.5 py-1.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 text-[11px] font-bold border border-pink-500/30 flex items-center gap-1 transition-all cursor-pointer"
              title="Profil Değiştir"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Profiller</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero: Next / Current Level Card */}
      <div className="w-full z-10 flex flex-col items-center">
        <div className="w-full rounded-3xl bg-slate-900/90 border-2 border-fuchsia-500/40 p-4 shadow-xl shadow-fuchsia-950/40 relative overflow-hidden backdrop-blur-md">
          {/* Card Gradient Background */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${currentCategory.gradientFrom} ${currentCategory.gradientTo} opacity-15 pointer-events-none`}
          />

          <div className="relative z-10 flex flex-col gap-3">
            {/* Header: Level Number & Difficulty Tag */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-fuchsia-500/20 border border-fuchsia-400/40 text-fuchsia-300 text-[11px] font-black tracking-wider uppercase">
                  Bölüm {currentCategory.levelNumber}
                </span>
                <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${diffColor}`}>
                  {diffLabel}
                </span>
              </div>

              <div className="text-[11px] font-bold text-slate-400">
                {currentCategory.items.length} Nesne
              </div>
            </div>

            {/* Level Title & Icon */}
            <div className="flex items-center gap-3 my-1">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center text-3xl shadow-inner shrink-0">
                {currentCategory.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-black text-white tracking-tight truncate">
                  {currentCategory.titleTr}
                </h2>
                <p className="text-[11.5px] text-slate-300 line-clamp-1 mt-0.5">
                  Tüm elementleri sentezle ve bölümü tamamla!
                </p>
              </div>
            </div>

            {/* Big Start / Continue Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={onPlayCurrentLevel}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-pink-500 to-amber-400 hover:from-fuchsia-400 hover:to-amber-300 text-slate-950 font-black text-sm tracking-wider uppercase shadow-lg shadow-fuchsia-500/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>{completedLevelIndices.includes(currentLevelIndex) ? 'TEKRAR OYNA' : 'OYUNA BAŞLA'}</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards: Map & Badges */}
      <div className="w-full grid grid-cols-2 gap-3 my-4 z-10">
        {/* Level Map Button */}
        <button
          onClick={onOpenMap}
          className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-white/10 hover:border-cyan-400/40 transition-all flex flex-col items-start gap-1 group cursor-pointer text-left backdrop-blur-sm shadow-md"
        >
          <div className="w-full flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
              <Map className="w-4 h-4" />
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-all" />
          </div>
          <div className="mt-1">
            <div className="text-xs font-black text-white group-hover:text-cyan-200">
              Bölüm Haritası
            </div>
            <div className="text-[10px] text-slate-400 font-medium">
              100 Bölüm • {completedCount} Geçildi
            </div>
          </div>
        </button>

        {/* Badges / Kazanımlarım Button */}
        <button
          onClick={onOpenBadges}
          className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-white/10 hover:border-amber-400/40 transition-all flex flex-col items-start gap-1 group cursor-pointer text-left backdrop-blur-sm shadow-md"
        >
          <div className="w-full flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
              <Trophy className="w-4 h-4" />
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-300 group-hover:translate-x-0.5 transition-all" />
          </div>
          <div className="mt-1">
            <div className="text-xs font-black text-white group-hover:text-amber-200">
              Kazanımlarım
            </div>
            <div className="text-[10px] text-slate-400 font-medium">
              {badgesCount}/{MILESTONE_BADGES.length} Nişan Açık
            </div>
          </div>
        </button>
      </div>

      {/* Bottom Summary Stats Strip */}
      <div className="w-full p-2.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-around text-center text-xs font-bold text-slate-300 z-10">
        <div className="flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5 text-rose-400" />
          <span>{totalMerges} Birleştirme</span>
        </div>
        <div className="w-[1px] h-3 bg-white/10" />
        <div className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-yellow-400" />
          <span>100 Eşsiz Tema</span>
        </div>
        <div className="w-[1px] h-3 bg-white/10" />
        <div className="flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-emerald-400" />
          <span>%{Math.round((completedCount / 100) * 100)} İlerleme</span>
        </div>
      </div>
    </div>
  );
};
