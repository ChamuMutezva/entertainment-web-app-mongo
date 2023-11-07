"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import InputContent from "./InputContent";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (evt: { preventDefault: () => void }) => {
        evt.preventDefault();
        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });
            if (res?.error) {
                setError("Invalid credentials");
                return;
            }
            router.replace("all");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center gap-8">
            <div className="flex items-center justify-center">
                <Image src="/assets/logo.svg" width={33} height={27} alt="" />
            </div>
            <div className="shadow-lg p-4 bg-semiDarkBlue rounded-lg border-t-4 w-full max-w-[25rem] border-green-400">
                <h1 className="text-[2rem] font-light my-4 mb-6">Login</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <InputContent
                        type="email"
                        onChange={(evt: {
                            target: { value: React.SetStateAction<string> };
                        }) => setEmail(evt.target.value)}
                        name="email"
                        label="Email"
                    />

                    <InputContent
                        type="password"
                        onChange={(evt: {
                            target: { value: React.SetStateAction<string> };
                        }) => setPassword(evt.target.value)}
                        name="password"
                        label="Password"
                    />

                    <button
                        className="bg-[red] text-white font-light text-[0.94rem] cursor-pointer px-6 py-2
                    hover:text-[darkBlue] hover:bg-white focus:text-[darkBlue] focus:bg-white"
                    >
                        Login to your account
                    </button>

                    {error && (
                        <div
                            aria-live="polite"
                            className="bg-[red] text-white w-fit text-sm py-1 px-3 rounded-lg mt-2"
                        >
                            {error}
                        </div>
                    )}

                    <Link
                        className="flex justify-center items-center gap-2 text-sm mt-3 text-right text-white font-light text-[0.94rem]
                        hover:opacity-50 focus:opacity-50"
                        href={"/register"}
                    >
                        Don't have an account?{" "}
                        <span className="underline text-[red]">Register</span>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
