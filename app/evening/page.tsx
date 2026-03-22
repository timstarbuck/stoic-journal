"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getRandomQuote, saveJournalEntry, ensureAuthenticatedUser } from "@/app/actions";
import type { StoicQuote } from "@/db/schema";
import Link from "next/link";

export default function EveningReflection() {
  const [quote, setQuote] = useState<StoicQuote | null>(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const initPage = async () => {
      try {
        // Ensure authenticated user exists in database
        await ensureAuthenticatedUser();
        
        // Fetch a random evening quote
        const randomQuote = await getRandomQuote("evening");
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
      await saveJournalEntry("evening", content);
      setSuccess(true);
      setContent("");
      
      // Refresh the quote
      const newQuote = await getRandomQuote("evening");
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
      <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 dark:from-slate-950 dark:to-slate-950 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-slate-50"></div>
          <p className="mt-4 text-slate-300">Loading your evening reflection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 dark:from-slate-950 dark:to-slate-950 p-4">
      <div className="max-w-2xl mx-auto py-12">
        <div className="mb-8">
          <Link href="/dashboard" className="text-sm text-slate-400 hover:text-slate-50">
            ← Back to Dashboard
          </Link>
        </div>

        <Card className="border-0 shadow-lg bg-slate-800 dark:bg-slate-900 text-slate-50">
          <CardHeader className="bg-gradient-to-r from-indigo-900/40 to-blue-900/40">
            <CardTitle className="text-3xl text-center text-slate-50">
              Evening Reflection
            </CardTitle>
            <CardDescription className="text-center text-base mt-2 text-slate-300">
              Reflect on your day with philosophical wisdom
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-8">
            {error && (
              <div className="mb-6 p-4 bg-red-950/40 border border-red-800/30 text-red-400 rounded-md text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-950/40 border border-green-800/30 text-green-400 rounded-md text-sm">
                ✓ Your reflection has been saved
              </div>
            )}

            {quote && (
              <div className="mb-8 p-6 bg-slate-700/50 border-l-4 border-blue-400 rounded">
                <p className="text-lg italic text-slate-100 mb-3">
                  "{quote.text}"
                </p>
                <p className="text-sm text-slate-400">
                  — {quote.author}
                </p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <Label htmlFor="reflection" className="text-base mb-3 block text-slate-200">
                  Your Reflection
                </Label>
                <Textarea
                  id="reflection"
                  placeholder="How was your day? What did you learn? How can you apply this quote to tomorrow?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-64 bg-slate-700 border-slate-600 text-slate-50 placeholder:text-slate-400"
                />
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <Button
                  onClick={handleSave}
                  disabled={saving || !content.trim()}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                  {saving ? "Saving..." : "Save Reflection"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-center gap-4">
          <Link href="/morning" className="text-sm text-slate-400 hover:text-slate-50">
            ← Morning Reflection
          </Link>
        </div>
      </div>
    </div>
  );
}
