import mongoose from "mongoose";

const { Schema } = mongoose;

const placesSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: URL, required: true },
  mapUrl: { type: URL, required: true },
  description: { type: String, required: true },
});

const Place = mongoose.models.Place || mongoose.model("Place", placesSchema);

export default Place;