import dbConnect from "@/lib/_db_Connect";
import Place from "@/db/models/tourio";

export default async function handler(request, response) {
    try {
      await dbConnect();
      if (request.method === "GET") {
        const places = await Place.find();
        return response.status(200).json(places);
      }
      if (request.method === "POST") {
        const placeData = request.body;
        const newPlace = await Place.create(placeData);
        return response.status(201).json(newPlace);
      }
      if (request.method === "DELETE") {
        const placeData = request.body;
        const newPlace = await Place.create(placeData);
        return response.status(201).json(newPlace);
      }
      return response.status(405).json({ message: "Method not allowed" });
    } catch (error) {
      console.error("API Error:", error);
      return response.status(500).json({ error: error.message });
    }
  }