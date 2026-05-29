import "./globals.css";
import Providers from "@/components/providers/Providers";

export const metadata = {
  title: "Twitter Clone",
  description: "A Twitter clone built with Next.js and MongoDB",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}