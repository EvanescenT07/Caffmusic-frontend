import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-providers";
import FloatingNavbar from "@/components/navbar/navbar";
import NextAuthSessionProvider from "@/provider/session-provider";
import { Toaster } from "react-hot-toast";

const PoppinsFont = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "CaffMusic",
  description:
    "Caffmusic is a platform to detect music genre using Machine Learning",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16" },
      { url: "/favicon-32x32.png", sizes: "32x32" },
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
};

const NavbarData = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Contact", link: "/contact" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${PoppinsFont.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextAuthSessionProvider>
            <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
            <FloatingNavbar navItems={NavbarData} />
            <div className="pt-[80px]">{children}</div>
          </NextAuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
