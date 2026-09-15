import React from 'react';
import { BoardSlot, ItemDef } from '../types/game';
import { motion } from 'motion/react';

interface SlotProps {
  index: number;
  slot: BoardSlot | null;
  itemDef?: ItemDef;
  isSelected: boolean;
  isDragSource: boolean;
  isDragHover: boolean;
  isHintTarget?: boolean;
  onPointerDown: (index: number, x: number, y: number) => void;
  onClick: (index: number) => void;
}

export const Slot: React.FC<SlotProps> = ({
  index,
  slot,
  itemDef,
  isSelected,
  isDragSource,
  isDragHover,
  isHintTarget = false,
  onPointerDown,
  onClick,
}) => {
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    onPointerDown(index, e.clientX, e.clientY);
  };

  return (
    <div
      data-slot-index={index}
      onClick={() => onClick(index)}
      onPointerDown={handlePointerDown}
      className={`
        relative aspect-square rounded-2xl transition-all duration-150 select-none touch-none
        flex items-center justify-center cursor-pointer border-2
        ${
          isDragHover
            ? 'bg-gradient-to-br from-pink-500/35 to-purple-500/35 border-pink-400 scale-105 shadow-lg shadow-pink-500/50 ring-4 ring-pink-400/60 z-20'
            : isSelected
            ? 'bg-gradient-to-br from-amber-400/30 to-orange-500/30 border-amber-300 ring-4 ring-amber-400/60 scale-102 shadow-md z-10'
            : isHintTarget
            ? 'bg-amber-400/25 border-amber-300 ring-4 ring-amber-400/70 shadow-lg shadow-amber-400/40 animate-pulse z-10'
            : 'bg-white/10 hover:bg-white/15 border-white/20 hover:border-white/40 shadow-inner'
        }
        ${isDragSource ? 'opacity-20 scale-90 border-dashed border-cyan-400' : 'opacity-100'}
      `}
      style={{
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        touchAction: 'none',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
      }}
    >
      {/* Item Display - Icon only */}
      {slot && itemDef && !isDragSource && (
        <motion.div
          key={`${slot.uid}_${slot.itemId}`}
          initial={slot.isNew ? { scale: 0.35, opacity: 0.7 } : false}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          className="flex items-center justify-center w-full h-full pointer-events-none transform-gpu"
          style={{
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            willChange: 'transform, opacity',
          }}
        >
          {/* Large Centered Item Emoji */}
          <span
            className="text-3xl sm:text-4xl select-none leading-none inline-flex items-center justify-center pointer-events-none"
            style={{
              fontFamily:
                '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
              WebkitFontSmoothing: 'antialiased',
              display: 'inline-block',
              lineHeight: 1,
            }}
          >
            {itemDef.icon}
          </span>
        </motion.div>
      )}

      {/* Empty slot center dot */}
      {!slot && (
        <div className="w-2.5 h-2.5 rounded-full bg-white/20 pointer-events-none" />
      )}
    </div>
  );
};
