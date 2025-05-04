import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="text-xl font-bold text-blue-800">ZA-Payroll Pro</div>
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost">
              <Link to="/dashboard">Dashboard</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/employees">Employees</Link>
            </Button>
            <Button asChild>
              <Link to="/dashboard">Get Started</Link>
            </Button>
          </div>
        </nav>
      </header>

      <main>
        <HeroSection />
        <FeaturesSection />
      </main>

      <footer className="border-t py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-600">
          <p>&copy; {new Date().getFullYear()} ZA-Payroll Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
