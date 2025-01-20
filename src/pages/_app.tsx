import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {pageProps?.pathname !== "/login" && pageProps?.pathname !== "/register" && <Navbar />}
      <Component {...pageProps} />
      {pageProps?.pathname !== "/login" && pageProps?.pathname == "/register" && <Footer />}
    </ThemeProvider>
  );
}
