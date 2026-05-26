import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export default function Badge({ children, color, className }: BadgeProps) {
  return (
    <span
      className={cn("inline-flex items-center px-2 py-0.5 rounded text-xs font-medium", className)}
      style={{
        fontFamily: "var(--font-mono)",
        background: color ? `${color}22` : "rgba(255,255,255,0.06)",
        color: color ?? "var(--text-dim)",
        border: `1px solid ${color ? `${color}44` : "var(--border)"}`,
      }}
    >
      {children}
    </span>
  );
}
