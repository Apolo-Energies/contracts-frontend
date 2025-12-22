'use client';

import { Button } from '@/components/buttons/button'
import { Card } from '@/components/ui/Card'
import { useRouter } from 'next/navigation';

export const ContratsComponent = () => {
    const router = useRouter();
    return (
        <div className="min-h-screen flex flex-col items-center justify-start pt-32">
            <Card className="w-[45%] max-w-full rounded-lg px-8 py-8 space-y-6">
                <div className="flex flex-col text-center px-10">
                    <p>Bienvenido al proceso de activación</p>
                    <p className="text-muted-foreground">
                        Estas a punto de iniciar el proceso de activación como colaborador oficial de Apolo Energies.
                    </p>
                </div>

                <div className="border-t border-gray-200 mt-6 pt-4 flex justify-center">
                    <Button size="sm" onClick={() => router.push("/data")} variant="default">
                        Iniciar el proceso
                    </Button>
                </div>
            </Card>
        </div>
    );
};

