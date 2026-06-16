"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/buttons/button";
import { useContratoStore } from "@/app/store/contracts/contracts.store";
import { getContractPreviewBlob, sendContractForSigning } from "@/app/services/Contracts/contract.service";
import { isApiError } from "@/app/services/interfaces/ApiResponse";
import { useAlertStore } from "@/app/store/ui/alert.store";
import { useLoadingStore } from "@/app/store/ui/loading.store";

export const PreviewComponent = () => {
    const router = useRouter();
    const { contractId, sendToken, setSignatureResult } = useContratoStore();
    const { showAlert } = useAlertStore();
    const { loading, setLoading } = useLoadingStore();
    const [signLater, setSignLater] = useState(false);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!contractId) {
            router.push("/");
            return;
        }

        let objectUrl: string;

        getContractPreviewBlob(contractId).then((result) => {
            if (isApiError(result)) {
                showAlert(result.error, "error");
                return;
            }
            objectUrl = URL.createObjectURL(result);
            setPdfUrl(objectUrl);
        });

        return () => {
            if (objectUrl) URL.revokeObjectURL(objectUrl);
        };
    }, [contractId]);

    const handleProceedToSign = async () => {
        if (!contractId || !sendToken) return;

        setLoading(true);
        try {
            const response = await sendContractForSigning(contractId, sendToken);
            if (isApiError(response)) {
                showAlert(response.error, "error");
                return;
            }

            setSignatureResult(response.requestId, response.signingUrl);
            router.push("/signature");
        } finally {
            setLoading(false);
        }
    };

    if (signLater) {
        return (
            <div className="flex items-center justify-center min-h-screen px-4">
                <Card className="w-full max-w-xl rounded-lg px-8 py-10 flex flex-col items-center gap-6 text-center">
                    <div className="space-y-2">
                        <p className="text-2xl font-semibold">Contrato guardado</p>
                        <p className="text-sm text-muted-foreground">
                            Tu contrato ha sido registrado. Recibirás un correo electrónico
                            cuando esté listo para firmar.
                        </p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => router.push("/")}>
                        Volver al inicio
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-start pt-8 pb-8 px-4">
            <Card className="w-full max-w-6xl rounded-lg px-6 py-6 flex flex-col gap-4">

                <div className="space-y-1">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Vista previa
                    </p>
                    <p className="text-2xl font-semibold">
                        Estás viendo una vista previa de tu contrato
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Revisa el documento antes de proceder a la firma. Ninguna acción
                        legal ha sido iniciada todavía.
                    </p>
                </div>

                {pdfUrl ? (
                    <iframe
                        src={pdfUrl}
                        className="w-full h-[78vh] border rounded-lg"
                    />
                ) : (
                    <div className="w-full h-[78vh] flex items-center justify-center border rounded-lg text-sm text-muted-foreground">
                        Cargando vista previa...
                    </div>
                )}

                <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2 border-t border-border">
                    <Button
                        size="sm"
                        onClick={handleProceedToSign}
                        disabled={loading || !pdfUrl}
                    >
                        {loading ? "Iniciando firma..." : "Proceder a firmar"}
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSignLater(true)}
                        disabled={loading}
                    >
                        Firmar más tarde
                    </Button>
                </div>

            </Card>
        </div>
    );
};
