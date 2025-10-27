'use client';

import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function DigitalGift() {
  const handleDownload = () => {
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#d4af37', '#800020', '#ffffff'],
    });

    // Create a simple wallpaper with text
    const canvas = document.createElement('canvas');
    canvas.width = 1920;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#0a0a0a');
      gradient.addColorStop(0.5, '#1a1a2e');
      gradient.addColorStop(1, '#0a0a0a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add stars
      ctx.fillStyle = '#d4af37';
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 2;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Add text
      ctx.fillStyle = '#d4af37';
      ctx.font = 'bold 120px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Venuus', canvas.width / 2, canvas.height / 2 - 50);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = '60px Arial';
      ctx.fillText('✨ عيد ميلاد سعيد ✨', canvas.width / 2, canvas.height / 2 + 50);
      
      ctx.fillStyle = '#800020';
      ctx.font = '40px Arial';
      ctx.fillText('من Riven بكل الحب 💝', canvas.width / 2, canvas.height / 2 + 120);

      // Download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'venuus-wallpaper.png';
          a.click();
          URL.revokeObjectURL(url);
        }
      });
    }
  };

  return (
    <section className="min-h-screen py-20 px-6 bg-gradient-to-b from-[#1a1a2e] to-[#0a0a0a] relative">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-bold text-center mb-16 text-[#d4af37] glow handwritten"
        >
          هديتك الرقمية 🎁
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-[#1a1a2e]/80 backdrop-blur-lg p-12 rounded-3xl border-2 border-[#d4af37]/30 text-center"
        >
          {/* Gift preview */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="mb-8"
          >
            <div className="inline-block text-9xl">🎁</div>
          </motion.div>

          <h3 className="text-3xl font-bold text-white mb-4">
            Wallpaper خاص بيك
          </h3>
          
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            صممت لك wallpaper خاص باسمك، تقدري تستعمليه في الهاتف أو الكمبيوتر.
            <br />
            كل ما تشوفيه، تفتكري هذا اليوم المميز 💝
          </p>

          <motion.button
            whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(212, 175, 55, 0.6)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className="px-12 py-4 bg-gradient-to-r from-[#d4af37] to-[#800020] text-white text-xl font-bold rounded-full shadow-2xl inline-flex items-center gap-3"
          >
            <span>⬇️</span>
            <span>حمّلي الهدية</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 text-gray-400 text-sm"
          >
            ✨ الهدية ستُحمّل تلقائياً بعد الضغط على الزر
          </motion.div>
        </motion.div>

        {/* Additional message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-[#d4af37]/10 to-[#800020]/10 p-6 rounded-2xl border border-[#d4af37]/20">
            <p className="text-gray-300 text-lg leading-relaxed">
              "الهدايا الحقيقية ليست الأشياء المادية، بل اللحظات والذكريات التي نصنعها معاً.
              <br />
              هذا الموقع هو مجرد تذكير صغير بكم أنتِ مميزة." 💫
            </p>
            <p className="text-[#d4af37] font-bold mt-4">- Riven</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
