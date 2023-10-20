import React from "react";
import Image from "next/image";
import Background from "./background";

function Recommended({ movies }: { movies: [] }) {
    return (
        <div className="p-8">
            <h2 className="text-xl">Recommended for you</h2>
            <ul className="w-full grid grid-cols-1 min-[23rem]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-4">
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
                                    priority={movie.title === "Beyond Earth"}
                                    src={`/assets/thumbnails/${movie.title
                                        .replace(/'/g, "")
                                        .replace(/:/g, "")
                                        .split(" ")
                                        .join("-")
                                        .toLowerCase()}/regular/small.jpg`}
                                />
                            </picture>
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
                                <h2 className={`text-base font-normal text-[1.5rem] z-[1] relative`}>
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
