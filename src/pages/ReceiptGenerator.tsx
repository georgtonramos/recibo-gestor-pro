
import { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { FileText, Trash, Plus, Download } from "lucide-react";

const MOCK_COMPANIES = [
  { id: 1, name: "TechCorp" },
  { id: 2, name: "Mega Sistemas" },
  { id: 3, name: "Construtech" },
  { id: 4, name: "Global Services" },
  { id: 5, name: "Inova Tech" },
];

const MOCK_RECEIPT_TYPES = [
  { id: 1, name: "Vale Transporte" },
  { id: 2, name: "Vale Alimentação" },
  { id: 3, name: "Adiantamento" },
  { id: 4, name: "Pagamento" },
  { id: 5, name: "Outros" },
];

const INITIAL_EMPLOYEE = { id: Date.now(), name: "", position: "", days: "", value: "" };

const ReceiptGenerator = () => {
  const [formData, setFormData] = useState({
    companyId: "",
    receiptType: "",
    reference: "",
    startDate: "",
    endDate: "",
    employees: [INITIAL_EMPLOYEE]
  });
  
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEmployeeChange = (index: number, field: string, value: string) => {
    const newEmployees = [...formData.employees];
    newEmployees[index] = { ...newEmployees[index], [field]: value };
    setFormData(prev => ({ ...prev, employees: newEmployees }));
  };

  const addEmployee = () => {
    setFormData(prev => ({
      ...prev,
      employees: [...prev.employees, { ...INITIAL_EMPLOYEE, id: Date.now() }]
    }));
  };

  const removeEmployee = (index: number) => {
    if (formData.employees.length > 1) {
      const newEmployees = formData.employees.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, employees: newEmployees }));
    }
  };

  const generateReceipts = () => {
    // In a real app, this would call the API to generate receipts
    setShowPreview(true);
    toast({
      title: "Recibos gerados com sucesso!",
      description: `${formData.employees.length} recibos foram gerados.`,
    });
  };

  const selectedCompany = MOCK_COMPANIES.find(c => c.id.toString() === formData.companyId);
  const selectedType = MOCK_RECEIPT_TYPES.find(t => t.id.toString() === formData.receiptType);

  const isFormValid = () => {
    return (
      formData.companyId !== "" &&
      formData.receiptType !== "" &&
      formData.reference !== "" &&
      formData.startDate !== "" &&
      formData.endDate !== "" &&
      formData.employees.every(e => e.name && e.position && e.value)
    );
  };

  return (
    <AppLayout>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Geração de Recibos</h1>
          <p className="text-muted-foreground">Crie múltiplos recibos para benefícios</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Informações Gerais</CardTitle>
              <CardDescription>Detalhes para os recibos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Empresa</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange("companyId", value)}
                    value={formData.companyId}
                  >
                    <SelectTrigger id="company">
                      <SelectValue placeholder="Selecione a empresa" />
                    </SelectTrigger>
                    <SelectContent>
                      {MOCK_COMPANIES.map((company) => (
                        <SelectItem key={company.id} value={company.id.toString()}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="receiptType">Tipo de Recibo</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange("receiptType", value)}
                    value={formData.receiptType}
                  >
                    <SelectTrigger id="receiptType">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {MOCK_RECEIPT_TYPES.map((type) => (
                        <SelectItem key={type.id} value={type.id.toString()}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reference">Referência</Label>
                  <Input 
                    id="reference"
                    name="reference"
                    placeholder="ex: 05/2025"
                    value={formData.reference}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="startDate">Data Início</Label>
                  <Input 
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endDate">Data Fim</Label>
                  <Input 
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Funcionários</CardTitle>
                <CardDescription>Adicione os funcionários para gerar os recibos</CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={addEmployee}
              >
                <Plus className="h-4 w-4 mr-1" /> Adicionar
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.employees.map((employee, index) => (
                <div key={employee.id} className="space-y-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Funcionário #{index + 1}</h4>
                    {formData.employees.length > 1 && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeEmployee(index)}
                        className="text-red-500 h-8 w-8 p-0"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`employee-name-${index}`}>Nome</Label>
                      <Input 
                        id={`employee-name-${index}`}
                        value={employee.name}
                        onChange={(e) => handleEmployeeChange(index, "name", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`employee-position-${index}`}>Cargo</Label>
                      <Input 
                        id={`employee-position-${index}`}
                        value={employee.position}
                        onChange={(e) => handleEmployeeChange(index, "position", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`employee-days-${index}`}>Dias</Label>
                      <Input 
                        id={`employee-days-${index}`}
                        value={employee.days}
                        onChange={(e) => handleEmployeeChange(index, "days", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`employee-value-${index}`}>Valor (R$)</Label>
                      <Input 
                        id={`employee-value-${index}`}
                        value={employee.value}
                        onChange={(e) => handleEmployeeChange(index, "value", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancelar</Button>
              <Button 
                onClick={generateReceipts}
                className="bg-receipt-600 hover:bg-receipt-700"
                disabled={!isFormValid()}
              >
                <FileText className="mr-2 h-4 w-4" />
                Gerar Recibos
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Pré-visualização</CardTitle>
              <CardDescription>Modelo do recibo gerado</CardDescription>
            </CardHeader>
            <CardContent>
              {!showPreview ? (
                <div className="border rounded-lg p-6 text-center flex flex-col items-center justify-center min-h-[300px]">
                  <FileText className="h-16 w-16 text-gray-300 mb-2" />
                  <p className="text-muted-foreground">
                    Preencha os dados e clique em "Gerar Recibos" para visualizar
                  </p>
                </div>
              ) : (
                <div className="receipt-paper">
                  <div className="receipt-header">
                    {selectedCompany?.name || "Empresa"} - {selectedType?.name || "Tipo de Recibo"}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="receipt-row">
                      <span className="receipt-label">Referência:</span>
                      <span className="receipt-value">{formData.reference || "05/2025"}</span>
                    </div>
                    
                    <div className="receipt-row">
                      <span className="receipt-label">Período:</span>
                      <span className="receipt-value">
                        {formData.startDate || "01/05/2025"} a {formData.endDate || "31/05/2025"}
                      </span>
                    </div>
                    
                    <div className="receipt-row">
                      <span className="receipt-label">Funcionário:</span>
                      <span className="receipt-value">{formData.employees[0].name || "Nome do Funcionário"}</span>
                    </div>
                    
                    <div className="receipt-row">
                      <span className="receipt-label">Cargo:</span>
                      <span className="receipt-value">{formData.employees[0].position || "Cargo"}</span>
                    </div>
                    
                    <div className="receipt-row">
                      <span className="receipt-label">Dias:</span>
                      <span className="receipt-value">{formData.employees[0].days || "22"}</span>
                    </div>
                    
                    <div className="receipt-row">
                      <span className="receipt-label">Valor:</span>
                      <span className="receipt-value">R$ {formData.employees[0].value || "250,00"}</span>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-8">
                    <div className="receipt-signature-line"></div>
                    <div className="receipt-signature-text">Assinatura do Funcionário</div>
                  </div>
                  
                  <div className="mt-4 text-right text-sm text-gray-500">
                    Emitido em {new Date().toLocaleDateString('pt-BR')}
                  </div>
                </div>
              )}
            </CardContent>
            {showPreview && (
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" /> Baixar PDF
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default ReceiptGenerator;
