'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

export default function GuestBook() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages');
      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
      });

      if (response.ok) {
        setName('');
        setMessage('');
        setShowSuccess(true);
        fetchMessages();
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Failed to submit message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen py-20 px-6 bg-gradient-to-br from-slate-800 via-slate-900 to-purple-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600 mb-4">
            كتاب الزوار
          </h2>
          <p className="text-slate-300 text-lg">اكتبي رسالة حلوة لـ Venuus</p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-slate-700/50 mb-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-white font-semibold mb-2">
                الاسم
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                placeholder="سميتك..."
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-white font-semibold mb-2">
                الرسالة
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all resize-none"
                placeholder="اكتبي رسالة حلوة..."
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-gradient-to-r from-yellow-400 to-amber-600 text-slate-900 font-bold rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-yellow-400/50"
            >
              {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة 💛'}
            </motion.button>
          </form>

          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-center"
            >
              تم إرسال رسالتك بنجاح! 🎉
            </motion.div>
          )}
        </motion.div>

        {/* Messages Display */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            الرسائل ({messages.length})
          </h3>
          
          {messages.length === 0 ? (
            <p className="text-slate-400 text-center">ما كاينش رسائل بعد. كوني نتي الأولى!</p>
          ) : (
            messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-slate-800/30 backdrop-blur-lg rounded-xl p-6 border border-slate-700/30"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full flex items-center justify-center text-slate-900 font-bold">
                      {msg.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{msg.name}</p>
                      <p className="text-slate-400 text-xs">
                        {new Date(msg.timestamp).toLocaleDateString('ar-MA')}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed">{msg.message}</p>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
