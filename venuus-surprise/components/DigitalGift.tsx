'use client';

import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { gift } from '@/lib/data';

export default function DigitalGift() {
  const handleDownload = () => {
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FFA500', '#FF6347'],
    });

    // Simulate download (in real app, this would download the actual file)
    const link = document.createElement('a');
    link.href = gift.downloadPath;
    link.download = 'venuus-wallpaper.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="min-h-screen py-20 px-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600 mb-4">
            هدية رقمية خاصة
          </h2>
          <p className="text-slate-300 text-lg mb-12">{gift.description}</p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-slate-700/50 mb-8"
          >
            <div className="bg-gradient-to-br from-yellow-400/20 to-amber-600/20 rounded-xl p-12 mb-6 border-2 border-dashed border-yellow-400/50">
              <div className="text-8xl mb-4">🎁</div>
              <p className="text-white text-xl font-semibold mb-2">Wallpaper خاص بيك</p>
              <p className="text-slate-300 text-sm">مصمم بكل حب وعناية</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-600 text-slate-900 text-lg font-bold rounded-full shadow-lg hover:shadow-yellow-400/50 transition-all inline-flex items-center gap-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              حمّلي الهدية
            </motion.button>

            <p className="text-slate-400 text-xs mt-6">
              ملاحظة: ضع ملف الـ wallpaper في المسار: /public/downloads/venuus-wallpaper.png
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-slate-400 text-sm"
          >
            <p>💛 مصممة خصيصاً ليك من Riven</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
