const nodemailer = require("nodemailer");

async function sendEmail(userEmail, messege) {
  // -> Create transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  });

  // -> Mail options
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: userEmail,
    subject: "Verification code",
    html: `<h1>Email Verification</h1>
    <p>Your verification code is :</p>
    <h2 style="color: blue;">${messege}</h2>
    <p>please enter this code on verification page to complete registration</p>
    <p>if you do not need it ignore this email</p>    
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email verification sent");
  } catch (error) {
    console.log(error.messege);
  }
}

module.exports = sendEmail;
