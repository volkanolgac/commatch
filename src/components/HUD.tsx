import React from 'react';
import { SaveData, LevelCategory } from '../types/game';
import { Volume2, VolumeX, Coins, Map, Home, Trophy } from 'lucide-react';

interface HUDProps {
  saveData: SaveData;
  category: LevelCategory;
  onToggleMute: () => void;
  onOpenHome?: () => void;
  onOpenBadges?: () => void;
  onOpenLevelSelect?: () => void;
}

export const HUD: React.FC<HUDProps> = ({
  saveData,
  category,
  onToggleMute,
  onOpenHome,
  onOpenBadges,
  onOpenLevelSelect,
}) => {
  return (
    <div className="w-full max-w-[360px] sm:max-w-[390px] mx-auto pt-2.5 px-2 pb-1 flex flex-col gap-1.5">
      {/* Top Main Row */}
      <div className="flex items-center justify-between px-1">
        {/* Brand / Home Button */}
        <button
          onClick={onOpenHome}
          className="flex items-center gap-2 select-none group cursor-pointer text-left"
          title="Ana Sayfaya Dön"
        >
          {/* Dynamic Alchemy / Fusion Logo Icon */}
          <div className="relative w-8 h-8 rounded-2xl bg-gradient-to-br from-pink-500 via-purple-600 to-cyan-400 p-[1.5px] shadow-[0_0_15px_rgba(236,72,153,0.45)] transition-transform duration-200 group-hover:scale-105">
            <div className="w-full h-full rounded-[14px] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center relative overflow-hidden text-base">
              🔮
            </div>
          </div>

          {/* Characteristic Bold Commatch Typography */}
          <div className="flex flex-col justify-center">
            <span
              className="text-xl font-black tracking-wider leading-none bg-gradient-to-r from-pink-400 via-purple-200 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(236,72,153,0.35)]"
              style={{ fontFamily: "'Righteous', 'Outfit', sans-serif" }}
            >
              Commatch
            </span>
          </div>
        </button>

        {/* Right Info: Gold + Controls */}
        <div className="flex items-center gap-1.5">
          {/* Gold Counter */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 shadow-inner">
            <Coins className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="text-xs font-black text-amber-300">
              {saveData.gold}
            </span>
          </div>

          {/* Badges Button */}
          {onOpenBadges && (
            <button
              onClick={onOpenBadges}
              title="Kazanımlarım & Nişanlar"
              className="p-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 hover:text-white active:scale-95 transition-all cursor-pointer"
            >
              <Trophy className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Level Select Map Button */}
          {onOpenLevelSelect && (
            <button
              onClick={onOpenLevelSelect}
              title="Bölüm Haritası (1-100)"
              className="p-1.5 rounded-xl bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-400/40 text-cyan-200 hover:text-white active:scale-95 transition-all cursor-pointer"
            >
              <Map className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Home Button */}
          {onOpenHome && (
            <button
              onClick={onOpenHome}
              title="Ana Menüye Dön"
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-slate-200 hover:text-white active:scale-95 transition-all cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Sound Toggle */}
          <button
            onClick={onToggleMute}
            title="Ses"
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white active:scale-95 transition-all cursor-pointer"
          >
            {!saveData.isMuted ? (
              <Volume2 className="w-3.5 h-3.5 text-cyan-300" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-rose-400" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

