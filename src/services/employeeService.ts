import apiClient from './apiClient';

export interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  company: string;
  empresaId?: number;
}

export interface ReceiptType {
  id: number;
  name: string;
}

export const getEmployees = async (empresaId?: number): Promise<Employee[]> => {
  const endpoint = empresaId ? `/funcionario?empresaId=${empresaId}` : '/funcionario';
  const response = await apiClient.get<Employee[]>(endpoint);
  return response.data;
};

export const getEmployee = async (id: number): Promise<Employee> => {
  const response = await apiClient.get<Employee>(`/funcionario/${id}`);
  return response.data;
};

export const createEmployee = async (employee: Omit<Employee, 'id'>): Promise<Employee> => {
  const response = await apiClient.post<Employee>('/funcionario', employee);
  return response.data;
};

export const updateEmployee = async (id: number, employee: Omit<Employee, 'id'>): Promise<Employee> => {
  const response = await apiClient.put<Employee>(`/funcionario/${id}`, employee);
  return response.data;
};

export const deleteEmployee = async (id: number): Promise<void> => {
  await apiClient.delete(`/funcionario/${id}`);
};

// Mock data that would normally come from an API (keeping for fallback)
export const MOCK_EMPLOYEES = [
  { id: 1, name: "João Silva", email: "joao.silva@techcorp.com", role: "Desenvolvedor", department: "TI", company: "TechCorp" },
  { id: 2, name: "Maria Oliveira", email: "maria.oliveira@techcorp.com", role: "Designer", department: "Design", company: "TechCorp" },
  { id: 3, name: "Pedro Santos", email: "pedro.santos@megasistemas.com", role: "Analista", department: "Financeiro", company: "Mega Sistemas" },
  { id: 4, name: "Ana Costa", email: "ana.costa@construtech.com", role: "Engenheira", department: "Engenharia", company: "Construtech" },
  { id: 5, name: "Carlos Pereira", email: "carlos.pereira@megasistemas.com", role: "Gerente", department: "Vendas", company: "Mega Sistemas" },
  { id: 6, name: "Lucia Ferreira", email: "lucia.ferreira@techcorp.com", role: "Analista", department: "RH", company: "TechCorp" },
  { id: 7, name: "Roberto Alves", email: "roberto.alves@construtech.com", role: "Arquiteto", department: "Projetos", company: "Construtech" },
  { id: 8, name: "Amanda Lima", email: "amanda.lima@techcorp.com", role: "Marketing", department: "Marketing", company: "TechCorp" },
];

export const MOCK_COMPANIES = [
  { id: 1, name: "TechCorp" },
  { id: 2, name: "Mega Sistemas" },
  { id: 3, name: "Construtech" },
];

export const MOCK_RECEIPT_TYPES = [
  { id: 1, name: "Vale Transporte" },
  { id: 2, name: "Vale Alimentação" },
  { id: 3, name: "Adiantamento" },
];
