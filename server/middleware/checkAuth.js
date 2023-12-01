import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import { getOneUser } from "../db/functionToDBUser.js";
dotenv.config();

export default async (req, res, next) => {
  //get the token from the user.
  const token = req.header("x-auth-token");
  //check if the is a token.
  if (!token) {
    return res.status(400).json({
      errors: {
        msg: "No token found",
      },
    });
  }
  // check if the token is validity.
  try {
    let user = await getOneUser({ "token.value": token });
    // It's move to the next function.
    if (!user) {
      return res.status(400).json({
        errors: {
          msg: "Token invalud error",
        },
      });
    }
    next();
  } catch (error) {
    // else sent a erorr.
    return res.status(400).json({
      errors: {
        msg: "Token invalud",
      },
    });
  }
};
