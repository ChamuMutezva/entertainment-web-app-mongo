import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

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
            router.replace("dashboard");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
                <h1 className="text-xl font-bold my-4">Login</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Email"
                            onChange={(evt) => setEmail(evt.target.value)}
                            className="text-darkBlue"
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            onChange={(evt) => setPassword(evt.target.value)}
                            className="text-darkBlue"
                        />
                    </div>
                    <button className="bg-[green] text-white font-bold cursor-pointer px-6 py-2">
                        Login
                    </button>
                    {error && (
                        <div className="bg-[red] text-white w-fit text-sm py-1 px-3 rounded-lg mt-2">
                            {error}
                        </div>
                    )}

                    <Link
                        className="text-sm mt-3 text-right"
                        href={"/register"}
                    >
                        Don't have an account?{" "}
                        <span className="underline">Register</span>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
