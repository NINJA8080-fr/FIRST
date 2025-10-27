'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
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
      console.error('Error fetching messages:', error);
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
      console.error('Error submitting message:', error);
    } finally {
      setIsSubmitting(false);
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
          كتاب الزوار 📖
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#1a1a2e]/80 backdrop-blur-lg p-8 rounded-3xl border-2 border-[#d4af37]/30"
          >
            <h3 className="text-2xl font-bold text-white mb-6">اكتبي رسالة لـ Venuus 💌</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2 font-medium">الاسم</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="اسمك..."
                  className="w-full px-4 py-3 bg-[#0a0a0a]/50 border-2 border-[#d4af37]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37] transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">الرسالة</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="اكتبي رسالتك هنا..."
                  rows={5}
                  className="w-full px-4 py-3 bg-[#0a0a0a]/50 border-2 border-[#d4af37]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37] transition-all resize-none"
                  required
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-gradient-to-r from-[#d4af37] to-[#800020] text-white font-bold rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة ✨'}
              </motion.button>
            </form>

            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 p-4 bg-green-500/20 border-2 border-green-500 rounded-lg text-green-300 text-center"
                >
                  ✅ تم إرسال رسالتك بنجاح!
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Messages */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#1a1a2e]/80 backdrop-blur-lg p-8 rounded-3xl border-2 border-[#d4af37]/30"
          >
            <h3 className="text-2xl font-bold text-white mb-6">الرسائل 💝</h3>
            
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {messages.length === 0 ? (
                <p className="text-gray-400 text-center py-8">
                  لا توجد رسائل بعد. كوني أول من يكتب! ✨
                </p>
              ) : (
                messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-[#0a0a0a]/50 p-4 rounded-xl border border-[#d4af37]/20"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#d4af37] font-bold">{msg.name}</span>
                      <span className="text-gray-500 text-xs">
                        {new Date(msg.timestamp).toLocaleDateString('ar-MA')}
                      </span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{msg.message}</p>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
