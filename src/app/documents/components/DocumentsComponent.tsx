"use client";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/Progress";
import { FormDocument } from "./forms/FormDocument";
import { Button } from "@/components/buttons/button";
import { Card } from "@/components/ui/Card";
import { useContratoStore, DocumentState } from "@/app/store/contracts/contracts.store";
import { useState } from "react";
import { createContractSignature } from "@/app/services/Contracts/contract.service";

export const DocumentsComponent = () => {
    const router = useRouter();
    const { person, setDocumentos, setSignatureResult } = useContratoStore();

    const [documents, setDocuments] = useState<DocumentState>({});
    const [loading, setLoading] = useState(false);

    if (!person) return null;

    const handleFileSelect = (type: keyof DocumentState, file: File) => {
        setDocuments((prev) => ({
            ...prev,
            [type]: file,
        }));
    };

    const requiredDocs =
        person.type === "empresa"
            ? ["dni_front", "dni_back", "aeat", "ss", "bank", "cif"]
            : ["dni_front", "dni_back", "aeat", "ss", "bank"];

    const progress = Math.round(
        (requiredDocs.filter((d) => documents[d as keyof DocumentState]).length /
            requiredDocs.length) *
        100
    );

    const onSubmitFinal = async () => {
        const missing = requiredDocs.filter(
            (d) => !documents[d as keyof DocumentState]
        );

        if (missing.length) {
            alert("Faltan documentos obligatorios");
            return;
        }

        setLoading(true);

        try {
            // Guardamos SOLO documentos
            setDocumentos(documents);

            const now = new Date();

            const payload = {
                email: person.email,
                name: person.name,
                phone: person.phone,
                surnames: person.surnames,
                flowType: 0,
                contractType: person.type,
                day: String(now.getDate()).padStart(2, "0"),
                month: now
                    .toLocaleString("es-ES", { month: "long" })
                    .replace(/^./, (c) => c.toUpperCase()),
                year: String(new Date().getFullYear() % 10),
                dni: person.dni ?? "",
                address1: person.address_1 ?? "",
                address2: person.address_2 ?? "",
                cif: person.cif ?? "",
                contractEmail: person.email,
                companyName: person.companyName ?? "",
                subject: "Contrato Colaboración",
                message: "Por favor firma el contrato.",
            };

            const result = await createContractSignature(payload, documents);


            setSignatureResult(result.requestId, result.signingUrl ?? result.url);
            router.push("/signature");
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="flex items-center justify-center min-h-screen px-4">
            <Card className="w-full max-w-xl rounded-lg px-8 py-8 flex flex-col max-h-[90vh]">

                {/* HEADER - NO SCROLL */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Documentación</span>
                        <span>{progress}%</span>
                    </div>
                    <Progress value={progress} />
                </div>

                {/* BODY - SCROLL SOLO AQUÍ */}
                <div className="flex-1 overflow-y-auto mt-4 pr-1">
                    <FormDocument
                        onFileSelect={handleFileSelect}
                        isCompany={person.type === "empresa"}
                    />
                </div>

                {/* FOOTER - NO SCROLL */}
                <div className="border-t border-border pt-4 mt-4 flex justify-center">
                    <Button size="sm" onClick={onSubmitFinal} disabled={loading}>
                        {loading ? "Generando..." : "Siguiente"}
                    </Button>
                </div>

            </Card>
        </div>

    );
};
