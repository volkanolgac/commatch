import React from 'react';
import { BoardSlot, DraggingInfo, LevelCategory, HintInfo } from '../types/game';
import { Slot } from './Slot';

interface GameBoardProps {
  board: (BoardSlot | null)[];
  category: LevelCategory;
  dragState: DraggingInfo | null;
  selectedSlotIndex: number | null;
  activeHint?: HintInfo | null;
  onPointerDown: (index: number, x: number, y: number) => void;
  onSlotClick: (index: number) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  board,
  category,
  dragState,
  selectedSlotIndex,
  activeHint,
  onPointerDown,
  onSlotClick,
}) => {
  const draggedItemDef = dragState?.isDragging
    ? category.items.find((i) => i.id === dragState.itemId)
    : null;

  return (
    <div className="relative w-full max-w-[360px] sm:max-w-[390px] mx-auto px-2 flex flex-col items-center justify-center">
      {/* 4x4 Grid Container with prominent glowing framed border */}
      <div className="w-full aspect-square p-2.5 sm:p-3 rounded-3xl bg-slate-900/70 backdrop-blur-xl border-4 border-indigo-400/60 shadow-[0_0_35px_rgba(99,102,241,0.35)] ring-2 ring-purple-500/30 flex items-center justify-center">
        <div className="w-full h-full grid grid-cols-4 grid-rows-4 gap-1.5 sm:gap-2">
          {board.map((slot, index) => {
            const itemDef = slot ? category.items.find((i) => i.id === slot.itemId) : undefined;
            const isDragSource = dragState?.isDragging && dragState.sourceIndex === index;
            const isDragHover = dragState?.hoverIndex === index;
            const isHintTarget =
              !!activeHint &&
              !!slot &&
              ((activeHint.itemA && slot.itemId === activeHint.itemA.id) ||
                (activeHint.itemB && slot.itemId === activeHint.itemB.id) ||
                (activeHint.isBaseItem && slot.itemId === activeHint.targetItem.id));

            return (
              <Slot
                key={slot?.uid || `slot_empty_${index}`}
                index={index}
                slot={slot}
                itemDef={itemDef}
                isSelected={selectedSlotIndex === index}
                isDragSource={!!isDragSource}
                isDragHover={!!isDragHover}
                isHintTarget={isHintTarget}
                onPointerDown={onPointerDown}
                onClick={onSlotClick}
              />
            );
          })}
        </div>
      </div>

      {/* Floating Dragged Item with -35px vertical offset and 1.2x scale */}
      {dragState?.isDragging && draggedItemDef && (
        <div
          className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
          style={{
            left: `${dragState.x}px`,
            top: `${dragState.y - 35}px`,
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
          }}
        >
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900/95 border-2 border-pink-400 shadow-2xl shadow-pink-500/60 scale-120 animate-pulse">
            <span
              className="text-4xl select-none leading-none inline-flex items-center justify-center pointer-events-none"
              style={{
                fontFamily:
                  '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
                WebkitFontSmoothing: 'antialiased',
                display: 'inline-block',
                lineHeight: 1,
              }}
            >
              {draggedItemDef.icon}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
