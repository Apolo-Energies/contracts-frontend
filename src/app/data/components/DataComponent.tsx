import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { FormNaturalPerson } from "./forms/FormNaturalPerson";
import { FormArtificialPerson } from "./forms/FormArtificialPerson";
import { Progress } from "@/components/ui/Progress";
import { ToggleGroup } from "@/components/buttons/ToggleGroup";
import { Button } from "@/components/buttons/button";
import { NaturalPerson, ArtificialPerson } from "../interfaces/person";
import { useContratoStore } from "@/app/store/contracts/contracts.store";

type FormStep = "Individual" | "Company";

export const DataComponent = () => {
  const [view, setView] = useState<FormStep>("Individual");
  const router = useRouter();
  const { setDatos } = useContratoStore();

  const formAutonomo = useForm<NaturalPerson>({
    mode: "onChange",
  });

  const formEmpresa = useForm<ArtificialPerson>({
    mode: "onChange",
  });

  const activeForm = view === "Individual" ? formAutonomo : formEmpresa;

  const watchedValues = activeForm.watch();

  const handleViewChange = (step: FormStep) => {
    setView(step);
  };

  const calculateProgress = () => {
    const values = watchedValues || {};
    const relevantFields =
      view === "Individual"
        ? [
          "dni",
          "name",
          "surnames",
          "address_1",
          "address_2",
          "email",
          "bank_account",
          "phone",
        ]
        : [
          "dni",
          "name",
          "surnames",
          "companyName",
          "cif",
          "address_1",
          "address_2",
          "email",
          "bank_account",
          "phone",
        ];

    const filled = relevantFields.filter(
      (field) =>
        typeof (values as any)[field] === "string" &&
        (values as any)[field].trim() !== ""
    );

    return Math.round((filled.length / relevantFields.length) * 100);
  };

  const onSubmitAutonomo = (data: NaturalPerson) => {
    setDatos({
      type: "Individual",
      ...data,
    });
    router.push("/documents");
  };

  const onSubmitEmpresa = (data: ArtificialPerson) => {
    setDatos({
      type: "Company",
      ...data,
    });
    router.push("/documents");
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-xl h-[90vh] rounded-lg px-8 py-6 flex flex-col">

        <div className="shrink-0 space-y-4">
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
              { value: "Individual", label: "Persona Física" },
              { value: "Company", label: "Persona Jurídica" },
            ]}
          />
        </div>

        <form
          onSubmit={
            view === "Individual"
              ? formAutonomo.handleSubmit(onSubmitAutonomo)
              : formEmpresa.handleSubmit(onSubmitEmpresa)
          }
          className="flex flex-col flex-1 min-h-0 mt-4"
        >

          <div className="flex-1 min-h-0 overflow-y-auto space-y-4 pr-1">
            {view === "Individual" ? (
              <FormNaturalPerson
                register={formAutonomo.register}
                errors={formAutonomo.formState.errors}
                touchedFields={formAutonomo.formState.touchedFields}
                submitCount={formAutonomo.formState.submitCount}
              />
            ) : (
              <FormArtificialPerson
                register={formEmpresa.register}
                errors={formEmpresa.formState.errors}
                touchedFields={formEmpresa.formState.touchedFields}
                submitCount={formEmpresa.formState.submitCount}
              />
            )}
          </div>

          <div className="shrink-0 border-t border-border pt-4 mt-4 flex justify-center bg-card">
            <Button size="sm" type="submit">
              Siguiente
            </Button>
          </div>

        </form>
      </Card>
    </div>

  );
};
