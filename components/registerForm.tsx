"use client";
import Link from "next/link";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import InputContent from "./InputContent";

function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        if (!name || !email || !password || !confirmPassword) {
            setError("All fields are necessary.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Password mismatch, try again");
            return;
        }

        try {
            const resExist = await fetch("api/userExist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const { user } = await resExist.json();

            if (user) {
                setError("User already exists.");
                return;
            }

            const res = await fetch("api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            if (res.ok) {
                const form = evt.target as HTMLFormElement;
                form.reset();
                setError("");
                router.push("/");
            } else {
                setError("Registration failed");
            }
        } catch (error) {
            setError("Error during registration");
        }
    };

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center gap-8">
            <div className="flex items-center justify-center">
                <Image src="/assets/logo.svg" width={33} height={27} alt="" />
            </div>
            <div className="shadow-lg p-4 bg-semiDarkBlue rounded-lg border-t-4 w-full max-w-[25rem] border-green-400">
                <h1 className="text-[2rem] font-light my-4 mb-6">Sign Up</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <InputContent
                        type="text"
                        onChange={(evt: {
                            target: { value: React.SetStateAction<string> };
                        }) => setName(evt.target.value)}
                        name="name"
                        label="Full name"
                    />

                    <InputContent
                        type="text"
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

                    <InputContent
                        type="password"
                        onChange={(evt: {
                            target: { value: React.SetStateAction<string> };
                        }) => setConfirmPassword(evt.target.value)}
                        name="confirm-password"
                        label="Confirm Password"
                    />

                    <button
                        className="bg-[red] text-white font-light text-[0.94rem] cursor-pointer px-6 py-2
                    hover:text-[darkBlue] hover:bg-white focus:text-[darkBlue] focus:bg-white"
                    >
                        Create an account
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
                        className="flex justify-center items-center gap-2 text-sm mt-3 text-right text-white font-light text-[0.94rem]"
                        href={"/"}
                    >
                        Already have an account?{" "}
                        <span className="underline text-[red]">Login</span>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;
