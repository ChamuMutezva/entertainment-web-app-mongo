"use client";
import clientPromise from "../lib/mongodb";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { InferGetServerSidePropsType } from "next";
import Background from "../components/background";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Navigation from "../components/navigation";

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
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useLayoutEffect(() => {
        setWidth(ref.current?.offsetWidth!);
        setHeight(ref.current?.offsetWidth! * 1.715);       
    }, [width]);

    const slideLeft = () => {
        console.log(width);
        let slider = document.getElementById("slider");
        slider!.scrollLeft = slider!.scrollLeft - width;
    };
    const slideRight = () => {
        let slider = document.getElementById("slider");
        slider!.scrollLeft = slider!.scrollLeft + width;
    };

    useEffect(() => {
        function handleWindowResize() {
            setWidth(ref.current?.offsetWidth!);
            setHeight(ref.current?.offsetWidth! * 1.715);
        }

        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, [width]);

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
                            placeholder=" "
                            className="w-full text-darkBlue bg-darkBlue focus:ring-0 peer"
                        />
                        <label
                            htmlFor="search-movie"
                            className="absolute flex items-center gap-2 text-greyishBlue top-6 left-2 transition-all scale-75 px-1 duration-300
                            peer-placeholder-shown:scale-100 
                            peer-placeholder-shown:top-4.5
                            peer-placeholder-shown:left-2 
                            peer-placeholder-shown:text-slate:500 
                            peer-focus:-top-3 peer-focus:scale-75
                            peer-focus:-left-2 peer-focus:text-white"
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
                    <div className="flex flex-col gap-4">
                        <h2 className="px-12">Trending</h2>
                        <div className="flex relative items-center gap-4">
                            <button
                                onClick={slideLeft}
                                className="opacity-50 cursor-pointer hover:opacity-100"
                            >
                                <MdChevronLeft size={30} />
                            </button>

                            <ul
                                id="slider"
                                className="slider w-full h-full overflow-x-scroll scroll whitespace-nowrap
                                 overscroll-contain scroll-smooth scale-105 ease-in-out duration-300"
                            >
                                {movies
                                    ?.filter(
                                        (movie: { isTrending: boolean }) =>
                                            movie.isTrending
                                    )
                                    .map(
                                        (movie: {
                                            title: string;
                                            category: string;
                                            isTrending: boolean;
                                            isBookmarked: boolean;
                                            year: number;
                                            rating: string;
                                        }) => (
                                            <li
                                                ref={ref}
                                                key={movie.title}
                                                className="relative inline-block p-2 cursor-pointer"
                                            >
                                                <picture>
                                                    <source
                                                        media="(min-width: 38.75rem)"
                                                        srcSet={`/assets/thumbnails/${movie.title
                                                            .replace(/'/g, "")
                                                            .replace(/:/g, "")
                                                            .split(" ")
                                                            .join("-")
                                                            .toLowerCase()}/trending/large.jpg`}
                                                    />
                                                    <Background
                                                        width={480}
                                                        height={280}
                                                        priority={
                                                            movie.title ===
                                                                "Beyond Earth" ||
                                                            movie.title ===
                                                                "Undiscovered Cities"
                                                        }
                                                        src={`/assets/thumbnails/${movie.title
                                                            .replace(/'/g, "")
                                                            .replace(/:/g, "")
                                                            .split(" ")
                                                            .join("-")
                                                            .toLowerCase()}/trending/small.jpg`}
                                                    />
                                                </picture>
                                                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between items-end p-4">
                                                    <div className="rounded-full bg-greyishBlue p-2 inline-block">
                                                        <Image
                                                            src={`${
                                                                movie.isBookmarked
                                                                    ? "/assets/icon-bookmark-full.svg"
                                                                    : "/assets/icon-bookmark-empty.svg"
                                                            }`}
                                                            alt=""
                                                            width={12}
                                                            height={14}
                                                        />
                                                    </div>

                                                    <div className="w-full">
                                                        <div className="flex justify-start items-center gap-3">
                                                            <p>{movie.year}</p>
                                                            <Image
                                                                width={12}
                                                                height={12}
                                                                alt=""
                                                                src={`${
                                                                    movie.category ===
                                                                    "Movie"
                                                                        ? "/assets/icon-category-movie.svg"
                                                                        : "/assets/icon-category-tv.svg"
                                                                }`}
                                                            />
                                                            <p>
                                                                {movie.category}
                                                            </p>
                                                            <p>
                                                                {movie.rating}
                                                            </p>
                                                        </div>
                                                        <h2
                                                            className={`text-[1.5rem] z-[1] relative w-full object-cover`}
                                                        >
                                                            {movie.title}
                                                        </h2>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    )}
                            </ul>
                            <button
                                onClick={slideRight}
                                className="opacity-50 cursor-pointer hover:opacity-100"
                            >
                                <MdChevronRight size={30} />
                            </button>
                        </div>
                    </div>
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
