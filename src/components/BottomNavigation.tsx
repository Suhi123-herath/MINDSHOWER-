import React, { useEffect, useRef } from 'react';
import { Edit, History, Heart, Settings } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);

  const tabs = [
    { id: 'write', icon: Edit, label: 'Write' },
    { id: 'history', icon: History, label: 'History' },
    { id: 'wellness', icon: Heart, label: 'Wellness' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  useEffect(() => {
    // Initialize the audio object with the specified Mixkit URL
    clickSoundRef.current = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-soft-interface-click-1112.mp3');
    clickSoundRef.current.volume = 0.3; // Set volume to 30% as specified
    clickSoundRef.current.preload = 'auto'; // Preload to prevent delay
    
    // Cleanup function
    return () => {
      if (clickSoundRef.current) {
        clickSoundRef.current = null;
      }
    };
  }, []);

  const handleTabClick = (tabId: string) => {
    // Play sound effect only for the 'write' tab
    if (tabId === 'write' && clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0; // Reset to start in case it's already playing
      
      // Create a promise to handle the duration clipping to 0.5 seconds max
      const playPromise = clickSoundRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Set a timeout to stop the audio after 0.5 seconds maximum
            setTimeout(() => {
              if (clickSoundRef.current && !clickSoundRef.current.paused) {
                clickSoundRef.current.pause();
                clickSoundRef.current.currentTime = 0;
              }
            }, 500); // 0.5 seconds
          })
          .catch(error => {
            // Handle any playback errors silently
            console.warn('Could not play click sound:', error);
          });
      }
    }
    
    onTabChange(tabId);
  };

  return (
    <nav className="fixed bottom-0 w-full bg-white shadow-lg border-t border-gray-300 z-30">
      <div className="container mx-auto px-4">
        <div className="flex justify-around py-2">
          {tabs.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => handleTabClick(id)}
              className={`
                motion-reduce:transition-none
                px-4 py-2 rounded-xl flex flex-col items-center justify-center
                min-w-[44px] min-h-[44px] focus:outline-none focus:ring-2 focus:ring-softblue/50
                transition-all duration-200
                ${activeTab === id
                  ? 'text-gray bg-softblue shadow-lg scale-105 font-semibold'
                  : 'text-darkgray/60 hover:text-darkgray hover:bg-sage/40'
                }
              `}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-raleway font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;