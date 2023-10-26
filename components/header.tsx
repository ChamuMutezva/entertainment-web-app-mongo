import Link from "next/link";
import Image from "next/image";
import React from "react";
import Navigation from "./navigation";

function Header() {
    return (
        <header className="flex justify-between items-center p-6 bg-semiDarkBlue md:rounded-lg md:m-6">
            <Link href={"/"} aria-label="home">
                <Image src={"/assets/logo.svg"} width={33} height={27} alt="" />
            </Link>

            <Navigation />
            
            <Link href={"/loginPage"} aria-label="profile">
                <Image
                    src={"/assets/image-avatar.png"}
                    width={24}
                    height={24}
                    alt=""
                />
            </Link>
        </header>
    );
}

export default Header;
