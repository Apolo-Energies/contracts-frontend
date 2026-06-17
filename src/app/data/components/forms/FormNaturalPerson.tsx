import {
    Control,
    FieldErrors,
    UseFormRegister,
    FieldNamesMarkedBoolean,
} from "react-hook-form";
import { NaturalPerson } from "../../interfaces/person";
import { Input } from "@/components/Inputs/Input";
import { PhoneInput } from "@/components/Inputs/PhoneInput";
import { formatIbanES } from "@/utils/formats";

interface Props {
    register: UseFormRegister<NaturalPerson>;
    control: Control<NaturalPerson>;
    errors: FieldErrors<NaturalPerson>;
    touchedFields: FieldNamesMarkedBoolean<NaturalPerson>;
    submitCount: number;
}

export const FormNaturalPerson = ({
    register,
    control,
    errors,
    touchedFields,
    submitCount,
}: Props) => {
    return (
        <div className="grid grid-cols-1 gap-6">

            <Input
                label="DNI"
                name="dni"
                placeholder="12345678A"
                register={register("dni", {
                    required: "El DNI es obligatorio",
                    pattern: {
                        value: /^[0-9]{8}[A-Za-z]$/,
                        message: "Formato inválido. Ej: 12345678A",
                    },
                })}
                errors={errors}
                touchedFields={touchedFields}
                submitCount={submitCount}
            />

            <Input
                label="Email"
                name="email"
                placeholder="apolo@apoloenergies.es"
                register={register("email", {
                    required: "El email es obligatorio",
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Email inválido",
                    },
                })}
                errors={errors}
                touchedFields={touchedFields}
                submitCount={submitCount}
            />

            <Input
                label="Nombre"
                name="name"
                register={register("name", {
                    required: "El nombre es obligatorio",
                    maxLength: { value: 50, message: "Máximo 50 caracteres" },
                })}
                errors={errors}
                touchedFields={touchedFields}
                submitCount={submitCount}
            />

            <Input
                label="Apellidos"
                name="surnames"
                register={register("surnames", {
                    required: "Los apellidos son obligatorios",
                    maxLength: { value: 50, message: "Máximo 50 caracteres" },
                })}
                errors={errors}
                touchedFields={touchedFields}
                submitCount={submitCount}
            />

            <p className="text-sm font-medium -mb-2">Domicilio Social</p>

            <Input
                label="Ciudad"
                name="legalCity"
                register={register("legalCity", { required: "La ciudad es obligatoria" })}
                errors={errors}
                touchedFields={touchedFields}
                submitCount={submitCount}
            />

            <Input
                label="Calle"
                name="legalStreet"
                register={register("legalStreet", { required: "La calle es obligatoria" })}
                errors={errors}
                touchedFields={touchedFields}
                submitCount={submitCount}
            />

            <Input
                label="Número"
                name="legalNumber"
                register={register("legalNumber", { required: "El número es obligatorio" })}
                errors={errors}
                touchedFields={touchedFields}
                submitCount={submitCount}
            />

            <p className="text-sm font-medium -mb-2">Domicilio de Notificaciones</p>

            <Input
                label="Ciudad"
                name="notificationCity"
                register={register("notificationCity", { required: "La ciudad es obligatoria" })}
                errors={errors}
                touchedFields={touchedFields}
                submitCount={submitCount}
            />

            <Input
                label="Calle"
                name="notificationStreet"
                register={register("notificationStreet", { required: "La calle es obligatoria" })}
                errors={errors}
                touchedFields={touchedFields}
                submitCount={submitCount}
            />

            <Input
                label="Número"
                name="notificationNumber"
                register={register("notificationNumber", { required: "El número es obligatorio" })}
                errors={errors}
                touchedFields={touchedFields}
                submitCount={submitCount}
            />

            <Input
                label="Código Postal"
                name="postalCode"
                placeholder="28001"
                register={register("postalCode", {
                    pattern: { value: /^\d{5}$/, message: "Debe tener 5 dígitos" },
                })}
                errors={errors}
                touchedFields={touchedFields}
                submitCount={submitCount}
            />

            <PhoneInput
                label="Teléfono"
                name="phone"
                control={control}
                errors={errors}
                touchedFields={touchedFields}
                submitCount={submitCount}
            />

            <Input
                label="Cuenta Bancaria"
                name="bank_account"
                placeholder="ES83 0182 6517 7302 0197 5760"
                register={register("bank_account", {
                    required: "La cuenta bancaria es obligatoria",
                    pattern: {
                        value: /^ES\d{2}(?:\s?\d{4}){5}$/,
                        message: "IBAN inválido (Ej: ESXX XXXX XXXX XXXX XXXX XXXX)",
                    },
                })}
                onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    target.value = formatIbanES(target.value);
                }}
                errors={errors}
                touchedFields={touchedFields}
                submitCount={submitCount}
            />

        </div>
    );
};
