import { ApiManager } from "../ApiManager/ApiManager";
import { ApiResponse, SignatureResult } from "../interfaces/ApiResponse";

export type CreateContractPayload = {
    email?: string;
    name?: string;
    phone?: string;
    flowType: number;
    contractType: "Individual" | "Company";
    day: string;
    month: string;
    year: string;
    dni?: string;
    address1?: string;
    address2?: string;
    cif?: string;
    contractEmail?: string;
    subject?: string;
    message?: string;
    surnames?: string;
    companyName?: string;
    bankAccount: string;
};

export interface DocumentState {
  // Identificación
  dni_front?: File;
  dni_back?: File;

  // Certificados fiscales
  aeat?: File;
  ss?: File;

  // Bancario
  bank?: File;

  // Empresa
  cif?: File;
}

export async function createContractSignature(
  payload: CreateContractPayload,
  documents: DocumentState
): Promise<ApiResponse<SignatureResult>> {

  const form = new FormData();

  Object.entries(payload).forEach(([k, v]) => {
    if (v !== undefined && v !== null) {
      form.append(k, String(v));
    }
  });

  Object.entries(documents).forEach(([key, value]) => {
    if (value instanceof File) {
      form.append(key, value, value.name);
    }
  });

  const res = await ApiManager.post<ApiResponse<SignatureResult>>(
    "/contracts/create",
    form,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  return res.data;
}
