import UserEvents from "./models/SchemaUserEvents.js";

export async function addOneUserEvent(objectUserEvents) {
  // creat a object to add to do DB.
  const addUserEvents = new UserEvents(objectUserEvents);

  try {
    let responsAddUserEvents = await addUserEvents.save();
    return true;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function allDB() {
  try {
    const allUserEventss = await UserEvents.find({});
    console.log(allUserEventss);
    return allUserEventss;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getOneUserEvents(objectUserEvents) {
  try {
    return await UserEvents.findOne(objectUserEvents);
  } catch (error) {
    return undefined;
  }
}

export async function updeteOneUserEvents(email, objectUpdate) {
  try {
    const resDB = await UserEvents.updateOne({ email: email }, { $set: objectUpdate });
    return true
  } catch (error) {
    return false
  }
}

export async function getRowsfromAllUserEventss(stringRows){
  try {
    const resDB = await UserEvents.find({}, stringRows)
    return resDB
  } catch (error) {
    return error
  }
}
export async function getRowsfromAllUserEventsByObject(objectEvent) {
  try {
    const resDB = await UserEvents.find(objectEvent);
    return resDB;
  } catch (error) {
    return error;
  }
}
