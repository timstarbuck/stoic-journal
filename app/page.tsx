import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            Stoic Journal
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
            Daily reflections guided by timeless Stoic wisdom
          </p>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Begin your day with inspiration and end it with reflection. Let
            ancient philosophical wisdom guide your modern life.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Link href="/morning" className="block">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full border-0 shadow-lg bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
              <CardHeader className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-950/30 dark:to-orange-950/30">
                <CardTitle className="text-3xl">🌅</CardTitle>
                <CardTitle className="text-2xl mt-2">
                  Morning Reflection
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Start your day with a Stoic quote and set your intentions for
                  what lies ahead.
                </p>
                <Button className="w-full bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-800 text-white">
                  Begin Morning Reflection
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/evening" className="block">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full border-0 shadow-lg bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-900 dark:to-slate-950 text-slate-50">
              <CardHeader className="bg-gradient-to-r from-indigo-900/40 to-blue-900/40">
                <CardTitle className="text-3xl">🌙</CardTitle>
                <CardTitle className="text-2xl mt-2">
                  Evening Reflection
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-slate-300 mb-6">
                  Reflect on your day with philosophical wisdom and prepare for
                  tomorrow.
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white">
                  Begin Evening Reflection
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="text-center mb-12">
          <Link href="/dashboard">
            <Button variant="outline" size="lg" className="text-base px-8">
              View Your Journal
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow bg-white dark:bg-slate-800">
            <CardHeader>
              <CardTitle className="text-xl">📖 Guided Reflections</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400">
                Each session begins with an authentic Stoic quote to inspire
                your thoughts and guide your reflection.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow bg-white dark:bg-slate-800">
            <CardHeader>
              <CardTitle className="text-xl">💾 Persistent Memory</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400">
                All your reflections are saved and organized by date. Watch your
                growth unfold over time.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow bg-white dark:bg-slate-800">
            <CardHeader>
              <CardTitle className="text-xl">⚡ Simple & Fast</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400">
                A minimal, distraction-free interface designed for thoughtful
                reflection and deep thinking.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stoicism Section */}
        <div className="mt-16 text-center">
          <Card className="border-0 shadow bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900">
            <CardContent className="pt-8 pb-8">
              <p className="text-lg italic text-slate-700 dark:text-slate-300 mb-4">
                "The happiness of your life depends upon the quality of your
                thoughts." — Marcus Aurelius
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Stoicism teaches us that we cannot control external events, but
                we can always control our response to them. Daily reflection is
                the practice that makes this wisdom actionable.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
