import { ApiManager } from "../ApiManager/ApiManager";
import { ApiError, ApiResult, ContractPreviewResult, SignatureResult, ValidateRecipientPayload, ValidateRecipientResult } from "../interfaces/ApiResponse";

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
    postalCode?: string;
    cif?: string;
    contractEmail?: string;
    subject?: string;
    message?: string;
    surnames?: string;
    companyName?: string;
    bankAccount: string;
    kind: number;
};

export interface DocumentState {
  dni_front?: File;
  dni_back?: File;
  aeat?: File;
  ss?: File;
  bank?: File;
  cif?: File;
  constitution_deed?: File;
}

function extractError(e: unknown): ApiError {
  const axiosErr = e as { response?: { data?: { error?: string } } };
  return { isSuccess: false, error: axiosErr?.response?.data?.error ?? "Error inesperado" };
}

export async function createContractPreview(
  payload: CreateContractPayload,
  documents: DocumentState
): Promise<ApiResult<ContractPreviewResult>> {
  try {
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

    const res = await ApiManager.post<ApiResult<ContractPreviewResult>>(
      "/contracts/create",
      form,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    return res.data;
  } catch (e) {
    return extractError(e);
  }
}

export async function getContractPreviewBlob(contractId: string): Promise<Blob | ApiError> {
  try {
    const res = await ApiManager.get(`/contracts/${contractId}/preview`, {
      responseType: "blob",
    });
    return res.data as Blob;
  } catch (e) {
    return extractError(e);
  }
}

export async function validateRecipient(
  payload: ValidateRecipientPayload
): Promise<ValidateRecipientResult> {
  try {
    const res = await ApiManager.post<ValidateRecipientResult>(
      "/contracts/validate-recipient",
      payload
    );
    return res.data;
  } catch (e) {
    const axiosErr = e as { response?: { data?: ValidateRecipientResult } };
    if (axiosErr?.response?.data) return axiosErr.response.data;
    return { isValid: false, existingCustomerId: null, fieldErrors: { general: "Error inesperado al validar" } };
  }
}

export async function sendContractForSigning(
  contractId: string,
  sendToken: string
): Promise<ApiResult<SignatureResult>> {
  try {
    const res = await ApiManager.post<ApiResult<SignatureResult>>(
      `/contracts/${contractId}/send`,
      {},
      { params: { sendToken } }
    );
    return res.data;
  } catch (e) {
    return extractError(e);
  }
}
