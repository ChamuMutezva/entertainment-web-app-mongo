import clientPromise from "../../lib/mongodb";
import { ChangeEvent, useEffect, useState } from "react";
import type { InferGetServerSidePropsType } from "next";
import Trending from "../../components/Trending";
import Recommended from "../../components/Recommended";
import SearchMovie from "../../components/SearchMovie";
import EmptyCard from "../../components/emptyCard";
import Layout from "../../components/layout";

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

export default function Home({
    movies,
}: Readonly<InferGetServerSidePropsType<typeof getServerSideProps>>) {
    const [searchText, setSearchText] = useState("");
    const [displayMovies, setDisplayMovies] = useState(movies);

    function searchMovie(event: ChangeEvent<HTMLInputElement>): void {
        return setSearchText(event.target.value);
    }

    function filteredData() {
        return setDisplayMovies(
            movies.filter((movie: { title: string }) =>
                movie.title.toLowerCase().includes(searchText.toLowerCase())
            )
        );
    }

    useEffect(() => {
        filteredData();
    }, [searchText]);

    return (
        <div className="container w-screen text-white py-6">
            <Layout authPage={true}>
                <main>
                    <h1 className="sr-only">Entertainment center</h1>
                    <SearchMovie
                        searchMovie={searchMovie}
                        searchText={searchText}
                        labelText="Search for movies or TV series"
                    />

                    <Trending movies={displayMovies} />

                    {displayMovies.length > 0 ? (
                        <Recommended
                            movies={displayMovies}
                            mainHeading={"Recommended for you"}
                        />
                    ) : (
                        <EmptyCard />
                    )}
                </main>
            </Layout>
        </div>
    );
}
