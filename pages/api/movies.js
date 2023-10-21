import clientPromise from "../../lib/mongodb";
/*
export default async  (req, res) => {
   try {
       const client = await clientPromise;
       const db = client.db("movies_data");

       const movies = await db
           .collection("movies")
           .find({})
           .sort({ metacritic: -1 })           
           .toArray();

       res.json(movies);
   } catch (e) {
       console.error(e);
   }
};
*/