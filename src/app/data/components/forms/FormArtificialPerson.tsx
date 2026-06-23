import {
    Control,
    FieldErrors,
    UseFormRegister,
    FieldNamesMarkedBoolean,
} from "react-hook-form";
import { ArtificialPerson } from "../../interfaces/person";
import { Input } from "@/components/Inputs/Input";
import { StreetInput } from "@/components/Inputs/StreetInput";
import { PhoneInput } from "@/components/Inputs/PhoneInput";
import { formatIbanES } from "@/utils/formats";

const TIPOS_VIA = [
    { value: "Calle",   label: "Calle"   },
    { value: "Avenida", label: "Avenida" },
    { value: "Paseo",   label: "Paseo"   },
    { value: "Bulevar", label: "Bulevar" },
    { value: "Ronda",   label: "Ronda"   },
    { value: "Plaza",   label: "Plaza"   },
    { value: "Alameda", label: "Alameda" },
    { value: "Rambla",  label: "Rambla"  },
    { value: "Camino",  label: "Camino"  },
    { value: "Vía",     label: "Vía"     },
];

interface Props {
    register: UseFormRegister<ArtificialPerson>;
    control: Control<ArtificialPerson>;
    errors: FieldErrors<ArtificialPerson>;
    touchedFields: FieldNamesMarkedBoolean<ArtificialPerson>;
    submitCount: number;
}

export const FormArtificialPerson = ({
    register,
    control,
    errors,
    touchedFields,
    submitCount,
}: Props) => {
    return (
        <div className="grid grid-cols-6 gap-4">

            {/* Razón social */}
            <div className="col-span-6">
                <Input label="Razón social" name="companyName"
                    register={register("companyName", { required: "La razón social es obligatoria", maxLength: { value: 50, message: "Máximo 50 caracteres" } })}
                    errors={errors} touchedFields={touchedFields} submitCount={submitCount} />
            </div>

            {/* CIF */}
            <div className="col-span-6">
                <Input label="CIF" name="cif" placeholder="B56263304"
                    register={register("cif", { required: "El CIF es obligatorio", pattern: { value: /^[A-Z]\d{7}[A-Z0-9]$/, message: "CIF inválido. Ej: B56263304" } })}
                    errors={errors} touchedFields={touchedFields} submitCount={submitCount} />
            </div>

            {/* Datos representante legal */}
            <p className="col-span-6 text-sm font-medium -mb-1">Datos representante legal</p>

            <div className="col-span-3">
                <Input label="Nombre" name="name"
                    register={register("name", { required: "El nombre es obligatorio", maxLength: { value: 50, message: "Máximo 50 caracteres" } })}
                    errors={errors} touchedFields={touchedFields} submitCount={submitCount} />
            </div>
            <div className="col-span-3">
                <Input label="Primer apellido" name="surname1"
                    register={register("surname1", { required: "El primer apellido es obligatorio", maxLength: { value: 50, message: "Máximo 50 caracteres" } })}
                    errors={errors} touchedFields={touchedFields} submitCount={submitCount} />
            </div>

            <div className="col-span-3">
                <Input label="Segundo apellido" name="surname2"
                    register={register("surname2", { required: "El segundo apellido es obligatorio", maxLength: { value: 50, message: "Máximo 50 caracteres" } })}
                    errors={errors} touchedFields={touchedFields} submitCount={submitCount} />
            </div>
            <div className="col-span-3">
                <Input label="DNI" name="dni" placeholder="12345678A"
                    register={register("dni", { required: "El DNI es obligatorio", pattern: { value: /^[0-9]{8}[A-Za-z]$/, message: "Formato inválido. Ej: 12345678A" } })}
                    errors={errors} touchedFields={touchedFields} submitCount={submitCount} />
            </div>

            <div className="col-span-3">
                <Input label="Correo" name="email" placeholder="apolo@apoloenergies.es"
                    register={register("email", { required: "El email es obligatorio", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email inválido" } })}
                    errors={errors} touchedFields={touchedFields} submitCount={submitCount} />
            </div>
            <div className="col-span-3">
                <PhoneInput label="Teléfono" name="phone" control={control}
                    errors={errors} touchedFields={touchedFields} submitCount={submitCount} />
            </div>

            {/* Dirección legal */}
            <p className="col-span-6 text-sm font-medium -mb-1">Dirección legal</p>

            <div className="col-span-4">
                <StreetInput
                    nameType="legalStreetType" nameName="legalStreetName"
                    registerType={register("legalStreetType", { required: "Selecciona el tipo de vía" })}
                    registerName={register("legalStreetName", { required: "El nombre de la vía es obligatorio" })}
                    options={TIPOS_VIA}
                    errors={errors} touchedFields={touchedFields} submitCount={submitCount} />
            </div>
            <div className="col-span-2">
                <Input label="Número" name="legalNumber"
                    register={register("legalNumber", { required: "El número es obligatorio" })}
                    errors={errors} touchedFields={touchedFields} submitCount={submitCount} />
            </div>

            <div className="col-span-4">
                <Input label="Ciudad" name="legalCity"
                    register={register("legalCity", { required: "La ciudad es obligatoria" })}
                    errors={errors} touchedFields={touchedFields} submitCount={submitCount} />
            </div>
            <div className="col-span-2">
                <Input label="Código postal" name="postalCodeLegal" placeholder="28001"
                    register={register("postalCodeLegal", { pattern: { value: /^\d{5}$/, message: "Debe tener 5 dígitos" } })}
                    errors={errors} touchedFields={touchedFields} submitCount={submitCount} />
            </div>

            {/* Dirección de notificación */}
            <p className="col-span-6 text-sm font-medium -mb-1">Dirección de notificación</p>

            <div className="col-span-4">
                <StreetInput
                    nameType="notificationStreetType" nameName="notificationStreetName"
                    registerType={register("notificationStreetType", { required: "Selecciona el tipo de vía" })}
                    registerName={register("notificationStreetName", { required: "El nombre de la vía es obligatorio" })}
                    options={TIPOS_VIA}
                    errors={errors} touchedFields={touchedFields} submitCount={submitCount} />
            </div>
            <div className="col-span-2">
                <Input label="Número" name="notificationNumber"
                    register={register("notificationNumber", { required: "El número es obligatorio" })}
                    errors={errors} touchedFields={touchedFields} submitCount={submitCount} />
            </div>

            <div className="col-span-4">
                <Input label="Ciudad" name="notificationCity"
                    register={register("notificationCity", { required: "La ciudad es obligatoria" })}
                    errors={errors} touchedFields={touchedFields} submitCount={submitCount} />
            </div>
            <div className="col-span-2">
                <Input label="Código postal" name="postalCodeNotification" placeholder="28001"
                    register={register("postalCodeNotification", { pattern: { value: /^\d{5}$/, message: "Debe tener 5 dígitos" } })}
                    errors={errors} touchedFields={touchedFields} submitCount={submitCount} />
            </div>

            {/* Cuenta bancaria */}
            <div className="col-span-6">
                <Input label="Cuenta bancaria" name="bank_account" placeholder="ES83 0182 6517 7302 0197 5760"
                    register={register("bank_account", {
                        required: "La cuenta bancaria es obligatoria",
                        pattern: { value: /^ES\d{2}(?:\s?\d{4}){5}$/, message: "IBAN inválido (Ej: ESXX XXXX XXXX XXXX XXXX XXXX)" },
                    })}
                    onInput={(e) => { const t = e.target as HTMLInputElement; t.value = formatIbanES(t.value); }}
                    errors={errors} touchedFields={touchedFields} submitCount={submitCount} />
            </div>

        </div>
    );
};
