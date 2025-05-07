
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Eye, Download, Search, FileArchive } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const MOCK_COMPANIES = [
  { id: 1, name: "TechCorp" },
  { id: 2, name: "Mega Sistemas" },
  { id: 3, name: "Construtech" },
];

const MOCK_RECEIPT_TYPES = [
  { id: 1, name: "Vale Transporte" },
  { id: 2, name: "Vale Alimentação" },
  { id: 3, name: "Adiantamento" },
];

const MOCK_RECEIPTS = [
  { id: 1, company: "TechCorp", type: "Vale Transporte", reference: "05/2025", date: "01/05/2025", employee: "João Silva", value: "R$ 220,00" },
  { id: 2, company: "TechCorp", type: "Vale Alimentação", reference: "05/2025", date: "01/05/2025", employee: "João Silva", value: "R$ 550,00" },
  { id: 3, company: "TechCorp", type: "Vale Transporte", reference: "05/2025", date: "01/05/2025", employee: "Maria Oliveira", value: "R$ 220,00" },
  { id: 4, company: "Mega Sistemas", type: "Vale Alimentação", reference: "05/2025", date: "02/05/2025", employee: "Pedro Santos", value: "R$ 600,00" },
  { id: 5, company: "Construtech", type: "Vale Transporte", reference: "04/2025", date: "05/04/2025", employee: "Ana Costa", value: "R$ 180,00" },
  { id: 6, company: "Mega Sistemas", type: "Adiantamento", reference: "04/2025", date: "10/04/2025", employee: "Carlos Pereira", value: "R$ 1.500,00" },
  { id: 7, company: "TechCorp", type: "Vale Alimentação", reference: "04/2025", date: "01/04/2025", employee: "Lucia Ferreira", value: "R$ 550,00" },
  { id: 8, company: "Construtech", type: "Vale Transporte", reference: "04/2025", date: "05/04/2025", employee: "Roberto Alves", value: "R$ 180,00" },
  { id: 9, company: "TechCorp", type: "Vale Transporte", reference: "03/2025", date: "01/03/2025", employee: "João Silva", value: "R$ 220,00" },
  { id: 10, company: "TechCorp", type: "Vale Alimentação", reference: "03/2025", date: "01/03/2025", employee: "Maria Oliveira", value: "R$ 550,00" },
  { id: 11, company: "Mega Sistemas", type: "Vale Transporte", reference: "03/2025", date: "02/03/2025", employee: "Pedro Santos", value: "R$ 200,00" },
  { id: 12, company: "Construtech", type: "Vale Alimentação", reference: "03/2025", date: "03/03/2025", employee: "Ana Costa", value: "R$ 480,00" },
];

type Receipt = {
  id: number;
  company: string;
  type: string;
  reference: string;
  date: string;
  employee: string;
  value: string;
};

