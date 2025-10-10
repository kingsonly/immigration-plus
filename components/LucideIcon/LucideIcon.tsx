// components/LucideIcon.tsx
import * as LucideIcons from 'lucide-react';

function normalizeIconName(input: string | undefined): string | undefined {
  if (!input) return undefined;
  if ((LucideIcons as any)[input]) return input;
  const pascal = input
    .replace(/[-_\s]+/g, ' ')
    .split(' ')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
  if ((LucideIcons as any)[pascal]) return pascal;
  const cap = input.charAt(0).toUpperCase() + input.slice(1);
  if ((LucideIcons as any)[cap]) return cap;
  return undefined;
}
type LucideIconName = keyof typeof LucideIcons | string;

interface LucideIconProps extends ComponentProps<'svg'> {
    name: LucideIconName;
    className?: string;
    size?: number;
}

export const LucideIcon = ({ name, className, size = 24, ...props }: LucideIconProps) => {
  const resolved = normalizeIconName(name as string);
  const Icon = resolved ? (LucideIcons as any)[resolved] : undefined;

  if (
    typeof Icon === 'function' ||
    (typeof Icon === 'object' && Icon && 'displayName' in Icon)
  ) {
    const SafeIcon = Icon as React.FC<ComponentProps<'svg'>>;
    return <SafeIcon className={className} width={size} height={size} {...props} />;
  }

  if (process.env.NODE_ENV !== 'production') {
    console.warn(`Lucide icon "${name}" not found. Tried: ${String(name)} -> ${resolved ?? 'n/a'}`);
  }
  return null;
};

