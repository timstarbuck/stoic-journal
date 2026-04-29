import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import ReasonsCarousel from '@/components/ReasonsCarousel';
import { auth } from '@/lib/auth/server';

export const dynamic = 'force-dynamic';

async function isUserLoggedIn() {
  const { data: session } = await auth.getSession();
  return !!session?.user;
}

export default async function Home() {
  //const { data: session } = await auth.getSession();
  const isLoggedIn = await isUserLoggedIn();

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
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

        <ReasonsCarousel />

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
          <Card className="border-0 shadow bg-linear-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900">
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

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            Ready to begin your journey?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            Start your daily reflections today and discover the power of Stoic
            wisdom.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isLoggedIn ? (
              <Link href="/dashboard">
                <Button size="lg" className="w-full sm:w-auto">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/auth/sign-in">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/sign-up">
                  <Button size="lg" className="w-full sm:w-auto">
                    Create Account
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
