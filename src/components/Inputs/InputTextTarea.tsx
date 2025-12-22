import {
    FieldErrors,
    FieldValues,
    Path,
    UseFormRegister,
} from "react-hook-form";

interface Props<T extends FieldValues> {
    label: string;
    name: Path<T>;
    placeholder?: string;
    register: UseFormRegister<T>;
    required?: boolean;
    errors?: FieldErrors<T>;
    defaultValue?: string | number;
    rows?: number;
}

export const InputTextTarea = <T extends FieldValues>({
    label,
    name,
    placeholder,
    register,
    required = false,
    errors,
    defaultValue,
    rows = 4,
}: Props<T>) => {
    return (
        <div className="space-y-1">
            <label
                htmlFor={name}
                className="block text-sm font-normal text-[14px] text-foreground"
            >
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <textarea
                id={name}
                placeholder={placeholder}
                rows={rows}
                defaultValue={defaultValue}
                {...register(name, { required })}
                className={`w-full placeholder:text-gray-400 bg-input text-sm rounded border px-3 py-2 focus:outline-none focus:ring resize-none ${errors && errors[name]
                        ? "border-red-500 ring-red-500"
                        : "border-border ring-blue-500"
                    }`}
            />

            {errors && errors[name] && (
                <p className="text-xs text-red-600 mt-1">Este campo es obligatorio</p>
            )}
        </div>
    );
};