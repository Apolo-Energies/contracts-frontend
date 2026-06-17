export type LoaderBrand = "apolo";

export interface LoaderTheme {
  logoSrc: string;
  wordmark: string;
  ringColor: string;
  accentColor: string;
  glowColor: string;
  backdrop: string;
}

export const BRAND_THEMES: Record<LoaderBrand, LoaderTheme> = {
  apolo: {
    logoSrc: "/logos/isotipo_blanco.svg",
    wordmark: "Apolo Energies",
    ringColor: "#12AFF0",
    accentColor: "#7ADEFF",
    glowColor: "#12AFF080",
    backdrop: "rgba(5, 10, 20, 0.82)",
  },
};

export const DEFAULT_BRAND: LoaderBrand = "apolo";
