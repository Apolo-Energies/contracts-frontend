// Used by auth.service (constructs responses locally)
export interface ApiResponse<T> {
  isSuccess: boolean;
  result: T;
  displayMessage: string;
  errorMessages: string[] | null;
  status: number;
}

// Contract endpoints: success → data directly, error → { isSuccess: false, error: string }
export interface ApiError {
  isSuccess: false;
  error: string;
}

export type ApiResult<T> = T | ApiError;

export function isApiError<T>(result: ApiResult<T>): result is ApiError {
  return (
    typeof result === "object" &&
    result !== null &&
    (result as ApiError).isSuccess === false
  );
}

export interface SignatureResult {
  requestId: string;
  signingUrl: string;
}

export interface ContractPreviewResult {
  contractId: string;
  sendToken: string;
}

export interface ValidateRecipientPayload {
  flowType: "Individual" | "Company";
  email: string;
  phone: string;
  dni: string;
  name: string;
  surnames: string;
  cif?: string | null;
  companyName?: string | null;
}

export interface ValidateRecipientResult {
  isValid: boolean;
  existingCustomerId: string | null;
  fieldErrors: Record<string, string>;
}
