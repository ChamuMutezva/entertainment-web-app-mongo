"use client";

import Link from "next/link";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    console.log("Name: ", name);
    const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
        console.log("done");
        evt.preventDefault();
        if (!name || !email || !password) {
            setError("All fields are necessary.");
            return;
        }
        console.log("all fields are completed");
        try {
            console.log("1: Final check - if user exist");
            const resExist = await fetch("api/userExist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
            console.log("2: Final check - if user exist");
            const { user } = await resExist.json();
            console.log(user);
            console.log("3: Final check - if user exist");

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
            console.log(`res result: ${res.ok}`);
            if (res.ok) {
                const form = evt.target as HTMLFormElement;
                form.reset();
                setError("");
                router.push("/");
            } else {
                console.log("Registration failed");
            }
        } catch (error) {
            console.log("Error during registration", error);
        }
        console.log("done");
    };

    return (
        <div className="grid place-items-center h-screen p-6">
            <div className="shadow-lg p-4 bg-semiDarkBlue rounded-lg border-t-4 w-full max-w-[25rem] border-green-400">
                <h1 className="text-[2rem] font-light my-4 mb-6">Sign Up</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="relative p-4">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder=""
                            onChange={(evt) => setName(evt.target.value)}
                            className="w-full text-white py-4 bg-semiDarkBlue border-b-white
                            input:not(:placeholder-shown):bg-semiDarkBlue
                             border-t-0 border-l-0 border-r-0 border-b-2 focus:ring-0 peer"
                        />
                        <label
                            htmlFor="name"
                            className="absolute flex items-center gap-2
                             text-white top-6 left-8 transition-all text-base sm:text-2xl opacity-40"
                        >
                            Full name
                        </label>
                    </div>
                    <div className="relative p-4">
                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder=""
                            onChange={(evt) => setEmail(evt.target.value)}
                            className="w-full text-white py-4 bg-semiDarkBlue border-b-white
                            input:not(:placeholder-shown):bg-semiDarkBlue
                             border-t-0 border-l-0 border-r-0 border-b-2 focus:ring-0 peer"
                        />
                        <label
                            htmlFor="email"
                            className="absolute flex items-center gap-2
                             text-white top-6 left-8 transition-all text-base sm:text-2xl opacity-40"
                        >
                            Email
                        </label>
                    </div>
                    <div className="relative p-4">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder=""
                            onChange={(evt) => setPassword(evt.target.value)}
                            className="w-full text-white py-4 bg-semiDarkBlue border-b-white
                            input:not(:placeholder-shown):bg-semiDarkBlue
                             border-t-0 border-l-0 border-r-0 border-b-2 focus:ring-0 peer"
                        />
                        <label
                            htmlFor="password"
                            className="absolute flex items-center gap-2
                             text-white top-6 left-8 transition-all text-base sm:text-2xl opacity-40"
                        >
                            Password
                        </label>
                    </div>
                    <button className="bg-[red] text-white font-light text-[0.94rem] cursor-pointer px-6 py-2">
                        Create an account
                    </button>

                    {error && (
                        <div className="bg-[red] text-white w-fit text-sm py-1 px-3 rounded-lg mt-2">
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
