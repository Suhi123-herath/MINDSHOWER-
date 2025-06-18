export interface JournalEntry {
  id: string;
  date: Date;
  mood: string;
  text: string;
  createdAt: Date;
}

export interface Quote {
  text: string;
  author: string;
}

export type MoodEmoji = '😊' | '😐' | '😞' | '😠' | '😌';