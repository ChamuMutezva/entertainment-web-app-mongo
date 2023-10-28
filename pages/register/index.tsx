import React from "react";
import RegisterForm from "../../components/registerForm";
import Layout from "../../components/layout";

function Register() {
    return (
        <Layout authPage={false}>
            <RegisterForm />
        </Layout>
    );
}

export default Register;
