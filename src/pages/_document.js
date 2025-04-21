import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Arcade Progress Tracker</title>
        <meta name="description" content="Check your progress in Google Cloud Arcade Games registered under Arcade Facilitator Program" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="white" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="black" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
