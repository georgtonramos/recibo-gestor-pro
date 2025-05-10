
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Employee = {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  company: string;
};

interface Company {
  id: number;
  name: string;
}

interface EditEmployeeDialogProps {
  isOpen: boolean;
  employee: Employee | null;
  companies: Company[];
  onClose: () => void;
  onSave: (employee: Employee) => void;
}

const EditEmployeeDialog = ({ 
  isOpen, 
  employee, 
  companies, 
  onClose, 
  onSave 
}: EditEmployeeDialogProps) => {
  const [editedEmployee, setEditedEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    if (employee) {
      setEditedEmployee({...employee});
    }
  }, [employee]);

  if (!editedEmployee) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Funcionário</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Nome completo</Label>
            <Input 
              id="edit-name" 
              value={editedEmployee.name} 
              onChange={e => setEditedEmployee({...editedEmployee, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-email">Email</Label>
            <Input 
              id="edit-email" 
              type="email"
              value={editedEmployee.email} 
              onChange={e => setEditedEmployee({...editedEmployee, email: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-role">Cargo</Label>
              <Input 
                id="edit-role" 
                value={editedEmployee.role} 
                onChange={e => setEditedEmployee({...editedEmployee, role: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-department">Departamento</Label>
              <Input 
                id="edit-department" 
                value={editedEmployee.department} 
                onChange={e => setEditedEmployee({...editedEmployee, department: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-company">Empresa</Label>
            <Select 
              value={editedEmployee.company} 
              onValueChange={(value) => setEditedEmployee({...editedEmployee, company: value})}
            >
              <SelectTrigger id="edit-company">
                <SelectValue placeholder="Selecione a empresa" />
              </SelectTrigger>
              <SelectContent>
                {companies.map((company) => (
                  <SelectItem key={company.id} value={company.name}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={() => onSave(editedEmployee)}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditEmployeeDialog;
