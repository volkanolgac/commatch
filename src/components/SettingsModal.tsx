import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Volume2,
  VolumeX,
  Users,
  UserPlus,
  Trash2,
  Check,
  RotateCcw,
  HelpCircle,
  Sparkles,
  Trophy,
  ShieldAlert,
} from 'lucide-react';
import { UserProfile } from '../types/game';
import { AVATAR_OPTIONS, MAX_PROFILES } from '../services/storageService';

interface SettingsModalProps {
  isOpen: boolean;
  isMuted: boolean;
  profiles: UserProfile[];
  activeProfileId: string;
  onSwitchProfile: (profileId: string) => void;
  onAddNewProfile: (name: string, avatarIcon?: string) => boolean;
  onDeleteProfile: (profileId: string) => boolean;
  onToggleMute: () => void;
  onEditName: () => void;
  onResetGame: () => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  isMuted,
  profiles,
  activeProfileId,
  onSwitchProfile,
  onAddNewProfile,
  onDeleteProfile,
  onToggleMute,
  onEditName,
  onResetGame,
  onClose,
}) => {
  const [isCreatingProfile, setIsCreatingProfile] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0]);
  const [profileToDelete, setProfileToDelete] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  if (!isOpen) return null;

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProfileName.trim()) return;
    const success = onAddNewProfile(newProfileName.trim(), selectedAvatar);
    if (success) {
      setNewProfileName('');
      setIsCreatingProfile(false);
    }
  };

  const activeProf = profiles.find((p) => p.id === activeProfileId) || profiles[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-[390px] max-h-[90dvh] rounded-3xl bg-slate-900 border-2 border-white/20 shadow-2xl p-5 text-white flex flex-col gap-4 relative overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3 shrink-0">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <span>⚙️ Oyun Ayarları & Profiller</span>
            </h3>
            <button
              onClick={onClose}
              className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto space-y-4 pr-1 custom-scrollbar">
            {/* PROFILES SECTION (Up to 5 Users) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-black text-pink-400">
                  <Users className="w-4 h-4" />
                  <span>Kullanıcı Profilleri ({profiles.length}/{MAX_PROFILES})</span>
                </div>
                {profiles.length < MAX_PROFILES && !isCreatingProfile && (
                  <button
                    onClick={() => setIsCreatingProfile(true)}
                    className="px-2.5 py-1 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 text-[11px] font-bold border border-pink-500/30 flex items-center gap-1 transition-all"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Yeni Profil Ekle</span>
                  </button>
                )}
              </div>

              {/* Profiles List */}
              <div className="space-y-1.5">
                {profiles.map((prof) => {
                  const isActive = prof.id === activeProfileId;
                  const completedCount = prof.data.completedLevelIndices.length;
                  const badgesCount = prof.data.earnedBadgeIds.length;

                  return (
                    <div
                      key={prof.id}
                      className={`p-2.5 rounded-2xl border transition-all flex items-center justify-between gap-2 ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-900/60 to-pink-900/40 border-pink-500/50 shadow-md shadow-pink-500/10'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {/* Avatar & Name */}
                      <button
                        onClick={() => onSwitchProfile(prof.id)}
                        className="flex items-center gap-2.5 flex-1 min-w-0 text-left cursor-pointer"
                      >
                        <div className="w-9 h-9 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center text-lg shrink-0">
                          {prof.avatarIcon || '🔮'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-black text-white truncate">
                              {prof.name || 'Simyacı'}
                            </span>
                            {isActive && (
                              <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[9px] font-black border border-emerald-400/30">
                                Aktif
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400 font-medium flex items-center gap-2">
                            <span>Bölüm {prof.data.currentLevelIndex + 1}</span>
                            <span>•</span>
                            <span className="text-amber-300 font-bold">{completedCount} Geçildi</span>
                            {badgesCount > 0 && (
                              <>
                                <span>•</span>
                                <span className="text-pink-300 font-bold">🎖️ {badgesCount}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </button>

                      {/* Actions */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        {isActive ? (
                          <button
                            onClick={() => {
                              onClose();
                              onEditName();
                            }}
                            className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-[10px] font-bold"
                          >
                            Düzenle
                          </button>
                        ) : (
                          <button
                            onClick={() => onSwitchProfile(prof.id)}
                            className="px-2.5 py-1 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 text-[10px] font-bold border border-pink-500/30"
                          >
                            Geçiş Yap
                          </button>
                        )}

                        {profiles.length > 1 && (
                          <button
                            onClick={() => setProfileToDelete(prof.id)}
                            className="p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                            title="Profili Sil"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Create Profile Sub-Form */}
              {isCreatingProfile && (
                <form
                  onSubmit={handleCreateSubmit}
                  className="p-3 rounded-2xl bg-slate-800 border-2 border-pink-500/40 space-y-2.5 mt-2"
                >
                  <div className="text-xs font-black text-pink-300">Yeni Oyuncu Profili Oluştur</div>
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold mb-1 block">
                      İsim / Takma Ad:
                    </label>
                    <input
                      type="text"
                      maxLength={16}
                      value={newProfileName}
                      onChange={(e) => setNewProfileName(e.target.value)}
                      placeholder="Örn: Simya Ustası"
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-white/20 text-white text-xs font-bold focus:outline-none focus:border-pink-400"
                      autoFocus
                    />
                  </div>

                  {/* Avatar Picker */}
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold mb-1 block">
                      Avatar Seç:
                    </label>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {AVATAR_OPTIONS.map((av) => (
                        <button
                          key={av}
                          type="button"
                          onClick={() => setSelectedAvatar(av)}
                          className={`w-7 h-7 rounded-lg text-sm flex items-center justify-center transition-all ${
                            selectedAvatar === av
                              ? 'bg-pink-500 text-white ring-2 ring-pink-300 scale-110'
                              : 'bg-slate-900 hover:bg-slate-700'
                          }`}
                        >
                          {av}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsCreatingProfile(false)}
                      className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-300"
                    >
                      İptal
                    </button>
                    <button
                      type="submit"
                      disabled={!newProfileName.trim()}
                      className="px-3.5 py-1 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-xs font-black text-white shadow-md disabled:opacity-50"
                    >
                      Profili Kaydet
                    </button>
                  </div>
                </form>
              )}

              {/* Confirm Delete Profile Modal */}
              {profileToDelete && (
                <div className="p-3 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-center space-y-2 mt-2">
                  <div className="text-xs font-black text-rose-300 flex items-center justify-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                    <span>Bu profili silmek istediğinize emin misiniz?</span>
                  </div>
                  <p className="text-[10px] text-rose-200/80">
                    Bu profile ait tüm ilerleme ve nişanlar kalıcı olarak silinir.
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => setProfileToDelete(null)}
                      className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white"
                    >
                      Vazgeç
                    </button>
                    <button
                      onClick={() => {
                        onDeleteProfile(profileToDelete);
                        setProfileToDelete(null);
                      }}
                      className="px-3 py-1 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-black text-white"
                    >
                      Evet, Sil
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* SOUND SETTINGS */}
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center">
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold">Ses Efektleri</div>
                  <div className="text-xs font-black text-white">{isMuted ? 'Kapalı' : 'Açık'}</div>
                </div>
              </div>
              <button
                onClick={onToggleMute}
                className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all ${
                  isMuted
                    ? 'bg-slate-800 text-slate-400 border-white/10'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}
              >
                {isMuted ? 'Aç' : 'Kapat'}
              </button>
            </div>

            {/* HOW TO PLAY GUIDE */}
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-black text-amber-300">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Nasıl Oynanır?</span>
              </div>
              <p className="text-[10.5px] text-slate-300 leading-relaxed">
                4x4 tabloda eşyaları birbirinin üzerine sürükleyerek yeni nesneler sentezle. Bölümdeki tüm nesneleri keşfederek bir sonraki seviyeye ve yeni nişanlara ulaş!
              </p>
            </div>

            {/* RESET ACTIVE PROFILE PROGRESS */}
            <div className="pt-1">
              {!showResetConfirm ? (
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="w-full py-2.5 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Aktif Profil İlerlemesini Sıfırla</span>
                </button>
              ) : (
                <div className="p-3 rounded-2xl bg-rose-950/60 border border-rose-500/40 space-y-2 text-center">
                  <div className="text-xs font-black text-rose-300">
                    &quot;{activeProf.name}&quot; profilini sıfırlamak istiyor musunuz?
                  </div>
                  <p className="text-[10px] text-rose-200/80">
                    (Diğer profilleriniz bu işlemden kesinlikle etkilenmez.)
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => setShowResetConfirm(false)}
                      className="px-3 py-1 rounded-xl bg-white/10 text-xs font-bold text-slate-200"
                    >
                      İptal
                    </button>
                    <button
                      onClick={() => {
                        setShowResetConfirm(false);
                        onResetGame();
                      }}
                      className="px-3 py-1 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-black text-white"
                    >
                      Sıfırla
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
