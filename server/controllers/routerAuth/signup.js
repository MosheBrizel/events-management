import { validationResult } from "express-validator";
import { addToDB, getOneUser, updeteOneUser } from "../../db/functionToDB.js";
import bcrypt from "bcrypt";
import sendEmail from "../../middleware/sendEmailToTheClient.js";
import uploadImagecloudinary from '../../cloudinary/updateImage.js'


const signupFunction = async (req, res) => {
  // get the erorrs in the check middelwer.
  const errors = validationResult(req);
  // If there is an erorr.
  console.log("kjnhbgbnj");
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  
  const { firstName, lastName, email, password } = req.body;
  

  //check if there is a user like this.
  const userExists = await getOneUser({ email: email });
  if (userExists && userExists.verifyEmail.verify == false) {
    return res.status(400).json({
      errors: {
        msg: "the email is not verify",
      },
    });
  }
  // if there is a user like this send erorr.
  if (userExists && userExists.verifyEmail.verify == true) {
    return res.status(400).json({
      errors: {
        msg: "one of the information is error",
      },
    });
  }
  const image = req.files[0]
  const imageUrl = await uploadImagecloudinary(image)
  // add to the DB.
  const resultAddUser = await addToDB({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: " ",
    image : imageUrl
  });
  if (!resultAddUser) {
    return res.status(400).json({
      errors: {
        msg: "erorr in the DB",
      },
    });
  }

  // create a hash password.
  let hashePassword = await bcrypt.hash(password, 10);
  // creat a rundom code of 5 numbers.
  const verifyCode = Math.floor(Math.random() * 90000) + 10000;
  // add to the DB.
  const resultUpdateUser = await updeteOneUser(email, {
    password: hashePassword,
    verifyEmail: { value: verifyCode, date: new Date(), verify: false },
  });
  // send the email to the user.
  const reqEmail = await sendEmail(email, verifyCode);
  if (resultUpdateUser == true && reqEmail == true) {
    // Send the ok the send a email.
    return res.status(200).json({
      msg: true,
    });
  } else {
    return res.status(400).json({
      errors: {
        msg: "erorr in the DB",
      },
    });
  }
};

export default signupFunction;