const ReceiptHistory = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const isAdmin = user?.role === 'admin';
  
  const [filters, setFilters] = useState({
    company: "",
    receiptType: "",
    reference: "",
    searchQuery: "",
  });
  
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchQuery: e.target.value }));
    setCurrentPage(1); // Reset to first page when search changes
  };

  const handleViewReceipt = (receipt: Receipt) => {
    setSelectedReceipt(receipt);
    setIsPreviewOpen(true);
  };
  
  const handleDownloadReceipt = (receipt: Receipt) => {
    // In a real app, this would download the PDF
    toast({
      title: "Recibo baixado",
      description: `O recibo de ${receipt.type} para ${receipt.employee} foi baixado.`,
    });
  };

  // Filter receipts based on user role and filters
  let filteredReceipts = MOCK_RECEIPTS;
  
  // If employee, show only their receipts
  if (!isAdmin) {
    filteredReceipts = filteredReceipts.filter(receipt => receipt.employee === user?.name);
  }
  
  // Apply filters
  filteredReceipts = filteredReceipts.filter(receipt => {
    const matchesCompany = !filters.company || receipt.company === MOCK_COMPANIES.find(c => c.id.toString() === filters.company)?.name;
    const matchesType = !filters.receiptType || receipt.type === MOCK_RECEIPT_TYPES.find(t => t.id.toString() === filters.receiptType)?.name;
    const matchesReference = !filters.reference || receipt.reference.includes(filters.reference);
    const matchesSearch = !filters.searchQuery || 
      receipt.employee.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      receipt.company.toLowerCase().includes(filters.searchQuery.toLowerCase());
    
    return matchesCompany && matchesType && matchesReference && matchesSearch;
  });

  // Pagination
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredReceipts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReceipts = filteredReceipts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <AppLayout>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">
            {isAdmin ? "Histórico de Recibos" : "Meus Recibos"}
          </h1>
          <p className="text-muted-foreground">
            {isAdmin ? "Consulte todos os recibos gerados" : "Visualize seus recibos disponíveis"}
          </p>
        </div>
        
        {isAdmin && (
          <Button onClick={() => window.location.href = '/gerar-recibos'} className="mt-4 md:mt-0">
            <FileText className="mr-2 h-4 w-4" />
            Gerar Novos Recibos
          </Button>
        )}
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {isAdmin && (
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium">Empresa</label>
                <Select 
                  onValueChange={(value) => handleFilterChange("company", value)}
                  value={filters.company}
                >
                  <SelectTrigger id="company">
                    <SelectValue placeholder="Todas as empresas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas as empresas</SelectItem>
                    {MOCK_COMPANIES.map((company) => (
                      <SelectItem key={company.id} value={company.id.toString()}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="receiptType" className="text-sm font-medium">Tipo de Recibo</label>
              <Select 
                onValueChange={(value) => handleFilterChange("receiptType", value)}
                value={filters.receiptType}
              >
                <SelectTrigger id="receiptType">
                  <SelectValue placeholder="Todos os tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os tipos</SelectItem>
                  {MOCK_RECEIPT_TYPES.map((type) => (
                    <SelectItem key={type.id} value={type.id.toString()}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="reference" className="text-sm font-medium">Referência</label>
              <Input 
                id="reference"
                placeholder="ex: 05/2025"
                value={filters.reference}
                onChange={(e) => handleFilterChange("reference", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="search" className="text-sm font-medium">Busca</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  id="search"
                  placeholder={isAdmin ? "Funcionário, empresa..." : "Buscar..."}
                  className="pl-10"
                  value={filters.searchQuery}
                  onChange={handleSearchChange}
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
                <TableHead>{isAdmin ? "Funcionário" : "Tipo"}</TableHead>
                {isAdmin && <TableHead>Empresa</TableHead>}
                <TableHead>Tipo</TableHead>
                <TableHead>Referência</TableHead>
                <TableHead>Emissão</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead className="w-[100px] text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedReceipts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={isAdmin ? 7 : 6} className="text-center py-8">
                    <div className="flex flex-col items-center text-muted-foreground">
                      <FileArchive className="h-12 w-12 mb-2 opacity-30" />
                      <p>Nenhum recibo encontrado</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedReceipts.map((receipt) => (
                  <TableRow key={receipt.id}>
                    <TableCell className="font-medium">
                      {isAdmin ? receipt.employee : receipt.type}
                    </TableCell>
                    {isAdmin && <TableCell>{receipt.company}</TableCell>}
                    <TableCell>{receipt.type}</TableCell>
                    <TableCell>{receipt.reference}</TableCell>
                    <TableCell>{receipt.date}</TableCell>
                    <TableCell>{receipt.value}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button size="icon" variant="ghost" onClick={() => handleViewReceipt(receipt)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDownloadReceipt(receipt)}>
                        <Download className="h-4 w-4" />
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

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <div className="receipt-paper p-6 bg-white border rounded-md">
            <div className="receipt-header text-xl font-bold text-center mb-6 border-b pb-2">
              {selectedReceipt?.company} - {selectedReceipt?.type}
            </div>
            
            <div className="space-y-4">
              <div className="receipt-row flex justify-between">
                <span className="receipt-label font-medium">Referência:</span>
                <span className="receipt-value">{selectedReceipt?.reference}</span>
              </div>
              
              <div className="receipt-row flex justify-between">
                <span className="receipt-label font-medium">Data Emissão:</span>
                <span className="receipt-value">{selectedReceipt?.date}</span>
              </div>
              
              <div className="receipt-row flex justify-between">
                <span className="receipt-label font-medium">Funcionário:</span>
                <span className="receipt-value">{selectedReceipt?.employee}</span>
              </div>
              
              <div className="receipt-row flex justify-between">
                <span className="receipt-label font-medium">Valor:</span>
                <span className="receipt-value font-bold">{selectedReceipt?.value}</span>
              </div>
            </div>
            
            <div className="mt-8 pt-8">
              <div className="receipt-signature-line border-t border-dashed mt-10"></div>
              <div className="receipt-signature-text text-center text-sm text-gray-500 mt-2">Assinatura do Funcionário</div>
            </div>
            
            <div className="mt-6 text-right text-sm text-gray-500">
              Emitido em {selectedReceipt?.date}
            </div>
          </div>
          
          <div className="flex justify-center mt-4">
            <Button onClick={() => handleDownloadReceipt(selectedReceipt!)}>
              <Download className="mr-2 h-4 w-4" /> Baixar PDF
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default ReceiptHistory;
