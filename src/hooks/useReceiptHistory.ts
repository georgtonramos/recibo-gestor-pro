
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Receipt } from "@/components/receipts/ReceiptTable";

// Mock data
const MOCK_RECEIPT_TYPES = [
  { id: 1, name: "Vale Transporte" },
  { id: 2, name: "Vale Alimentação" },
  { id: 3, name: "Adiantamento" },
];

const MOCK_RECEIPTS = [
  { id: 1, company: "TechCorp", type: "Vale Transporte", reference: "05/2025", date: "01/05/2025", employee: "João Silva", value: "R$ 220,00", unified: false },
  { id: 2, company: "TechCorp", type: "Vale Alimentação", reference: "05/2025", date: "01/05/2025", employee: "João Silva", value: "R$ 550,00", unified: false },
  { id: 3, company: "TechCorp", type: "Vale Transporte", reference: "05/2025", date: "01/05/2025", employee: "Maria Oliveira", value: "R$ 220,00", unified: false },
  { id: 4, company: "Mega Sistemas", type: "Vale Alimentação", reference: "05/2025", date: "02/05/2025", employee: "Pedro Santos", value: "R$ 600,00", unified: false },
  { id: 5, company: "Construtech", type: "Vale Transporte", reference: "04/2025", date: "05/04/2025", employee: "Ana Costa", value: "R$ 180,00", unified: false },
  { id: 6, company: "Mega Sistemas", type: "Adiantamento", reference: "04/2025", date: "10/04/2025", employee: "Carlos Pereira", value: "R$ 1.500,00", unified: false },
  { id: 7, company: "TechCorp", type: "Vale Alimentação", reference: "04/2025", date: "01/04/2025", employee: "Lucia Ferreira", value: "R$ 550,00", unified: false },
  { id: 8, company: "Construtech", type: "Vale Transporte", reference: "04/2025", date: "05/04/2025", employee: "Roberto Alves", value: "R$ 180,00", unified: false },
  { id: 9, company: "TechCorp", type: "Vale Transporte", reference: "03/2025", date: "01/03/2025", employee: "João Silva", value: "R$ 220,00", unified: false },
  { id: 10, company: "TechCorp", type: "Vale Alimentação", reference: "03/2025", date: "01/03/2025", employee: "Maria Oliveira", value: "R$ 550,00", unified: false },
  { id: 11, company: "Mega Sistemas", type: "Vale Transporte", reference: "03/2025", date: "02/03/2025", employee: "Pedro Santos", value: "R$ 200,00", unified: false },
  { id: 12, company: "Construtech", type: "Vale Alimentação", reference: "03/2025", date: "03/03/2025", employee: "Ana Costa", value: "R$ 480,00", unified: false },
  // Adding unified receipt examples
  { id: 13, company: "TechCorp", type: "Unificado - Vale Transporte", reference: "05/2025", date: "01/05/2025", employee: "Múltiplos", value: "R$ 660,00", unified: true },
  { id: 14, company: "TechCorp", type: "Unificado - Vale Alimentação", reference: "05/2025", date: "01/05/2025", employee: "Múltiplos", value: "R$ 1.100,00", unified: true },
];

interface UseReceiptHistoryProps {
  isAdmin: boolean;
  userName?: string | null; 
}

export const useReceiptHistory = ({ isAdmin, userName }: UseReceiptHistoryProps) => {
  const { toast } = useToast();
  
  const [filters, setFilters] = useState({
    company: "all",
    receiptType: "all",
    reference: "",
    searchQuery: "",
    showUnified: true
  });
  
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isUnifiedPreviewOpen, setIsUnifiedPreviewOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (name: string, value: string | boolean) => {
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchQuery: e.target.value }));
    setCurrentPage(1); // Reset to first page when search changes
  };

  const handleViewReceipt = (receipt: Receipt) => {
    setSelectedReceipt(receipt);
    if (receipt.unified) {
      setIsUnifiedPreviewOpen(true);
    } else {
      setIsPreviewOpen(true);
    }
  };
  
  const handleDownloadReceipt = (receipt: Receipt) => {
    // In a real app, this would download the PDF
    toast({
      title: "Recibo baixado",
      description: `O recibo de ${receipt.type} ${receipt.unified ? "unificado " : ""}foi baixado.`,
    });
  };

  const handleSaveUnifiedReceipt = () => {
    if (selectedReceipt?.unified) {
      toast({
        title: "Recibo unificado salvo",
        description: `O recibo unificado de ${selectedReceipt.type} foi salvo com sucesso.`,
      });
      setIsUnifiedPreviewOpen(false);
    }
  };

  // Filter receipts based on user role and filters
  let filteredReceipts = [...MOCK_RECEIPTS];
  
  // If employee, show only their receipts (never unified ones)
  if (!isAdmin && userName) {
    filteredReceipts = filteredReceipts.filter(receipt => receipt.employee === userName && !receipt.unified);
  } else {
    // For admins, apply the unified filter if needed
    if (!filters.showUnified) {
      filteredReceipts = filteredReceipts.filter(receipt => !receipt.unified);
    }
  }
  
  // Apply other filters
  filteredReceipts = filteredReceipts.filter(receipt => {
    const matchesCompany = filters.company === "all" || receipt.company === filters.company;
    
    const matchesType = filters.receiptType === "all" || 
      (receipt.unified 
        ? receipt.type.includes(MOCK_RECEIPT_TYPES.find(t => t.id.toString() === filters.receiptType)?.name || "")
        : receipt.type === MOCK_RECEIPT_TYPES.find(t => t.id.toString() === filters.receiptType)?.name);
    
    const matchesReference = !filters.reference || receipt.reference.includes(filters.reference);
    
    const matchesSearch = !filters.searchQuery || 
      (receipt.unified 
        ? receipt.type.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
          receipt.company.toLowerCase().includes(filters.searchQuery.toLowerCase()) 
        : receipt.employee.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
          receipt.company.toLowerCase().includes(filters.searchQuery.toLowerCase()));
    
    return matchesCompany && matchesType && matchesReference && matchesSearch;
  });

  // Pagination
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredReceipts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReceipts = filteredReceipts.slice(startIndex, startIndex + itemsPerPage);

  return {
    filters,
    selectedReceipt,
    isPreviewOpen,
    isUnifiedPreviewOpen,
    currentPage,
    totalPages,
    paginatedReceipts,
    handleFilterChange,
    handleSearchChange,
    handleViewReceipt,
    handleDownloadReceipt,
    handleSaveUnifiedReceipt,
    setCurrentPage,
    setIsPreviewOpen,
    setIsUnifiedPreviewOpen,
  };
};
