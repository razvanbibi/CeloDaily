import type { Metadata } from "next";
import "@fontsource/geist";        // Regular Geist font
import "@fontsource/geist-mono";   // Geist Mono font
import "./globals.css";

export const metadata: Metadata = {
  title: "CeloDaily",
  description: "Daily check-ins on Celo to grow your streak and earn rewards",
  other: {
   
    "talentapp:project_verification":
  "bdfb38b8a5b69cf66debd1b89936871f2f24134c31c14156a7ab927fb79553414c9359602decc9d41fe12f4bc1ce4b181ec21c824cd3f00caaf8a70bf918d657",

  },
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "Geist, sans-serif",
          background: "var(--background)",
          color: "var(--foreground)",
        }}
      >
        {children}
      </body>
    </html>
  );
}
