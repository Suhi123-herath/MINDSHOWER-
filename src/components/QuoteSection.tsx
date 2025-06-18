import React, { useState, useEffect } from 'react';
import { Quote } from '../types';
import { inspirationalQuotes } from '../data/quotes';
import { RefreshCw, Quote as QuoteIcon } from 'lucide-react';

const QuoteSection: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState<Quote>(inspirationalQuotes[0]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getQuoteOfTheDay = () => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    return inspirationalQuotes[dayOfYear % inspirationalQuotes.length];
  };

  useEffect(() => {
    setCurrentQuote(getQuoteOfTheDay());
  }, []);

  const refreshQuote = async () => {
    setIsRefreshing(true);
    
    // Simulate a brief loading period for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const randomQuote = inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];
    setCurrentQuote(randomQuote);
    setIsRefreshing(false);
  };

  return (
    <div className="bg-gradient-to-br from-softblue/20 to-sage/20 backdrop-blur-sm rounded-2xl p-6 shadow-subtle border border-sage/20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-quicksand font-semibold text-darkgray flex items-center">
          <QuoteIcon className="w-5 h-5 mr-2 text-sage" />
          Daily Inspiration
        </h2>
        <button
          onClick={refreshQuote}
          disabled={isRefreshing}
          className="p-2 rounded-lg transition-all duration-200 hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-gray/40 min-w-[44px] min-h-[44px] motion-reduce:transition-none"
          aria-label="Get new quote"
        >
          <RefreshCw className={`w-4 h-4 text-sage ${isRefreshing ? 'animate-spin motion-reduce:animate-none' : ''}`} />
        </button>
      </div>
      
      <div className="text-center">
        <blockquote className="text-darkgray/90 font-raleway text-lg leading-relaxed mb-4 italic">
          "{currentQuote.text}"
        </blockquote>
        <cite className="text-darkgray/70 font-raleway font-medium text-base">
          — {currentQuote.author}
        </cite>
      </div>
    </div>
  );
};

export default QuoteSection;