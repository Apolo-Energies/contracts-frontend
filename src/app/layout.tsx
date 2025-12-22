import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { Provider } from "@/components/providers/Provider";
import { ThemeProviderClient } from "@/components/providers/ThemeProviderClient";
import { Alert } from "@/components/ui/Alert";
import { LoadingOverlay } from "@/components/ui/LoadingOverlay";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "APOLO ENERGIES",
  description: "Portal de colaboradores",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-poppins antialiased`}>
        <Provider>
          <ThemeProviderClient>
            {children}
            <Alert />
            <LoadingOverlay />
          </ThemeProviderClient>
        </Provider>
      </body>
    </html>
  );
}
