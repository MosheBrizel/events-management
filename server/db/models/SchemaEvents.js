import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default:
      "https://media-cdn.tripadvisor.com/media/photo-s/10/c4/23/16/highland-view-bed-and.jpg",
  },
  places: {
    type: Number,
    required: true,
  },
  placesTaking: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  dressCode: {
    type: String,
  },
  arrivalInstructions: {
    type: String,
  },
  ageRestriction: {
    type: String,
  },
  organizerEvent: {
    type: String,
  },
  numberEvent: {
    type: Number,
    unique: true,
  },
  noteLocation: {
    type: String,
  },
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
