import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getDataSourceById } from "@/data/mockData";
import { 
  ArrowLeft, 
  Database, 
  Calendar,
  Users,
  Eye,
  Tag,
  Key,
  FileText,
  Clock,
  BarChart3,
  UserCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

const TableDetail = () => {
  const { dataSourceId, tableId } = useParams<{ dataSourceId: string; tableId: string }>();
  
  const dataSource = dataSourceId ? getDataSourceById(dataSourceId) : null;
  const table = dataSource?.tables.find(t => t.id === tableId);

  if (!dataSource || !table) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Table Not Found</h1>
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
      success: "High Quality",
      warning: "Medium Quality",
      error: "Low Quality"
    };

    return (
      <Badge className={styles[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'string': 'text-blue-600 bg-blue-50',
      'integer': 'text-green-600 bg-green-50',
      'decimal': 'text-purple-600 bg-purple-50',
      'timestamp': 'text-orange-600 bg-orange-50',
      'date': 'text-red-600 bg-red-50',
      'boolean': 'text-gray-600 bg-gray-50'
    };
    return colors[type] || 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-white/10 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Link to={`/data-source/${dataSourceId}`}>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {dataSource.name}
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Database className="h-6 w-6 text-blue-400" />
              <h1 className="text-xl font-bold text-white">{table.schema}.{table.name}</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="secondary" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Preview Data
            </Button>
            <Button variant="default" size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              Quality Report
            </Button>
          </div>
        </div>
      </header>

      <div className="flex p-6 gap-6">
        {/* Left Side - Metadata */}
        <div className="w-96 flex-shrink-0 space-y-6">
          {/* Table Info */}
          <Card className="sidebar-glass">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Table Details
                </CardTitle>
                {getStatusBadge(table.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Description
                </h4>
                <p className="text-sm text-muted-foreground">{table.description}</p>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Statistics  
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Records:</span>
                    <div className="font-medium">{table.records.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Columns:</span>
                    <div className="font-medium">{table.columns}</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date Range
                </h4>
                <div className="text-sm space-y-1">
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground">From:</span>
                    <span>{table.dateRange.from}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground">To:</span>
                    <span>{table.dateRange.to}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Last Updated
                </h4>
                <p className="text-sm">{table.lastUpdated}</p>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="sidebar-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Tags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {table.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Users */}
          <Card className="sidebar-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Frequent Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-3">
                {Array.from({ length: Math.min(5, table.frequentUsers) }).map((_, i) => (
                  <Avatar key={i} className="h-6 w-6">
                    <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                      {String.fromCharCode(65 + i)}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {table.frequentUsers > 5 && (
                  <div className="text-xs text-muted-foreground">
                    +{table.frequentUsers - 5} more
                  </div>
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                {table.frequentUsers} users access this table regularly
              </div>
            </CardContent>
          </Card>

          {/* Owners */}
          <Card className="sidebar-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                Owners
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {table.owners.map((owner, index) => (
                <div key={owner} className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs bg-orange-500 text-white">
                      {owner.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{owner}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Column Schema */}
        <div className="flex-1">
          <Card className="sidebar-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Columns ({table.tableColumns.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Column Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-center">Nullable</TableHead>
                    <TableHead className="text-center">Key</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {table.tableColumns.map((column) => (
                    <TableRow key={column.name}>
                      <TableCell>
                        <div className="font-medium text-blue-600">
                          {column.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary" 
                          className={cn("text-xs font-mono", getTypeColor(column.type))}
                        >
                          {column.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground">
                          {column.description}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {column.nullable ? (
                          <Badge variant="outline" className="text-xs">NULL</Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs bg-red-50 text-red-800">NOT NULL</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {column.isPrimaryKey && (
                          <Key className="h-4 w-4 text-yellow-600 mx-auto" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TableDetail;