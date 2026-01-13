import {
    FieldErrors,
    UseFormRegister,
    FieldNamesMarkedBoolean,
} from "react-hook-form";
import { NaturalPerson } from "../../interfaces/person";
import { Input } from "@/components/Inputs/Input";
import { formatIbanES } from "@/utils/formats";

interface Props {
    register: UseFormRegister<NaturalPerson>;
    errors: FieldErrors<NaturalPerson>;
    touchedFields: FieldNamesMarkedBoolean<NaturalPerson>;
    submitCount: number;
}

export const FormNaturalPerson = ({
    register,
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
                    maxLength: {
                        value: 50,
                        message: "El nombre debe tener máximo 50 caracteres",
                    },
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
                    maxLength: {
                        value: 50,
                        message: "Los apellidos deben tener máximo 50 caracteres",
                    },
                })}
                errors={errors}
                touchedFields={touchedFields}
                submitCount={submitCount}
            />

            <Input
                label="Domicilio Social"
                name="address_1"
                register={register("address_1", {
                    required: "El domicilio social es obligatorio",
                })}
                errors={errors}
                touchedFields={touchedFields}
                submitCount={submitCount}
            />

            <Input
                label="Domicilio Notificaciones"
                name="address_2"
                register={register("address_2", {
                    required: "El domicilio de notificaciones es obligatorio",
                })}
                errors={errors}
                touchedFields={touchedFields}
                submitCount={submitCount}
            />

            <Input
                label="Teléfono"
                name="phone"
                placeholder="+34612345678"
                register={register("phone", {
                    required: "El teléfono es obligatorio",
                    pattern: {
                        value: /^\+34[0-9]{9}$/,
                        message: "Debe empezar con +34 y tener 9 dígitos",
                    },
                })}
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
                        message: "IBAN  inválido (Ej: ESXX XXXX XXXX XXXX XXXX XXXX)",
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
