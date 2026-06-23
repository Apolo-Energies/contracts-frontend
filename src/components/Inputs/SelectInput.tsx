import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegisterReturn,
  FieldNamesMarkedBoolean,
} from "react-hook-form";

interface SelectOption {
  value: string;
  label: string;
}

interface Props<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegisterReturn;
  options: SelectOption[];
  errors?: FieldErrors<T>;
  touchedFields?: FieldNamesMarkedBoolean<T>;
  submitCount?: number;
  placeholder?: string;
}

export const SelectInput = <T extends FieldValues>({
  label,
  name,
  register,
  options,
  errors,
  touchedFields,
  submitCount = 0,
  placeholder,
}: Props<T>) => {
  const error = errors?.[name];

  const isTouched =
    !!touchedFields &&
    Boolean((touchedFields as Record<string, boolean | undefined>)[name]);

  const showError = Boolean(error && (isTouched || submitCount > 0));

  return (
    <div className="space-y-1">
      <label className="block text-sm text-foreground">{label}</label>

      <select
        {...register}
        className={`w-full rounded border px-3 py-1.5 bg-card text-foreground ${
          showError ? "border-red-500" : "border-border"
        }`}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {showError && (
        <p className="text-xs text-red-600">{String(error?.message)}</p>
      )}
    </div>
  );
};
