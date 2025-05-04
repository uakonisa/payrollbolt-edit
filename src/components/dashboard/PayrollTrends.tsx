import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

// Mock data for trends
const trendData = [
  { 
    metric: "Average Salary", 
    currentValue: "R 32,450.65", 
    previousValue: "R 31,890.25", 
    percentChange: 1.76, 
    trend: "up" 
  },
  { 
    metric: "Median Salary", 
    currentValue: "R 29,750.00", 
    previousValue: "R 29,250.00", 
    percentChange: 1.71, 
    trend: "up" 
  },
  { 
    metric: "Tax Rate", 
    currentValue: "30.0%", 
    previousValue: "30.0%", 
    percentChange: 0, 
    trend: "neutral" 
  },
  { 
    metric: "Employee Count", 
    currentValue: "125", 
    previousValue: "122", 
    percentChange: 2.46, 
    trend: "up" 
  },
  { 
    metric: "Overtime Hours", 
    currentValue: "245", 
    previousValue: "278", 
    percentChange: -11.87, 
    trend: "down" 
  }
];

export function PayrollTrends() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payroll Trends</CardTitle>
        <CardDescription>Month-over-month comparison</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Metric</TableHead>
              <TableHead>Current</TableHead>
              <TableHead>Previous</TableHead>
              <TableHead className="text-right">Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trendData.map((item) => (
              <TableRow key={item.metric}>
                <TableCell className="font-medium">{item.metric}</TableCell>
                <TableCell>{item.currentValue}</TableCell>
                <TableCell className="text-muted-foreground">{item.previousValue}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end">
                    {item.trend === "up" && (
                      <div className="flex items-center text-green-600">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        {item.percentChange.toFixed(2)}%
                      </div>
                    )}
                    {item.trend === "down" && (
                      <div className="flex items-center text-red-600">
                        <ArrowDownRight className="h-4 w-4 mr-1" />
                        {Math.abs(item.percentChange).toFixed(2)}%
                      </div>
                    )}
                    {item.trend === "neutral" && (
                      <div className="flex items-center text-slate-500">
                        <Minus className="h-4 w-4 mr-1" />
                        {item.percentChange.toFixed(2)}%
                      </div>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
