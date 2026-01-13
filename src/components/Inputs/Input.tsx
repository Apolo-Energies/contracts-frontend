import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegisterReturn,
  FieldNamesMarkedBoolean,
} from "react-hook-form";
import { FormEvent } from "react";

interface Props<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegisterReturn;
  errors?: FieldErrors<T>;
  touchedFields?: FieldNamesMarkedBoolean<T>;
  submitCount?: number;
  placeholder?: string;
  type?: string;
  onInput?: (e: FormEvent<HTMLInputElement>) => void;
}

export const Input = <T extends FieldValues>({
  label,
  name,
  register,
  errors,
  touchedFields,
  submitCount = 0,
  placeholder,
  type = "text",
  onInput,
}: Props<T>) => {
  const error = errors?.[name];

  const isTouched =
    !!touchedFields &&
    Boolean((touchedFields as Record<string, boolean | undefined>)[name]);

  const showError = Boolean(error && (isTouched || submitCount > 0));

  return (
    <div className="space-y-1">
      <label className="block text-sm text-foreground">{label}</label>

      <input
        {...register}
        type={type}
        placeholder={placeholder}
        onInput={onInput}
        className={`w-full rounded border px-3 py-1.5 ${showError ? "border-red-500" : "border-border"
          }`}
      />

      {showError && (
        <p className="text-xs text-red-600">
          {String(error?.message)}
        </p>
      )}
    </div>
  );
};
