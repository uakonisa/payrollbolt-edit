import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from "recharts";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";

// Mock data for the chart
const data = [
  { name: "Jan", gross: 1250000, tax: 375000, net: 875000 },
  { name: "Feb", gross: 1280000, tax: 384000, net: 896000 },
  { name: "Mar", gross: 1320000, tax: 396000, net: 924000 },
  { name: "Apr", gross: 1456789, tax: 437037, net: 1019752 },
  { name: "May", gross: 0, tax: 0, net: 0 },
  { name: "Jun", gross: 0, tax: 0, net: 0 },
  { name: "Jul", gross: 0, tax: 0, net: 0 },
  { name: "Aug", gross: 0, tax: 0, net: 0 },
  { name: "Sep", gross: 0, tax: 0, net: 0 },
  { name: "Oct", gross: 0, tax: 0, net: 0 },
  { name: "Nov", gross: 0, tax: 0, net: 0 },
  { name: "Dec", gross: 0, tax: 0, net: 0 },
];

// Chart color configuration
const chartConfig = {
  gross: {
    label: "Gross Salary",
    theme: {
      light: "#3b82f6",
      dark: "#3b82f6", 
    },
  },
  tax: {
    label: "Tax Deductions",
    theme: {
      light: "#ef4444",
      dark: "#ef4444",
    },
  },
  net: {
    label: "Net Salary",
    theme: {
      light: "#10b981",
      dark: "#10b981",
    },
  },
};

// Format currency for tooltips and axis
const formatCurrency = (value: number) => {
  return `R ${(value / 1000).toFixed(0)}k`;
};

export function PayrollSummaryChart() {
  return (
    <ChartContainer config={chartConfig}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tickFormatter={formatCurrency} 
            width={80}
          />
          <ChartTooltip 
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              return (
                <ChartTooltipContent 
                  formatter={(value: number) => 
                    `R ${value.toLocaleString()}`
                  }
                  labelFormatter={(label) => `${label} 2024`}
                />
              );
            }}
          />
          <Legend />
          <Bar dataKey="gross" name="Gross Salary" fill="var(--color-gross)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="tax" name="Tax Deductions" fill="var(--color-tax)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="net" name="Net Salary" fill="var(--color-net)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
