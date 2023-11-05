import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export const config = {
    api: {
        externalResolver: true,
    },
};
interface Movie {
    isBookmarked: boolean;
}
export default async function PATCH(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { _id } = await req.body;

        const client = await clientPromise;
        const db = client.db("movies_data");
        const collection = db.collection<Movie>("movies");

        const getMovie = await collection.findOne( { _id: new ObjectId(_id) })
        const isBookmarked = getMovie?.isBookmarked

        const movie = await collection.findOneAndUpdate(
            { _id: new ObjectId(_id) },
            {
                $set: { isBookmarked:  !isBookmarked},
            },
            { returnDocument: "after" }
        );

        console.log(movie);
        res.json({ movie });
        // return NextResponse.json({ movie });
    } catch (error) {
        return res.json({
            message: "An error occured while updating movie.",
        });
    }
}
