
import { Save, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Receipt } from "./ReceiptTable";

interface ReceiptDialogsProps {
  selectedReceipt: Receipt | null;
  isPreviewOpen: boolean;
  isUnifiedPreviewOpen: boolean;
  onClosePreview: (open: boolean) => void;
  onCloseUnifiedPreview: (open: boolean) => void;
  onDownloadReceipt: (receipt: Receipt) => void;
  onSaveUnifiedReceipt: () => void;
}

const ReceiptDialogs = ({
  selectedReceipt,
  isPreviewOpen,
  isUnifiedPreviewOpen,
  onClosePreview,
  onCloseUnifiedPreview,
  onDownloadReceipt,
  onSaveUnifiedReceipt,
}: ReceiptDialogsProps) => {
  if (!selectedReceipt) return null;

  return (
    <>
      {/* Individual Receipt Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={onClosePreview}>
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
            <Button onClick={() => onDownloadReceipt(selectedReceipt)}>
              <Download className="mr-2 h-4 w-4" /> Baixar PDF
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Unified Receipt Preview Dialog */}
      <Dialog open={isUnifiedPreviewOpen} onOpenChange={onCloseUnifiedPreview}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Recibo Unificado</DialogTitle>
          </DialogHeader>
          
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
                <span className="receipt-label font-medium">Funcionários:</span>
                <span className="receipt-value">Múltiplos (Recibo Unificado)</span>
              </div>
              
              <div className="receipt-row flex justify-between">
                <span className="receipt-label font-medium">Valor Total:</span>
                <span className="receipt-value font-bold">{selectedReceipt?.value}</span>
              </div>

              <div className="mt-4 pt-4 border-t">
                <h3 className="font-medium mb-2">Detalhes por Funcionário:</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Funcionário</th>
                      <th className="text-right py-2">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedReceipt?.type.includes("Vale Transporte") ? (
                      <>
                        <tr>
                          <td className="py-2">João Silva</td>
                          <td className="text-right">R$ 220,00</td>
                        </tr>
                        <tr>
                          <td className="py-2">Maria Oliveira</td>
                          <td className="text-right">R$ 220,00</td>
                        </tr>
                        <tr>
                          <td className="py-2">Lucia Ferreira</td>
                          <td className="text-right">R$ 220,00</td>
                        </tr>
                      </>
                    ) : (
                      <>
                        <tr>
                          <td className="py-2">João Silva</td>
                          <td className="text-right">R$ 550,00</td>
                        </tr>
                        <tr>
                          <td className="py-2">Maria Oliveira</td>
                          <td className="text-right">R$ 550,00</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                  <tfoot>
                    <tr className="border-t">
                      <th className="text-left py-2">Total:</th>
                      <th className="text-right py-2">{selectedReceipt?.value}</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            
            <div className="mt-6 text-right text-sm text-gray-500">
              Emitido em {selectedReceipt?.date}
            </div>
          </div>
          
          <DialogFooter className="flex justify-between mt-4">
            <Button onClick={() => onSaveUnifiedReceipt()} variant="secondary">
              <Save className="mr-2 h-4 w-4" /> Salvar
            </Button>
            <Button onClick={() => onDownloadReceipt(selectedReceipt)}>
              <Download className="mr-2 h-4 w-4" /> Baixar PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReceiptDialogs;
