// app/components/ErrorDisplay.tsx
import { AlertTriangle } from "lucide-react";

interface ErrorDisplayProps {
  title?: string;
  message: string;
}

export const ErrorDisplay = ({
  title = "An Error Occurred",
  message,
}: ErrorDisplayProps) => {
  return (
    <div className="container mx-auto py-10 flex flex-col items-center justify-center text-center">
      <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
      <h1 className="text-2xl font-bold text-destructive">{title}</h1>
      <p className="text-muted-foreground mt-2">{message}</p>
    </div>
  );
};
