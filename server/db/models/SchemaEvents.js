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
  },
  plases: {
    type: Number,
    required: true,
  },
  plasTaking: {
    type: Number,
    default: 0,
  },
  description: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  dressCode: {
    type: String,
  },
  ArrivalInstructions: {
    type: String,
  },
  AgeRestriction: {
    type: Number,
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
