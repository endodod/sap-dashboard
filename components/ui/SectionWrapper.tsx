import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id: string;
  number?: string;
  children: React.ReactNode;
  className?: string;
}

export default function SectionWrapper({ id, children, className }: SectionWrapperProps) {
  return (
    <>
      <hr className="section-divider" />
      <section
        id={id}
        className={cn("py-16 px-6 md:px-12 lg:px-20", className)}
      >
        {children}
      </section>
    </>
  );
}
