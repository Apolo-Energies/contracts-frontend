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
import { useAlertStore } from "@/app/store/ui/alert.store";

type FormStep = "Individual" | "Company";

export const DataComponent = () => {
  const [view, setView] = useState<FormStep>("Individual");
  const router = useRouter();
  const { setDatos } = useContratoStore();
  const { loading, setLoading } = useLoadingStore();
  const { showAlert } = useAlertStore();

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
          "dni", "name", "surname1", "surname2", "email", "bank_account", "phone",
          "legalStreetType", "legalStreetName", "legalNumber", "legalCity",
          "notificationStreetType", "notificationStreetName", "notificationNumber", "notificationCity",
        ]
        : [
          "dni", "name", "surname1", "surname2", "cif", "companyName", "email", "bank_account", "phone",
          "legalStreetType", "legalStreetName", "legalNumber", "legalCity",
          "notificationStreetType", "notificationStreetName", "notificationNumber", "notificationCity",
        ];

    const vals = values as unknown as Record<string, unknown>;
    const filled = relevantFields.filter(
      (field) =>
        typeof vals[field] === "string" &&
        (vals[field] as string).trim() !== ""
    );

    return Math.round((filled.length / relevantFields.length) * 100);
  };

  const applyFieldErrors = <T extends Record<string, unknown>>(
    errors: Record<string, string>,
    setError: (field: keyof T, error: { type: string; message: string }) => void
  ) => {
    Object.entries(errors).forEach(([field, message]) => {
      if (field === "general") {
        showAlert(message, "error");
      } else {
        setError(field as keyof T, { type: "server", message });
      }
    });
  };

  const onSubmitAutonomo = async (data: NaturalPerson) => {
    formAutonomo.clearErrors();
    setLoading(true);
    try {
      const result = await validateRecipient({
        flowType: "Individual",
        email: data.email,
        phone: data.phone,
        dni: data.dni,
        name: data.name,
        lastName: data.surname1,
        secondLastName: data.surname2,
        cif: null,
        companyName: null,
      });

      if (!result.isValid) {
        applyFieldErrors<NaturalPerson>(result.fieldErrors, formAutonomo.setError);
        return;
      }

      setDatos({ type: "Individual", ...data });
      router.push("/documents");
    } finally {
      setLoading(false);
    }
  };

  const onSubmitEmpresa = async (data: ArtificialPerson) => {
    formEmpresa.clearErrors();
    setLoading(true);
    try {
      const result = await validateRecipient({
        flowType: "Company",
        email: data.email,
        phone: data.phone,
        dni: data.dni,
        name: data.name,
        lastName: data.surname1,
        secondLastName: data.surname2,
        cif: data.cif,
        companyName: data.companyName,
      });

      if (!result.isValid) {
        applyFieldErrors<ArtificialPerson>(result.fieldErrors, formEmpresa.setError);
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
      <Card className="w-full max-w-2xl h-[90vh] rounded-lg px-8 py-6 flex flex-col">

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
