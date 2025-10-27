'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface LoginPageProps {
  onSuccess: () => void;
}

export default function LoginPage({ onSuccess }: LoginPageProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (data.success) {
        onSuccess();
      } else {
        setError(data.message || 'الكود غير صحيح');
      }
    } catch (err) {
      setError('حدث خطأ، حاولي مرة أخرى');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a] relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#d4af37] rounded-full"
            initial={{
              x: Math.random() * 1000,
              y: Math.random() * 1000,
              opacity: Math.random(),
            }}
            animate={{
              y: [null, Math.random() * 1000],
              opacity: [null, Math.random(), 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="bg-[#1a1a2e]/80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-[#d4af37]/20">
          {/* Animated Key Icon */}
          <motion.div
            className="flex justify-center mb-8"
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <svg
              className="w-20 h-20 text-[#d4af37]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
          </motion.div>

          <h1 className="text-3xl font-bold text-center mb-4 text-[#d4af37] glow handwritten">
            مفاجأة خاصة
          </h1>
          
          <p className="text-center text-gray-300 mb-8 leading-relaxed">
            هذا الموقع مفاجأة خاصة بـ <span className="text-[#d4af37] font-bold">Venuus</span>
            <br />
            دخّلي الكود اللي عطاه <span className="text-[#800020] font-bold">Riven</span> باش تكتاشفي
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="دخّلي الكود السري"
                className="w-full px-4 py-3 bg-[#0a0a0a]/50 border-2 border-[#d4af37]/30 rounded-lg text-center text-xl tracking-widest text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37] transition-all"
                maxLength={10}
                disabled={isLoading}
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-center text-sm"
              >
                {error}
              </motion.p>
            )}

            <motion.button
              type="submit"
              disabled={isLoading || !code}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 bg-gradient-to-r from-[#d4af37] to-[#800020] text-white font-bold rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-[#d4af37]/50"
            >
              {isLoading ? 'جاري التحقق...' : 'دخول'}
            </motion.button>
          </form>

          <motion.div
            className="mt-6 text-center text-gray-500 text-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨ مفاجأة من القلب ✨
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
