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
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 bg-darkBlue rounded-lg border-t-4 border-green-400">
                <h1 className="text-xl font-bold my-4 text-white">Register</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div>
                        <label htmlFor="name" className="text-white">
                            Full name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="name"
                            onChange={(evt) => setName(evt.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-white">
                            Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Email"
                            onChange={(evt) => setEmail(evt.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-white">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            onChange={(evt) => setPassword(evt.target.value)}
                        />
                    </div>
                    <button className="bg-[green] text-white font-bold cursor-pointer px-6 py-2">
                        Register
                    </button>

                    {error && (
                        <div className="bg-[red] text-white w-fit text-sm py-1 px-3 rounded-lg mt-2">
                            {error}
                        </div>
                    )}
                    <Link
                        className="text-sm mt-3 text-right text-white"
                        href={"/loginPage"}
                    >
                        Already have an account?{" "}
                        <span className="underline">Login</span>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;
