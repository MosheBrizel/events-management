import Event from "./models/SchemaEvents.js";

export async function addToDBEvent(objectEvent) {
  const maxNumber = await Event.findOne().sort("-numberEvent").exec();
  const num = maxNumber ? maxNumber.numberEvent + 1 : 1;
  const addEvent = new Event({ ...objectEvent, numberEvent: num });

  try {
    let responsAddEvent = await addEvent.save();
    return true;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function allDBEvents() {
  try {
    const allEvents = await Event.find({});
    console.log(allEvents);
    return allEvents;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getOneEvent(objectEvent) {
  try {
    return await Event.findOne(objectEvent);
  } catch (error) {
    return undefined;
  }
}

export async function updeteOneEvent(numberEvent, objectUpdate) {
  try {
    const resDB = await Event.updateOne(
      { numberEvent: numberEvent },
      { $set: objectUpdate }
    );
    return true;
  } catch (error) {
    return false;
  }
}

export async function getRowsfromAllEvents(stringRows) {
  try {
    const resDB = await Event.find({}, stringRows);
    return resDB;
  } catch (error) {
    return error;
  }
}
export async function getRowsfromAllEventsByObject(objectEvent) {
  try {
    const resDB = await Event.find(objectEvent);
    return resDB;
  } catch (error) {
    return error;
  }
}

export async function subtractOneEvent(numberEvent) {
  try {
    const event = await getOneEvent({ numberEvent: numberEvent });
    console.log(event);
    const resDB = await Event.updateOne(
      { numberEvent: numberEvent },
      { $set: { placesTaking: event.placesTaking + 1 } }
    );
    return resDB;
  } catch (error) {
    return error;
  }
}
