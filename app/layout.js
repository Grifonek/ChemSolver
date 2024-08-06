import Header from "@/app/_components/Header";

import { Inter, Roboto_Mono } from "next/font/google";
import "@/app/_styles/globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });
const roboto_mono = Roboto_Mono({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s | ChemSolver",
    default: "Welcome | ChemSolver",
  },
  description: "Your online tool to help you with chemistry.",
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
