import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export const config = {
    api: {
        externalResolver: true,
    },
};

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { email } = await req.body;
        const client = await clientPromise;
        const db = client.db("movies_data");
        const user = await db.collection("users").findOne({ email });
        console.log("user: ", user);

        res.json({ user });
    } catch (error) {
        res.json({ message: "An error occured while registering the user." });
    }
}
