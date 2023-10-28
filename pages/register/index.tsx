import React from "react";
import RegisterForm from "../../components/registerForm";
import Layout from "../../components/layout";
import Head from "next/head";

function Register() {
    return (
        <main className="container w-screen text-white grid place-items-center p-6">
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
                <title>Entertainment web app - Register</title>
            </Head>
            <Layout authPage={false}>
                <RegisterForm />
            </Layout>
        </main>
    );
}

export default Register;
