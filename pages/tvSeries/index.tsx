import React, { ChangeEvent, useEffect, useState } from "react";
import type { InferGetServerSidePropsType } from "next";
import clientPromise from "../../lib/mongodb";
import SearchMovie from "../../components/SearchMovie";
import Recommended from "../../components/Recommended";
import Head from "next/head";


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
            .find({ category: "TV Series" })
            .sort({ title: 1 })
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

function TVSeries({
    movies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [searchText, setSearchText] = useState("");
    const [displayMovies, setDisplayMovies] = useState(movies);

    function searchMovie(event: ChangeEvent<HTMLInputElement>): void {
        return setSearchText(event.target.value);
    }
    function filteredData() {
        return setDisplayMovies(
            movies.filter((movie: { title: string }) =>
                movie.title.toLowerCase().includes(searchText)
            )
        );
    }
    useEffect(() => {
        filteredData();
    }, [searchText]);

    return (
        <div className="container w-screen bg-darkBlue text-white py-6">
            <Head>
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="manifest" href="/manifest.json" />
                <link
                    rel="mask-icon"
                    href="/safari-pinned-tab.svg"
                    color="#5bbad5"
                />
                <link rel="icon" href="/favicon.ico" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
                <title>Entertainment web app</title>
            </Head>

            <h1 className="sr-only">Entertainment center</h1>
            <SearchMovie
                searchMovie={searchMovie}
                searchText={searchText}
                labelText="Search for TV Series"
            />
            <Recommended movies={displayMovies} mainHeading="TV Series" />
        </div>
    );
}

export default TVSeries;
