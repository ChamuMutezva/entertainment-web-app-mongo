import clientPromise from "../lib/mongodb";

interface Movie {
    title: string;
    year: string;
    category: string;
}

interface TopProps {
    movies: Movie[];
}

export default function Top({ movies }: TopProps) {
    return (
        <div>
            <h1>Next.js static generation with MongoDB</h1>
            <ul>
                {movies.map((movie) => (
                    <li>
                        <h2>{movie.title}</h2>
                        <h3>{movie.category}</h3>
                        <p>{movie.year}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export async function getStaticProps() {
    try {
        const client = await clientPromise;
        const db = client.db("movies_data");

        const movies = await db
            .collection("movies")
            .find({})
            .sort({ metacritic: -1 })
            .toArray();

        return {
            props: { movies: JSON.parse(JSON.stringify(movies)) },
        };
    } catch (e) {
        console.error(e);
    }
}
