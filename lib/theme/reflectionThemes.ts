export type ReflectionTheme = {
  type: 'morning' | 'evening';
  title: string;
  subtitle: string;
  bgGradient: string;
  headerGradient: string;
  cardBg: string;
  quoteBackground: string;
  quoteBorder: string;
  buttonColor: string;
  textareaClass: string;
  linkColors: string;
  successBg: string;
  errorBg: string;
  loadingBg: string;
  loadingSpinner: string;
  placeholder: string;
};

export const morningTheme: ReflectionTheme = {
  type: 'morning',
  title: 'Morning Reflection',
  subtitle: 'Begin your day with Stoic wisdom',
  bgGradient: 'bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900',
  headerGradient: 'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20',
  cardBg: 'border-0 shadow-lg',
  quoteBackground: 'bg-amber-50 dark:bg-amber-950/20',
  quoteBorder: 'border-l-4 border-amber-500',
  buttonColor: 'bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-800',
  textareaClass: 'min-h-64',
  linkColors: 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50',
  successBg: 'bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 text-green-600 dark:text-green-400',
  errorBg: 'bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-400',
  loadingBg: 'bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900',
  loadingSpinner: 'border-b-2 border-slate-900 dark:border-slate-50',
  placeholder: 'How does this quote resonate with you? What can you learn from it today?',
};

export const eveningTheme: ReflectionTheme = {
  type: 'evening',
  title: 'Evening Reflection',
  subtitle: 'Reflect on your day with philosophical wisdom',
  bgGradient: 'bg-gradient-to-b from-slate-800 to-slate-900 dark:from-slate-950 dark:to-slate-950',
  headerGradient: 'bg-gradient-to-r from-indigo-900/40 to-blue-900/40',
  cardBg: 'border-0 shadow-lg bg-slate-800 dark:bg-slate-900 text-slate-50',
  quoteBackground: 'bg-slate-700/50',
  quoteBorder: 'border-l-4 border-blue-400',
  buttonColor: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800',
  textareaClass: 'min-h-64 bg-slate-700 border-slate-600 text-slate-50 placeholder:text-slate-400',
  linkColors: 'text-slate-400 hover:text-slate-50',
  successBg: 'bg-green-950/40 border border-green-800/30 text-green-400',
  errorBg: 'bg-red-950/40 border border-red-800/30 text-red-400',
  loadingBg: 'bg-gradient-to-b from-slate-800 to-slate-900 dark:from-slate-950 dark:to-slate-950',
  loadingSpinner: 'border-b-2 border-slate-50',
  placeholder: 'How was your day? What did you learn? How can you apply this quote to tomorrow?',
};
