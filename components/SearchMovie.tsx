import React from "react";
import Image from "next/image";

function SearchMovie(props: {
    searchMovie: React.ChangeEventHandler<HTMLInputElement>;
    searchText: string;
    labelText: string;
}) {
    return (
        <form noValidate className="relative p-4 bg-inherit">
            <input
                type="search"
                name="search-movie"
                id="search-movie"
                placeholder=""
                className="w-full text-white py-4 bg-darkBlue rounded-lg focus:ring-0 peer"
                onChange={props.searchMovie}
                value={props.searchText}
            />

            <label
                htmlFor="search-movie"
                className="absolute flex items-center gap-2
                             text-white top-6 left-8 transition-all text-base opacity-40"
            >
                <Image
                    src={"/assets/icon-search.svg"}
                    width={32}
                    height={32}
                    alt=""
                />
                {props.labelText}
            </label>
        </form>
    );
}

export default SearchMovie;
