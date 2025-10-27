'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function FarewellSection() {
  const [rivenClicks, setRivenClicks] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  useEffect(() => {
    // Trigger confetti when section comes into view
    const timer = setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FFD700', '#FFA500', '#FF6347'],
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleRivenClick = () => {
    setRivenClicks((prev) => prev + 1);
    if (rivenClicks + 1 === 3) {
      setShowEasterEgg(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#FF6347'],
      });
    }
  };

  return (
    <section className="min-h-screen py-20 px-6 bg-gradient-to-br from-purple-900 via-slate-900 to-slate-800 flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {typeof window !== 'undefined' && [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-8xl mb-8">🎉</div>
          
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600 mb-6">
            شكراً لأنك جيتي
          </h2>
          
          <p className="text-slate-300 text-xl mb-8 leading-relaxed">
            كل لحظة كتستاهل الاحتفال. نتمنى ليك عام مليء بالفرح والنجاح والأحلام المحققة.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-slate-700/50 mb-8"
          >
            <p className="text-white text-lg mb-4">
              مع كل الحب من{' '}
              <motion.span
                onClick={handleRivenClick}
                className="text-yellow-400 font-bold cursor-pointer hover:text-yellow-300 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Riven
              </motion.span>{' '}
              💛
            </p>
            <p className="text-slate-400 text-sm">
              {new Date().getFullYear()} - مصمم بكل حب وعناية
            </p>
          </motion.div>

          {/* Easter Egg */}
          {showEasterEgg && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-yellow-400 to-amber-600 rounded-2xl p-8 shadow-2xl"
            >
              <div className="text-6xl mb-4">🎊</div>
              <p className="text-slate-900 text-2xl font-bold mb-2">
                لقيتي Easter Egg!
              </p>
              <p className="text-slate-800">
                نتي ذكية بزاف! هادي مفاجأة خاصة لأنك اكتشفتي السر 😄
              </p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-slate-500 text-sm"
          >
            <p>💡 نصيحة: اضغطي 3 مرات على اسم Riven باش تشوفي مفاجأة</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
