"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getRandomQuote, saveJournalEntry, ensureDefaultUser } from "@/app/actions";
import type { StoicQuote } from "@/db/schema";
import Link from "next/link";

export default function MorningReflection() {
  const [quote, setQuote] = useState<StoicQuote | null>(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const initPage = async () => {
      try {
        // Ensure default user exists
        await ensureDefaultUser();
        
        // Fetch a random morning quote
        const randomQuote = await getRandomQuote("morning");
        setQuote(randomQuote);
        setLoading(false);
      } catch (err) {
        setError("Failed to load quote");
        setLoading(false);
      }
    };

    initPage();
  }, []);

  const handleSave = async () => {
    if (!content.trim()) {
      setError("Please write something before saving");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await saveJournalEntry("morning", content);
      setSuccess(true);
      setContent("");
      
      // Refresh the quote
      const newQuote = await getRandomQuote("morning");
      setQuote(newQuote);
      
      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError("Failed to save your reflection. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 dark:border-slate-50"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-300">Loading your morning reflection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <div className="max-w-2xl mx-auto py-12">
        <div className="mb-8">
          <Link href="/dashboard" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50">
            ← Back to Dashboard
          </Link>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-t-lg">
            <CardTitle className="text-3xl text-center text-slate-900 dark:text-slate-50">
              Morning Reflection
            </CardTitle>
            <CardDescription className="text-center text-base mt-2">
              Begin your day with Stoic wisdom
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-400 rounded-md text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 text-green-600 dark:text-green-400 rounded-md text-sm">
                ✓ Your reflection has been saved
              </div>
            )}

            {quote && (
              <div className="mb-8 p-6 bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 rounded">
                <p className="text-lg italic text-slate-700 dark:text-slate-300 mb-3">
                  "{quote.text}"
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  — {quote.author}
                </p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <Label htmlFor="reflection" className="text-base mb-3 block">
                  Your Reflection
                </Label>
                <Textarea
                  id="reflection"
                  placeholder="How does this quote resonate with you? What can you learn from it today?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-64"
                />
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <Button
                  onClick={handleSave}
                  disabled={saving || !content.trim()}
                  className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-800"
                >
                  {saving ? "Saving..." : "Save Reflection"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-center gap-4">
          <Link href="/evening" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50">
            Evening Reflection →
          </Link>
        </div>
      </div>
    </div>
  );
}
