import "../styles/global.css";
import { Outfit } from "next/font/google";
import Layout from "../components/layout";

const outfit = Outfit({
    subsets: ["latin"],
    display: "swap",
    weight: ["300", "500"],
    variable: '--font-outfit',
});
// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <main className={`${outfit.variable} font-sans`}>
                <Component {...pageProps} />
            </main>
        </Layout>
    );
}
