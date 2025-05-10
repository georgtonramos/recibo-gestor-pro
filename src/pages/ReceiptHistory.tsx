
import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import ReceiptFilters from "@/components/receipts/ReceiptFilters";
import ReceiptTable from "@/components/receipts/ReceiptTable";
import ReceiptDialogs from "@/components/receipts/ReceiptDialogs";
import { useReceiptHistory } from "@/hooks/useReceiptHistory";

const ReceiptHistory = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  
  const {
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
  } = useReceiptHistory({ isAdmin, userName: user?.name });

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

      <ReceiptFilters 
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
        isAdmin={isAdmin}
      />

      <ReceiptTable 
        receipts={paginatedReceipts}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onViewReceipt={handleViewReceipt}
        onDownloadReceipt={handleDownloadReceipt}
        isAdmin={isAdmin}
      />

      <ReceiptDialogs 
        selectedReceipt={selectedReceipt}
        isPreviewOpen={isPreviewOpen}
        isUnifiedPreviewOpen={isUnifiedPreviewOpen}
        onClosePreview={setIsPreviewOpen}
        onCloseUnifiedPreview={setIsUnifiedPreviewOpen}
        onDownloadReceipt={handleDownloadReceipt}
        onSaveUnifiedReceipt={handleSaveUnifiedReceipt}
      />
    </AppLayout>
  );
};

export default ReceiptHistory;
