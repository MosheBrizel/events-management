import {
  getOneEvent,
  subtractOneEvent,
  updeteOneEvent,
} from "../../db/functionDBEvent.js";
import {
  addOneUserEvent,
  getOneUserEvents,
  getRowsfromAllUserEventsByObject,
} from "../../db/functionDBEventUser.js";

const RegistrationEventFunction = async (req, res) => {
  const { corentEvent, email } = req.body;
  const data = await getRowsfromAllUserEventsByObject({ email: email });
  try {
    const eventUse = await getOneEvent({ numberEvent: corentEvent });

    if (!eventUse) {
      return res.status(400).json({
        errors: {
          msg: "there is no a event",
        },
      });
    }

    const registeredBefore = await getOneUserEvents({
      email: email,
      eventId: corentEvent,
    });
    if (registeredBefore) {
      return res.status(400).json({
        errors: {
          msg: "registered before",
        },
      });
    }
    const addEvent = await addOneUserEvent({
      email: email,
      eventId: corentEvent,
    });
    const updateEvent = await subtractOneEvent(corentEvent);
    console.log(updateEvent);
    if (!addEvent) {
      return res.status(400).json({
        errors: {
          msg: "erorr in the DB",
        },
      });
    }
    const data = await getRowsfromAllUserEventsByObject({ email: email });
    
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      errors: {
        msg: "erorr in the DB",
      },
    });
  }
};

export default RegistrationEventFunction;
