import { ReflectionPage } from '@/components/ReflectionPage';
import { eveningTheme } from '@/lib/theme/reflectionThemes';

export default function EveningReflection() {
  return (
    <ReflectionPage
      theme={eveningTheme}
      otherRouteLink="/morning"
      otherRouteLabel="Morning Reflection"
    />
  );
}
