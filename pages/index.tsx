import Head from "next/head";
import clientPromise from "../lib/mongodb";
import type { InferGetServerSidePropsType } from "next";

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
    return (
        <div className="container">
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <div>
                    <h1> Movies 2023</h1>
                    <ul>
                        {movies?.map(
                            (movie: {
                                title: string;
                                year: string;
                                category: string;
                            }) => (
                                <li key={movie.title}>
                                    <h2>{movie.title}</h2>
                                    <h3>{movie.year}</h3>
                                    <p>{movie.category}</p>
                                </li>
                            )
                        )}
                    </ul>
                </div>
            </main>
        </div>
    );
}
