import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../../../../packages/ui/components/Navbar";
import Providers from "./providers";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Navbar />
      <div style={{ margin: "10px" }}>
        <Component {...pageProps} />
      </div>
    </Providers>
  );
}
