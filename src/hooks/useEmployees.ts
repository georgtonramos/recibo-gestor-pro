
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  Employee, 
  getEmployees, 
  createEmployee, 
  updateEmployee, 
  deleteEmployee 
} from '@/services/employeeService';
import { getCompanies } from '@/services/companyService';

interface UseEmployeesOptions {
  initialCompany?: string;
}

export const useEmployees = (options: UseEmployeesOptions = {}) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [companies, setCompanies] = useState<{id: number, name: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(options.initialCompany || "all");
  const { toast } = useToast();

  // Fetch employees and companies when component mounts
  useEffect(() => {
    fetchCompanies();
    fetchEmployees();
  }, []);

  const fetchCompanies = async () => {
    try {
      const fetchedCompanies = await getCompanies();
      setCompanies(fetchedCompanies);
    } catch (error) {
      console.error('Error fetching companies:', error);
      toast({
        title: "Erro ao carregar empresas",
        description: "Não foi possível buscar a lista de empresas.",
        variant: "destructive",
      });
    }
  };

  const fetchEmployees = async (companyId?: number) => {
    setLoading(true);
    try {
      const data = await getEmployees(companyId);
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast({
        title: "Erro ao carregar funcionários",
        description: "Não foi possível buscar a lista de funcionários.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCompanyChange = async (companyName: string) => {
    setSelectedCompany(companyName);
    
    if (companyName === "all") {
      await fetchEmployees();
    } else {
      const company = companies.find(c => c.name === companyName);
      if (company) {
        await fetchEmployees(company.id);
      }
    }
  };

  const handleAddEmployee = async (newEmployee: Omit<Employee, 'id'>) => {
    try {
      const employee = await createEmployee(newEmployee);
      setEmployees([...employees, employee]);
      toast({
        title: "Funcionário adicionado",
        description: `${newEmployee.name} foi adicionado com sucesso.`,
      });
      return employee;
    } catch (error) {
      console.error('Error adding employee:', error);
      toast({
        title: "Erro ao adicionar funcionário",
        description: "Ocorreu um erro ao tentar adicionar o funcionário.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const handleUpdateEmployee = async (updatedEmployee: Employee) => {
    try {
      const employee = await updateEmployee(updatedEmployee.id, updatedEmployee);
      setEmployees(employees.map(e => e.id === updatedEmployee.id ? employee : e));
      toast({
        title: "Funcionário atualizado",
        description: `${updatedEmployee.name} foi atualizado com sucesso.`,
      });
      return employee;
    } catch (error) {
      console.error('Error updating employee:', error);
      toast({
        title: "Erro ao atualizar funcionário",
        description: "Ocorreu um erro ao tentar atualizar o funcionário.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const handleDeleteEmployee = async (id: number, name: string) => {
    try {
      await deleteEmployee(id);
      setEmployees(employees.filter(e => e.id !== id));
      toast({
        title: "Funcionário removido",
        description: `${name} foi removido com sucesso.`,
      });
    } catch (error) {
      console.error('Error deleting employee:', error);
      toast({
        title: "Erro ao remover funcionário",
        description: "Ocorreu um erro ao tentar remover o funcionário.",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Filter employees based on search query
  const filteredEmployees = employees.filter(employee => {
    return !searchQuery || 
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return {
    employees: filteredEmployees,
    companies,
    loading,
    searchQuery,
    selectedCompany,
    setSearchQuery,
    handleCompanyChange,
    handleAddEmployee,
    handleUpdateEmployee,
    handleDeleteEmployee,
    fetchEmployees
  };
};
