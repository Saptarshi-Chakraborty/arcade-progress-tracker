import { ThemeProvider } from "@/contexts/theme-provider";
import { SpeedInsights } from '@vercel/speed-insights/next';
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Component {...pageProps} />
      <SpeedInsights />
    </ThemeProvider>
  )

}
