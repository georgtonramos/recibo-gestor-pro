
import apiClient from './apiClient';

export interface Receipt {
  id: number;
  company: string;
  type: string;
  reference: string;
  date: string;
  employee: string;
  value: string;
  unified?: boolean;
  empresaId?: number;
}

export interface EmployeeReceiptDetail {
  id: number;
  nome: string;
  cargo: string;
  dias: number;
  valor: number;
}

export interface MultipleReceiptRequest {
  empresaId: number;
  referencia: string;
  periodoInicio: string;
  periodoFim: string;
  valorDia: number;
  funcionarios: EmployeeReceiptDetail[];
}

export const getReceipts = async (): Promise<Receipt[]> => {
  const response = await apiClient.get<Receipt[]>('/recibo');
  return response.data;
};

export const getReceipt = async (id: number): Promise<Receipt> => {
  const response = await apiClient.get<Receipt>(`/recibo/${id}`);
  return response.data;
};

export const createReceipt = async (receipt: Omit<Receipt, 'id'>): Promise<Receipt> => {
  const response = await apiClient.post<Receipt>('/recibo', receipt);
  return response.data;
};

export const deleteReceipt = async (id: number): Promise<void> => {
  await apiClient.delete(`/recibo/${id}`);
};

export const generateMultipleReceipt = async (data: MultipleReceiptRequest): Promise<Blob> => {
  const response = await apiClient.post('/recibo/pdf-multiplo', data, {
    responseType: 'blob'
  });
  return response.data;
};

export const downloadPdf = (blob: Blob, filename: string = 'recibo.pdf'): void => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};
