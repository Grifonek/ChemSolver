import Header from "@/app/_components/Header";

import "@/app/_styles/globals.css";
import { Roboto_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";

const roboto_mono = Roboto_Mono({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s | ChemSolver",
    default: "Welcome | ChemSolver",
  },
  icons: {
    logo: "/logo.png",
  },
  description: "Your online tool to help you with chemistry.",
  applicationName: "ChemSolver",
  authors: [
    {
      name: "Max Demel",
      url: "https://grifonekio.site/",
    },
    {
      name: "Max Demel",
      url: "https://github.com/Grifonek",
    },
  ],
  keywords: [
    "ChemSolver",
    "chemistry",
    "chemical calculations",
    "periodic table",
    "unit converter",
    "equation balancer",
    "anorganic chemistry",
    "physical chemistry",
  ],
  robots: {
    index: "true",
    follow: "true",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto_mono.className} min-h-screen`}>
        <Header />

        <div className="w-full">
          <Toaster position="top-center" />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
