import clientPromise from "../lib/mongodb";
import type { InferGetServerSidePropsType } from "next";
import Background from "../components/background";
import Link from "next/link";
import Image from "next/image";

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
        <div className="container w-screen">
            <header className="flex justify-between items-center p-6 bg-semiDarkBlue">
                <Link href={"/"} aria-label="home">
                    <Image
                        src={"/assets/logo.svg"}
                        width={33}
                        height={27}
                        alt=""
                    />
                </Link>
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
                <Link href={"/"}>
                    <Image
                        src={"/assets/image-avatar.png"}
                        width={24}
                        height={24}
                        alt=""
                    />
                </Link>
            </header>
            <main className="">
                <div>
                    <h1 className="text-red"> Movies 2023</h1>
                    <h2>Example 1: Next.js pages with MongoDB</h2>
                    <ul>
                        {movies?.map(
                            (movie: {
                                src: string;
                                title: string;
                                year: number;
                                category: string;
                                rating: string;
                            }) => (
                                <li key={movie.title}>
                                    <Background
                                        priority={
                                            movie.title === "Beyond Earth"
                                                ? true
                                                : false
                                        }
                                        src={`/assets/thumbnails/${movie.title
                                            .replace(/'/g, "")
                                            .replace(/:/g, "")
                                            .split(" ")
                                            .join("-")
                                            .toLowerCase()}/regular/small.jpg`}
                                    />
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
            </main>
        </div>
    );
}
