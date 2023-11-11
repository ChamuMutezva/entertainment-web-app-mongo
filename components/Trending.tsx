"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { ObjectId } from "mongodb";
import { useRouter } from "next/navigation";

function Trending({ movies }: Readonly<{ movies: [] }>) {
    const ref = useRef<HTMLLIElement>(null);
    const [width, setWidth] = useState(0);
    //  const [height, setHeight] = useState(0);
    const router = useRouter();

    const slideLeft = () => {
        let slider = document.getElementById("slider");
        if (slider) {
            slider.scrollLeft = slider.scrollLeft - width;
        }
    };
    const slideRight = () => {
        let slider = document.getElementById("slider");
        if (slider) {
            slider.scrollLeft = slider.scrollLeft + width;
        }
    };

    useEffect(() => {
        setWidth(ref.current?.offsetWidth!);
        //  setHeight(ref.current?.offsetWidth! * 1.715);
        function handleWindowResize() {
            setWidth(ref.current?.offsetWidth!);
            // setHeight(ref.current?.offsetWidth! * 1.715);
        }

        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, [width]);

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
                return res;
            } else {
                console.log("update failed");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col gap-8">
            <h2 className="px-12 text-xl md:text-[2rem] font-light">
                Trending
            </h2>
            <div className="flex relative items-center gap-4">
                {movies.length > 0 && (
                    <button
                        onClick={slideLeft}
                        className="opacity-50 cursor-pointer hover:opacity-100 z-10"
                        aria-label="previous movie"
                    >
                        <MdChevronLeft size={40} />
                    </button>
                )}

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
                                _id: any;
                            }) => (
                                <li
                                    ref={ref}
                                    key={movie.title}
                                    className="relative inline-block rounded-lg px-2 overflow-hidden cursor-pointer group"
                                >
                                    {/* overlay button */}
                                    <button
                                        className="absolute hidden btn h-12 w-[7.25rem] bg-opacity-25 group-hover:flex justify-center items-center gap-4 
                            rounded-[28.5px]"
                                    >
                                        <Image
                                            src={"/assets/icon-play.svg"}
                                            width={30}
                                            height={30}
                                            alt=""
                                        />
                                        <span className="opacity-100">
                                            {" "}
                                            Play
                                        </span>
                                    </button>
                                    <div>
                                        {/*Picture element is ideal in this case scenario - could not find altenative in nextjs */}
                                        <Image
                                            src={`/assets/thumbnails/${movie.title
                                                .replace(/'/g, "")
                                                .replace(/:/g, "")
                                                .split(" ")
                                                .join("-")
                                                .toLowerCase()}/trending/large.jpg`}
                                            width={940}
                                            height={460}
                                            alt=""
                                            className="max-w-[30rem] rounded-lg z-0 object-contain hidden sm:block"
                                        />
                                        <Image
                                            width={480}
                                            height={280}
                                            src={`/assets/thumbnails/${movie.title
                                                .replace(/'/g, "")
                                                .replace(/:/g, "")
                                                .split(" ")
                                                .join("-")
                                                .toLowerCase()}/trending/small.jpg`}
                                            alt=""
                                            className="max-w-full  rounded-lg z-0 object-contain sm:hidden"
                                        />
                                    </div>

                                    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between items-end p-4">
                                        <button
                                            onClick={() =>
                                                handleToggle(movie._id)
                                            }
                                            className="rounded-full bg-greyishBlue p-2 flex justify-center 
                                            items-center w-8 h-8 opacity-50 hover:opacity-100"
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

                                        <div className="w-full">
                                            <div className="flex justify-start items-center gap-3">
                                                <p className="text-xs font-light opacity-75">
                                                    {movie.year}
                                                </p>
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
                                                <p className="text-xs font-light opacity-75">
                                                    {movie.category}
                                                </p>
                                                <p className="font-light text-sm">
                                                    {movie.rating}
                                                </p>
                                            </div>
                                            <h2
                                                className={`text-base md:text-xl font-normal z-[1] relative w-full object-cover`}
                                            >
                                                {movie.title}
                                            </h2>
                                        </div>
                                    </div>
                                </li>
                            )
                        )}
                </ul>

                {movies.length > 0 && (
                    <button
                        onClick={slideRight}
                        className="opacity-50 cursor-pointer hover:opacity-100 z-10"
                        aria-label="next movie"
                    >
                        <MdChevronRight size={40} />
                    </button>
                )}
            </div>
        </div>
    );
}

export default Trending;
