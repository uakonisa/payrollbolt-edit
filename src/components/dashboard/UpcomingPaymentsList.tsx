import { Calendar, AlertCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for upcoming payments
const upcomingPayments = [
  {
    id: 1,
    type: "SARS PAYE",
    amount: "R 364,197.38",
    dueDate: "24 Apr 2024",
    urgent: true
  },
  {
    id: 2,
    type: "UIF",
    amount: "R 14,567.89",
    dueDate: "24 Apr 2024",
    urgent: true
  },
  {
    id: 3,
    type: "Medical Aid (Discovery)",
    amount: "R 87,456.32",
    dueDate: "28 Apr 2024",
    urgent: false
  }
];

export function UpcomingPaymentsList() {
  return (
    <div className="space-y-3">
      {upcomingPayments.map((payment) => (
        <div 
          key={payment.id}
          className={`p-3 rounded-lg border ${payment.urgent ? 'border-red-200 bg-red-50' : 'border-slate-200 bg-slate-50'}`}
        >
          <div className="flex justify-between items-center">
            <div className="font-medium">{payment.type}</div>
            {payment.urgent && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                <AlertCircle className="h-3 w-3 mr-1" /> Urgent
              </span>
            )}
          </div>
          <div className="text-lg font-bold mt-1">{payment.amount}</div>
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center text-sm text-slate-600">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              Due: {payment.dueDate}
            </div>
            <Button size="sm" variant="ghost" className="h-6 text-xs">
              <ExternalLink className="h-3.5 w-3.5 mr-1" />
              Process
            </Button>
          </div>
        </div>
      ))}
      
      <Button variant="outline" size="sm" className="w-full mt-2">
        View All Payments
      </Button>
    </div>
  );
}
