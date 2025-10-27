import { IBM_Plex_Serif, JetBrains_Mono, Mona_Sans } from "next/font/google";

const monasans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

const ibmserif = IBM_Plex_Serif({
  variable: "--font-ibm-serif",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const jbmono = JetBrains_Mono({
  variable: "--font-jb-mono",
  subsets: ["latin"],
});

export const fonts = `${monasans.variable} ${ibmserif.variable} ${jbmono.variable}`;
