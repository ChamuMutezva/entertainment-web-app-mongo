import Footer from "./footer";
import Header from "./header";

// sharing components
export default function Layout({
    children,
    authPage,
}: {
    children: React.ReactNode;
    authPage: boolean;
}) {
    return (
        <>
            {authPage && <Header />}
            <>{children}</>
            {authPage && <Footer />}
        </>
    );
}
