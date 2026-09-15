import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, User, ArrowRight } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  initialName?: string;
  isEditMode?: boolean;
  onSaveName: (name: string) => void;
  onClose?: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  initialName = '',
  isEditMode = false,
  onSaveName,
  onClose,
}) => {
  const [nameInput, setNameInput] = useState(initialName);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nameInput.trim();
    if (!trimmed) {
      setError('Lütfen bir isim veya kullanıcı adı girin.');
      return;
    }
    if (trimmed.length > 20) {
      setError('İsim en fazla 20 karakter olabilir.');
      return;
    }
    setError('');
    onSaveName(trimmed);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          className="w-full max-w-[360px] rounded-3xl bg-gradient-to-b from-slate-900 via-indigo-950 to-purple-950 border-2 border-fuchsia-500/50 shadow-[0_0_50px_rgba(217,70,239,0.35)] p-6 text-white text-center flex flex-col items-center gap-4 relative overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-500/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-500/30 rounded-full blur-3xl pointer-events-none" />

          {/* Icon Badge */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 via-purple-600 to-cyan-400 p-[2px] shadow-lg shadow-pink-500/30 flex items-center justify-center">
            <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center text-3xl">
              ✨
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black text-white flex items-center justify-center gap-1.5">
              <span>{isEditMode ? 'Oyuncu Profilini Güncelle' : 'Commatch Dünyasına Hoş Geldin!'}</span>
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              {isEditMode
                ? 'Kullanıcı adını istediğin gibi değiştirebilirsin.'
                : 'Maceraya başlamadan önce seni nasıl çağıralım?'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
            <div className="relative w-full">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-pink-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                autoFocus
                value={nameInput}
                onChange={(e) => {
                  setNameInput(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Adınız veya Takma Adınız..."
                maxLength={20}
                className="w-full py-3 pl-10 pr-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm font-semibold focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-500/30 transition-all text-center"
              />
            </div>

            {error && (
              <span className="text-[11px] font-bold text-rose-400 animate-pulse">
                {error}
              </span>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 hover:from-pink-400 hover:to-cyan-400 font-black text-sm tracking-wide text-white shadow-lg shadow-purple-600/40 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isEditMode ? 'Kaydet' : 'Maceraya Başla!'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {isEditMode && onClose && (
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Vazgeç
              </button>
            )}
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
