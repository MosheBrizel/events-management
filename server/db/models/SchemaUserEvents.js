import mongoose from "mongoose";

const UserEventsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  eventId: {
    type: String,
    required: true,
  }
});

const UserEvents = mongoose.model("UserEvents", UserEventsSchema);
export default UserEvents;
