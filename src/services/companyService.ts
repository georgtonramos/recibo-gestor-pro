import apiClient from './apiClient';

export interface Company {
  id: number;
  name: string;
  cnpj: string;
  address: string;
  contact: string;
}

export const getCompanies = async (): Promise<Company[]> => {
  const response = await apiClient.get<Company[]>('/empresa');
  return response.data;
};

export const getCompany = async (id: number): Promise<Company> => {
  const response = await apiClient.get<Company>(`/empresa/${id}`);
  return response.data;
};

export const createCompany = async (company: Omit<Company, 'id'>): Promise<Company> => {
  const response = await apiClient.post<Company>('/empresa', company);
  return response.data;
};

export const updateCompany = async (id: number, company: Omit<Company, 'id'>): Promise<Company> => {
  const response = await apiClient.put<Company>(`/empresa/${id}`, company);
  return response.data;
};

export const deleteCompany = async (id: number): Promise<void> => {
  await apiClient.delete(`/empresa/${id}`);
};

// Still keeping the mock data for fallback or testing purposes
export const MOCK_COMPANIES = [
  { id: 1, name: "TechCorp", cnpj: "12.345.678/0001-90", address: "Av. Paulista, 1000, São Paulo - SP", contact: "contato@techcorp.com.br" },
  { id: 2, name: "Mega Sistemas", cnpj: "98.765.432/0001-10", address: "Rua da Consolação, 200, São Paulo - SP", contact: "contato@megasistemas.com" },
  { id: 3, name: "Construtech", cnpj: "45.678.901/0001-23", address: "Av. Brigadeiro Faria Lima, 500, São Paulo - SP", contact: "contato@construtech.com.br" },
  { id: 4, name: "Global Services", cnpj: "56.789.012/0001-45", address: "Av. Rebouças, 1500, São Paulo - SP", contact: "contato@globalservices.com" },
  { id: 5, name: "Inova Tech", cnpj: "67.890.123/0001-56", address: "Rua Augusta, 1200, São Paulo - SP", contact: "contato@inovatech.com.br" },
];
