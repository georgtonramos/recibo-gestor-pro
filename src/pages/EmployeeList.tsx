
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserPlus, Search, UserX, Edit, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const MOCK_EMPLOYEES = [
  { id: 1, name: "João Silva", email: "joao.silva@techcorp.com", role: "Desenvolvedor", department: "TI", company: "TechCorp" },
  { id: 2, name: "Maria Oliveira", email: "maria.oliveira@techcorp.com", role: "Designer", department: "Design", company: "TechCorp" },
  { id: 3, name: "Pedro Santos", email: "pedro.santos@megasistemas.com", role: "Analista", department: "Financeiro", company: "Mega Sistemas" },
  { id: 4, name: "Ana Costa", email: "ana.costa@construtech.com", role: "Engenheira", department: "Engenharia", company: "Construtech" },
  { id: 5, name: "Carlos Pereira", email: "carlos.pereira@megasistemas.com", role: "Gerente", department: "Vendas", company: "Mega Sistemas" },
  { id: 6, name: "Lucia Ferreira", email: "lucia.ferreira@techcorp.com", role: "Analista", department: "RH", company: "TechCorp" },
  { id: 7, name: "Roberto Alves", email: "roberto.alves@construtech.com", role: "Arquiteto", department: "Projetos", company: "Construtech" },
  { id: 8, name: "Amanda Lima", email: "amanda.lima@techcorp.com", role: "Marketing", department: "Marketing", company: "TechCorp" },
];

const MOCK_COMPANIES = [
  { id: 1, name: "TechCorp" },
  { id: 2, name: "Mega Sistemas" },
  { id: 3, name: "Construtech" },
];

type Employee = {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  company: string;
};

const EmployeeList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false); // New state for view dialog
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // New state for edit dialog
  const [currentPage, setCurrentPage] = useState(1);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  const [employeeToView, setEmployeeToView] = useState<Employee | null>(null); // New state for viewing employee
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null); // New state for editing employee
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    company: "",
  });

  const itemsPerPage = 5;

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

  // Pagination logic
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage);

  const handleAddEmployee = () => {
    // In a real app, this would be an API call
    toast({
      title: "Funcionário adicionado",
      description: `${newEmployee.name} foi adicionado com sucesso.`,
    });
    setIsAddDialogOpen(false);
    setNewEmployee({
      name: "",
      email: "",
      role: "",
      department: "",
      company: "",
    });
  };

  const handleUpdateEmployee = () => {
    // In a real app, this would be an API call to update the employee
    if (employeeToEdit) {
      toast({
        title: "Funcionário atualizado",
        description: `${employeeToEdit.name} foi atualizado com sucesso.`,
      });
      setIsEditDialogOpen(false);
      setEmployeeToEdit(null);
    }
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

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium">Empresa</label>
              <Select 
                onValueChange={setSelectedCompany}
                value={selectedCompany}
              >
                <SelectTrigger id="company">
                  <SelectValue placeholder="Todas as empresas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as empresas</SelectItem>
                  {MOCK_COMPANIES.map((company) => (
                    <SelectItem key={company.id} value={company.name}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="search" className="text-sm font-medium">Busca</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  id="search"
                  placeholder="Nome, email, cargo..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead className="w-[100px] text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedEmployees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex flex-col items-center text-muted-foreground">
                      <UserX className="h-12 w-12 mb-2 opacity-30" />
                      <p>Nenhum funcionário encontrado</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">{employee.name}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.role}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.company}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button size="icon" variant="ghost" onClick={() => openViewDialog(employee)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => openEditDialog(employee)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => openDeleteDialog(employee)}>
                        <UserX className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="p-4 border-t">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    aria-disabled={currentPage === 1}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={page === currentPage}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    aria-disabled={currentPage === totalPages}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      {/* Add Employee Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
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
                  {MOCK_COMPANIES.map((company) => (
                    <SelectItem key={company.id} value={company.name}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleAddEmployee}>Adicionar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Employee Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Detalhes do Funcionário</DialogTitle>
          </DialogHeader>
          {employeeToView && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Nome completo</h3>
                  <p className="mt-1">{employeeToView.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="mt-1">{employeeToView.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Cargo</h3>
                  <p className="mt-1">{employeeToView.role}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Departamento</h3>
                  <p className="mt-1">{employeeToView.department}</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Empresa</h3>
                <p className="mt-1">{employeeToView.company}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Employee Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Funcionário</DialogTitle>
          </DialogHeader>
          {employeeToEdit && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nome completo</Label>
                <Input 
                  id="edit-name" 
                  value={employeeToEdit.name} 
                  onChange={e => setEmployeeToEdit({...employeeToEdit, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input 
                  id="edit-email" 
                  type="email"
                  value={employeeToEdit.email} 
                  onChange={e => setEmployeeToEdit({...employeeToEdit, email: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-role">Cargo</Label>
                  <Input 
                    id="edit-role" 
                    value={employeeToEdit.role} 
                    onChange={e => setEmployeeToEdit({...employeeToEdit, role: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-department">Departamento</Label>
                  <Input 
                    id="edit-department" 
                    value={employeeToEdit.department} 
                    onChange={e => setEmployeeToEdit({...employeeToEdit, department: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-company">Empresa</Label>
                <Select 
                  value={employeeToEdit.company} 
                  onValueChange={(value) => setEmployeeToEdit({...employeeToEdit, company: value})}
                >
                  <SelectTrigger id="edit-company">
                    <SelectValue placeholder="Selecione a empresa" />
                  </SelectTrigger>
                  <SelectContent>
                    {MOCK_COMPANIES.map((company) => (
                      <SelectItem key={company.id} value={company.name}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleUpdateEmployee}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Tem certeza que deseja excluir o funcionário <span className="font-semibold">{employeeToDelete?.name}</span>?</p>
            <p className="text-sm text-muted-foreground mt-2">Esta ação não pode ser desfeita.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>Excluir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default EmployeeList;
