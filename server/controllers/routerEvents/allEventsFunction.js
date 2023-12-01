import { addToDBEvent, allDBEvents } from "../../db/functionDBEvent.js";

const allEventsFunction = async (req, res) => {
  try {
    const data = await allDBEvents();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      errors: {
        msg: "erorr in the DB",
      },
    });
  }
};
export default allEventsFunction;
