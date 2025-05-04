import React from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, FileText, Download } from "lucide-react";
import { PayrollRun } from '@/types/database';
import { formatCurrency } from '@/utils/formatters';

interface PayrollRunsTableProps {
  payrollRuns: PayrollRun[];
  onView?: (run: PayrollRun) => void;
  onViewPayslips?: (run: PayrollRun) => void;
  onDownload?: (run: PayrollRun) => void;
}

export function PayrollRunsTable({
  payrollRuns,
  onView,
  onViewPayslips,
  onDownload
}: PayrollRunsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Period</TableHead>
            <TableHead>Payment Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payrollRuns.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No payroll runs found.
              </TableCell>
            </TableRow>
          ) : (
            payrollRuns.map((run) => (
              <TableRow key={run.id}>
                <TableCell className="font-medium">{run.period_name}</TableCell>
                <TableCell>{new Date(run.payment_date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <StatusBadge status={run.status} />
                </TableCell>
                <TableCell className="text-right">{formatCurrency(run.total_net)}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {onView && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(run)}
                        className="flex items-center"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                    )}
                    {onViewPayslips && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewPayslips(run)}
                        className="flex items-center"
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        Payslips
                      </Button>
                    )}
                    {onDownload && run.status === "paid" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDownload(run)}
                        className="flex items-center"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Export
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function StatusBadge({ status }: { status: PayrollRun['status'] }) {
  const getBadgeStyles = () => {
    switch (status) {
      case 'draft':
        return 'bg-slate-100 text-slate-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-amber-100 text-amber-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeStyles()}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
