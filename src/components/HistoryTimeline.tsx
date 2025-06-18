import React, { useState } from 'react';
import { JournalEntry } from '../types';
import { Calendar, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';

interface HistoryTimelineProps {
  entries: JournalEntry[];
  onDeleteEntry: (id: string) => void;
}

const HistoryTimeline: React.FC<HistoryTimelineProps> = ({ entries, onDeleteEntry }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const entriesPerPage = 3;
  const totalPages = Math.ceil(entries.length / entriesPerPage);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date));
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  const truncateText = (text: string, maxLength: number = 120) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const currentEntries = entries
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(currentPage * entriesPerPage, (currentPage + 1) * entriesPerPage);

  if (entries.length === 0) {
    return (
      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 shadow-lg shadow-black/10 border border-white/30 text-center text-white">
        <Calendar className="w-16 h-16 text-sage/50 mx-auto mb-4" />
        <h3 className="text-xl font-quicksand font-semibold text-darkgray mb-2">
          No Entries Yet
        </h3>
        <p className="text-darkgray/100 font-raleway text-base">
          Start your journaling journey by adding your first entry above.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-cream/5 backdrop-blur-sm rounded-2xl p-6 shadow-subtle border border-sage/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-quicksand font-semibold text-darkgray flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-sage" />
          Your Journey
          <span
            title="Data is saved locally in this browser only. It won't sync across devices."
            className="ml-1 text-white bg-red-500 border border-red-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold hover:bg-red-700 transition cursor-help"
          >
            i
          </span>
        </h2>
        {totalPages > 1 && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="p-2 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sage/20 motion-reduce:transition-none min-w-[44px] min-h-[44px]"
            >
              <ChevronLeft className="w-4 h-4 text-darkgray" />
            </button>
            <span className="text-base font-raleway text-darkgray/70">
              {currentPage + 1} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
              className="p-2 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sage/20 motion-reduce:transition-none min-w-[44px] min-h-[44px]"
            >
              <ChevronRight className="w-4 h-4 text-darkgray" />
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {currentEntries.map((entry, index) => (
          <div
            key={entry.id}
            className="group p-4 rounded-xl border border-sage/20 hover:border-sage/40 transition-all duration-300 ease-in-out hover:shadow-subtle animate-slide-up bg-cream/30 hover:bg-cream/50 motion-reduce:animate-none motion-reduce:transition-none"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{entry.mood}</span>
                <div>
                  <div className="font-raleway font-medium text-darkgray text-base">
                    {formatDate(entry.date)}
                  </div>
                  <div className="text-base text-darkgray/60">
                    {formatTime(entry.createdAt)}
                  </div>
                </div>
              </div>
              <button
                onClick={() => onDeleteEntry(entry.id)}
                className="opacity-0 group-hover:opacity-100 p-2 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200 min-w-[44px] min-h-[44px] motion-reduce:transition-none"
                aria-label="Delete entry"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-darkgray/80 font-raleway leading-relaxed text-base whitespace-pre-wrap">
              {entry.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryTimeline;