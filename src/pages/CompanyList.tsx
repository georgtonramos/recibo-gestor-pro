
import AppLayout from "@/components/layouts/AppLayout";
import { useState, useEffect } from "react";
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
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Building, Plus, Search, Edit, Trash } from "lucide-react";
import { Company, getCompanies, createCompany, updateCompany, deleteCompany } from "@/services/companyService";

const CompanyForm = ({ onClose, company = null, onSave }: { 
  onClose: () => void, 
  company?: Company | null,
  onSave: (data: Omit<Company, 'id'>) => void
}) => {
  const [formData, setFormData] = useState({
    name: company?.name || "",
    cnpj: company?.cnpj || "",
    address: company?.address || "",
    contact: company?.contact || "",
  });
  
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving company:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar a empresa.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
        <Button 
          type="submit" 
          className="bg-receipt-600 hover:bg-receipt-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Salvando..." : company ? "Atualizar" : "Cadastrar"}
        </Button>
      </div>
    </form>
  );
};

const CompanyList = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const data = await getCompanies();
      setCompanies(data);
    } catch (error) {
      console.error('Error fetching companies:', error);
      toast({
        title: "Erro ao carregar empresas",
        description: "Não foi possível buscar a lista de empresas. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (window.confirm(`Tem certeza que deseja excluir a empresa ${name}?`)) {
      try {
        await deleteCompany(id);
        setCompanies(companies.filter(company => company.id !== id));
        toast({
          title: "Empresa excluída",
          description: `${name} foi removida com sucesso.`,
        });
      } catch (error) {
        console.error('Error deleting company:', error);
        toast({
          title: "Erro ao excluir empresa",
          description: "Ocorreu um erro ao tentar excluir a empresa.",
          variant: "destructive",
        });
      }
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

  const handleSaveCompany = async (formData: Omit<Company, 'id'>) => {
    try {
      if (editingCompany) {
        const updated = await updateCompany(editingCompany.id, formData);
        setCompanies(companies.map(c => c.id === editingCompany.id ? updated : c));
        toast({
          title: "Empresa atualizada",
          description: `${formData.name} foi atualizada com sucesso.`,
        });
      } else {
        const created = await createCompany(formData);
        setCompanies([...companies, created]);
        toast({
          title: "Empresa cadastrada",
          description: `${formData.name} foi adicionada com sucesso.`,
        });
      }
    } catch (error) {
      console.error('Error saving company:', error);
      throw error; // Re-throw to be caught by the form component
    }
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
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <div className="flex flex-col items-center text-muted-foreground">
                      <div className="animate-spin h-8 w-8 border-t-2 border-receipt-500 rounded-full mb-2"></div>
                      <p>Carregando empresas...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredCompanies.length === 0 ? (
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
            onSave={handleSaveCompany}
          />
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default CompanyList;
