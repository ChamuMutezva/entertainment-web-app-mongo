import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


function Navigation() {
    const pathname = usePathname()
    return (
        <nav>
            <ul className="flex gap-5">
                <li>
                    <Link
                        href={"/all"}
                        aria-label="all movies and tv series"
                        className="group"
                    >
                        <Image
                            src={"/assets/icon-nav-home.svg"}
                            width={20}
                            height={20}
                            alt=""
                            className={`group-hover:invert group-hover:brightness-50 ${
                                pathname == "/all" ? "active" : ""
                            }`}
                        />
                    </Link>
                </li>
                <li>
                    <Link
                        href={"/movies"}
                        aria-label="movies"
                        className="group"
                    >
                        <Image
                            src={"/assets/icon-nav-movies.svg"}
                            width={20}
                            height={20}
                            alt=""
                            className={`group-hover:invert group-hover:brightness-50 ${
                                pathname == "/movies" ? "active" : ""
                            }`}
                        />
                    </Link>
                </li>
                <li>
                    <Link
                        href={"/tvSeries"}
                        aria-label="tv series"
                        className="group"
                    >
                        <Image
                            src={"/assets/icon-nav-tv-series.svg"}
                            width={20}
                            height={20}
                            alt=""
                            className={`group-hover:invert group-hover:brightness-50 ${
                                pathname == "/tvSeries" ? "active" : ""
                            }`}
                        />
                    </Link>
                </li>
                <li>
                    <Link
                        href={"/bookmarked"}
                        aria-label="bookmarked movies and series"
                        className="group"
                    >
                        <Image
                            src={"/assets/icon-nav-bookmark.svg"}
                            width={17}
                            height={20}
                            alt=""
                            className={`group-hover:invert group-hover:brightness-50 ${
                                pathname == "/bookmarked" ? "active" : ""
                            }`}
                        />
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
