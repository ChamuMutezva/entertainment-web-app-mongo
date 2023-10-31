import React from "react";
import RegisterForm from "../../components/registerForm";
import Layout from "../../components/layout";

function Register() {
    return (
        <main className="container w-screen text-white grid place-items-center p-6">
            <Layout authPage={false}>
                <RegisterForm />
            </Layout>
        </main>
    );
}

export default Register;
