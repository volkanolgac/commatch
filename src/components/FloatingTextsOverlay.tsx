import React from 'react';
import { FloatingCoinText } from '../types/game';
import { motion, AnimatePresence } from 'motion/react';

interface FloatingTextsOverlayProps {
  texts: FloatingCoinText[];
}

export const FloatingTextsOverlay: React.FC<FloatingTextsOverlayProps> = ({ texts }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {texts.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: 1, y: -45, scale: 1.25 }}
            exit={{ opacity: 0, y: -70, scale: 0.8 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute font-black text-sm drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] px-2 py-0.5 rounded-full bg-slate-950/80 border border-white/30"
            style={{
              left: `${item.x}px`,
              top: `${item.y}px`,
              color: item.color || '#fbbf24',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {item.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
