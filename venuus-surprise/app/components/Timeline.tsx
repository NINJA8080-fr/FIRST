'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  description: string;
  image?: string;
  details?: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    year: '2024',
    title: 'اللقاء الأول',
    description: 'اليوم اللي بدات فيه القصة...',
    details: 'كانت لحظة مميزة، لحظة غيرت كل شيء. من أول نظرة عرفت أنك مختلفة، أنك خاصة. ✨',
  },
  {
    id: 2,
    year: '2024',
    title: 'أول ضحكة',
    description: 'لما ضحكتي لأول مرة...',
    details: 'ضحكتك كانت أجمل صوت سمعته في حياتي. من ذاك الوقت، كل هدفي نشوفك مبتسمة. 😊',
  },
  {
    id: 3,
    year: '2024',
    title: 'لحظات خاصة',
    description: 'كل لحظة معاك كانت ذكرى',
    details: 'كل وقت قضيناه مع بعض، كل محادثة، كل لحظة صمت... كلها محفورة في قلبي للأبد. 💝',
  },
  {
    id: 4,
    year: '2025',
    title: 'اليوم',
    description: 'عيد ميلادك المميز',
    details: 'اليوم هو يومك، يوم نحتفل بوجودك في هذا العالم. شكراً لأنك موجودة، شكراً لأنك أنتِ. 🎉',
  },
];

export default function Timeline() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  return (
    <section className="min-h-screen py-20 px-6 bg-gradient-to-b from-[#1a1a2e] to-[#0a0a0a] relative">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-bold text-center mb-16 text-[#d4af37] glow handwritten"
        >
          رحلتنا معاً 🌟
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute right-1/2 transform translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#d4af37] via-[#800020] to-[#d4af37]"></div>

          {/* Timeline events */}
          <div className="space-y-16">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex items-center ${
                  index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'
                } gap-8`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedEvent(event)}
                    className="bg-[#1a1a2e]/80 backdrop-blur-lg p-6 rounded-2xl border-2 border-[#d4af37]/30 cursor-pointer hover:border-[#d4af37] transition-all shadow-lg hover:shadow-[#d4af37]/30"
                  >
                    <div className="text-[#d4af37] text-sm font-bold mb-2">{event.year}</div>
                    <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                    <p className="text-gray-300">{event.description}</p>
                    <div className="mt-4 text-[#800020] text-sm font-medium">
                      اضغطي للمزيد ←
                    </div>
                  </motion.div>
                </div>

                {/* Center dot */}
                <motion.div
                  whileHover={{ scale: 1.5 }}
                  className="w-6 h-6 bg-[#d4af37] rounded-full border-4 border-[#0a0a0a] shadow-lg z-10 flex-shrink-0"
                />

                {/* Spacer */}
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0a] p-8 rounded-3xl max-w-2xl w-full border-2 border-[#d4af37] shadow-2xl"
            >
              <div className="text-[#d4af37] text-lg font-bold mb-4">{selectedEvent.year}</div>
              <h3 className="text-4xl font-bold text-white mb-4 handwritten glow">
                {selectedEvent.title}
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {selectedEvent.details}
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedEvent(null)}
                className="px-6 py-3 bg-gradient-to-r from-[#d4af37] to-[#800020] text-white font-bold rounded-lg"
              >
                إغلاق
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
