import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Download,
  LineChart,
  FilePlus2,
  FileSpreadsheet,
  Building,
  Wallet,
  Calculator,
  ChevronRight,
  Calendar
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Reports = () => {
  // Mock report data
  const recentReports = [
    {
      id: 1,
      name: "Monthly Payroll Summary - April 2024",
      type: "Payroll",
      date: "15 Apr 2024",
      format: "PDF"
    },
    {
      id: 2,
      name: "EasyFile Export - Q1 2024",
      type: "Tax",
      date: "10 Apr 2024",
      format: "CSV"
    },
    {
      id: 3,
      name: "Bank Payment File - April 2024",
      type: "Banking",
      date: "03 Apr 2024",
      format: "ACB"
    }
  ];

  const reportCategories = [
    {
      id: "payroll",
      title: "Payroll Reports",
      icon: Wallet,
      reports: [
        "Monthly Payroll Summary",
        "Payroll Register",
        "Payslip Batch Report",
        "Earnings and Deductions Summary"
      ]
    },
    {
      id: "tax",
      title: "Tax Reports",
      icon: Calculator,
      reports: [
        "SARS EasyFile Export",
        "IRP5/IT3(a) Certificates",
        "PAYE Reconciliation",
        "Tax Deduction Summary"
      ]
    },
    {
      id: "banking",
      title: "Banking Reports",
      icon: Building,
      reports: [
        "Bank Payment File (CSV)",
        "ACB Tape Format",
        "Payment Reconciliation",
        "Bank Transaction Summary"
      ]
    },
    {
      id: "statutory",
      title: "Statutory Reports",
      icon: FileSpreadsheet,
      reports: [
        "UIF Declaration",
        "SDL Report",
        "Employment Equity Report",
        "COIDA Annual Return"
      ]
    }
  ];

  const getTypeColor = (type: string) => {
    switch(type) {
      case "Payroll":
        return "border-blue-200 bg-blue-50 text-blue-700";
      case "Tax":
        return "border-amber-200 bg-amber-50 text-amber-700";
      case "Banking":
        return "border-green-200 bg-green-50 text-green-700";
      default:
        return "border-slate-200 bg-slate-50 text-slate-700";
    }
  };

  const getFormatColor = (format: string) => {
    switch(format) {
      case "PDF":
        return "border-red-200 bg-red-50 text-red-700";
      case "CSV":
        return "border-green-200 bg-green-50 text-green-700";
      case "ACB":
        return "border-purple-200 bg-purple-50 text-purple-700";
      default:
        return "border-slate-200 bg-slate-50 text-slate-700";
    }
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Reports & Exports</h1>
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm font-medium flex items-center">
            <Calendar className="h-4 w-4 mr-1" /> Current Period: April 2024
          </div>
          <Button>
            <FilePlus2 className="mr-2 h-4 w-4" />
            Generate New Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="recent">
        <TabsList className="mb-6">
          <TabsTrigger value="recent">Recent Reports</TabsTrigger>
          <TabsTrigger value="categories">Report Categories</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="recent">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-6 w-6 text-blue-600" />
                  Generated Reports
                </CardTitle>
                <CardDescription>All reports generated in the last 30 days</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="text-3xl font-bold">18</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Download className="mr-2 h-6 w-6 text-blue-600" />
                  Exports
                </CardTitle>
                <CardDescription>Banking and tax exports for April 2024</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="text-3xl font-bold">6</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <LineChart className="mr-2 h-6 w-6 text-blue-600" />
                  Analytics Reports
                </CardTitle>
                <CardDescription>Data analysis and trends</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="text-3xl font-bold">5</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>Reports generated in the past 30 days</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Report Name</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Type</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Date Generated</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Format</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-slate-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentReports.map((report) => (
                      <tr key={report.id} className="border-b hover:bg-slate-50">
                        <td className="py-3 px-4 font-medium">{report.name}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className={getTypeColor(report.type)}>
                            {report.type}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">{report.date}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className={getFormatColor(report.format)}>
                            {report.format}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex justify-end space-x-2">
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                            <Button size="sm" variant="outline">
                              <FileText className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 text-center">
                <Button variant="outline">View All Reports</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reportCategories.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <category.icon className="mr-2 h-6 w-6 text-blue-600" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.reports.map((report, index) => (
                      <li key={index}>
                        <Button variant="ghost" className="w-full justify-between text-left">
                          {report}
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scheduled">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>Automatically generated reports on schedule</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex flex-col gap-4">
                <div className="border p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-lg">Monthly Payroll Summary</div>
                    <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
                      Monthly
                    </Badge>
                  </div>
                  <div className="mt-2 text-slate-600">
                    Generated on the last day of each month. Sent to finance@company.co.za
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-sm text-slate-500">Next run: 30 Apr 2024</div>
                    <Button size="sm" variant="outline">Configure</Button>
                  </div>
                </div>

                <div className="border p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-lg">EasyFile Export</div>
                    <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
                      Quarterly
                    </Badge>
                  </div>
                  <div className="mt-2 text-slate-600">
                    Generated at the end of each quarter. Saved to exports folder.
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-sm text-slate-500">Next run: 30 Jun 2024</div>
                    <Button size="sm" variant="outline">Configure</Button>
                  </div>
                </div>

                <div className="border p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-lg">Bank Payment File</div>
                    <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                      Monthly
                    </Badge>
                  </div>
                  <div className="mt-2 text-slate-600">
                    Generated on the 25th of each month. Saved to banking folder.
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-sm text-slate-500">Next run: 25 Apr 2024</div>
                    <Button size="sm" variant="outline">Configure</Button>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button>
                  <FilePlus2 className="mr-2 h-4 w-4" />
                  Schedule New Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Reports;
