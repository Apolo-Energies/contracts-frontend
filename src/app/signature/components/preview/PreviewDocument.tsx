"use client";

import { useContratoStore } from "@/app/store/contracts/contracts.store";
import Image from "next/image";

export const PreviewDocument = () => {

    const { documentos } = useContratoStore();
    const fileUrl = documentos?.filePreview;

    const isPdf =
        documentos?.type === "application/pdf" ||
        fileUrl?.toLowerCase().endsWith(".pdf");

    return (
        <div className="w-full border rounded-xl bg-card shadow-inner px-0 py-6 flex justify-center">
            {!fileUrl ? (
                <p className="text-muted-foreground text-sm">
                    No se ha cargado ningún archivo
                </p>
            ) : (
                <>
                    {isPdf ? (
                        <iframe
                            src={fileUrl}
                            className="w-full h-[500px] rounded-md border border-border"
                            title="PDF Preview"
                        />
                    ) : (
                        <Image
                            src={fileUrl}
                            width={1200}
                            height={800}
                            alt="Documento"
                            className="rounded-md border border-border max-h-[700px] object-contain"
                        />
                    )}
                </>
            )}
        </div>
    );
};
