// lib/icons.ts
import {
  ArrowRight,
  BookOpen,
  Calculator,
  CheckCircle,
  Clock,
  FileText,
  Info,
  Lightbulb,
  Mail,
} from "lucide-react";

export const ICONS = {
  ArrowRight,
  BookOpen,
  Calculator,
  CheckCircle,
  Clock,
  FileText,
  Info,
  Lightbulb,
  Mail,
} as const;

export type IconName = keyof typeof ICONS;

export function getIcon(name?: string | null) {
  if (!name) return null;
  return (ICONS as any)[name] ?? null;
}
