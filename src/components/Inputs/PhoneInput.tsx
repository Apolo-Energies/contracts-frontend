"use client";
import { useState } from "react";
import {
    Control,
    Controller,
    FieldErrors,
    FieldNamesMarkedBoolean,
    FieldValues,
    Path,
} from "react-hook-form";

const COUNTRY_CODES = [
    { code: "+34",  flag: "🇪🇸", label: "España",      digits: 9,  pattern: /^[6-9]\d{8}$/ },
    { code: "+351", flag: "🇵🇹", label: "Portugal",    digits: 9,  pattern: /^\d{9}$/ },
    { code: "+33",  flag: "🇫🇷", label: "Francia",     digits: 9,  pattern: /^\d{9}$/ },
    { code: "+49",  flag: "🇩🇪", label: "Alemania",    digits: 11, pattern: /^\d{10,11}$/ },
    { code: "+39",  flag: "🇮🇹", label: "Italia",      digits: 10, pattern: /^\d{9,10}$/ },
    { code: "+44",  flag: "🇬🇧", label: "Reino Unido", digits: 10, pattern: /^\d{10}$/ },
    { code: "+1",   flag: "🇺🇸", label: "EE.UU.",      digits: 10, pattern: /^\d{10}$/ },
    { code: "+52",  flag: "🇲🇽", label: "México",      digits: 10, pattern: /^\d{10}$/ },
    { code: "+54",  flag: "🇦🇷", label: "Argentina",   digits: 10, pattern: /^\d{10}$/ },
    { code: "+57",  flag: "🇨🇴", label: "Colombia",    digits: 10, pattern: /^\d{10}$/ },
];

interface Props<T extends FieldValues> {
    label: string;
    name: Path<T>;
    control: Control<T>;
    errors?: FieldErrors<T>;
    touchedFields?: FieldNamesMarkedBoolean<T>;
    submitCount?: number;
}

export const PhoneInput = <T extends FieldValues>({
    label,
    name,
    control,
    errors,
    touchedFields,
    submitCount = 0,
}: Props<T>) => {
    const [dialCode, setDialCode] = useState("+34");
    const [numberPart, setNumberPart] = useState("");

    const currentCountry = COUNTRY_CODES.find((c) => c.code === dialCode) ?? COUNTRY_CODES[0];

    const error = errors?.[name];
    const isTouched =
        !!touchedFields &&
        Boolean((touchedFields as Record<string, boolean | undefined>)[name]);
    const showError = Boolean(error && (isTouched || submitCount > 0));

    return (
        <div className="space-y-1">
            <label className="block text-sm text-foreground">{label}</label>
            <Controller
                name={name}
                control={control}
                rules={{
                    required: "El teléfono es obligatorio",
                    validate: () => {
                        if (!numberPart) return "El teléfono es obligatorio";
                        if (!currentCountry.pattern.test(numberPart)) {
                            return dialCode === "+34"
                                ? "Debe tener 9 dígitos y empezar por 6, 7, 8 o 9"
                                : `Debe tener ${currentCountry.digits} dígitos`;
                        }
                        return true;
                    },
                }}
                render={({ field }) => (
                    <div
                        className={`flex w-full rounded border overflow-hidden ${
                            showError ? "border-red-500" : "border-border"
                        }`}
                    >
                        <select
                            value={dialCode}
                            onChange={(e) => {
                                const newCode = e.target.value;
                                setDialCode(newCode);
                                setNumberPart("");
                                field.onChange("");
                            }}
                            className="pl-3 pr-1 py-1.5 text-sm border-r border-border focus:outline-none cursor-pointer"
                        >
                            {COUNTRY_CODES.map(({ code, flag }) => (
                                <option key={code} value={code}>
                                    {flag} {code}
                                </option>
                            ))}
                        </select>
                        <input
                            type="tel"
                            value={numberPart}
                            maxLength={currentCountry.digits}
                            onChange={(e) => {
                                const digits = e.target.value.replace(/\D/g, "").slice(0, currentCountry.digits);
                                setNumberPart(digits);
                                field.onChange(digits ? `${dialCode}${digits}` : "");
                            }}
                            onBlur={field.onBlur}
                            placeholder={"6XXXXXXXX".padEnd(currentCountry.digits, "X").slice(0, currentCountry.digits)}
                            className="flex-1 px-3 py-1.5 focus:outline-none"
                        />
                    </div>
                )}
            />
            {showError && (
                <p className="text-xs text-red-600">{String(error?.message)}</p>
            )}
        </div>
    );
};
