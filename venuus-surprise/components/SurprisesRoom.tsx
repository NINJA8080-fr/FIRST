'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { surprises } from '@/lib/data';

export default function SurprisesRoom() {
  const [activeSurprise, setActiveSurprise] = useState<string | null>(null);
  const [gameRevealed, setGameRevealed] = useState(false);
  const [letterText, setLetterText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Typewriter effect for letter
  useEffect(() => {
    if (activeSurprise === 'letter' && !isTyping) {
      setIsTyping(true);
      const letter = surprises.find((s) => s.id === 'letter');
      if (letter && letter.content) {
        let index = 0;
        const interval = setInterval(() => {
          if (index < letter.content.length) {
            setLetterText(letter.content.substring(0, index + 1));
            index++;
          } else {
            clearInterval(interval);
            setIsTyping(false);
          }
        }, 30);
        return () => clearInterval(interval);
      }
    }
  }, [activeSurprise, isTyping]);

  const handleSurpriseClick = (id: string) => {
    setActiveSurprise(id);
    if (id === 'letter') {
      setLetterText('');
      setIsTyping(false);
    }
  };

  const gameImages = [
    { id: 1, emoji: '🎁', message: 'نتي هدية من السما!' },
    { id: 2, emoji: '⭐', message: 'نتي نجمة حياتي!' },
    { id: 3, emoji: '💛', message: 'قلبي كامل ليك!' },
    { id: 4, emoji: '🌟', message: 'نتي الأحلى!' },
  ];

  return (
    <section className="min-h-screen py-20 px-6 bg-gradient-to-br from-purple-900 via-slate-900 to-slate-800">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600 mb-4">
            غرفة المفاجآت
          </h2>
          <p className="text-slate-300 text-lg">اختاري واحدة وشوفي المفاجأة</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {surprises.map((surprise, index) => (
            <motion.div
              key={surprise.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={() => handleSurpriseClick(surprise.id)}
              className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-8 shadow-xl border border-slate-700/50 cursor-pointer hover:border-yellow-400/50 transition-all text-center"
            >
              <div className="text-6xl mb-4">
                {surprise.type === 'audio' && '🎵'}
                {surprise.type === 'game' && '🎮'}
                {surprise.type === 'letter' && '💌'}
              </div>
              <h3 className="text-white text-xl font-bold mb-2">{surprise.title}</h3>
              <p className="text-slate-300 text-sm">{surprise.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {activeSurprise && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setActiveSurprise(null);
              setGameRevealed(false);
            }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-800 rounded-2xl p-8 max-w-2xl w-full shadow-2xl border border-slate-700 max-h-[80vh] overflow-y-auto"
            >
              {/* Audio Surprise */}
              {activeSurprise === 'audio' && (
                <div className="text-center">
                  <div className="text-6xl mb-6">🎵</div>
                  <h3 className="text-white text-2xl font-bold mb-4">رسالة صوتية من Riven</h3>
                  <p className="text-slate-300 mb-6">اضغطي على زر التشغيل باش تسمعي الرسالة</p>
                  <div className="bg-slate-700/50 rounded-lg p-6 mb-6">
                    <audio controls className="w-full">
                      <source src="/audio/message.mp3" type="audio/mpeg" />
                      المتصفح ما كيدعمش تشغيل الصوت
                    </audio>
                  </div>
                  <p className="text-slate-400 text-sm">
                    ملاحظة: ضع ملف الصوت في المسار: /public/audio/message.mp3
                  </p>
                  <button
                    onClick={() => setActiveSurprise(null)}
                    className="mt-6 px-6 py-2 bg-yellow-400 text-slate-900 font-bold rounded-lg hover:bg-yellow-500 transition-colors"
                  >
                    إغلاق
                  </button>
                </div>
              )}

              {/* Game Surprise */}
              {activeSurprise === 'game' && (
                <div className="text-center">
                  <div className="text-6xl mb-6">🎮</div>
                  <h3 className="text-white text-2xl font-bold mb-4">لعبة صغيرة</h3>
                  <p className="text-slate-300 mb-6">اختاري واحد من الصناديق</p>
                  
                  {!gameRevealed ? (
                    <div className="grid grid-cols-2 gap-4">
                      {gameImages.map((item) => (
                        <motion.button
                          key={item.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setGameRevealed(true)}
                          className="bg-gradient-to-br from-yellow-400 to-amber-600 rounded-xl p-8 text-6xl hover:shadow-lg hover:shadow-yellow-400/50 transition-all"
                        >
                          🎁
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-gradient-to-br from-yellow-400 to-amber-600 rounded-xl p-12"
                    >
                      <div className="text-8xl mb-4">💛</div>
                      <p className="text-slate-900 text-2xl font-bold">
                        {gameImages[Math.floor(Math.random() * gameImages.length)].message}
                      </p>
                    </motion.div>
                  )}

                  <button
                    onClick={() => {
                      setActiveSurprise(null);
                      setGameRevealed(false);
                    }}
                    className="mt-6 px-6 py-2 bg-yellow-400 text-slate-900 font-bold rounded-lg hover:bg-yellow-500 transition-colors"
                  >
                    إغلاق
                  </button>
                </div>
              )}

              {/* Letter Surprise */}
              {activeSurprise === 'letter' && (
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="text-6xl">💌</div>
                    <button
                      onClick={() => setActiveSurprise(null)}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <h3 className="text-white text-2xl font-bold mb-6">رسالة خاصة من القلب</h3>
                  <div className="bg-slate-700/30 rounded-lg p-6 text-slate-200 leading-relaxed whitespace-pre-wrap font-serif">
                    {letterText}
                    {isTyping && <span className="animate-pulse">|</span>}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
