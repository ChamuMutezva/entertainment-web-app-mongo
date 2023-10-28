import React from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

function UserInfo() {
    const { data: session } = useSession();

    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-8 text-white flex flex-col gap-2 my-6">
                Name: <span className="font-bold">{session?.user?.name}</span>
            </div>
            <div className="text-white">
                Email: <span className="font-bold">{session?.user?.email}</span>
            </div>

            <button
                onClick={() => signOut()}
                className="bg-[red] text-white font-bold px-6 py-2 mt-3"
            >
                Log out
            </button>
        </div>
    );
}

export default UserInfo;
