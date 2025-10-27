'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { timelineData } from '@/lib/data';

export default function Timeline() {
  const [selectedMoment, setSelectedMoment] = useState<number | null>(null);

  return (
    <section className="min-h-screen py-20 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600 mb-4">
            رحلتنا معاً
          </h2>
          <p className="text-slate-300 text-lg">لحظات ما تتنساش</p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-yellow-400 via-amber-500 to-yellow-600"></div>

          {timelineData.map((moment, index) => (
            <motion.div
              key={moment.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex items-center mb-16 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Content */}
              <div className="w-5/12">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedMoment(moment.id)}
                  className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-slate-700/50 cursor-pointer hover:border-yellow-400/50 transition-all"
                >
                  <div className="text-yellow-400 font-bold text-2xl mb-2">{moment.year}</div>
                  <h3 className="text-white text-xl font-bold mb-2">{moment.title}</h3>
                  <p className="text-slate-300 text-sm">{moment.description}</p>
                  <div className="mt-4 text-yellow-400 text-sm">اضغطي للمزيد →</div>
                </motion.div>
              </div>

              {/* Center dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-yellow-400 rounded-full border-4 border-slate-900 shadow-lg"></div>

              {/* Spacer */}
              <div className="w-5/12"></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedMoment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMoment(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-800 rounded-2xl p-8 max-w-2xl w-full shadow-2xl border border-slate-700"
            >
              {timelineData
                .filter((m) => m.id === selectedMoment)
                .map((moment) => (
                  <div key={moment.id}>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <div className="text-yellow-400 font-bold text-3xl mb-2">{moment.year}</div>
                        <h3 className="text-white text-2xl font-bold">{moment.title}</h3>
                      </div>
                      <button
                        onClick={() => setSelectedMoment(null)}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="mb-6 rounded-lg overflow-hidden bg-slate-700/50 h-64 flex items-center justify-center">
                      <p className="text-slate-400 text-sm">الصورة: {moment.image}</p>
                    </div>

                    <p className="text-slate-300 leading-relaxed">{moment.details}</p>
                  </div>
                ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
