import { Poppins } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper"; // ✅ IMPORT

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

// ✅ You can now export metadata again
export const metadata = {
  title: "Zando E-Commerce",
  description: "Your one-stop shop for modern fashion.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${poppins.variable} antialiased`}
      >
        {/* ✅ WRAP with your new SessionWrapper */}
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}