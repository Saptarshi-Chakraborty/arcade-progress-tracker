import { ThemeProvider } from "@/contexts/theme-provider";
import { SpeedInsights } from '@vercel/speed-insights/next';
import "@/styles/globals.css";
import { GlobalContextProvider } from "@/contexts/GlobalProvider";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >

      <GlobalContextProvider>

        <Component {...pageProps} />
        <SpeedInsights />

      </GlobalContextProvider>

    </ThemeProvider>
  )

}
