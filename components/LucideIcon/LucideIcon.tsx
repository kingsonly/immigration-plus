// components/LucideIcon.tsx
import * as LucideIcons from 'lucide-react';
import { ComponentProps } from 'react';

type LucideIconName = keyof typeof LucideIcons;

interface LucideIconProps extends ComponentProps<'svg'> {
    name: LucideIconName;
    className?: string;
    size?: number;
}

export const LucideIcon = ({ name, className, size = 24, ...props }: LucideIconProps) => {
    const Icon = LucideIcons[name];

    // ✅ Only render if it's a valid React component
    if (
        typeof Icon === 'function' ||
        (typeof Icon === 'object' && 'displayName' in Icon)
    ) {
        const SafeIcon = Icon as React.FC<ComponentProps<'svg'>>;
        return <SafeIcon className={className} width={size} height={size} {...props} />;
    }

    console.warn(`Lucide icon "${name}" is not a valid React component.`);
    return null;
};
