import { useLayoutEffect, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Background from "./background";

function Trending({ movies }: { movies: [] }) {
    const ref = useRef<HTMLLIElement>(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const slideLeft = () => {
        console.log(width);
        let slider = document.getElementById("slider");
        slider!.scrollLeft = slider!.scrollLeft - width;
    };
    const slideRight = () => {
        let slider = document.getElementById("slider");
        slider!.scrollLeft = slider!.scrollLeft + width;
    };

    useLayoutEffect(() => {
        setWidth(ref.current?.offsetWidth!);
        setHeight(ref.current?.offsetWidth! * 1.715);
       
    }, [width]);

    useEffect(() => {

        function handleWindowResize() {
            setWidth(ref.current?.offsetWidth!);
            setHeight(ref.current?.offsetWidth! * 1.715);
        }

        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, [width])

    return (
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
                            (movie: { isTrending: boolean }) => movie.isTrending
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
                                                <p>{movie.category}</p>
                                                <p>{movie.rating}</p>
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
    );
}

export default Trending;
