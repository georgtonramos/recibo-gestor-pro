
import AppLayout from "@/components/layouts/AppLayout";
import { useState } from "react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Building, Plus, Search, Edit, Trash } from "lucide-react";

const MOCK_COMPANIES = [
  { id: 1, name: "TechCorp", cnpj: "12.345.678/0001-90", address: "Av. Paulista, 1000, São Paulo - SP", contact: "contato@techcorp.com.br" },
  { id: 2, name: "Mega Sistemas", cnpj: "98.765.432/0001-10", address: "Rua da Consolação, 200, São Paulo - SP", contact: "contato@megasistemas.com" },
  { id: 3, name: "Construtech", cnpj: "45.678.901/0001-23", address: "Av. Brigadeiro Faria Lima, 500, São Paulo - SP", contact: "contato@construtech.com.br" },
  { id: 4, name: "Global Services", cnpj: "56.789.012/0001-45", address: "Av. Rebouças, 1500, São Paulo - SP", contact: "contato@globalservices.com" },
  { id: 5, name: "Inova Tech", cnpj: "67.890.123/0001-56", address: "Rua Augusta, 1200, São Paulo - SP", contact: "contato@inovatech.com.br" },
];

type Company = {
  id: number;
  name: string;
  cnpj: string;
  address: string;
  contact: string;
};

const CompanyForm = ({ onClose, company = null }: { onClose: () => void, company?: Company | null }) => {
  const [formData, setFormData] = useState({
    name: company?.name || "",
    cnpj: company?.cnpj || "",
    address: company?.address || "",
    contact: company?.contact || "",
  });
  
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: company ? "Empresa atualizada!" : "Empresa cadastrada!",
      description: `${formData.name} foi ${company ? "atualizada" : "adicionada"} com sucesso.`,
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">Nome da Empresa</label>
        <Input 
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="cnpj" className="text-sm font-medium">CNPJ</label>
        <Input 
          id="cnpj"
          name="cnpj"
          value={formData.cnpj}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="address" className="text-sm font-medium">Endereço</label>
        <Input 
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="contact" className="text-sm font-medium">Contato</label>
        <Input 
          id="contact"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="logo" className="text-sm font-medium">Logo</label>
        <Input 
          id="logo"
          name="logo"
          type="file"
          accept="image/*"
        />
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
        <Button type="submit" className="bg-receipt-600 hover:bg-receipt-700">
          {company ? "Atualizar" : "Cadastrar"}
        </Button>
      </div>
    </form>
  );
};

const CompanyList = () => {
  const [companies] = useState<Company[]>(MOCK_COMPANIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleDelete = (id: number, name: string) => {
    if (window.confirm(`Tem certeza que deseja excluir a empresa ${name}?`)) {
      toast({
        title: "Empresa excluída",
        description: `${name} foi removida com sucesso.`,
      });
    }
  };

  const handleEdit = (company: Company) => {
    setEditingCompany(company);
    setIsDialogOpen(true);
  };

  const handleNewCompany = () => {
    setEditingCompany(null);
    setIsDialogOpen(true);
  };

  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    company.cnpj.includes(searchQuery)
  );

  return (
    <AppLayout>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Empresas</h1>
          <p className="text-muted-foreground">Gerencie os cadastros de empresas</p>
        </div>
        <Button 
          onClick={handleNewCompany}
          className="bg-receipt-600 hover:bg-receipt-700 mt-4 md:mt-0"
        >
          <Plus className="mr-2 h-4 w-4" /> Nova Empresa
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Buscar por nome ou CNPJ..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Empresa</TableHead>
                <TableHead>CNPJ</TableHead>
                <TableHead className="hidden md:table-cell">Endereço</TableHead>
                <TableHead className="hidden md:table-cell">Contato</TableHead>
                <TableHead className="w-[100px] text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompanies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <div className="flex flex-col items-center text-muted-foreground">
                      <Building className="h-12 w-12 mb-2 opacity-30" />
                      <p>Nenhuma empresa encontrada</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredCompanies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell className="font-medium">{company.name}</TableCell>
                    <TableCell>{company.cnpj}</TableCell>
                    <TableCell className="hidden md:table-cell">{company.address}</TableCell>
                    <TableCell className="hidden md:table-cell">{company.contact}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button size="icon" variant="ghost" onClick={() => handleEdit(company)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(company.id, company.name)}>
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingCompany ? "Editar Empresa" : "Nova Empresa"}</DialogTitle>
            <DialogDescription>
              {editingCompany 
                ? "Edite as informações da empresa." 
                : "Preencha os dados para cadastrar uma nova empresa."}
            </DialogDescription>
          </DialogHeader>
          <CompanyForm 
            company={editingCompany} 
            onClose={() => setIsDialogOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default CompanyList;
