
import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/layouts/AppLayout";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import EmployeeDashboard from "@/components/dashboard/EmployeeDashboard";

const Dashboard = () => {
  const { user } = useAuth();
  
  return (
    <AppLayout>
      {user?.role === 'admin' ? <AdminDashboard /> : <EmployeeDashboard />}
    </AppLayout>
  );
};

export default Dashboard;
