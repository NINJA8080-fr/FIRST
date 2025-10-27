'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginPage from './components/LoginPage';
import HeroSection from './components/HeroSection';
import Timeline from './components/Timeline';
import SurpriseRoom from './components/SurpriseRoom';
import DigitalGift from './components/DigitalGift';
import GuestBook from './components/GuestBook';
import FarewellSection from './components/FarewellSection';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleStart = () => {
    setShowMainContent(true);
  };

  if (!isAuthenticated) {
    return <LoginPage onSuccess={handleLoginSuccess} />;
  }

  return (
    <main className="relative">
      <AnimatePresence mode="wait">
        {!showMainContent ? (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <HeroSection onStart={handleStart} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Timeline />
            <SurpriseRoom />
            <DigitalGift />
            <GuestBook />
            <FarewellSection />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
