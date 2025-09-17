import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface AlertBannerProps {
  message: string;
  count: number;
}

const AlertBanner = ({ message, count }: AlertBannerProps) => {
  return (
    <Alert className="bg-red-50 border-red-200 text-red-800 mb-6">
      <AlertTriangle className="h-4 w-4 text-red-600" />
      <AlertDescription className="font-medium">
        <span className="font-bold">{count}</span> {message}
      </AlertDescription>
    </Alert>
  );
};

export default AlertBanner;