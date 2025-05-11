
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Receipt, getReceipts, getReceipt, deleteReceipt, downloadPdf } from "@/services/receiptService";
import { getCompanies } from "@/services/companyService";
import { MOCK_RECEIPT_TYPES } from "@/services/employeeService";

interface UseReceiptHistoryProps {
  isAdmin: boolean;
  userName?: string | null; 
}

export const useReceiptHistory = ({ isAdmin, userName }: UseReceiptHistoryProps) => {
  const { toast } = useToast();
  
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [companies, setCompanies] = useState<{id: number, name: string}[]>([]);
  const [loading, setLoading] = useState(true);
  
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

  useEffect(() => {
    fetchCompanies();
    fetchReceipts();
  }, [isAdmin, userName]);

  const fetchCompanies = async () => {
    try {
      const fetchedCompanies = await getCompanies();
      setCompanies(fetchedCompanies);
    } catch (error) {
      console.error('Error fetching companies:', error);
      toast({
        title: "Erro ao carregar empresas",
        description: "Não foi possível buscar a lista de empresas.",
        variant: "destructive",
      });
    }
  };

  const fetchReceipts = async () => {
    setLoading(true);
    try {
      let data = await getReceipts();
      
      // If employee, show only their receipts
      if (!isAdmin && userName) {
        data = data.filter(receipt => receipt.employee === userName && !receipt.unified);
      }
      
      setReceipts(data);
    } catch (error) {
      console.error('Error fetching receipts:', error);
      toast({
        title: "Erro ao carregar recibos",
        description: "Não foi possível buscar a lista de recibos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (name: string, value: string | boolean) => {
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchQuery: e.target.value }));
    setCurrentPage(1); // Reset to first page when search changes
  };

  const handleViewReceipt = async (receipt: Receipt) => {
    setSelectedReceipt(receipt);
    
    try {
      // In a real implementation, you'd fetch the receipt details here
      // const detailedReceipt = await getReceipt(receipt.id);
      // setSelectedReceipt(detailedReceipt);
      
      if (receipt.unified) {
        setIsUnifiedPreviewOpen(true);
      } else {
        setIsPreviewOpen(true);
      }
    } catch (error) {
      console.error('Error fetching receipt details:', error);
      toast({
        title: "Erro ao carregar detalhes do recibo",
        description: "Não foi possível buscar os detalhes do recibo.",
        variant: "destructive",
      });
    }
  };
  
  const handleDownloadReceipt = async (receipt: Receipt) => {
    try {
      // In a real implementation, you would fetch the PDF here
      // const pdf = await getReceiptPdf(receipt.id);
      // downloadPdf(pdf, `recibo_${receipt.id}.pdf`);
      
      toast({
        title: "Recibo baixado",
        description: `O recibo de ${receipt.type} ${receipt.unified ? "unificado " : ""}foi baixado.`,
      });
    } catch (error) {
      console.error('Error downloading receipt:', error);
      toast({
        title: "Erro ao baixar recibo",
        description: "Não foi possível baixar o recibo.",
        variant: "destructive",
      });
    }
  };

  const handleSaveUnifiedReceipt = async () => {
    if (selectedReceipt?.unified) {
      try {
        // In a real implementation, you would save the unified receipt here
        
        toast({
          title: "Recibo unificado salvo",
          description: `O recibo unificado de ${selectedReceipt.type} foi salvo com sucesso.`,
        });
        setIsUnifiedPreviewOpen(false);
      } catch (error) {
        console.error('Error saving unified receipt:', error);
        toast({
          title: "Erro ao salvar recibo unificado",
          description: "Não foi possível salvar o recibo unificado.",
          variant: "destructive",
        });
      }
    }
  };

  // Filter receipts based on filters
  let filteredReceipts = [...receipts];
  
  // For admins, apply the unified filter if needed
  if (isAdmin && !filters.showUnified) {
    filteredReceipts = filteredReceipts.filter(receipt => !receipt.unified);
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
    companies,
    receiptTypes: MOCK_RECEIPT_TYPES,
    selectedReceipt,
    isPreviewOpen,
    isUnifiedPreviewOpen,
    currentPage,
    totalPages,
    paginatedReceipts,
    loading,
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
