import { Inter } from "next/font/google";
import "./globals.css";
import { MenuProvider } from '../context/MenuContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Digital Menu | Restaurant & Spa",
  description: "CMS Driven Interactive Digital Menu utilizing Sanity and Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-bg-main text-gray-900 antialiased`}>
        <MenuProvider>
          <div className="max-w-[480px] mx-auto min-h-screen relative bg-bg-main shadow-[0_0_50px_rgba(0,0,0,0.05)] overflow-x-hidden">
            {children}
          </div>
        </MenuProvider>
      </body>
    </html>
  );
}
