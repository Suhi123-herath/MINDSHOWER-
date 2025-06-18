import React from 'react';
import { MoodEmoji } from '../types';

interface MoodTrackerProps {
  selectedMood: MoodEmoji | null;
  onMoodSelect: (mood: MoodEmoji) => void;
}

const moods: { emoji: MoodEmoji; label: string }[] = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '😞', label: 'Sad' },
  { emoji: '😠', label: 'Angry' },
  { emoji: '😌', label: 'Peaceful' },
];

const MoodTracker: React.FC<MoodTrackerProps> = ({ selectedMood, onMoodSelect }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-subtle border border-sage/20">
      <h2 className="text-xl font-quicksand font-semibold text-darkgray mb-4 text-center">
        How are you feeling today?
      </h2>
      <div className="flex justify-center space-x-4">
        {moods.map(({ emoji, label }) => (
          <button
            key={emoji}
            onClick={() => onMoodSelect(emoji)}
            className={`
              flex flex-col items-center space-y-2 p-3 rounded-xl transition-all duration-300 ease-in-out
              min-w-[44px] min-h-[44px] hover:scale-110 focus:outline-none focus:ring-2 focus:ring-softblue
              motion-reduce:hover:scale-100 motion-reduce:transition-none
              ${selectedMood === emoji 
                ? 'bg-softblue/40 shadow-subtle scale-110 motion-reduce:scale-100' 
                : 'hover:bg-sage/60'
              }
            `}
            aria-label={`Select ${label} mood`}
          >
            <span className="text-3xl">{emoji}</span>
            <span className="text-xs font-raleway text-darkgray/900">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodTracker;