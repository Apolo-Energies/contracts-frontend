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
  label?: string;
  nameType: Path<T>;
  nameName: Path<T>;
  registerType: UseFormRegisterReturn;
  registerName: UseFormRegisterReturn;
  options: SelectOption[];
  placeholder?: string;
  errors?: FieldErrors<T>;
  touchedFields?: FieldNamesMarkedBoolean<T>;
  submitCount?: number;
}

export const StreetInput = <T extends FieldValues>({
  label = "Tipo de vía",
  nameType,
  nameName,
  registerType,
  registerName,
  options,
  placeholder = "Nombre de la vía",
  errors,
  touchedFields,
  submitCount = 0,
}: Props<T>) => {
  const errorType = errors?.[nameType];
  const errorName = errors?.[nameName];
  const error = errorType || errorName;

  const isTouchedType = !!touchedFields && Boolean((touchedFields as Record<string, boolean | undefined>)[nameType]);
  const isTouchedName = !!touchedFields && Boolean((touchedFields as Record<string, boolean | undefined>)[nameName]);
  const showError = Boolean(error && ((isTouchedType || isTouchedName) || submitCount > 0));

  return (
    <div className="space-y-1">
      <label className="block text-sm text-foreground">{label}</label>

      <div className={`flex rounded border overflow-hidden ${showError ? "border-red-500" : "border-border"}`}>
        <select
          {...registerType}
          className="bg-card text-foreground px-3 py-1.5 border-r border-border focus:outline-none"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <input
          {...registerName}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-foreground px-3 py-1.5 focus:outline-none min-w-0"
        />
      </div>

      {showError && (
        <p className="text-xs text-red-600">{String(error?.message)}</p>
      )}
    </div>
  );
};
