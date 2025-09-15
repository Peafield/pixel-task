import { cn } from "@/lib/utils";

type ContentContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ContentContainer({
  children,
  className,
}: ContentContainerProps) {
  return (
    <main
      className={cn("container mx-auto px-4 py-8", {
        [className as string]: !!className,
      })}
    >
      {children}
    </main>
  );
}
