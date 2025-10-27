'use client';

import { useState } from 'react';
import LoginPage from '@/components/LoginPage';
import HeroSection from '@/components/HeroSection';
import Timeline from '@/components/Timeline';
import SurprisesRoom from '@/components/SurprisesRoom';
import DigitalGift from '@/components/DigitalGift';
import GuestBook from '@/components/GuestBook';
import FarewellSection from '@/components/FarewellSection';
import MusicPlayer from '@/components/MusicPlayer';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleStart = () => {
    setShowMainContent(true);
    // Smooth scroll to timeline
    setTimeout(() => {
      const timelineSection = document.getElementById('timeline');
      if (timelineSection) {
        timelineSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  if (!isAuthenticated) {
    return <LoginPage onSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="relative">
      <HeroSection onStart={handleStart} />
      
      {showMainContent && (
        <>
          <div id="timeline">
            <Timeline />
          </div>
          <SurprisesRoom />
          <DigitalGift />
          <GuestBook />
          <FarewellSection />
        </>
      )}

      <MusicPlayer />
    </div>
  );
}
