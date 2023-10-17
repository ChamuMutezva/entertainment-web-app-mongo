import React from "react";
import Image from "next/image";

function SearchMovie() {
    return (
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
    );
}

export default SearchMovie;
