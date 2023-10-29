import Link from "next/link";
import Image from "next/image";
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
            router.replace("all");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="shadow-lg p-4 bg-semiDarkBlue rounded-lg border-t-4 w-full max-w-[25rem] border-green-400">
            <div className="flex items-center justify-center">
                <Image src="/assets/logo.svg" width={33} height={27} alt="" />
            </div>

            <h1 className="text-[2rem] font-light my-4 mb-6">Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
                        className="w-full text-white py-4 bg-semiDarkBlue border-b-white border-t-0
                            border-l-0 border-r-0 border-b-2 focus:ring-0 peer"
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
                    className="flex justify-center items-center gap-2 text-sm mt-3 text-right text-white font-light text-[0.94rem]"
                    href={"/register"}
                >
                    Don't have an account?{" "}
                    <span className="underline text-[red]">Register</span>
                </Link>
            </form>
        </div>
    );
}

export default LoginForm;
