import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import clientPromise from "../../lib/mongodb";
//import { NextApiRequest } from "next/types";

export const config = {
    api: {
        externalResolver: true,
    },
};

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { name, email, password } = await req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        const client = await clientPromise;
        const db = client.db("movies_data");
        const collection = db.collection("users");

        /*
        const users = await db
            .collection("users")
            .find({ email: email })
            .toArray();
       */

        const users = collection.insertOne({
            name,
            email,
            password: hashedPassword,
        });

        console.log("Name:", name);
        console.log("Email: ", email);
        console.log("Password:", password);
        res.json({ users });
    } catch (error) {
        return Response.json(
            { message: "An error occured while registering the user." },
            { status: 500 }
        );
    }
}
