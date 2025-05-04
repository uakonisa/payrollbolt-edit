import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  CreditCard,
  FileText,
  Download,
  ChevronsUpDown,
  Clock,
  CheckCircle2,
  X,
  AlertTriangle,
  ChevronDown,
  Search,
  Filter,
  Building,
  UserCheck,
  CircleDollarSign
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Mock payment data
const paymentsData = [
  {
    id: 1,
    reference: "PAY-APR2024-01",
    description: "April 2024 Salaries",
    date: "25/04/2024",
    amount: "R 1,456,789.45",
    status: "Pending Approval",
    approvalStage: "Finance Director",
    type: "Salary"
  },
  {
    id: 2,
    reference: "TAX-APR2024-01",
    description: "SARS PAYE - April 2024",
    date: "24/04/2024",
    amount: "R 364,197.38",
    status: "Approved",
    approvalStage: "Completed",
    type: "Tax"
  },
  {
    id: 3,
    reference: "UIF-APR2024-01",
    description: "UIF Contribution - April 2024",
    date: "24/04/2024",
    amount: "R 14,567.89",
    status: "Approved",
    approvalStage: "Completed",
    type: "Statutory"
  },
  {
    id: 4,
    reference: "MED-APR2024-01",
    description: "Medical Aid - April 2024",
    date: "28/04/2024",
    amount: "R 87,456.32",
    status: "Scheduled",
    approvalStage: "N/A",
    type: "Third Party"
  },
  {
    id: 5,
    reference: "PAY-MAR2024-01",
    description: "March 2024 Salaries",
    date: "25/03/2024",
    amount: "R 1,432,567.89",
    status: "Completed",
    approvalStage: "Completed",
    type: "Salary"
  }
];

// Mock approvers data
const approversData = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Payroll Manager",
    status: "Approved",
    date: "15/04/2024",
    avatarInitials: "SJ"
  },
  {
    id: 2,
    name: "Michael Naidoo",
    role: "Finance Director",
    status: "Pending",
    date: "-",
    avatarInitials: "MN"
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Pending Approval":
      return <Clock className="h-4 w-4 text-amber-500" />;
    case "Approved":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case "Rejected":
      return <X className="h-4 w-4 text-red-500" />;
    case "Scheduled":
      return <Calendar className="h-4 w-4 text-blue-500" />;
    case "Completed":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Pending Approval":
      return "bg-amber-100 text-amber-800";
    case "Approved":
      return "bg-green-100 text-green-800";
    case "Rejected":
      return "bg-red-100 text-red-800";
    case "Scheduled":
      return "bg-blue-100 text-blue-800";
    case "Completed":
      return "bg-green-100 text-green-800";
    default:
      return "bg-slate-100 text-slate-800";
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "Salary":
      return "bg-blue-100 text-blue-800";
    case "Tax":
      return "bg-amber-100 text-amber-800";
    case "Statutory":
      return "bg-purple-100 text-purple-800";
    case "Third Party":
      return "bg-emerald-100 text-emerald-800";
    default:
      return "bg-slate-100 text-slate-800";
  }
};

