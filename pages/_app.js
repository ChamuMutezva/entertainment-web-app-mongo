import { SessionProvider } from "next-auth/react";
import "../styles/global.css";
import { Outfit } from "next/font/google";
import Layout from "../components/layout";

const outfit = Outfit({
    subsets: ["latin"],
    display: "swap",
    weight: ["300", "500"],
    variable: "--font-outfit",
});
// This default export is required in a new `pages/_app.js` file.
export default function MyApp({
    Component,
    pageProps: { session, ...pageProps },
}) {
    return (
        <Layout>
            <SessionProvider session={session}>
                <div className={outfit.className}>
                    <Component {...pageProps} />
                </div>
            </SessionProvider>
        </Layout>
    );
}
