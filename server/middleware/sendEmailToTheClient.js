import nodemailer from "nodemailer";

async function sendEmail(email,code) {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "eventguestmanagement11@gmail.com",
        pass: process.env.PASSWORD_EMAIL,
      },
    });

    const mailOptions = {
      from: "eventguestmanagement11@gmail.com",
      to: email,
      subject: "Code",
      text: 'The code is ' + code,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return true
  } catch (error) {
    console.error("Error occurred:", error);
    return false
  }
}

export default sendEmail;
