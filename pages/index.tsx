import clientPromise from "../lib/mongodb";
import { ChangeEvent, useRef, useState } from "react";
import type { InferGetServerSidePropsType } from "next";
import Background from "../components/background";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

import Navigation from "../components/navigation";
import Trending from "../components/Trending";

type ConnectionStatus = {
    isConnected: boolean;
};

export async function getServerSideProps() {
    try {
        await clientPromise;
        // `await clientPromise` will use the default database passed in the MONGODB_URI
        // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
        //
        const client = await clientPromise;
        const db = client.db("movies_data");
        //
        // Then you can execute queries against your database like so:
        // db.find({}) or any of the MongoDB Node Driver commands
        const movies = await db
            .collection("movies")
            .find({})
            .sort({ metacritic: -1 })
            .toArray();

        return {
            props: {
                movies: JSON.parse(JSON.stringify(movies)),
                isConnected: true,
            },
        };
    } catch (e) {
        console.error(e);
    }
}

export default function Home({
    isConnected,
    movies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const ref = useRef<HTMLLIElement>(null);
    const [searchText, setSearchText] = useState("");

    function searchMovie(event: ChangeEvent<HTMLInputElement>): void {
        return setSearchText(event.target.value);
    }

    return (
        <div className="container w-screen">
            <Head>
                <title>Entertainment web app</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className="flex justify-between items-center p-6 bg-semiDarkBlue">
                <Link href={"/"} aria-label="home">
                    <Image
                        src={"/assets/logo.svg"}
                        width={33}
                        height={27}
                        alt=""
                    />
                </Link>

                <Navigation />

                <Link href={"/"}>
                    <Image
                        src={"/assets/image-avatar.png"}
                        width={24}
                        height={24}
                        alt=""
                    />
                </Link>
            </header>
            <main className="bg-darkBlue text-white">
                <div className="py-6">
                    <h1 className="text-red sr-only">Entertainment center</h1>
                    <form noValidate className="relative py-4 bg-inherit">
                        <input
                            type="search"
                            name="search-movie"
                            id="search-movie"
                            placeholder=""
                            className="w-full text-white bg-darkBlue focus:ring-0 peer"
                            onChange={searchMovie}
                            value={searchText}
                        />
                        {/*  absolute -top-3 left-2
                       transition-all bg-white scale-75 
                       px-1 duration 
                       peer-placeholder-shown:scale-100
                        peer-placeholder-shown:top-2.5 
                        peer-placeholder-shown:left-2
                         peer-placeholder-shown:text-slate-500 
                         peer-focus:-top-3 peer-focus:scale-75
                          peer-focus:-left-2 peer-focus:text-sky-500
                       */}
                        <label
                            htmlFor="search-movie"
                            className="absolute flex items-center gap-2
                             text-greyishBlue top-6 left-2 transition-all "
                        >
                            <Image
                                src={"/assets/icon-search.svg"}
                                width={32}
                                height={32}
                                alt=""
                            />
                            Search for movies or Tv series
                        </label>
                    </form>
                    <Trending movies={movies} />

                    <div>
                        <h2>Recommended for you</h2>
                        <ul className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                            {movies?.map(
                                (movie: {
                                    src: string;
                                    title: string;
                                    year: number;
                                    category: string;
                                    rating: string;
                                }) => (
                                    <li key={movie.title}>
                                        <picture className="flex justify-center items-center">
                                            <source
                                                media="(min-width: 64rem)"
                                                srcSet={`/assets/thumbnails/${movie.title
                                                    .replace(/'/g, "")
                                                    .replace(/:/g, "")
                                                    .split(" ")
                                                    .join("-")
                                                    .toLowerCase()}/regular/large.jpg`}
                                            />
                                            <source
                                                media="(min-width: 38.75rem)"
                                                srcSet={`/assets/thumbnails/${movie.title
                                                    .replace(/'/g, "")
                                                    .replace(/:/g, "")
                                                    .split(" ")
                                                    .join("-")
                                                    .toLowerCase()}/regular/medium.jpg`}
                                            />
                                            <Background
                                                width={328}
                                                height={220}
                                                priority={
                                                    movie.title ===
                                                    "Beyond Earth"
                                                }
                                                src={`/assets/thumbnails/${movie.title
                                                    .replace(/'/g, "")
                                                    .replace(/:/g, "")
                                                    .split(" ")
                                                    .join("-")
                                                    .toLowerCase()}/regular/small.jpg`}
                                            />
                                        </picture>
                                        <h2
                                            className={`text-[1.5rem] z-[1] relative`}
                                        >
                                            {movie.title}
                                        </h2>
                                        <h3>{movie.year}</h3>
                                        <p>{movie.category}</p>
                                        <p>{movie.rating}</p>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
}
