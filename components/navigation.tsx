import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Navigation() {
  return (
    <nav>
    <ul className="flex gap-5">
        <li>
            <Link href={"/"}>
                <Image
                    src={"/assets/icon-nav-home.svg"}
                    width={20}
                    height={20}
                    alt=""
                />
            </Link>
        </li>
        <li>
            <Link href={"/"} aria-label="movies">
                <Image
                    src={"/assets/icon-nav-movies.svg"}
                    width={20}
                    height={20}
                    alt=""
                />
            </Link>
        </li>
        <li>
            <Link href={"/"} aria-label="tv series">
                <Image
                    src={"/assets/icon-nav-tv-series.svg"}
                    width={20}
                    height={20}
                    alt=""
                />
            </Link>
        </li>
        <li>
            <Link
                href={"/"}
                aria-label="bookmarked movies and series"
            >
                <Image
                    src={"/assets/icon-nav-bookmark.svg"}
                    width={17}
                    height={20}
                    alt=""
                />
            </Link>
        </li>
    </ul>
</nav>
  )
}

export default Navigation