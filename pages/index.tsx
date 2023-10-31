import Head from "next/head";
import React from "react";
import LoginForm from "../components/loginForm";
import Layout from "../components/layout";

function LoginPage() {
    return (
        <main className="container w-screen text-white grid place-items-center h-screen p-6">           
            <Layout authPage={false}>
                <LoginForm />
            </Layout>
        </main>
    );
}

export default LoginPage;
