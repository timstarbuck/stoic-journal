import { ReflectionPage } from '@/components/ReflectionPage';
import { morningTheme } from '@/lib/theme/reflectionThemes';

export default function MorningReflection() {
  return <ReflectionPage theme={morningTheme} otherRouteLink="/evening" otherRouteLabel="Evening Reflection" />;
}
