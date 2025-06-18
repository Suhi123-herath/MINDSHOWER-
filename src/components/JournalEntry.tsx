import React, { useState, useEffect, useRef } from 'react';

import { Edit3, Save } from 'lucide-react';

interface JournalEntryProps {
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  isLoading: boolean;
}

const JournalEntry: React.FC<JournalEntryProps> = ({ 
  value, 
  onChange, 
  onSave, 
  isLoading 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);


  useEffect(() => {
  if (!value.trim()) return;

  if (autoSaveTimerRef.current) {
    clearTimeout(autoSaveTimerRef.current);
  }

  autoSaveTimerRef.current = setTimeout(() => {
    onSave();
  }, 10000);

  return () => {
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }
  };
}, [value, onSave]);

 const handleSave = () => {
  if (autoSaveTimerRef.current) {
    clearTimeout(autoSaveTimerRef.current);
    autoSaveTimerRef.current = null;
  }
  onSave();
};

  return (
    <div className="bg-sage/10 backdrop-blur-sm rounded-2xl p-6 shadow-subtle border border-sage/20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-quicksand font-semibold text-darkgray flex items-center">
          <Edit3 className="w-5 h-5 mr-2 text-sage" />
          Today's Reflection
        </h2>
        <div className="text-base font-raleway text-darkgray/190">
          {value.length} characters
        </div>
      </div>
      
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Share your thoughts, feelings, and experiences... What made today special? What challenges did you face? What are you grateful for?"
          className={`
            w-full min-h-[120px] p-4 rounded-xl border-2 transition-all duration-300 ease-in-out
            resize-none font-raleway text-darkgray placeholder-darkgray/60 bg-cream/100 text-base
            focus:outline-none focus:min-h-[200px] focus:bg-white/90
            motion-reduce:transition-none
            ${isFocused 
              ? 'border-softblue shadow-subtle' 
              : 'border-sage/30 hover:border-sage/50'
            }
          `}
          rows={isFocused ? 8 : 4}
        />
        
        {value.trim() && (
          <button
            onClick={handleSave}
            disabled={isLoading}
            className={`
              absolute bottom-4 right-4 flex items-center space-x-2 px-4 py-2 rounded-lg
              font-raleway font-medium transition-all duration-300 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-softblue/50
              motion-reduce:transition-none
              ${isLoading
                ? 'bg-sage/50 text-darkgray/50 cursor-not-allowed'
                : 'bg-gradient-to-r from-sage to-softblue text-white hover:shadow-subtle hover:scale-105 active:scale-95 motion-reduce:hover:scale-100 motion-reduce:active:scale-100'
              }
            `}
          >
            <Save className={`w-4 h-4 ${isLoading ? 'animate-spin motion-reduce:animate-none' : ''}`} />
            <span>{isLoading ? 'Saving...' : 'Save'}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default JournalEntry;