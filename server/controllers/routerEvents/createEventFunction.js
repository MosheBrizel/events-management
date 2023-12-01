import uploadImagecloudinary from "../../cloudinary/updateImage.js";
import { addToDBEvent } from "../../db/functionDBEvent.js";

const createEventFunction = async (req, res) => {
  const data = req.body;
  const image = req.files[0];
  console.log(data, image);
  try {
    const imageUrl = await uploadImagecloudinary(image);
    const addDB = await addToDBEvent({
      label: data.label,
      date: data.date,
      image: imageUrl,
      places: data.places,
      placesTaking: data.placesTaking,
      description: data.description,
      location: data.location,
      dressCode: data.dressCode,
      arrivalInstructions: data.arrivalInstructions,
      ageRestriction: data.ageRestriction + "+",
      organizerEvent: data.organizerEvent,
      noteLocation: data.noteLocation,
    });
    console.log(addDB);
    console.log(imageUrl);
  } catch (error) {}
  res.status(200).json({ msg: "hi" });
};
export default createEventFunction;
