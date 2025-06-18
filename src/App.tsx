import React, { useState, useCallback } from 'react';
import { JournalEntry, MoodEmoji } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';

import Header from './components/Header';
import MoodTracker from './components/MoodTracker';
import JournalEntryComponent from './components/JournalEntry';
import ActionButton from './components/ActionButton';
import HistoryTimeline from './components/HistoryTimeline';
import QuoteSection from './components/QuoteSection';
import BottomNavigation from './components/BottomNavigation';

function App() {
  // Load journal entries from localStorage
  const [entries, setEntries] = useLocalStorage<JournalEntry[]>('mindshower-entries', []);

  // State for current mood and journal text input
  const [currentMood, setCurrentMood] = useState<MoodEmoji | null>(null);
  const [currentText, setCurrentText] = useState('');

  // Loading state for save button / async save simulation
  const [isLoading, setIsLoading] = useState(false);

  // Active tab in bottom navigation ('write', 'history', 'wellness', 'settings')
  const [activeTab, setActiveTab] = useState('write');

  // Save a new journal entry
  const handleSaveEntry = useCallback(async () => {
    if (!currentMood || !currentText.trim()) return;

    setIsLoading(true);

    // Simulate network delay for UX
    await new Promise(resolve => setTimeout(resolve, 800));

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date(),
      mood: currentMood,
      text: currentText.trim(),
      createdAt: new Date(),
    };

    // Prepend new entry so newest appears first
    setEntries(prev => [newEntry, ...prev]);
    setCurrentMood(null);
    setCurrentText('');
    setIsLoading(false);
  }, [currentMood, currentText, setEntries]);

  // Delete an entry by id
  const handleDeleteEntry = useCallback((id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  }, [setEntries]);

  // Form validation for enabling save button
  const isFormValid = currentMood !== null && currentText.trim().length > 0;

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'write':
        return (
          <div className="space-y-6">
            <MoodTracker 
              selectedMood={currentMood} 
              onMoodSelect={setCurrentMood} 
            />
            <JournalEntryComponent
              value={currentText}
              onChange={setCurrentText}
              onSave={handleSaveEntry}
              isLoading={isLoading}
            />
            <ActionButton
              onClick={handleSaveEntry}
              isLoading={isLoading}
              disabled={!isFormValid}
            />
          </div>
        );

      case 'history':
        return (
          <HistoryTimeline 
            entries={entries} 
            onDeleteEntry={handleDeleteEntry}
          />
        );

      case 'wellness':
        return (
          <div className="space-y-6">
            <QuoteSection />
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-400">
              <h2 className="text-xl font-quicksand font-semibold text-darkgray mb-4">
                Wellness Tips
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-sage/20 to-softblue/20 rounded-xl">
                  <h3 className="font-raleway font-medium text-darkgray mb-2">
                    🧘 Mindful Breathing
                  </h3>
                  <p className="text-darkgray/70 text-base">
                    Take 5 deep breaths. Inhale for 4 counts, hold for 7, exhale for 8.
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-r from-softblue/20 to-sage/20 rounded-xl">
                  <h3 className="font-raleway font-medium text-darkgray mb-2">
                    💧 Stay Hydrated
                  </h3>
                  <p className="text-darkgray/70 text-base">
                    Drink a glass of water now. Your mind and body will thank you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="bg-cream/80 backdrop-blur-sm rounded-2xl p-6 shadow-subtle border border-sage/20">
            <h2 className="text-xl font-quicksand font-semibold text-darkgray mb-4">
              Settings
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-sage/20">
                <span className="font-raleway text-darkgray">Total Entries</span>
                <span className="font-quicksand font-semibold text-softblue">
                  {entries.length}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-sage/20">
                <span className="font-raleway text-darkgray">Days Active</span>
                <span className="font-quicksand font-semibold text-softblue">
                  {new Set(entries.map(entry => new Date(entry.date).toDateString())).size}
                </span>
              </div>
              <button 
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear all entries? This action cannot be undone.')) {
                    setEntries([]);
                  }
                }}
                className="w-full py-3 px-4 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl font-raleway font-medium transition-colors duration-200"
              >
                Clear All Entries
              </button>
            </div>
            <div className="py-3 border-t border-sage/20 text-center text-sm text-darkgray/60 mt-6">
              Developed by <span className="font-medium text-gray">Nayanadini with bolt.new @2025</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-500 to-blue-300">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-24 max-w-2xl">
        {renderContent()}
      </main>
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
    </div>
  );
}

export default App;
