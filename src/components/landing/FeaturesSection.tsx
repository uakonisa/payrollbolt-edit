import { 
  Users, 
  CalendarDays, 
  FileText, 
  CreditCard, 
  Clock, 
  Shield 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Users,
    title: "Employee Management",
    description: "Easily manage your workforce with comprehensive employee profiles and records."
  },
  {
    icon: CalendarDays,
    title: "Payroll Scheduling",
    description: "Set up automated payroll runs and never miss a payment date."
  },
  {
    icon: FileText,
    title: "Tax Compliance",
    description: "Stay compliant with automatic tax calculations and reporting."
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Process payments securely and efficiently to multiple bank accounts."
  },
  {
    icon: Clock,
    title: "Time Tracking",
    description: "Track working hours and overtime with our intuitive system."
  },
  {
    icon: Shield,
    title: "Data Security",
    description: "Your data is protected with enterprise-grade security measures."
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">
          Everything You Need for Payroll Management
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardContent className="p-6">
                <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
