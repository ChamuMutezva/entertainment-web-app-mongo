import React from "react";
import Image from "next/image";
import Background from "./background";
import { ObjectId } from "mongodb";
import { useRouter } from "next/navigation";

function Recommended({
    movies,
    mainHeading,
}: {
    movies: [];
    mainHeading: string;
}) {
    const router = useRouter();
    const handleToggle = async (_id: ObjectId) => {
        try {
            const res = await fetch("api/booked", {
                cache: "no-cache",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    _id,
                }),
            });

            if (res.ok) {
                router.refresh();
            } else {
                console.log("update failed");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="p-8">
            <h2 className="text-xl md:text-[2rem] font-light">{mainHeading}</h2>
            <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-8 py-4">
                {movies?.map(
                    (movie: {
                        src: string;
                        title: string;
                        year: number;
                        category: string;
                        rating: string;
                        isBookmarked: boolean;
                        _id: any;
                    }) => (
                        <li
                            key={movie.title}
                            className="relative recommended-list"
                        >
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
                                    recommendedImg="recommended-img"
                                    src={`/assets/thumbnails/${movie.title
                                        .replace(/'/g, "")
                                        .replace(/:/g, "")
                                        .split(" ")
                                        .join("-")
                                        .toLowerCase()}/regular/small.jpg`}
                                />
                            </picture>

                            <button
                                onClick={() => handleToggle(movie._id)}
                                className="rounded-full bg-greyishBlue p-2 flex justify-center items-center 
                                absolute top-2 right-2 opacity-50 w-8 h-8 hover:opacity-100"
                            >
                                <span className="sr-only">
                                    {movie.isBookmarked
                                        ? `${movie.title} is a ${movie.category} bookmarked for further viewing`
                                        : `${movie.title} ${movie.category} is not bookmarked`}
                                </span>
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
                            </button>

                            <div>
                                <div className="flex gap-4 items-center">
                                    <p className="text-xs font-light opacity-75">
                                        {movie.year}
                                    </p>
                                    <Image
                                        width={12}
                                        height={12}
                                        alt=""
                                        src={`${
                                            movie.category === "Movie"
                                                ? "/assets/icon-category-movie.svg"
                                                : "/assets/icon-category-tv.svg"
                                        }`}
                                    />
                                    <p className="text-xs font-light opacity-75">
                                        {movie.category}
                                    </p>
                                    <p className="font-light text-sm">
                                        {movie.rating}
                                    </p>
                                </div>
                                <h2
                                    className={`text-base md:text-lg font-normal text-[1.5rem] z-[1] relative`}
                                >
                                    {movie.title}
                                </h2>
                            </div>
                        </li>
                    )
                )}
            </ul>
        </div>
    );
}

export default Recommended;
