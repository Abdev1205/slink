
import { montserrat, openSans } from "../public/font.js"
import "./globals.css";
import Providers from "@/Providers/Providers.js";



export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${openSans.variable}`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
