import { dbConnect } from "@/lib/_db_Connect";
import Place from "@/db/models/tourio";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    const places= await Place.find();
  

  return response.status(200).json(places);
  }
  else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
