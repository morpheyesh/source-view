import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface DataSourceItemProps {
  id: string;
  name: string;
  status: 'success' | 'warning' | 'error';
  isSelected?: boolean;
}

const DataSourceItem = ({ id, name, status, isSelected }: DataSourceItemProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/data-source/${id}`);
  };

  return (
    <Card 
      className={cn(
        "p-4 cursor-pointer transition-all duration-200 hover:shadow-md border-l-4",
        "bg-white/95 backdrop-blur-sm",
        isSelected && "border-primary shadow-md",
        status === 'success' && "border-l-green-500",
        status === 'warning' && "border-l-orange-500", 
        status === 'error' && "border-l-red-500"
      )}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium text-sm text-foreground">{name}</span>
        <div className={cn("status-indicator", `status-${status}`)} />
      </div>
    </Card>
  );
};

export default DataSourceItem;