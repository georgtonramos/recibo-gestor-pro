
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
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

interface ReceiptFiltersProps {
  filters: {
    company: string;
    receiptType: string;
    reference: string;
    searchQuery: string;
    showUnified: boolean;
  };
  onFilterChange: (name: string, value: string | boolean) => void;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isAdmin: boolean;
}

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

const ReceiptFilters = ({ filters, onFilterChange, onSearchChange, isAdmin }: ReceiptFiltersProps) => {
  return (
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
                onValueChange={(value) => onFilterChange("company", value)}
                value={filters.company}
              >
                <SelectTrigger id="company">
                  <SelectValue placeholder="Todas as empresas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as empresas</SelectItem>
                  {MOCK_COMPANIES.map((company) => (
                    <SelectItem key={company.id} value={company.name}>
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
              onValueChange={(value) => onFilterChange("receiptType", value)}
              value={filters.receiptType}
            >
              <SelectTrigger id="receiptType">
                <SelectValue placeholder="Todos os tipos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
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
              onChange={(e) => onFilterChange("reference", e.target.value)}
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
                onChange={onSearchChange}
              />
            </div>
          </div>
        </div>
        
        {isAdmin && (
          <div className="mt-4 flex items-center">
            <input 
              type="checkbox" 
              id="showUnified" 
              className="mr-2" 
              checked={filters.showUnified} 
              onChange={(e) => onFilterChange("showUnified", e.target.checked)}
            />
            <label htmlFor="showUnified" className="text-sm font-medium">Exibir recibos unificados</label>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReceiptFilters;
