
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Company {
  id: number;
  name: string;
}

interface EmployeeFilterProps {
  companies: Company[];
  searchQuery: string;
  selectedCompany: string;
  onSearchChange: (query: string) => void;
  onCompanyChange: (company: string) => void;
}

const EmployeeFilter = ({
  companies,
  searchQuery,
  selectedCompany,
  onSearchChange,
  onCompanyChange,
}: EmployeeFilterProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Filtros</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="company" className="text-sm font-medium">Empresa</label>
            <Select 
              onValueChange={onCompanyChange}
              value={selectedCompany}
            >
              <SelectTrigger id="company">
                <SelectValue placeholder="Todas as empresas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as empresas</SelectItem>
                {companies.map((company) => (
                  <SelectItem key={company.id} value={company.name}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="search" className="text-sm font-medium">Busca</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="search"
                placeholder="Nome, email, cargo..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeFilter;
