import { useState } from "react";
import DashboardLogin from "@/components/dashboard/DashboardLogin";
import DashboardMain from "@/components/dashboard/DashboardMain";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <DashboardLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return <DashboardMain onLogout={() => setIsAuthenticated(false)} />;
};

export default Dashboard;
