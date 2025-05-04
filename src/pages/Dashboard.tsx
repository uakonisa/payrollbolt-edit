import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Calendar, 
  User, 
  FileText, 
  AlertTriangle, 
  CheckCircle,
  DollarSign,
  Clock,
  Users,
  ArrowUpRight
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { AppLayout } from "@/components/layout/AppLayout";
import { PayrollSummaryChart } from "@/components/dashboard/PayrollSummaryChart";
import { RecentPayslips } from "@/components/dashboard/RecentPayslips";
import { UpcomingPaymentsList } from "@/components/dashboard/UpcomingPaymentsList";
import { PayrollTrends } from "@/components/dashboard/PayrollTrends";

const Dashboard = () => {
  // Mock data for dashboard
  const summaryData = {
    totalEmployees: 125,
    totalPayroll: "R 1,456,789.45",
    pendingApprovals: 3,
    taxSubmissions: 1,
    payrollCompletionPercentage: 75
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm font-medium flex items-center">
            <Calendar className="h-4 w-4 mr-1" /> Current Period: April 2024
          </div>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            New Payroll Run
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-blue-800">Total Employees</p>
                <h3 className="text-2xl font-bold">{summaryData.totalEmployees}</h3>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-blue-700">
              <span>+3 this month</span>
              <span className="flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                2.4%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-green-800">Total Payroll</p>
                <h3 className="text-2xl font-bold">{summaryData.totalPayroll}</h3>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-green-700">
              <span>For April 2024</span>
              <span className="flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                3.1%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-amber-800">Pending Approvals</p>
                <h3 className="text-2xl font-bold">{summaryData.pendingApprovals}</h3>
              </div>
              <Clock className="h-8 w-8 text-amber-600" />
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-amber-700">
              <span>Action required</span>
              <Button variant="link" size="sm" className="p-0 h-auto text-amber-700">
                View all
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-purple-800">Tax Submissions</p>
                <h3 className="text-2xl font-bold">{summaryData.taxSubmissions}</h3>
              </div>
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-purple-700">
              <span>Due in 7 days</span>
              <Button variant="link" size="sm" className="p-0 h-auto text-purple-700">
                Prepare
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Payroll Summary</CardTitle>
            <CardDescription>Monthly breakdown of payroll expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <PayrollSummaryChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Payroll Progress</CardTitle>
            <CardDescription>Current month completion status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm font-medium">{summaryData.payrollCompletionPercentage}%</span>
                </div>
                <Progress value={summaryData.payrollCompletionPercentage} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Data collection completed</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Payroll calculation completed</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-amber-500 mr-2" />
                  <span className="text-sm">Approval in progress</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-slate-300 mr-2" />
                  <span className="text-sm text-slate-500">Payment processing</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-slate-300 mr-2" />
                  <span className="text-sm text-slate-500">Statutory submissions</span>
                </div>
              </div>

              <Button className="w-full">
                Continue Process
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <PayrollTrends />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="payslips">
            <TabsList className="mb-4">
              <TabsTrigger value="payslips">Recent Payslips</TabsTrigger>
              <TabsTrigger value="issues">Issues & Alerts</TabsTrigger>
            </TabsList>
            <TabsContent value="payslips">
              <Card>
                <CardContent className="p-0">
                  <RecentPayslips />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="issues">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start p-3 bg-red-50 border border-red-100 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium text-red-800">SARS Submission Error</p>
                        <p className="text-sm text-red-600">EasyFile export failed for 2 employees due to invalid ID numbers.</p>
                      </div>
                    </div>
                    <div className="flex items-start p-3 bg-amber-50 border border-amber-100 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium text-amber-800">Medical Aid Deduction Warning</p>
                        <p className="text-sm text-amber-600">3 employees have medical aid deductions that exceed the SARS threshold.</p>
                      </div>
                    </div>
                    <div className="flex items-start p-3 bg-blue-50 border border-blue-100 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-800">Tax Table Update Available</p>
                        <p className="text-sm text-blue-600">New tax tables for 2024/2025 are available for import.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Payments</CardTitle>
            <CardDescription>Due within next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <UpcomingPaymentsList />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
