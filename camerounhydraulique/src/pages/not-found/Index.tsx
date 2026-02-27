import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4 p-8 border border-border rounded-2xl bg-card shadow-lg">
        <h1 className="text-5xl font-bold text-primary">404</h1>
        <p className="text-xl text-muted-foreground">Oops! Page not found</p>
        <a
          href="/"
          className="inline-flex items-center justify-center text-primary font-semibold hover:text-accent transition-colors underline-offset-4 underline"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
