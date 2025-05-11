
import { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEmployees } from "@/hooks/useEmployees";
import { Employee } from "@/services/employeeService";

// Component imports
import EmployeeFilter from "@/components/employees/EmployeeFilter";
import EmployeeTable from "@/components/employees/EmployeeTable";
import AddEmployeeDialog from "@/components/employees/dialogs/AddEmployeeDialog";
import ViewEmployeeDialog from "@/components/employees/dialogs/ViewEmployeeDialog";
import EditEmployeeDialog from "@/components/employees/dialogs/EditEmployeeDialog";
import DeleteEmployeeDialog from "@/components/employees/dialogs/DeleteEmployeeDialog";

const EmployeeList = () => {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  const [employeeToView, setEmployeeToView] = useState<Employee | null>(null);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);

  const {
    employees: filteredEmployees,
    companies,
    loading,
    searchQuery,
    selectedCompany,
    setSearchQuery,
    handleCompanyChange,
    handleAddEmployee,
    handleUpdateEmployee,
    handleDeleteEmployee
  } = useEmployees();

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

  const handleConfirmDelete = async () => {
    if (employeeToDelete) {
      try {
        await handleDeleteEmployee(employeeToDelete.id, employeeToDelete.name);
        setIsDeleteDialogOpen(false);
        setEmployeeToDelete(null);
      } catch (error) {
        console.error("Error confirming delete:", error);
      }
    }
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
        companies={companies}
        searchQuery={searchQuery}
        selectedCompany={selectedCompany}
        onSearchChange={setSearchQuery}
        onCompanyChange={handleCompanyChange}
      />

      <EmployeeTable
        employees={filteredEmployees}
        loading={loading}
        onViewEmployee={openViewDialog}
        onEditEmployee={openEditDialog}
        onDeleteEmployee={openDeleteDialog}
      />

      {/* Dialogs */}
      <AddEmployeeDialog
        isOpen={isAddDialogOpen}
        companies={companies}
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
        companies={companies}
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
