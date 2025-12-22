"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from '@/components/ui/Card';
import { useContratoStore } from "@/app/store/contracts/contracts.store";

export const SignatureComponent = () => {

    const router = useRouter();
    const { signingUrl } = useContratoStore();

    // Si no hay URL, regresamos a documentos
    useEffect(() => {
        if (!signingUrl) {
            router.push("/dashboard");
        }
    }, [signingUrl]);

    return (
        <div className="flex flex-col items-center justify-start pt-20">
            <Card className="w-3/4 max-w-3xl rounded-lg px-10 py-10 space-y-6">

                <div className='px-1'>
                    <p className='text-2xl font-semibold'>
                        Firma el Contrato de Colaboración
                    </p>
                    <p className='text-[14px] text-muted-foreground'>
                        Revisa el documento y procede a firmar.
                    </p>
                </div>

                {signingUrl && (
                    <iframe
                        src={signingUrl}
                        className="w-full h-[75vh] border rounded-lg"
                        allow="camera; microphone"
                    />
                )}

            </Card>
        </div>
    );
};
