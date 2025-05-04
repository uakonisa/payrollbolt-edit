import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="py-20 px-4 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
        Modern Payroll Management
        <span className="text-blue-600"> Made Simple</span>
      </h1>
      <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8">
        Streamline your payroll process with our comprehensive solution. Manage employees, 
        process payments, and generate reports all in one place.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild size="lg" className="text-lg">
          <Link to="/dashboard">
            Get Started <ArrowRight className="ml-2" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="text-lg">
          <Link to="/employees">View Employees</Link>
        </Button>
      </div>
    </section>
  );
};
