
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

interface DeleteEmployeeDialogProps {
  isOpen: boolean;
  employee: Employee | null;
  onClose: () => void;
  onConfirmDelete: () => void;
}

const DeleteEmployeeDialog = ({ 
  isOpen, 
  employee, 
  onClose, 
  onConfirmDelete 
}: DeleteEmployeeDialogProps) => {
  if (!employee) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirmar exclusão</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>Tem certeza que deseja excluir o funcionário <span className="font-semibold">{employee.name}</span>?</p>
          <p className="text-sm text-muted-foreground mt-2">Esta ação não pode ser desfeita.</p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button variant="destructive" onClick={onConfirmDelete}>Excluir</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteEmployeeDialog;
