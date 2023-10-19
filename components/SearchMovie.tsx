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
            {/*  absolute -top-3 left-2
                       transition-all bg-white scale-75 
                       px-1 duration 
                       peer-placeholder-shown:scale-100
                        peer-placeholder-shown:top-2.5 
                        peer-placeholder-shown:left-2
                         peer-placeholder-shown:text-slate-500 
                         peer-focus:-top-3 peer-focus:scale-75
                          peer-focus:-left-2 peer-focus:text-sky-500
                       */}
            <label
                htmlFor="search-movie"
                className="absolute flex items-center gap-2
                             text-greyishBlue top-6 left-8 transition-all "
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
