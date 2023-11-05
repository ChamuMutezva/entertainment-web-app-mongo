import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export const config = {
    api: {
        externalResolver: true,
    },
};

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { _id } = await req.body;
        const client = await clientPromise;
        const db = client.db("movies_data");
        const movie = await db.collection("movies").findOne({ _id: new ObjectId(_id) });
        console.log("movie: ", movie);

        res.json({ movie });
    } catch (error) {
        res.json({ message: "An error occured while searching for movie." });
    }
}
