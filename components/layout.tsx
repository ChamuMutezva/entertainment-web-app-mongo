import Head from "next/head";
import Footer from "./footer";
import Header from "./header";

// sharing components
// authPage is a boolean value that will enable the sharing of the header and footer components in 
// some pages with the exception of the SignIn/Register and LoginIn pages, which have the `<Layout authPage=false>` setting
export default function Layout({
    children,
    authPage,
}: Readonly<{
    children: React.ReactNode;
    authPage: boolean;
}>) {
    return (
        <>
            <Head>
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="manifest" href="/manifest.json" />
                <link
                    rel="mask-icon"
                    href="/safari-pinned-tab.svg"
                    color="#5bbad5"
                />
                <link rel="icon" href="/favicon.ico" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
                <title>Entertainment web app </title>
            </Head>
            {authPage && <Header />}
            <>{children}</>
            {authPage && <Footer />}
        </>
    );
}
