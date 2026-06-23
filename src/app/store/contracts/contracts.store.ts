import { create } from "zustand";

export interface PersonState {
  type: "Individual" | "Company";
  dni?: string;
  name?: string;
  surname1?: string;
  surname2?: string;
  legalStreetType?: string;
  legalStreetName?: string;
  legalNumber?: string;
  legalCity?: string;
  postalCodeLegal?: string;
  notificationStreetType?: string;
  notificationStreetName?: string;
  notificationNumber?: string;
  notificationCity?: string;
  postalCodeNotification?: string;
  email?: string;
  bank_account?: string;
  phone?: string;
  cif?: string;
  companyName?: string;
}

export interface DocumentState {
  dni_front?: File;
  dni_back?: File;
  aeat?: File;
  ss?: File;
  bank?: File;
  cif_file?: File;
  constitution_deed?: File;
}


interface ContractStore {
  person: PersonState | null;
  document: DocumentState | null;
  documentos?: { filePreview?: string; type?: string };

  contractId: string | null;
  sendToken: string | null;

  requestId: string | null;
  signingUrl: string | null;

  setDatos: (data: PersonState) => void;
  setDocumentos: (data: DocumentState) => void;

  setContractResult: (contractId: string, sendToken: string) => void;
  setSignatureResult: (requestId: string, signingUrl: string) => void;

  reset: () => void;
}

export const useContratoStore = create<ContractStore>((set) => ({
  person: null,
  document: null,
  documentos: undefined,

  contractId: null,
  sendToken: null,

  requestId: null,
  signingUrl: null,

  setDatos: (data) => set({ person: data }),

  setDocumentos: (data) => set({ document: data }),

  setContractResult: (contractId, sendToken) => set({ contractId, sendToken }),

  setSignatureResult: (requestId, signingUrl) =>
    set({ requestId, signingUrl }),

  reset: () => set({
    person: null,
    document: null,
    documentos: undefined,
    contractId: null,
    sendToken: null,
    requestId: null,
    signingUrl: null,
  }),
}));
