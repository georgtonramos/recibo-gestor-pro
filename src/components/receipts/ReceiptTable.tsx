
import { Eye, Download, FileArchive } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export type Receipt = {
  id: number;
  company: string;
  type: string;
  reference: string;
  date: string;
  employee: string;
  value: string;
  unified?: boolean;
};

interface ReceiptTableProps {
  receipts: Receipt[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onViewReceipt: (receipt: Receipt) => void;
  onDownloadReceipt: (receipt: Receipt) => void;
  isAdmin: boolean;
}

const ReceiptTable = ({
  receipts,
  currentPage,
  totalPages,
  onPageChange,
  onViewReceipt,
  onDownloadReceipt,
  isAdmin
}: ReceiptTableProps) => {
  return (
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
            {receipts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={isAdmin ? 7 : 6} className="text-center py-8">
                  <div className="flex flex-col items-center text-muted-foreground">
                    <FileArchive className="h-12 w-12 mb-2 opacity-30" />
                    <p>Nenhum recibo encontrado</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              receipts.map((receipt) => (
                <TableRow key={receipt.id} className={receipt.unified ? "bg-gray-50" : ""}>
                  <TableCell className="font-medium">
                    {isAdmin ? receipt.employee : receipt.type}
                  </TableCell>
                  {isAdmin && <TableCell>{receipt.company}</TableCell>}
                  <TableCell>
                    {receipt.type}
                    {receipt.unified && <span className="ml-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Unificado</span>}
                  </TableCell>
                  <TableCell>{receipt.reference}</TableCell>
                  <TableCell>{receipt.date}</TableCell>
                  <TableCell>{receipt.value}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button size="icon" variant="ghost" onClick={() => onViewReceipt(receipt)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => onDownloadReceipt(receipt)}>
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
                  onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                  aria-disabled={currentPage === 1}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={page === currentPage}
                    onClick={() => onPageChange(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                  aria-disabled={currentPage === totalPages}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default ReceiptTable;
