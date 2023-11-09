import Link from "next/link";
import Image from "next/image";
import React from "react";
import Navigation from "./navigation";
import { signOut, useSession } from "next-auth/react";

function Header() {
    const { data: session } = useSession();
    const fullname = session?.user?.name;
    const initials = fullname
        ?.split(" ")
        .map((word) => word.charAt(0))
        .join(" ");

    const logout = () => {
        const confirmDialog = confirm("Logout from application");
        if (confirmDialog) {
            signOut();
        } else {
            return;
        }
    };
    return (
        <header className="flex justify-between items-center p-6 bg-semiDarkBlue md:rounded-lg md:m-6">
            <Link href={"/all"} aria-label="all movies">
                <Image src={"/assets/logo.svg"} width={33} height={27} alt="" />
            </Link>

            <Navigation />
            <div className="flex gap-2">
                <span
                    aria-label={`initial of ${fullname}`}
                    className="sm:hidden"
                >
                    {initials}
                </span>
                <span
                    aria-label={`profile name for`}
                    className="hidden sm:block"
                >
                    {fullname}
                </span>
                <button onClick={logout} aria-label="log out">
                    <Image
                        src={"/assets/image-avatar.png"}
                        width={24}
                        height={24}
                        alt=""
                    />
                </button>
            </div>
        </header>
    );
}

export default Header;
