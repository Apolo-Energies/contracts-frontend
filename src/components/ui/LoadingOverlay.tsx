"use client";

import { useLoadingStore } from "@/app/store/ui/loading.store";
import { BrandLoader } from "@/components/brand-loader/BrandLoader";

export const LoadingOverlay = () => {
  const loading = useLoadingStore((state) => state.loading);

  return (
    <BrandLoader
      visible={loading}
      fullscreen
      size={200}
      title="Cargando"
      showWordmark={false}
      showDescription={false}
      showMicrocopy={false}
    />
  );
};
