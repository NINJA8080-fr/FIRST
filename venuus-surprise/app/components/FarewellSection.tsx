'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function FarewellSection() {
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const handleRivenClick = () => {
    setClickCount((prev) => prev + 1);
    
    if (clickCount + 1 === 3) {
      setShowEasterEgg(true);
      confetti({
        particleCount: 150,
        spread: 180,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#800020', '#ffffff'],
      });
    }
  };

  useEffect(() => {
    // Trigger final confetti
    const timer = setTimeout(() => {
      const duration = 5000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.8 },
          colors: ['#d4af37', '#800020', '#ffffff'],
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.8 },
          colors: ['#d4af37', '#800020', '#ffffff'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] via-[#0a0a0a] to-[#1a1a2e] relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#d4af37] rounded-full"
            initial={{
              x: Math.random() * 1000,
              y: -20,
              opacity: 0,
            }}
            animate={{
              y: 1000,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Main message */}
          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-8 text-[#d4af37] glow-strong handwritten"
            animate={{
              textShadow: [
                '0 0 20px rgba(212, 175, 55, 0.8)',
                '0 0 40px rgba(212, 175, 55, 1)',
                '0 0 20px rgba(212, 175, 55, 0.8)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            شكراً لأنك جيتي 💝
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-3xl text-gray-300 mb-6 leading-relaxed"
          >
            كل لحظة كتستاهل الاحتفال
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-400 mb-12"
          >
            أتمنى أن هذه المفاجأة الصغيرة خلاتك تبتاسمي ❤️
          </motion.p>

          {/* Decorative hearts */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="flex justify-center gap-6 mb-12"
          >
            {['💝', '✨', '🌟', '💫', '🎉'].map((emoji, i) => (
              <motion.span
                key={i}
                className="text-5xl"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="space-y-4"
          >
            <p className="text-2xl text-gray-300">
              مع كل الحب والتقدير،
            </p>
            <motion.p
              onClick={handleRivenClick}
              whileHover={{ scale: 1.1 }}
              className="text-4xl font-bold text-[#800020] handwritten glow cursor-pointer"
            >
              Riven 💕
            </motion.p>
            {clickCount > 0 && clickCount < 3 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-gray-500"
              >
                ({3 - clickCount} ضغطات متبقية...)
              </motion.p>
            )}
          </motion.div>

          {/* Easter Egg */}
          {showEasterEgg && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-12 p-8 bg-gradient-to-r from-[#d4af37]/20 to-[#800020]/20 rounded-3xl border-2 border-[#d4af37]"
            >
              <p className="text-2xl text-[#d4af37] font-bold mb-4">
                🎉 لقيتي السر المخفي!
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                "أنتِ لست مجرد شخص في حياتي، أنتِ الحياة نفسها.
                <br />
                كل يوم معك هو هدية، وكل لحظة معك هي ذكرى أحتفظ بها في قلبي للأبد.
                <br />
                عيد ميلاد سعيد يا أجمل ما في الكون 💝"
              </p>
              <p className="text-[#d4af37] font-bold mt-4">- Riven، من أعماق القلب</p>
            </motion.div>
          )}

          {/* Final note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5 }}
            className="mt-16 text-gray-500 text-sm"
          >
            <p>✨ هذا الموقع صُمم خصيصاً لك ✨</p>
            <p className="mt-2">Made with 💝 by Riven</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
