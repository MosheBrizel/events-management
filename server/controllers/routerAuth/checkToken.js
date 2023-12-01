import { getRowsfromAllUserEventsByObject } from "../../db/functionDBEventUser.js";
import { getOneUser } from "../../db/functionToDBUser.js";

const tokenFunction = async (req, res) => {
  try {
    const { token } = req.body;
    let user = await getOneUser({ "token.value": token });
    if (user) {
      const data = await getRowsfromAllUserEventsByObject({
        email: user.email,
      });
      return res.status(200).json({ msg: "Token is good", data: data });
    } else {
      return res.status(400).json({ msg: "Token is not good" });
    }
  } catch (error) {
    return res.status(400).json({ msg: "Token is not good" });
  }
};

export default tokenFunction;