const Payments = () => {
  // Current period is April 2024
  const currentPeriod = "April 2024";
  
  // Select first payment as active by default
  const [selectedPayment, setSelectedPayment] = useState(paymentsData[0]);

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Payments</h1>
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm font-medium flex items-center">
            <Calendar className="h-4 w-4 mr-1" /> Current Period: {currentPeriod}
          </div>
          <Button>
            <CreditCard className="mr-2 h-4 w-4" />
            New Payment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-blue-600">Pending Approval</p>
                <h3 className="text-2xl font-bold">1</h3>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 text-xs text-blue-600">
              <span>Salary payments requiring approval</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-amber-600">Upcoming Payments</p>
                <h3 className="text-2xl font-bold">3</h3>
              </div>
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <div className="mt-4 text-xs text-amber-600">
              <span>Due within the next 7 days</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-green-600">Monthly Total</p>
                <h3 className="text-2xl font-bold">R 1,923,011.04</h3>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <CircleDollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 text-xs text-green-600">
              <span>All payments for April 2024</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Payment Transactions</CardTitle>
                <CardDescription>View and manage all payment transactions</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                  <Input 
                    type="search" 
                    placeholder="Search payments..." 
                    className="pl-8 w-[200px] lg:w-[250px]"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                </TabsList>
                <div className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Reference</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[100px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentsData.map((payment) => (
                        <TableRow 
                          key={payment.id} 
                          className={selectedPayment.id === payment.id ? "bg-blue-50" : ""}
                          onClick={() => setSelectedPayment(payment)}
                        >
                          <TableCell>
                            <div className="font-medium">{payment.reference}</div>
                            <div className="text-sm text-slate-500">{payment.description}</div>
                          </TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getTypeColor(payment.type)}>
                              {payment.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">{payment.amount}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusColor(payment.status)}>
                              <span className="flex items-center">
                                {getStatusIcon(payment.status)}
                                <span className="ml-1">{payment.status}</span>
                              </span>
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedPayment(payment)}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-slate-500">
                    Showing <span className="font-medium">5</span> of <span className="font-medium">5</span> payments
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" disabled>Previous</Button>
                    <Button variant="outline" size="sm" disabled>Next</Button>
                  </div>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>{selectedPayment.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-slate-500">Payment Information</h4>
                  <div className="mt-3 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Reference</span>
                      <span className="font-medium">{selectedPayment.reference}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Amount</span>
                      <span className="font-medium">{selectedPayment.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Payment Date</span>
                      <span className="font-medium">{selectedPayment.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Status</span>
                      <Badge variant="outline" className={getStatusColor(selectedPayment.status)}>
                        {selectedPayment.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">Payment Type</span>
                      <Badge variant="outline" className={getTypeColor(selectedPayment.type)}>
                        {selectedPayment.type}
                      </Badge>
                    </div>
                  </div>
                </div>

                {selectedPayment.type === "Salary" && (
                  <div>
                    <h4 className="text-sm font-medium text-slate-500">Beneficiaries</h4>
                    <div className="mt-3 p-3 border rounded-lg bg-slate-50">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Total Employees</span>
                        <span className="font-medium">125</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Payroll Period</span>
                        <span className="font-medium">April 2024</span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedPayment.type === "Tax" && (
                  <div>
                    <h4 className="text-sm font-medium text-slate-500">Recipient</h4>
                    <div className="mt-3 p-3 border rounded-lg bg-slate-50">
                      <div className="flex items-center">
                        <Building className="h-10 w-10 text-amber-600 mr-3" />
                        <div>
                          <p className="font-medium">South African Revenue Service</p>
                          <p className="text-xs text-slate-500">PAYE Reference: 7530123456</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedPayment.status === "Pending Approval" && (
                  <div>
                    <h4 className="text-sm font-medium text-slate-500">Approval Workflow</h4>
                    <div className="mt-3 space-y-3">
                      {approversData.map((approver) => (
                        <div key={approver.id} className="flex items-center p-2 border rounded-lg">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback>{approver.avatarInitials}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{approver.name}</p>
                            <p className="text-xs text-slate-500">{approver.role}</p>
                          </div>
                          {approver.status === "Approved" ? (
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Approved
                            </Badge>
                          ) : (
                            <Badge className="bg-amber-100 text-amber-800">
                              <Clock className="h-3 w-3 mr-1" />
                              Pending
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <div className="flex justify-between gap-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <FileText className="mr-2 h-4 w-4" />
                          Reports
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Payment Report</DropdownMenuItem>
                        <DropdownMenuItem>Audit Log</DropdownMenuItem>
                        <DropdownMenuItem>Reconciliation Report</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <Download className="mr-2 h-4 w-4" />
                          Export
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>CSV Format</DropdownMenuItem>
                        <DropdownMenuItem>ACB Format</DropdownMenuItem>
                        <DropdownMenuItem>PDF Summary</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {selectedPayment.status === "Pending Approval" && (
                    <div className="mt-3 flex gap-3">
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Approve
                      </Button>
                      <Button variant="destructive" className="w-full">
                        <X className="mr-2 h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  )}

                  {selectedPayment.status === "Scheduled" && (
                    <div className="mt-3">
                      <Button className="w-full">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Process Now
                      </Button>
                    </div>
                  )}
                </div>

                {selectedPayment.type === "Tax" && selectedPayment.status === "Approved" && (
                  <div className="mt-3 p-3 border rounded-lg bg-amber-50 border-amber-200 flex items-start">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
                    <div className="text-sm text-amber-800">
                      <p className="font-medium">Payment Due Soon</p>
                      <p>This payment must be processed by 24/04/2024 to avoid penalties.</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Payments;
