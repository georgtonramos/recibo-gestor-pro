
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Employee = {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  company: string;
};

interface ViewEmployeeDialogProps {
  isOpen: boolean;
  employee: Employee | null;
  onClose: () => void;
}

const ViewEmployeeDialog = ({ isOpen, employee, onClose }: ViewEmployeeDialogProps) => {
  if (!employee) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Detalhes do Funcionário</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Nome completo</h3>
              <p className="mt-1">{employee.name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Email</h3>
              <p className="mt-1">{employee.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Cargo</h3>
              <p className="mt-1">{employee.role}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Departamento</h3>
              <p className="mt-1">{employee.department}</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Empresa</h3>
            <p className="mt-1">{employee.company}</p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewEmployeeDialog;
