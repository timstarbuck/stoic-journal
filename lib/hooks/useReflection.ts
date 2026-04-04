import { useState, useEffect } from 'react';
import {
  getRandomQuote,
  saveJournalEntry,
  ensureAuthenticatedUser,
} from '@/app/actions';
import type { StoicQuote } from '@/db/schema';

export interface UseReflectionReturn {
  quote: StoicQuote | null;
  content: string;
  loading: boolean;
  saving: boolean;
  error: string | null;
  success: boolean;
  setContent: (content: string) => void;
  handleSave: () => Promise<void>;
}

export function useReflection(
  reflectionType: 'morning' | 'evening'
): UseReflectionReturn {
  const [quote, setQuote] = useState<StoicQuote | null>(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const initPage = async () => {
      try {
        await ensureAuthenticatedUser();
        const randomQuote = await getRandomQuote(reflectionType);
        setQuote(randomQuote);
        if (randomQuote) {
          setContent(`"${randomQuote.text}" \n— ${randomQuote.author}`);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError('Failed to load quote');
        setLoading(false);
      }
    };

    initPage();
  }, [reflectionType]);

  const handleSave = async () => {
    if (!content.trim()) {
      setError('Please write something before saving');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await saveJournalEntry(reflectionType, content);
      setSuccess(true);
      setContent('');

      const newQuote = await getRandomQuote(reflectionType);
      setQuote(newQuote);

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to save your reflection. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return {
    quote,
    content,
    loading,
    saving,
    error,
    success,
    setContent,
    handleSave,
  };
}
