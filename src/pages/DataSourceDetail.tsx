import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import MetricCard from "@/components/MetricCard";
import { getDataSourceById } from "@/data/mockData";
import { 
  ArrowLeft, 
  Database, 
  Activity, 
  CheckCircle, 
  Clock, 
  Target, 
  Shield, 
  Users,
  Zap,
  Calendar,
  BarChart3,
  RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";

const DataSourceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dataSource = id ? getDataSourceById(id) : null;

  if (!dataSource) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Data Source Not Found</h1>
          <Link to="/">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: 'success' | 'warning' | 'error') => {
    const styles = {
      success: "bg-green-100 text-green-800 hover:bg-green-200",
      warning: "bg-orange-100 text-orange-800 hover:bg-orange-200", 
      error: "bg-red-100 text-red-800 hover:bg-red-200"
    };

    const labels = {
      success: "Healthy",
      warning: "Warning",
      error: "Critical"
    };

    return (
      <Badge className={styles[status]}>
        {labels[status]}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-white/10 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-red-500" />
              <h1 className="text-xl font-bold text-white">DQM | {dataSource.name}</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="secondary" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
            <Button variant="default" size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              View Reports
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Data Source Overview */}
        <Card className="sidebar-glass">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-6 w-6" />
                  {dataSource.name}
                </CardTitle>
                <p className="text-muted-foreground mt-1">{dataSource.description}</p>
              </div>
              {getStatusBadge(dataSource.status)}
            </div>
          </CardHeader>
        </Card>

        {/* Data Quality Metrics */}
        <Card className="sidebar-glass">
          <CardHeader>
            <CardTitle>Data Quality Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <MetricCard
                title="Accuracy"
                value={dataSource.metrics.accuracy}
                change={2.1}
                icon={<Target />}
                color="green"
              />
              <MetricCard
                title="Completeness"
                value={dataSource.metrics.completeness}
                change={-1.3}
                icon={<CheckCircle />}
                color="orange"
              />
              <MetricCard
                title="Consistency"
                value={dataSource.metrics.consistency}
                change={0}
                icon={<Shield />}
                color="blue"
              />
              <MetricCard
                title="Timeliness"
                value={dataSource.metrics.timeliness}
                change={-0.5}
                icon={<Clock />}
                color="red"
              />
              <MetricCard
                title="Validity"
                value={dataSource.metrics.validity}
                change={1.8}
                icon={<Activity />}
                color="green"
              />
              <MetricCard
                title="Uniqueness"
                value={dataSource.metrics.uniqueness}
                change={-0.3}
                icon={<Users />}
                color="purple"
              />
            </div>
          </CardContent>
        </Card>

        {/* Tables Overview */}
        <Card className="sidebar-glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Tables ({dataSource.tables.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Table Name</TableHead>
                  <TableHead className="text-center">Records</TableHead>
                  <TableHead className="text-center">Columns</TableHead>
                  <TableHead className="text-center">Last Updated</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataSource.tables.map((table) => (
                  <TableRow key={table.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell>
                      <div className="font-medium">{table.name}</div>
                      <div className="text-sm text-muted-foreground">ID: {table.id}</div>
                    </TableCell>
                    <TableCell className="text-center">
                      {table.records.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center">
                      {table.columns}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span className="text-sm">{table.lastUpdated}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <div className={cn(
                          "status-indicator",
                          table.status === 'success' && "status-success",
                          table.status === 'warning' && "status-warning", 
                          table.status === 'error' && "status-error"
                        )} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Data Quality Trend */}
        <Card className="sidebar-glass">
          <CardHeader>
            <CardTitle>Data Quality Trend (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Historical trend chart would be rendered here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataSourceDetail;