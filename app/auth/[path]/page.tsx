import { AuthView } from '@neondatabase/auth/react';
import { authViewPaths } from '@neondatabase/auth/react/ui/server';

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.values(authViewPaths).map((path) => ({ path }));
}

export default async function AuthPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;

  return (
    <main className="container mx-auto flex grow flex-col items-center justify-center gap-3 self-center p-4 md:p-6">
      <AuthView path={path} redirectTo="/dashboard" cardHeader={cardHeader()} />
    </main>
  );
}

const cardHeader = () => {
  return (
    <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6">
      <div className="font-semibold text-lg md:text-xl">Stoic Journal</div>
      <div className="text-muted-foreground text-xs md:text-sm">
        Enter your email below to login to your account or go{' '}
        <a href="/">home</a>.
      </div>
    </div>
  );
};
