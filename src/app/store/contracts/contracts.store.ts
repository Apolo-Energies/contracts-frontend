import { create } from "zustand";

export interface PersonState {
  type: "Individual" | "Company";
  dni?: string,
  name?: string,
  surnames?: string,
  address_1?: string,
  address_2?: string,
  email?: string,
  bank_account?: string,
  phone?: string,
  cif?: string,
  companyName?: string,
}

export interface DocumentState {
  dni_front?: File;
  dni_back?: File;
  aeat?: File;
  ss?: File;
  bank?: File;
  cif_file?: File;
}


interface ContractStore {
  person: PersonState | null;
  document: DocumentState | null;
  documentos?: { filePreview?: string; type?: string };

  requestId: string | null;
  signingUrl: string | null;

  setDatos: (data: PersonState) => void;
  setDocumentos: (data: DocumentState) => void;

  setSignatureResult: (requestId: string, signingUrl: string) => void;

  reset: () => void;
}

export const useContratoStore = create<ContractStore>((set) => ({
  person: null,
  document: null,
  documentos: undefined,

  requestId: null,
  signingUrl: null,

  setDatos: (data) => set({ person: data }),

  setDocumentos: (data) => set({ document: data }),

  setSignatureResult: (requestId, signingUrl) =>
    set({ requestId, signingUrl }),

  reset: () => set({
    person: null,
    document: null,
    documentos: undefined,
    requestId: null,
    signingUrl: null
  }),
}));
