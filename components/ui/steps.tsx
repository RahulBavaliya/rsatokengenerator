import { cn } from "@/lib/utils";

interface Step {
  title: string;
  description: string;
}

interface StepsProps {
  steps: Step[];
  className?: string;
}

export function Steps({ steps, className }: StepsProps) {
  return (
    <div className={cn("space-y-8", className)}>
      {steps.map((step, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 bg-background">
              <span className="text-sm font-medium">{index + 1}</span>
            </div>
            {index !== steps.length - 1 && (
              <div className="h-full w-px bg-border" />
            )}
          </div>
          <div className="space-y-1 pt-1">
            <h3 className="font-medium leading-none">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}