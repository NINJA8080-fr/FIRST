'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface HeroSectionProps {
  onStart: () => void;
}

export default function HeroSection({ onStart }: HeroSectionProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Trigger confetti on first load
    const timer = setTimeout(() => {
      setShowConfetti(true);
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#d4af37', '#800020', '#ffffff'],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
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
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a]">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#d4af37] rounded-full"
            initial={{
              x: Math.random() * 1000,
              y: Math.random() * 1000,
              scale: Math.random(),
              opacity: 0,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-7xl md:text-9xl font-bold mb-6 handwritten"
        >
          <motion.span
            className="inline-block text-[#d4af37] glow-strong"
            animate={{
              textShadow: [
                '0 0 20px rgba(212, 175, 55, 0.8)',
                '0 0 40px rgba(212, 175, 55, 1)',
                '0 0 20px rgba(212, 175, 55, 0.8)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Venuus
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="space-y-4 mb-12"
        >
          <p className="text-2xl md:text-3xl text-gray-300 font-light">
            عيد ميلاد سعيد يا أجمل إنسانة 🎉
          </p>
          <p className="text-lg md:text-xl text-[#800020] font-medium">
            من <span className="text-[#d4af37]">Riven</span> — مفاجأة صغيرة مليئة بالحب والذكريات
          </p>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex justify-center gap-8 mb-12"
        >
          {['✨', '💝', '🌟', '💫', '🎁'].map((emoji, i) => (
            <motion.span
              key={i}
              className="text-4xl"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 10, -10, 0],
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

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(212, 175, 55, 0.6)' }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="px-12 py-4 bg-gradient-to-r from-[#d4af37] to-[#800020] text-white text-xl font-bold rounded-full shadow-2xl hover:shadow-[#d4af37]/50 transition-all"
        >
          اكتاشفي الآن ✨
        </motion.button>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-[#d4af37] text-3xl"
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
