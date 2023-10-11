import Head from "next/head";
import { useState, useEffect } from "react";

export default function Home() {
    const [movies, setMovies] = useState([]);
    const logMovies = async () => {
        const response = await fetch("http://localhost:3000/api/movies");
        const moviesList = await response.json();
        console.log(moviesList);
        return setMovies(moviesList);
    };
    
    useEffect(() => {
        logMovies();
    }, []);
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
