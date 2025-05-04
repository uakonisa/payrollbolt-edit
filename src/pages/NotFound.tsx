import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-red-100 p-3">
            <AlertCircle className="h-10 w-10 text-red-600" />
          </div>
        </div>
        <h1 className="mt-5 text-4xl font-bold text-slate-900">Page Not Found</h1>
        <p className="mt-3 text-lg text-slate-600">
          We couldn't find the page you're looking for. The page might have been removed or the URL might be incorrect.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            variant="default" 
            size="lg" 
            className="w-full sm:w-auto"
            onClick={() => navigate("/")}
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full sm:w-auto"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
