import clientPromise from "../lib/mongodb";
import { ChangeEvent, useRef, useState } from "react";
import type { InferGetServerSidePropsType } from "next";
import Background from "../components/background";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

import Navigation from "../components/navigation";
import Trending from "../components/Trending";
import Recommended from "../components/Recommended";
import SearchMovie from "../components/SearchMovie";

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
                    <SearchMovie
                        searchMovie={searchMovie}
                        searchText={searchText}
                    />
                    <Trending movies={movies} />
                    <Recommended movies={movies} />
                </div>
            </main>
        </div>
    );
}
