import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarDays } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export const PayPeriodsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pay Periods</CardTitle>
        <CardDescription>Configure payroll run frequency and payment dates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <Label className="text-base">Payroll Frequency</Label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 border p-3 rounded-lg bg-blue-50 border-blue-200">
                <input 
                  type="radio" 
                  id="monthly" 
                  name="frequency" 
                  className="h-4 w-4 text-blue-600" 
                  defaultChecked
                />
                <Label htmlFor="monthly" className="flex-1 cursor-pointer">
                  <div className="font-medium">Monthly</div>
                  <div className="text-sm text-slate-500">Process payroll once per month</div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 border p-3 rounded-lg">
                <input 
                  type="radio" 
                  id="bi-weekly" 
                  name="frequency" 
                  className="h-4 w-4 text-blue-600" 
                />
                <Label htmlFor="bi-weekly" className="flex-1 cursor-pointer">
                  <div className="font-medium">Bi-Weekly</div>
                  <div className="text-sm text-slate-500">Process payroll every two weeks</div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 border p-3 rounded-lg">
                <input 
                  type="radio" 
                  id="weekly" 
                  name="frequency" 
                  className="h-4 w-4 text-blue-600" 
                />
                <Label htmlFor="weekly" className="flex-1 cursor-pointer">
                  <div className="font-medium">Weekly</div>
                  <div className="text-sm text-slate-500">Process payroll every week</div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 border p-3 rounded-lg">
                <input 
                  type="radio" 
                  id="custom" 
                  name="frequency" 
                  className="h-4 w-4 text-blue-600" 
                />
                <Label htmlFor="custom" className="flex-1 cursor-pointer">
                  <div className="font-medium">Custom</div>
                  <div className="text-sm text-slate-500">Define a custom payroll schedule</div>
                </Label>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <Label className="text-base">Monthly Payment Settings</Label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="payment-day">Payment Day of Month</Label>
                <Input id="payment-day" defaultValue="25" />
                <p className="text-xs text-slate-500">
                  If this falls on a weekend or holiday, payment will be processed on the previous business day
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cutoff-day">Data Entry Cut-off Day</Label>
                <Input id="cutoff-day" defaultValue="15" />
                <p className="text-xs text-slate-500">
                  All payroll data entries must be completed by this day of the month
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <Label className="text-base">Tax Year Settings</Label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tax-year-start">Tax Year Start</Label>
                <Input id="tax-year-start" defaultValue="1 March" disabled />
                <p className="text-xs text-slate-500">
                  South African tax year begins on 1st March (fixed)
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tax-year-end">Tax Year End</Label>
                <Input id="tax-year-end" defaultValue="28/29 February" disabled />
                <p className="text-xs text-slate-500">
                  South African tax year ends on last day of February (fixed)
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base">Pay Period Calendar</Label>
              <Button variant="outline" size="sm">
                <CalendarDays className="h-4 w-4 mr-1" />
                View Full Calendar
              </Button>
            </div>
            
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Period</TableHead>
                    <TableHead>Date Range</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">April 2024</TableCell>
                    <TableCell>01/04/2024 - 30/04/2024</TableCell>
                    <TableCell>25/04/2024</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        In Progress
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">May 2024</TableCell>
                    <TableCell>01/05/2024 - 31/05/2024</TableCell>
                    <TableCell>24/05/2024</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                        Scheduled
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">June 2024</TableCell>
                    <TableCell>01/06/2024 - 30/06/2024</TableCell>
                    <TableCell>25/06/2024</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                        Scheduled
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
