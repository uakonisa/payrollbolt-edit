import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Eye, Download, Calendar } from "lucide-react";

// Mock data for recent payslips
const recentPayslips = [
  {
    id: 1,
    employeeName: "John Smith",
    position: "Software Developer",
    period: "April 2024",
    netAmount: "R 38,500.00",
    status: "Paid",
    avatarInitials: "JS",
  },
  {
    id: 2,
    employeeName: "Sarah Johnson",
    position: "Financial Analyst",
    period: "April 2024",
    netAmount: "R 42,750.50",
    status: "Paid",
    avatarInitials: "SJ",
  },
  {
    id: 3,
    employeeName: "Michael Naidoo",
    position: "HR Manager",
    period: "April 2024",
    netAmount: "R 46,320.75",
    status: "Paid",
    avatarInitials: "MN",
  },
  {
    id: 4,
    employeeName: "Priya Patel",
    position: "Marketing Director",
    period: "April 2024",
    netAmount: "R 51,450.00",
    status: "Paid",
    avatarInitials: "PP",
  },
  {
    id: 5,
    employeeName: "David van der Merwe",
    position: "Operations Manager",
    period: "April 2024",
    netAmount: "R 48,250.25",
    status: "Pending",
    avatarInitials: "DM",
  },
];

export function RecentPayslips() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Employee</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Period</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Net Amount</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Status</th>
            <th className="text-right py-3 px-4 text-sm font-medium text-slate-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {recentPayslips.map((payslip) => (
            <tr key={payslip.id} className="border-b hover:bg-slate-50">
              <td className="py-3 px-4">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarFallback>{payslip.avatarInitials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{payslip.employeeName}</div>
                    <div className="text-sm text-slate-500">{payslip.position}</div>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                  <span>{payslip.period}</span>
                </div>
              </td>
              <td className="py-3 px-4 font-medium">{payslip.netAmount}</td>
              <td className="py-3 px-4">
                <Badge 
                  variant={payslip.status === "Paid" ? "outline" : "secondary"} 
                  className={`${payslip.status === "Paid" ? "border-green-200 bg-green-50 text-green-700" : "border-amber-200 bg-amber-50 text-amber-700"}`}
                >
                  {payslip.status}
                </Badge>
              </td>
              <td className="py-3 px-4">
                <div className="flex justify-end space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download</span>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="p-4 text-center">
        <Button variant="outline">View All Payslips</Button>
      </div>
    </div>
  );
}
