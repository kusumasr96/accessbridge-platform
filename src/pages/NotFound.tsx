import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Page Not Found — AccessBridge";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col bg-background"
    >
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-2">Page Not Found</p>
          <p className="text-muted-foreground mb-8">
            The page you are looking for does not exist or has been moved.
          </p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    </motion.div>
  );
}
