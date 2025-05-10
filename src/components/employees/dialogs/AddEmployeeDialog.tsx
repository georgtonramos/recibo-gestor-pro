
import { useState } from "react";
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

interface Company {
  id: number;
  name: string;
}

interface AddEmployeeDialogProps {
  isOpen: boolean;
  companies: Company[];
  onClose: () => void;
  onAdd: (employee: { name: string; email: string; role: string; department: string; company: string; }) => void;
}

const AddEmployeeDialog = ({ isOpen, companies, onClose, onAdd }: AddEmployeeDialogProps) => {
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    company: "",
  });

  const handleAdd = () => {
    onAdd(newEmployee);
    setNewEmployee({
      name: "",
      email: "",
      role: "",
      department: "",
      company: "",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Adicionar Funcionário</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input 
              id="name" 
              value={newEmployee.name} 
              onChange={e => setNewEmployee({...newEmployee, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email"
              value={newEmployee.email} 
              onChange={e => setNewEmployee({...newEmployee, email: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="role">Cargo</Label>
              <Input 
                id="role" 
                value={newEmployee.role} 
                onChange={e => setNewEmployee({...newEmployee, role: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Departamento</Label>
              <Input 
                id="department" 
                value={newEmployee.department} 
                onChange={e => setNewEmployee({...newEmployee, department: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="employee-company">Empresa</Label>
            <Select 
              value={newEmployee.company} 
              onValueChange={(value) => setNewEmployee({...newEmployee, company: value})}
            >
              <SelectTrigger id="employee-company">
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
          <Button onClick={handleAdd}>Adicionar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmployeeDialog;
