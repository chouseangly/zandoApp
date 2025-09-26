import { Poppins } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext"; // Corrected import
import { CartProvider } from "@/context/CartContext";
import { Toaster } from 'react-hot-toast';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Zando E-Commerce",
  description: "Your one-stop shop for modern fashion.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} antialiased`}
      >
        <SessionWrapper>
          <ThemeProvider>
            <LanguageProvider>
              <CartProvider>
                {children}
                <Toaster position="bottom-right" />
              </CartProvider>
            </LanguageProvider>
          </ThemeProvider >
        </SessionWrapper>
      </body>
    </html>
  );
}