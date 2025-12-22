"use client";

import React, { useRef, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/utils/utils";
import Image from "next/image";
import { UploadIcon } from "@/icons/UploadIcon";

const acceptedFormats = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/bmp",
  "image/tiff",
  "application/pdf",
];

interface Props {
  label: string;
  helper?: string;
  onFileSelect: (file: File) => void;
}

export const DropzoneUpload = ({ label, helper, onFileSelect }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isPdf, setIsPdf] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hovering, setHovering] = useState(false);

  const handleFile = (file: File) => {
    if (!acceptedFormats.includes(file.type)) {
      alert("Formato no soportado. Usa PDF o imagen.");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
    setIsPdf(file.type === "application/pdf");
    onFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setHovering(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    setIsPdf(false);
  };

  return (
    <div className="space-y-1.5">
      {/* LABEL */}
      <p className="text-sm font-medium text-foreground">
        {label}
      </p>

      {/* DROPZONE */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setHovering(true);
        }}
        onDragLeave={() => setHovering(false)}
        onDrop={handleDrop}
        className={cn(
          "w-full min-h-[90px] rounded-lg border border-border bg-card flex flex-col items-center justify-center text-center transition-all cursor-pointer relative",
          hovering && "ring-2 ring-primary/40"
        )}
      >
        <input
          type="file"
          ref={fileInputRef}
          accept={acceptedFormats.join(",")}
          className="hidden"
          onChange={handleFileChange}
        />

        {preview ? (
          <div className="relative w-full flex flex-col items-center">
            {isPdf ? (
              <iframe
                src={preview}
                className="w-full h-40 rounded-md border border-border"
                title="PDF Preview"
              />
            ) : (
              <Image
                src={preview}
                width={400}
                height={200}
                alt="preview"
                className="max-h-32 rounded-md object-contain"
              />
            )}

            <button
              onClick={handleClear}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          <>
            <UploadIcon className="w-6 h-6 text-muted-foreground mb-1" />

            <p className="text-sm font-medium text-foreground">
              Click o arrastra el archivo
            </p>

            <p className="text-[11px] text-muted-foreground mt-1">
              PDF o imagen · máx 10MB
            </p>
          </>
        )}
      </div>

      {/* HELPER */}
      {helper && (
        <p className="text-[11px] text-muted-foreground">
          {helper}
        </p>
      )}
    </div>
  );
};
