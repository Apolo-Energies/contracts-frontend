import { FieldErrors, UseFormRegister } from "react-hook-form";
import { NaturalPerson, ArtificialPerson } from "../../interfaces/person";
import { Input } from "@/components/Inputs/Input";

interface Props {
    register: UseFormRegister<NaturalPerson | ArtificialPerson>;
    errors: FieldErrors<NaturalPerson | ArtificialPerson>;
}

export const FormNaturalPerson = ({ register, errors }: Props) => {
    return (
        <div className="space-y-2">
            <div className="grid grid-cols-1 gap-6">

                {/* DNI */}
                <Input
                    label="DNI"
                    name="dni"
                    placeholder="Apolo"
                    register={register}
                    required
                    errors={errors}
                />

                {/* Email */}
                <Input
                    label="Email"
                    name="email"
                    placeholder="apolo@apoloenergies.es"
                    register={register}
                    required
                    errors={errors}
                />

                {/* Nombre */}
                <Input
                    label="Nombre"
                    name="name"
                    placeholder="Apolo"
                    register={register}
                    required
                    errors={errors}
                />

                {/* Apellidos */}
                <Input
                    label="Apellidos"
                    name="surnames"
                    placeholder="Apolo"
                    register={register}
                    required
                    errors={errors}
                />

                {/* Domicilio Social */}
                <Input
                    label="Domicilio Social"
                    name="address_1"
                    placeholder="Apolo"
                    register={register}
                    required
                    errors={errors}
                />

                {/* Domicilio Notificaciones */}
                <Input
                    label="Domicilio Notificaciones"
                    name="address_2"
                    placeholder="Apolo"
                    register={register}
                    required
                    errors={errors}
                />

                {/* Teléfono */}
                <Input
                    label="Teléfono"
                    name="phone"
                    placeholder="Apolo"
                    register={register}
                    required
                    errors={errors}
                />

                {/* Cuenta Bancaria */}
                <Input
                    label="Cuenta Bancaria"
                    name="bank_account"
                    placeholder="Apolo"
                    register={register}
                    required
                    errors={errors}
                />

            </div>
        </div>
    );
};
