'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SurpriseRoom() {
  const [activeTab, setActiveTab] = useState<'audio' | 'game' | 'letter'>('audio');
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showReward, setShowReward] = useState(false);
  const [letterText, setLetterText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const fullLetter = `عزيزتي Venuus،

في هذا اليوم المميز، أردت أن أقول لك كم أنتِ مهمة بالنسبة لي. كل لحظة معك هي هدية، كل ابتسامة منك تنير يومي.

أنتِ لست مجرد شخص عادي في حياتي، أنتِ السبب الذي يجعلني أستيقظ كل يوم بابتسامة. شكراً لأنك موجودة، شكراً لأنك أنتِ.

عيد ميلاد سعيد يا أجمل إنسانة في الكون. أتمنى لك سنة مليئة بالفرح، النجاح، والأحلام المحققة.

مع كل الحب،
Riven 💝`;

  const images = [
    { id: 1, emoji: '🎁', isCorrect: true },
    { id: 2, emoji: '🌟', isCorrect: false },
    { id: 3, emoji: '💝', isCorrect: false },
    { id: 4, emoji: '🎉', isCorrect: false },
  ];

  const startTyping = () => {
    setIsTyping(true);
    setLetterText('');
    let index = 0;
    
    const interval = setInterval(() => {
      if (index < fullLetter.length) {
        setLetterText(fullLetter.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 30);
  };

  const handleImageClick = (id: number, isCorrect: boolean) => {
    setSelectedImage(id);
    if (isCorrect) {
      setTimeout(() => setShowReward(true), 500);
    }
  };

  return (
    <section className="min-h-screen py-20 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a2e] relative">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-bold text-center mb-16 text-[#d4af37] glow handwritten"
        >
          غرفة المفاجآت 🎁
        </motion.h2>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {[
            { id: 'audio', label: 'رسالة صوتية', icon: '🎵' },
            { id: 'game', label: 'لعبة صغيرة', icon: '🎮' },
            { id: 'letter', label: 'رسالة خاصة', icon: '💌' },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-full font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#800020] text-white shadow-lg'
                  : 'bg-[#1a1a2e] text-gray-300 border-2 border-[#d4af37]/30'
              }`}
            >
              {tab.icon} {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'audio' && (
            <motion.div
              key="audio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-[#1a1a2e]/80 backdrop-blur-lg p-8 rounded-3xl border-2 border-[#d4af37]/30 max-w-2xl mx-auto"
            >
              <h3 className="text-3xl font-bold text-white mb-6 text-center">
                رسالة صوتية من Riven 🎵
              </h3>
              
              <div className="flex flex-col items-center gap-6">
                <motion.div
                  animate={{
                    scale: isPlaying ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ duration: 1, repeat: isPlaying ? Infinity : 0 }}
                  className="w-32 h-32 bg-gradient-to-br from-[#d4af37] to-[#800020] rounded-full flex items-center justify-center shadow-2xl"
                >
                  <span className="text-6xl">🎤</span>
                </motion.div>

                <p className="text-gray-300 text-center">
                  اضغطي على الزر باش تسمعي الرسالة الصوتية
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-8 py-4 bg-gradient-to-r from-[#d4af37] to-[#800020] text-white font-bold rounded-full shadow-lg"
                >
                  {isPlaying ? '⏸️ إيقاف' : '▶️ تشغيل'}
                </motion.button>

                <div className="text-sm text-gray-400 text-center mt-4">
                  ملاحظة: ضع ملف صوتي في مجلد /public/audio.mp3 لتفعيل هذه الميزة
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'game' && (
            <motion.div
              key="game"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-[#1a1a2e]/80 backdrop-blur-lg p-8 rounded-3xl border-2 border-[#d4af37]/30 max-w-2xl mx-auto"
            >
              <h3 className="text-3xl font-bold text-white mb-6 text-center">
                لعبة: خبّي الهدية 🎁
              </h3>
              
              <p className="text-gray-300 text-center mb-8">
                اختاري الصورة الصحيحة باش تلقاي المفاجأة!
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {images.map((img) => (
                  <motion.button
                    key={img.id}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleImageClick(img.id, img.isCorrect)}
                    className={`aspect-square bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0a] rounded-2xl border-4 flex items-center justify-center text-6xl transition-all ${
                      selectedImage === img.id
                        ? img.isCorrect
                          ? 'border-green-500 shadow-lg shadow-green-500/50'
                          : 'border-red-500 shadow-lg shadow-red-500/50'
                        : 'border-[#d4af37]/30 hover:border-[#d4af37]'
                    }`}
                    disabled={selectedImage !== null}
                  >
                    {img.emoji}
                  </motion.button>
                ))}
              </div>

              {showReward && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center p-6 bg-gradient-to-r from-[#d4af37]/20 to-[#800020]/20 rounded-2xl border-2 border-[#d4af37]"
                >
                  <p className="text-2xl text-[#d4af37] font-bold mb-2">
                    🎉 مبروك! لقيتي الهدية!
                  </p>
                  <p className="text-gray-300">
                    أنتِ دائماً تعرفين كيف تجدين الأشياء الجميلة، تماماً كما وجدتك أنا 💝
                  </p>
                </motion.div>
              )}

              {selectedImage && !showReward && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    setSelectedImage(null);
                    setShowReward(false);
                  }}
                  className="mx-auto block px-6 py-3 bg-[#1a1a2e] text-white rounded-lg border-2 border-[#d4af37]/30"
                >
                  حاولي مرة أخرى
                </motion.button>
              )}
            </motion.div>
          )}

          {activeTab === 'letter' && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-[#1a1a2e]/80 backdrop-blur-lg p-8 rounded-3xl border-2 border-[#d4af37]/30 max-w-2xl mx-auto"
            >
              <h3 className="text-3xl font-bold text-white mb-6 text-center">
                رسالة خاصة من القلب 💌
              </h3>

              {!letterText && !isTyping && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startTyping}
                  className="mx-auto block px-8 py-4 bg-gradient-to-r from-[#d4af37] to-[#800020] text-white font-bold rounded-full shadow-lg mb-6"
                >
                  اقرأي الرسالة ✨
                </motion.button>
              )}

              {(letterText || isTyping) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-[#0a0a0a]/50 p-6 rounded-2xl border-2 border-[#d4af37]/20"
                >
                  <pre className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap font-['Tajawal']">
                    {letterText}
                    {isTyping && <span className="animate-pulse">|</span>}
                  </pre>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
