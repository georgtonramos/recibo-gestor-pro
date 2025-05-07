
import { useState } from "react";
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
import { FileText, Eye, Download, Search } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

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
  const [filters, setFilters] = useState({
    company: "",
    receiptType: "",
    reference: "",
    searchQuery: "",
  });
  
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchQuery: e.target.value }));
  };

  const handleViewReceipt = (receipt: Receipt) => {
    setSelectedReceipt(receipt);
    setIsPreviewOpen(true);
  };

  const filteredReceipts = MOCK_RECEIPTS.filter(receipt => {
    const matchesCompany = !filters.company || receipt.company === MOCK_COMPANIES.find(c => c.id.toString() === filters.company)?.name;
    const matchesType = !filters.receiptType || receipt.type === MOCK_RECEIPT_TYPES.find(t => t.id.toString() === filters.receiptType)?.name;
    const matchesReference = !filters.reference || receipt.reference.includes(filters.reference);
    const matchesSearch = !filters.searchQuery || 
      receipt.employee.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      receipt.company.toLowerCase().includes(filters.searchQuery.toLowerCase());
    
    return matchesCompany && matchesType && matchesReference && matchesSearch;
  });

  return (
    <AppLayout>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Histórico de Recibos</h1>
          <p className="text-muted-foreground">Consulte todos os recibos gerados</p>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  placeholder="Funcionário, empresa..."
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
                <TableHead>Funcionário</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Referência</TableHead>
                <TableHead>Emissão</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead className="w-[100px] text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReceipts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex flex-col items-center text-muted-foreground">
                      <FileText className="h-12 w-12 mb-2 opacity-30" />
                      <p>Nenhum recibo encontrado</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredReceipts.map((receipt) => (
                  <TableRow key={receipt.id}>
                    <TableCell className="font-medium">{receipt.employee}</TableCell>
                    <TableCell>{receipt.company}</TableCell>
                    <TableCell>{receipt.type}</TableCell>
                    <TableCell>{receipt.reference}</TableCell>
                    <TableCell>{receipt.date}</TableCell>
                    <TableCell>{receipt.value}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button size="icon" variant="ghost" onClick={() => handleViewReceipt(receipt)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <div className="receipt-paper">
            <div className="receipt-header">
              {selectedReceipt?.company} - {selectedReceipt?.type}
            </div>
            
            <div className="space-y-4">
              <div className="receipt-row">
                <span className="receipt-label">Referência:</span>
                <span className="receipt-value">{selectedReceipt?.reference}</span>
              </div>
              
              <div className="receipt-row">
                <span className="receipt-label">Data Emissão:</span>
                <span className="receipt-value">{selectedReceipt?.date}</span>
              </div>
              
              <div className="receipt-row">
                <span className="receipt-label">Funcionário:</span>
                <span className="receipt-value">{selectedReceipt?.employee}</span>
              </div>
              
              <div className="receipt-row">
                <span className="receipt-label">Valor:</span>
                <span className="receipt-value">{selectedReceipt?.value}</span>
              </div>
            </div>
            
            <div className="mt-8 pt-8">
              <div className="receipt-signature-line"></div>
              <div className="receipt-signature-text">Assinatura do Funcionário</div>
            </div>
            
            <div className="mt-4 text-right text-sm text-gray-500">
              Emitido em {selectedReceipt?.date}
            </div>
          </div>
          
          <div className="flex justify-center mt-4">
            <Button className="bg-receipt-600 hover:bg-receipt-700">
              <Download className="mr-2 h-4 w-4" /> Baixar PDF
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default ReceiptHistory;
