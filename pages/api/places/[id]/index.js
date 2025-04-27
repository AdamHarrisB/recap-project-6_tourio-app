import dbConnect from "@/db/connect";
import Place from "@/db/models/tourio";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;
  
  if (request.method === "GET") {
    const place = await Place.findById(id);
    if (!place) {
      return response.status(404).json({ status: "Not Found" });
    }
    return response.status(200).json(place);
  }

  if (request.method === "PUT") {
    try {
      const updatedPlace = await Place.findByIdAndUpdate(id, request.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedPlace) {
        return response.status(404).json({ status: "Not Found" });
      }
      return response.status(200).json(updatedPlace);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  if (request.method === "DELETE") {
    try {
      const deletedPlace = await Place.findByIdAndDelete(id);
      if (!deletedPlace) {
        return response.status(404).json({ status: "Not Found" });
      }
      return response.status(200).json({ status: "Place deleted successfully" });
    } catch (error) {
      console.error("Delete error:", error);
      return response.status(500).json({ error: error.message });
    }
  }

  return response.status(405).json({ status: "Method not allowed" });
}