import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../../lib/mongodb";

interface Credentials {
    email: string;
    password: string;
}
export const options: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials) {
                //This is where you need to retrieve user data
                // to verify with credentials
                // Docs: https://next-auth.js.org/configuration/providers/credentials
                // const user = { id: "42", name: "Chamu", password: "nextauth" };
                const { email, password } = credentials as Credentials;
                try {
                    const client = await clientPromise;
                    const db = client.db("movies_data");
                    const user = await db
                        .collection("users")
                        .findOne({ email });

                    if (!user) {
                        return null;
                    }

                    const passwordMatch = await bcrypt.compare(
                        password,
                        user.password
                    );
                    if (!passwordMatch) {
                        return null;
                    }
                    return user as any;
                } catch (error) {
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
    },
};
