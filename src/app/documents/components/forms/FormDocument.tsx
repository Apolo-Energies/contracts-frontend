import { DropzoneUpload } from "../upload/DropzoneUpload";
import { DocumentState } from "@/app/store/contracts/contracts.store";

interface Props {
    onFileSelect: (type: keyof DocumentState, file: File) => void;
    isCompany: boolean;
}

export const FormDocument = ({ onFileSelect, isCompany }: Props) => {
    return (
        <div className="grid grid-cols-1 gap-4">

            <DropzoneUpload
                label="DNI - Anverso"
                onFileSelect={(f) => onFileSelect("dni_front", f)}
            />

            <DropzoneUpload
                label="DNI - Reverso"
                onFileSelect={(f) => onFileSelect("dni_back", f)}
            />

            <DropzoneUpload
                label="Certificado AEAT"
                onFileSelect={(f) => onFileSelect("aeat", f)}
            />

            <DropzoneUpload
                label="Certificado Seguridad Social"
                onFileSelect={(f) => onFileSelect("ss", f)}
            />

            <DropzoneUpload
                label="Titularidad Bancaria"
                onFileSelect={(f) => onFileSelect("bank", f)}
            />

            {isCompany && (
                <DropzoneUpload
                    label="CIF de la empresa"
                    onFileSelect={(f) => onFileSelect("cif", f)}
                />
            )}

        </div>
    );
};

