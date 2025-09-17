import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DataSourceItem from "@/components/DataSourceItem";
import MetricCard from "@/components/MetricCard";
import AlertBanner from "@/components/AlertBanner";
import { mockDataSources } from "@/data/mockData";
import { 
  Activity, 
  CheckCircle, 
  Clock, 
  Target, 
  Shield, 
  Users,
  Zap,
  TrendingUp,
  Download,
  Settings
} from "lucide-react";

const Index = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h");
  const [selectedDataSource, setSelectedDataSource] = useState("opec-data");
  
  const currentSource = mockDataSources.find(source => source.id === selectedDataSource) || mockDataSources[8];
  const alertCount = mockDataSources.filter(source => source.status === 'error' || source.status === 'warning').length;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-white/10 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-red-500" />
              <h1 className="text-xl font-bold text-white">DQM | Oil & Gas Trading</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger className="w-32 bg-white/20 border-white/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="secondary" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            
            <Button variant="default" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Configure Rules
            </Button>
          </div>
        </div>
      </header>

      {/* Alert Banner */}
      <div className="px-6 pt-6">
        <AlertBanner 
          message="data sources showing completeness issues - Requires immediate attention"
          count={alertCount}
        />
      </div>

      {/* Main Content */}
      <div className="flex gap-6 p-6">
        {/* Sidebar - Data Sources */}
        <div className="w-80 flex-shrink-0">
          <Card className="sidebar-glass h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Data Sources ({mockDataSources.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockDataSources.map((source) => (
                <DataSourceItem
                  key={source.id}
                  id={source.id}
                  name={source.name}
                  status={source.status}
                  isSelected={source.id === selectedDataSource}
                />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard */}
        <div className="flex-1 space-y-6">
          {/* Data Quality Overview */}
          <Card className="sidebar-glass">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{currentSource.name} - Data Quality Overview</CardTitle>
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Dimensions</SelectItem>
                    <SelectItem value="accuracy">Accuracy</SelectItem>
                    <SelectItem value="completeness">Completeness</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <MetricCard
                  title="Accuracy"
                  value={currentSource.metrics.accuracy}
                  change={2.1}
                  icon={<Target />}
                  color="green"
                />
                <MetricCard
                  title="Completeness"
                  value={currentSource.metrics.completeness}
                  change={-1.3}
                  icon={<CheckCircle />}
                  color="orange"
                />
                <MetricCard
                  title="Consistency"
                  value={currentSource.metrics.consistency}
                  change={0}
                  icon={<Shield />}
                  color="blue"
                />
                <MetricCard
                  title="Timeliness"
                  value={currentSource.metrics.timeliness}
                  change={-0.5}
                  icon={<Clock />}
                  color="red"
                />
                <MetricCard
                  title="Validity"
                  value={currentSource.metrics.validity}
                  change={1.8}
                  icon={<Activity />}
                  color="green"
                />
                <MetricCard
                  title="Uniqueness"
                  value={currentSource.metrics.uniqueness}
                  change={-0.3}
                  icon={<Users />}
                  color="purple"
                />
              </div>
            </CardContent>
          </Card>

          {/* DQ Metrics Visualization */}
          <Card className="sidebar-glass">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  DQ Metrics Visualization
                </CardTitle>
                <Select defaultValue="trend">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trend">Trend Analysis</SelectItem>
                    <SelectItem value="comparison">Comparison</SelectItem>
                    <SelectItem value="distribution">Distribution</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Interactive charts would be rendered here</p>
              </div>
            </CardContent>
          </Card>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="sidebar-glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <Activity className="h-5 w-5" />
                  Active Issues (3)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="status-indicator status-error" />
                  <span>Missing price data for WTI crude</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="status-indicator status-warning" />
                  <span>Timestamp format inconsistency</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="status-indicator status-warning" />
                  <span>Duplicate trading records</span>
                </div>
              </CardContent>
            </Card>

            <Card className="sidebar-glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Business Rules Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Price range validation</span>
                  <div className="status-indicator status-success" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Trading hours check</span>
                  <div className="status-indicator status-success" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Currency format validation</span>
                  <div className="status-indicator status-warning" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
