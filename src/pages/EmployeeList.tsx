
import { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MOCK_EMPLOYEES, MOCK_COMPANIES } from "@/services/employeeService";

// Component imports
import EmployeeFilter from "@/components/employees/EmployeeFilter";
import EmployeeTable from "@/components/employees/EmployeeTable";
import AddEmployeeDialog from "@/components/employees/dialogs/AddEmployeeDialog";
import ViewEmployeeDialog from "@/components/employees/dialogs/ViewEmployeeDialog";
import EditEmployeeDialog from "@/components/employees/dialogs/EditEmployeeDialog";
import DeleteEmployeeDialog from "@/components/employees/dialogs/DeleteEmployeeDialog";

type Employee = {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  company: string;
};

const EmployeeList = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  const [employeeToView, setEmployeeToView] = useState<Employee | null>(null);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);

  // Filter employees based on search and company filter
  const filteredEmployees = MOCK_EMPLOYEES.filter(employee => {
    const matchesSearch = !searchQuery || 
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCompany = selectedCompany === "all" || employee.company === selectedCompany;
    
    return matchesSearch && matchesCompany;
  });

  const handleAddEmployee = (newEmployee: { name: string; email: string; role: string; department: string; company: string; }) => {
    // In a real app, this would be an API call
    toast({
      title: "Funcionário adicionado",
      description: `${newEmployee.name} foi adicionado com sucesso.`,
    });
    setIsAddDialogOpen(false);
  };

  const handleUpdateEmployee = (updatedEmployee: Employee) => {
    // In a real app, this would be an API call to update the employee
    toast({
      title: "Funcionário atualizado",
      description: `${updatedEmployee.name} foi atualizado com sucesso.`,
    });
    setIsEditDialogOpen(false);
    setEmployeeToEdit(null);
  };

  const handleConfirmDelete = () => {
    // In a real app, this would be an API call
    if (employeeToDelete) {
      toast({
        title: "Funcionário removido",
        description: `${employeeToDelete.name} foi removido com sucesso.`,
      });
      setIsDeleteDialogOpen(false);
      setEmployeeToDelete(null);
    }
  };

  const openViewDialog = (employee: Employee) => {
    setEmployeeToView(employee);
    setIsViewDialogOpen(true);
  };

  const openEditDialog = (employee: Employee) => {
    setEmployeeToEdit({...employee}); // Create a copy to avoid direct mutation
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (employee: Employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteDialogOpen(true);
  };

  return (
    <AppLayout>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Funcionários</h1>
          <p className="text-muted-foreground">Gerencie os funcionários cadastrados</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="mt-4 md:mt-0">
          <UserPlus className="mr-2 h-4 w-4" />
          Adicionar Funcionário
        </Button>
      </div>

      <EmployeeFilter
        companies={MOCK_COMPANIES}
        searchQuery={searchQuery}
        selectedCompany={selectedCompany}
        onSearchChange={setSearchQuery}
        onCompanyChange={setSelectedCompany}
      />

      <EmployeeTable
        employees={filteredEmployees}
        onViewEmployee={openViewDialog}
        onEditEmployee={openEditDialog}
        onDeleteEmployee={openDeleteDialog}
      />

      {/* Dialogs */}
      <AddEmployeeDialog
        isOpen={isAddDialogOpen}
        companies={MOCK_COMPANIES}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddEmployee}
      />

      <ViewEmployeeDialog
        isOpen={isViewDialogOpen}
        employee={employeeToView}
        onClose={() => setIsViewDialogOpen(false)}
      />

      <EditEmployeeDialog
        isOpen={isEditDialogOpen}
        employee={employeeToEdit}
        companies={MOCK_COMPANIES}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleUpdateEmployee}
      />

      <DeleteEmployeeDialog
        isOpen={isDeleteDialogOpen}
        employee={employeeToDelete}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirmDelete={handleConfirmDelete}
      />
    </AppLayout>
  );
};

export default EmployeeList;
