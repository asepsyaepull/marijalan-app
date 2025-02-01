import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/components/theme-provider";
import { UserProvider } from "@/context/UserContext";
import { Toaster } from "@/components/ui/toaster";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <UserProvider>
        <Head>
          <title>Marijalan</title>
        </Head>
        <Component {...pageProps} />
        <Toaster />
      </UserProvider>
    </ThemeProvider>
  );
}
