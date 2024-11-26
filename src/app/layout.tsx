import type { Metadata } from "next";
import localFont from "next/font/local";
import { Provider } from "@/components/ui/provider";
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";
import 'react-datepicker/dist/react-datepicker.css'
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Smart Money Saver",
  description: "Smart Money Saver PWA app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider>
          <CopilotKit runtimeUrl="/api/copilotkit">{children}</CopilotKit>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
