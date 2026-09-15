import React from 'react';
import { ItemDef, LevelCategory, BoardSlot, DraggingInfo } from '../types/game';
import { Plus, Sparkles, RefreshCw, Hand, Flame, Lightbulb } from 'lucide-react';
import { getLevelDifficulty } from '../data/categories';

interface BottomControlsProps {
  board: (BoardSlot | null)[];
  category: LevelCategory;
  selectedSlotIndex: number | null;
  dragState?: DraggingInfo | null;
  isRefilling: boolean;
  isAllDiscovered?: boolean;
  onRefill: () => void;
  onTriggerHint: () => void;
}

export const BottomControls: React.FC<BottomControlsProps> = ({
  board,
  category,
  selectedSlotIndex,
  dragState,
  isRefilling,
  isAllDiscovered = false,
  onRefill,
  onTriggerHint,
}) => {
  const occupiedCount = board.filter((s) => s !== null).length;
  const isFull = occupiedCount === board.length;
  const difficulty = getLevelDifficulty(category.levelNumber);

  // Identify active item either from dragging (holding/tutunca) or from selection (tap)
  let activeItemId: string | null = null;
  let isFromDrag = false;

  if (dragState && dragState.isDragging && dragState.itemId) {
    activeItemId = dragState.itemId;
    isFromDrag = true;
  } else if (selectedSlotIndex !== null && board[selectedSlotIndex]) {
    activeItemId = board[selectedSlotIndex]!.itemId;
  }

  const selectedItemDef = activeItemId
    ? category.items.find((i) => i.id === activeItemId)
    : null;

  // If hovering over another item during drag, find that item too
  const hoveredSlot =
    dragState && dragState.isDragging && dragState.hoverIndex !== null && dragState.hoverIndex !== dragState.sourceIndex
      ? board[dragState.hoverIndex]
      : null;
  const hoveredItemDef = hoveredSlot
    ? category.items.find((i) => i.id === hoveredSlot.itemId)
    : null;

  return (
    <div className="w-full max-w-[360px] sm:max-w-[390px] mx-auto px-2 pb-3 pt-1 flex flex-col gap-1.5">
      {/* Fixed-Height Item Detail Banner */}
      <div className="w-full h-[48px] px-2.5 rounded-2xl bg-indigo-950/85 backdrop-blur-md border border-indigo-400/40 shadow-lg flex items-center justify-between overflow-hidden transition-all duration-200">
        {selectedItemDef ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-2xl shrink-0 animate-bounce">{selectedItemDef.icon}</span>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-white truncate">
                    {selectedItemDef.name}
                  </span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-pink-500/30 text-pink-300 border border-pink-400/40 font-bold shrink-0">
                    {selectedItemDef.isBase ? 'Temel' : `Kademe ${selectedItemDef.tier}`}
                  </span>
                  {isFromDrag && (
                    <span className="text-[8.5px] px-1 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 font-bold">
                      Tutuluyor
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-slate-300 truncate max-w-[210px]">
                  {hoveredItemDef
                    ? `Hedef: ${hoveredItemDef.name} ile birleştir`
                    : selectedItemDef.description}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end shrink-0 ml-1">
              <span className="text-[9.5px] text-amber-300 font-black bg-amber-500/20 px-2 py-0.5 rounded-lg border border-amber-400/30">
                {hoveredItemDef
                  ? 'Bırak & Sentezle!'
                  : selectedItemDef.tier >= 4 && difficulty.isHardMode
                  ? 'Özel Sentez'
                  : 'Eşleştir!'}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-slate-400 w-full px-0.5">
            <div className="w-7 h-7 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-cyan-300">
              {difficulty.isHardMode ? (
                <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
              ) : difficulty.isMediumMode ? (
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              ) : (
                <Hand className="w-4 h-4 animate-pulse" />
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-xs font-black text-slate-200">
                  {difficulty.isHardMode
                    ? `Zor Seviye (ZOR +${difficulty.challengeLevel})`
                    : difficulty.isMediumMode
                    ? `Orta Seviye (ORTA +${difficulty.challengeLevel})`
                    : 'Nesne Bilgisi & İpucu'}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 truncate">
                {difficulty.isHardMode
                  ? 'Zirve nesneler için her iki özel yan kolu sentezleyin!'
                  : difficulty.isMediumMode
                  ? 'Üst kademeler için aynı kademedeki nesneleri birleştirin.'
                  : 'Detayları görmek veya birleştirmek için bir nesneye dokunun / sürükleyin'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Hint Button (Directly Above Refill Button) */}
      <button
        onClick={onTriggerHint}
        disabled={isAllDiscovered}
        className={`
          w-full h-9 rounded-2xl border font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer group
          ${
            isAllDiscovered
              ? 'bg-slate-800/50 text-slate-500 border-white/5 opacity-50 cursor-default'
              : 'bg-gradient-to-r from-amber-500/25 via-purple-600/30 to-cyan-500/25 hover:from-amber-500/40 hover:to-cyan-500/40 border-amber-400/50 text-amber-200 hover:text-white shadow-amber-500/20'
          }
        `}
      >
        <Lightbulb className="w-3.5 h-3.5 text-amber-300 fill-amber-300 animate-pulse group-hover:scale-110 transition-transform" />
        <span>💡 İPUCU AL (Sıradaki Keşif)</span>
      </button>

      {/* Full-width Big Colorful Refill Button */}
      <div className="w-full flex items-center">
        <button
          onClick={onRefill}
          disabled={isFull || isRefilling}
          className={`
            w-full h-11 sm:h-12 rounded-2xl font-black text-sm shadow-xl transition-all flex items-center justify-center gap-2.5 border
            ${
              isFull
                ? 'bg-slate-800/80 text-slate-400 border-white/10 opacity-70 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 hover:from-pink-400 hover:to-cyan-300 active:scale-98 text-white shadow-purple-500/30 border-white/30 cursor-pointer'
            }
          `}
        >
          {isRefilling ? (
            <RefreshCw className="w-4 h-4 animate-spin text-white" />
          ) : (
            <Plus className="w-4 h-4 stroke-[3]" />
          )}
          <div className="flex flex-col items-center sm:items-start leading-tight">
            <span className="tracking-wide text-xs sm:text-sm font-black">
              {isFull ? 'ALAN TAMAMEN DOLU (16/16)' : '➕ DOLDUR'}
            </span>
            {!isFull && (
              <span className="text-[8.5px] sm:text-[9px] font-bold text-pink-100 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-cyan-200" /> Boşlukları Temel Nesnelerle Doldur
              </span>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};
