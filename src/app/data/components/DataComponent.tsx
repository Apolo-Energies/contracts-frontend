"use client";
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
import { validateRecipient } from "@/app/services/Contracts/contract.service";
import { useLoadingStore } from "@/app/store/ui/loading.store";

type FormStep = "Individual" | "Company";

export const DataComponent = () => {
  const [view, setView] = useState<FormStep>("Individual");
  const router = useRouter();
  const { setDatos } = useContratoStore();
  const { loading, setLoading } = useLoadingStore();

  const formAutonomo = useForm<NaturalPerson>({ mode: "onChange" });
  const formEmpresa = useForm<ArtificialPerson>({ mode: "onChange" });

  const activeForm = view === "Individual" ? formAutonomo : formEmpresa;
  const watchedValues = activeForm.watch();

  const handleViewChange = (step: FormStep) => setView(step);

  const calculateProgress = () => {
    const values = watchedValues || {};
    const relevantFields =
      view === "Individual"
        ? [
          "dni", "name", "surnames", "email", "bank_account", "phone",
          "legalCity", "legalStreet", "legalNumber",
          "notificationCity", "notificationStreet", "notificationNumber",
        ]
        : [
          "dni", "name", "surnames", "cif", "companyName", "email", "bank_account", "phone",
          "legalCity", "legalStreet", "legalNumber",
          "notificationCity", "notificationStreet", "notificationNumber",
        ];

    const vals = values as unknown as Record<string, unknown>;
    const filled = relevantFields.filter(
      (field) =>
        typeof vals[field] === "string" &&
        (vals[field] as string).trim() !== ""
    );

    return Math.round((filled.length / relevantFields.length) * 100);
  };

  const applyFieldErrors = (
    errors: Record<string, string>,
    setError: (field: string, error: { type: string; message: string }) => void
  ) => {
    Object.entries(errors).forEach(([field, message]) => {
      setError(field, { type: "server", message });
    });
  };

  const onSubmitAutonomo = async (data: NaturalPerson) => {
    setLoading(true);
    try {
      const result = await validateRecipient({
        flowType: "Individual",
        email: data.email,
        phone: data.phone,
        dni: data.dni,
        name: data.name,
        surnames: data.surnames,
        cif: null,
        companyName: null,
      });

      if (!result.isValid) {
        applyFieldErrors(result.fieldErrors, (f, e) =>
          formAutonomo.setError(f as keyof NaturalPerson, e)
        );
        return;
      }

      setDatos({ type: "Individual", ...data });
      router.push("/documents");
    } finally {
      setLoading(false);
    }
  };

  const onSubmitEmpresa = async (data: ArtificialPerson) => {
    setLoading(true);
    try {
      const result = await validateRecipient({
        flowType: "Company",
        email: data.email,
        phone: data.phone,
        dni: data.dni,
        name: data.name,
        surnames: data.surnames,
        cif: data.cif,
        companyName: data.companyName,
      });

      if (!result.isValid) {
        applyFieldErrors(result.fieldErrors, (f, e) =>
          formEmpresa.setError(f as keyof ArtificialPerson, e)
        );
        return;
      }

      setDatos({ type: "Company", ...data });
      router.push("/documents");
    } finally {
      setLoading(false);
    }
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
                control={formAutonomo.control}
                errors={formAutonomo.formState.errors}
                touchedFields={formAutonomo.formState.touchedFields}
                submitCount={formAutonomo.formState.submitCount}
              />
            ) : (
              <FormArtificialPerson
                register={formEmpresa.register}
                control={formEmpresa.control}
                errors={formEmpresa.formState.errors}
                touchedFields={formEmpresa.formState.touchedFields}
                submitCount={formEmpresa.formState.submitCount}
              />
            )}
          </div>

          <div className="shrink-0 border-t border-border pt-4 mt-4 flex justify-center bg-card">
            <Button size="sm" type="submit" disabled={loading}>
              {loading ? "Validando..." : "Siguiente"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
