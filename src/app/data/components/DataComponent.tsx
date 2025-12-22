import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { FormNaturalPerson } from './forms/FormNaturalPerson';
import { FormArtificialPerson } from './forms/FormArtificialPerson';
import { Progress } from '@/components/ui/Progress';
import { ToggleGroup } from '@/components/buttons/ToggleGroup';
import { Button } from '@/components/buttons/button';
import { NaturalPerson, ArtificialPerson } from '../interfaces/person';
import { useContratoStore } from '@/app/store/contracts/contracts.store';

type FormStep = "autonomo" | "empresa";
type FormData = NaturalPerson | ArtificialPerson;

export const DataComponent = () => {

  const [view, setView] = useState<FormStep>("autonomo");
  const router = useRouter();

  const { setDatos } = useContratoStore();

  const { register, formState: { errors }, handleSubmit, watch } =
    useForm<FormData>();

  const watchedValues = watch();

  const handleViewChange = (step: FormStep) => setView(step);

  const calculateProgress = () => {
    const values = watchedValues;
    let relevantFields: string[];

    if (view === "autonomo") {
      relevantFields = ["dni", "name", "surnames", "address_1", "address_2", "email", "bank_account", "phone"];
    } else {
      relevantFields = ["dni", "name", "surnames", "cif", "companyName", "address_1", "address_2", "email", "bank_account", "phone"];
    }

    const filled = relevantFields.filter(
      field =>
        typeof values[field as keyof FormData] === "string" &&
        (values[field as keyof FormData] as string).trim() !== ""
    );

    return Math.round((filled.length / relevantFields.length) * 100);
  };

  const onSubmitFinal = (data: FormData) => {

    if (view === "autonomo") {
      const p = data as NaturalPerson;

      setDatos({
        type: "autonomo",
        dni: p.dni,
        name: p.name,
        surnames: p.surnames,
        address_1: p.address_1,
        address_2: p.address_2,
        email: p.email,
        bank_account: p.bank_account,
        phone: p.phone

      });

    } else {
      const p = data as ArtificialPerson;

      setDatos({
        type: "empresa",
        name: p.name,
        surnames: p.surnames,
        companyName: p.companyName,
        cif: p.cif,
        email: p.email,
        phone: p.phone,
        dni: p.dni,
        address_1: p.address_1,
        address_2: p.address_2,
        bank_account: p.bank_account,
      });
    }

    router.push("/documents");
  };


  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-xl rounded-lg px-8 py-8 flex flex-col max-h-[90vh]">

        {/* HEADER */}
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Progreso</span>
              <span>{calculateProgress()}%</span>
            </div>
            <Progress value={calculateProgress()} />
          </div>

          <div>
            <p className="text-lg font-medium">Información básica</p>
            <p className="text-sm text-muted-foreground">
              Introduce los datos de contacto.
            </p>
          </div>

          <ToggleGroup
            value={view}
            onValueChange={handleViewChange}
            options={[
              { value: "autonomo", label: "Persona Física" },
              { value: "empresa", label: "Persona Jurídica" },
            ]}
          />
        </div>

        {/* BODY SCROLL */}
        <form
          onSubmit={handleSubmit(onSubmitFinal)}
          className="flex-1 overflow-y-auto px-1 mt-4 space-y-4"
        >
          {view === "autonomo" ? (
            <FormNaturalPerson register={register} errors={errors} />
          ) : (
            <FormArtificialPerson register={register} errors={errors} />
          )}
        </form>

        {/* FOOTER FIXO */}
        <div className="border-t border-border pt-4 mt-4 flex justify-center">
          <Button size="sm" type="submit" onClick={handleSubmit(onSubmitFinal)}>
            Siguiente
          </Button>
        </div>

      </Card>

    </div>


  );
};
