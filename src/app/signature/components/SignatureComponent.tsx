"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from '@/components/ui/Card';
import { Button } from "@/components/buttons/button";
import { useContratoStore } from "@/app/store/contracts/contracts.store";
import { BrandLoader } from "@/components/brand-loader/BrandLoader";

const COMPLETION_EVENTS = ["signed", "completed", "close"];
const REDIRECT_DELAY = 60;

export const SignatureComponent = () => {

    const router = useRouter();
    const { signingUrl, person } = useContratoStore();
    const [iframeReady, setIframeReady] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [done, setDone] = useState(false);
    const [countdown, setCountdown] = useState(REDIRECT_DELAY);

    useEffect(() => {
        if (!signingUrl) router.push("/");
    }, [signingUrl]);

    useEffect(() => {
        const handleMessage = (e: MessageEvent) => {
            const event = typeof e.data === "string" ? e.data : e.data?.event;
            if (COMPLETION_EVENTS.includes(event)) setShowButton(true);
        };
        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, []);

    useEffect(() => {
        if (!done) return;
        const interval = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) { clearInterval(interval); router.push("/"); return 0; }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [done]);

    if (done) {
        return (
            <div className="flex items-center justify-center min-h-screen px-4">
                <Card className="w-full max-w-lg rounded-lg px-10 py-12 flex flex-col items-center text-center space-y-6">

                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-foreground/10">
                        <svg className="w-8 h-8 text-foreground" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    </div>

                    <div className="space-y-2">
                        <p className="text-2xl font-semibold">¡Ya casi estás dentro!</p>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Tu contrato ha sido firmado correctamente. En breve recibirás un correo en{" "}
                            <span className="font-medium text-foreground">{person?.email ?? "tu dirección de correo"}</span>{" "}
                            con un enlace para acceder al portal de colaboradores de Apolo Energies.
                        </p>
                    </div>

                    <div className="w-full rounded-lg border border-border bg-muted/40 px-5 py-4 text-left space-y-1">
                        <p className="text-xs font-medium text-foreground">¿No encuentras el correo?</p>
                        <p className="text-xs text-muted-foreground">
                            Revisa la carpeta de <span className="font-medium">spam o correo no deseado</span>. Si en 10 minutos no ha llegado, contacta con tu responsable en Apolo.
                        </p>
                    </div>

                    <p className="text-xs text-muted-foreground">
                        Redirigiendo automáticamente en <span className="font-medium text-foreground">{countdown}s</span>
                    </p>

                </Card>
            </div>
        );
    }

    return (
        <>
            <BrandLoader
                visible={!iframeReady && !!signingUrl}
                fullscreen
                size={200}
                title="Preparando firma"
                description="Estamos cargando el entorno seguro de firma. Por favor espera."
                microcopy="No cierres esta ventana"
                showWordmark={false}
            />

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
                            onLoad={() => setIframeReady(true)}
                        />
                    )}

                    {showButton && (
                        <div className="flex justify-center pt-2">
                            <Button size="sm" onClick={() => setDone(true)}>
                                He completado la firma
                            </Button>
                        </div>
                    )}

                </Card>
            </div>
        </>
    );
};
