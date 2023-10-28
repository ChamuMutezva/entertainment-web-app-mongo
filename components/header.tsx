import Link from "next/link";
import Image from "next/image";
import React from "react";
import Navigation from "./navigation";
import UserInfo from "./userInfo";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

function Header() {
    const { data: session } = useSession();
    console.log(session);
    return (
        <header className="flex justify-between items-center p-6 bg-semiDarkBlue md:rounded-lg md:m-6">
            <Link href={"/all"} aria-label="all movies">
                <Image src={"/assets/logo.svg"} width={33} height={27} alt="" />
            </Link>

            <Navigation />
            <div className="flex gap-2">
                <span className="hidden sm:block">{session?.user?.name}</span>
                <button onClick={() => signOut()} aria-label="log out">
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
