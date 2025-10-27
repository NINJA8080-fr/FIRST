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
        // Success animation then callback
        setTimeout(onSuccess, 1000);
      } else {
        setError(data.message || 'الكود غير صحيح');
        setIsLoading(false);
      }
    } catch (err) {
      setError('حدث خطأ، حاولي مرة أخرى');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
            initial={{
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1000,
              y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 800,
              opacity: 0,
            }}
            animate={{
              y: [null, typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 800],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-slate-700/50">
          {/* Key Icon Animation */}
          <motion.div
            className="flex justify-center mb-8"
            animate={{
              rotate: isLoading ? 360 : 0,
            }}
            transition={{
              duration: 1,
              repeat: isLoading ? Infinity : 0,
              ease: 'linear',
            }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-10 h-10 text-slate-900"
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
            </div>
          </motion.div>

          <h1 className="text-3xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">
            مفاجأة خاصة
          </h1>
          <p className="text-slate-300 text-center mb-8 text-sm">
            هذي مفاجأة لـ <span className="text-yellow-400 font-semibold">Venuus</span>
            <br />
            دخلي الكود باش تكتاشفي
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="دخلي الكود السري"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all text-center text-lg tracking-widest"
                disabled={isLoading}
                autoFocus
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-2 text-center"
                >
                  {error}
                </motion.p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={isLoading || !code}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-gradient-to-r from-yellow-400 to-amber-600 text-slate-900 font-bold rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-yellow-400/50"
            >
              {isLoading ? 'جاري التحقق...' : 'دخول'}
            </motion.button>
          </form>

          <p className="text-slate-500 text-xs text-center mt-6">
            مصمم بكل حب من Riven 💛
          </p>
        </div>
      </motion.div>
    </div>
  );
}
