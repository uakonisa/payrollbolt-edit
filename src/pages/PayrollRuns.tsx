import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  Plus,
  ChevronDown,
  FileCog,
  FileCheck,
  FileSpreadsheet,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  ArrowUpRight,
  Briefcase
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock payroll runs data
const payrollRunsData = [
  {
    id: 1,
    period: "April 2024",
    dateRange: "01/04/2024 - 30/04/2024",
    paymentDate: "25/04/2024",
    status: "In Progress",
    progress: 75,
    employees: 125,
    totalAmount: "R 1,456,789.45"
  },
  {
    id: 2,
    period: "March 2024",
    dateRange: "01/03/2024 - 31/03/2024",
    paymentDate: "25/03/2024",
    status: "Completed",
    progress: 100,
    employees: 123,
    totalAmount: "R 1,432,567.89"
  },
  {
    id: 3,
    period: "February 2024",
    dateRange: "01/02/2024 - 29/02/2024",
    paymentDate: "23/02/2024",
    status: "Completed",
    progress: 100,
    employees: 120,
    totalAmount: "R 1,410,345.67"
  },
  {
    id: 4,
    period: "January 2024",
    dateRange: "01/01/2024 - 31/01/2024",
    paymentDate: "25/01/2024",
    status: "Completed",
    progress: 100,
    employees: 118,
    totalAmount: "R 1,398,765.43"
  },
  {
    id: 5,
    period: "May 2024",
    dateRange: "01/05/2024 - 31/05/2024",
    paymentDate: "24/05/2024",
    status: "Scheduled",
    progress: 0,
    employees: 125,
    totalAmount: "R 0.00"
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "In Progress":
      return <Clock className="h-4 w-4 text-blue-500" />;
    case "Completed":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case "Scheduled":
      return <Calendar className="h-4 w-4 text-slate-500" />;
    case "Error":
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "In Progress":
      return "bg-blue-100 text-blue-800";
    case "Completed":
      return "bg-green-100 text-green-800";
    case "Scheduled":
      return "bg-slate-100 text-slate-800";
    case "Error":
      return "bg-red-100 text-red-800";
    default:
      return "bg-slate-100 text-slate-800";
  }
};

const PayrollRuns = () => {
  const [currentRun, setCurrentRun] = useState<typeof payrollRunsData[0] | null>(
    payrollRunsData.find(run => run.status === "In Progress") || null
  );

  // Current period is April 2024
  const currentPeriod = "April 2024";
  
  // Stages of payroll process
  const payrollStages = [
    { name: "Data Collection", complete: true },
    { name: "Payroll Calculation", complete: true },
    { name: "Review & Approval", complete: false },
    { name: "Payment Processing", complete: false },
    { name: "Tax & Statutory", complete: false },
  ];

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Payroll Runs</h1>
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm font-medium flex items-center">
            <Calendar className="h-4 w-4 mr-1" /> Current Period: {currentPeriod}
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Payroll Run
          </Button>
        </div>
      </div>

      {currentRun && currentRun.status === "In Progress" && (
        <Card className="mb-6 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Briefcase className="mr-2 h-5 w-5 text-blue-600" />
              Current Payroll Run: {currentRun.period}
            </CardTitle>
            <CardDescription>
              Payment Date: {currentRun.paymentDate} • {currentRun.employees} Employees
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <div className="font-medium">Overall Progress</div>
                  <div>{currentRun.progress}%</div>
                </div>
                <Progress value={currentRun.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                {payrollStages.map((stage, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg border ${
                      index < 2 
                        ? "border-green-200 bg-green-50" 
                        : index === 2 
                          ? "border-blue-200 bg-blue-50" 
                          : "border-slate-200 bg-white"
                    }`}
                  >
                    <div className="flex items-center mb-1">
                      {index < 2 ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5" />
                      ) : index === 2 ? (
                        <Clock className="h-4 w-4 text-blue-500 mr-1.5" />
                      ) : (
                        <Clock className="h-4 w-4 text-slate-300 mr-1.5" />
                      )}
                      <span className={`text-sm font-medium ${
                        index < 2 
                          ? "text-green-800" 
                          : index === 2 
                            ? "text-blue-800" 
                            : "text-slate-500"
                      }`}>
                        {stage.name}
                      </span>
                    </div>
                    <div className="text-xs pl-5.5">
                      {index < 2 ? (
                        <span className="text-green-600">Completed</span>
                      ) : index === 2 ? (
                        <span className="text-blue-600">In progress</span>
                      ) : (
                        <span className="text-slate-500">Pending</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-3">
                <Button variant="outline">View Details</Button>
                <Button>Continue Process</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Runs (YTD)</p>
                <h3 className="text-2xl font-bold">4</h3>
              </div>
              <div className="h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center">
                <FileCog className="h-6 w-6 text-slate-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-green-600">Completed Runs</p>
                <h3 className="text-2xl font-bold">3</h3>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <FileCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-green-600">
              <span>March, February, January</span>
              <span className="flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                100%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-blue-600">Current & Upcoming</p>
                <h3 className="text-2xl font-bold">2</h3>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FileSpreadsheet className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-blue-600">
              <span>April (In Progress), May (Scheduled)</span>
              <span className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                In progress
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Payroll Runs</CardTitle>
            <CardDescription>Manage and monitor all payroll processing cycles</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input 
                type="search" 
                placeholder="Search payroll runs..." 
                className="pl-8 w-[200px] lg:w-[300px]"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Period</TableHead>
                  <TableHead>Date Range</TableHead>
                  <TableHead>Payment Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Employees</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payrollRunsData.sort((a, b) => {
                  // Sort by date - most recent first
                  const dateA = new Date(a.paymentDate.split('/').reverse().join('-'));
                  const dateB = new Date(b.paymentDate.split('/').reverse().join('-'));
                  return dateB.getTime() - dateA.getTime();
                }).map((run) => (
                  <TableRow key={run.id}>
                    <TableCell className="font-medium">{run.period}</TableCell>
                    <TableCell>{run.dateRange}</TableCell>
                    <TableCell>{run.paymentDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Badge className={getStatusColor(run.status)} variant="outline">
                          <span className="flex items-center">
                            {getStatusIcon(run.status)}
                            <span className="ml-1">{run.status}</span>
                          </span>
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>{run.employees}</TableCell>
                    <TableCell>{run.totalAmount}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            Actions <ChevronDown className="ml-1 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>View Reports</DropdownMenuItem>
                          <DropdownMenuItem>Generate Payslips</DropdownMenuItem>
                          
                          {run.status === "In Progress" && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Continue Processing</DropdownMenuItem>
                              <DropdownMenuItem>Edit Run</DropdownMenuItem>
                            </>
                          )}
                          
                          {run.status === "Scheduled" && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Start Processing</DropdownMenuItem>
                              <DropdownMenuItem>Edit Schedule</DropdownMenuItem>
                            </>
                          )}
                          
                          {run.status === "Completed" && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>View Audit Log</DropdownMenuItem>
                              <DropdownMenuItem>Clone Run</DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default PayrollRuns;
