'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { useReflection } from '@/lib/hooks/useReflection';
import type { ReflectionTheme } from '@/lib/theme/reflectionThemes';

interface ReflectionPageProps {
  theme: ReflectionTheme;
  otherRouteLink: string;
  otherRouteLabel: string;
}

export function ReflectionPage({
  theme,
  otherRouteLink,
  otherRouteLabel,
}: ReflectionPageProps) {
  const {
    quote,
    content,
    positiveReflection,
    loading,
    saving,
    error,
    success,
    setContent,
    setPositiveReflection,
    handleSave,
  } = useReflection(theme.type);

  const isOtherRouteMorning = otherRouteLabel === 'Morning Reflection';

  if (loading) {
    return (
      <div
        className={`min-h-screen ${theme.loadingBg} flex items-center justify-center p-4`}
      >
        <div className="text-center">
          <div
            className={`inline-block animate-spin rounded-full h-8 w-8 ${theme.loadingSpinner}`}
          ></div>
          <p
            className={`mt-4 ${theme.type === 'morning' ? 'text-slate-600 dark:text-slate-300' : 'text-slate-300'}`}
          >
            Loading your {theme.type} reflection...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme.bgGradient} p-4`}>
      <div className="max-w-2xl mx-auto py-12">
        <div className="mb-8">
          <Link href="/dashboard" className={`text-sm ${theme.linkColors}`}>
            ← Back to Dashboard
          </Link>
        </div>

        <Card className={theme.cardBg}>
          <CardHeader className={`${theme.headerGradient} rounded-t-lg`}>
            <CardTitle
              className={`text-3xl text-center ${theme.type === 'morning' ? 'text-slate-900 dark:text-slate-50' : 'text-slate-50'}`}
            >
              {theme.title}
            </CardTitle>
            <CardDescription
              className={`text-center text-base mt-2 ${theme.type === 'morning' ? '' : 'text-slate-300'}`}
            >
              {theme.subtitle}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-8">
            {error && (
              <div className={`mb-6 p-4 ${theme.errorBg} rounded-md text-sm`}>
                {error}
              </div>
            )}

            {success && (
              <div className={`mb-6 p-4 ${theme.successBg} rounded-md text-sm`}>
                ✓ Your reflection has been saved
              </div>
            )}

            {quote && (
              <div
                className={`mb-8 p-6 ${theme.quoteBackground} ${theme.quoteBorder} rounded`}
              >
                <p
                  className={`text-lg italic ${theme.type === 'morning' ? 'text-slate-700 dark:text-slate-300' : 'text-slate-100'} mb-3`}
                >
                  "{quote.text}"
                </p>
                <p
                  className={`text-sm ${theme.type === 'morning' ? 'text-slate-600 dark:text-slate-400' : 'text-slate-400'}`}
                >
                  — {quote.author}
                </p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="positive"
                  className={`text-base mb-3 block ${theme.type === 'morning' ? '' : 'text-slate-200'}`}
                >
                  {theme.type === 'morning' ? 'What am I grateful for today' : 'What did I do well today'}
                </Label>
                <Textarea
                  id="positive"
                  placeholder={theme.placeholder}
                  value={positiveReflection}
                  onChange={(e) => setPositiveReflection(e.target.value)}
                  className={theme.textareaClass}
                />
              </div>

              <div>
                <Label
                  htmlFor="reflection"
                  className={`text-base mb-3 block ${theme.type === 'morning' ? '' : 'text-slate-200'}`}
                >
                  {theme.type === 'morning' ? 'What is my intention for the day' : 'What could I have done better today'}
                </Label>
                <Textarea
                  id="reflection"
                  placeholder={theme.placeholder}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className={theme.textareaClass}
                />
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <Button
                  onClick={handleSave}
                  disabled={saving || !content.trim()}
                  className={theme.buttonColor}
                >
                  {saving ? 'Saving...' : 'Save Reflection'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-center gap-4">
          <Link href={otherRouteLink} className={`text-sm ${theme.linkColors}`}>
            {isOtherRouteMorning ? '← ' : ''}
            {otherRouteLabel}
            {!isOtherRouteMorning ? ' →' : ''}
          </Link>
        </div>
      </div>
    </div>
  );
}
