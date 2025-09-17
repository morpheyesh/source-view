import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: number;
  change: number;
  icon: React.ReactNode;
  color: 'green' | 'orange' | 'blue' | 'purple' | 'red';
}

const MetricCard = ({ title, value, change, icon, color }: MetricCardProps) => {
  const getTrendIcon = () => {
    if (change > 0) return <TrendingUp className="w-3 h-3" />;
    if (change < 0) return <TrendingDown className="w-3 h-3" />;
    return <Minus className="w-3 h-3" />;
  };

  const getTrendColor = () => {
    if (change > 0) return "text-green-600";
    if (change < 0) return "text-red-600";
    return "text-gray-500";
  };

  const getIconColor = () => {
    switch (color) {
      case 'green': return 'text-green-600';
      case 'orange': return 'text-orange-600';
      case 'blue': return 'text-blue-600';
      case 'purple': return 'text-purple-600';
      case 'red': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card className="metric-card">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className={cn("w-4 h-4", getIconColor())}>
            {icon}
          </div>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl font-bold text-foreground">
              {value.toFixed(1)}%
            </div>
            <div className={cn("flex items-center gap-1 text-xs", getTrendColor())}>
              {getTrendIcon()}
              <span>
                {change === 0 ? "No change" : `${Math.abs(change).toFixed(1)}% from yesterday`}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;