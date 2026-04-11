export function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getReadTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  const mins = Math.max(1, Math.ceil(words / 200));
  return `${mins} min read`;
}

import {
  BookOpen,
  BriefcaseBusiness,
  HeartPulse,
  Leaf,
  Plane,
} from "lucide-react";

export const categoryIcons = {
  Technology: BookOpen,
  Health: HeartPulse,
  Lifestyle: Leaf,
  Education: BriefcaseBusiness,
  Travel: Plane,
} as const;

export const categoryGradients: Record<string, string> = {
  Technology: "from-blue-100 via-blue-50 to-white",
  Health: "from-rose-100 via-rose-50 to-white",
  Lifestyle: "from-emerald-100 via-emerald-50 to-white",
  Education: "from-amber-100 via-amber-50 to-white",
  Travel: "from-sky-100 via-sky-50 to-white",
};

export const categoryTextColors: Record<string, string> = {
  Technology: "text-blue-700",
  Health: "text-rose-700",
  Lifestyle: "text-emerald-700",
  Education: "text-amber-700",
  Travel: "text-sky-700",
};

export const categoryBgColors: Record<string, string> = {
  Technology: "bg-blue-100 text-blue-700",
  Health: "bg-rose-100 text-rose-700",
  Lifestyle: "bg-emerald-100 text-emerald-700",
  Education: "bg-amber-100 text-amber-700",
  Travel: "bg-sky-100 text-sky-700",
};

export const categoryGradientsHome: Record<string, string> = {
  Technology: "bg-[linear-gradient(180deg,_#e8f0ff,_#d0e4ff_55%,_#c4d9f5_100%)]",
  Health: "bg-[linear-gradient(180deg,_#ffe8f0,_#ffd0dd_55%,_#ffc5d3_100%)]",
  Lifestyle: "bg-[linear-gradient(180deg,_#f0ffe8,_#d9f5d0_55%,_#c8ecc0_100%)]",
  Education: "bg-[linear-gradient(180deg,_#fff8e8,_#ffecc0_55%,_#ffe3ad_100%)]",
  Travel: "bg-[linear-gradient(180deg,_#f0f8ff,_#d8ecff_55%,_#c8e0f8_100%)]",
};

export const revealUp = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

export const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -8,
    scale: 1.01,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
  },
};
