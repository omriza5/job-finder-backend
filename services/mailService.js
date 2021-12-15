const nodemailer = require("nodemailer");
const sendMail = ({ from, to, subject, text }) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "omriza5@gmail.com",
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log("Error Occurs", err);
    } else {
      console.log("Email sent ");
    }
  });
};

module.exports = {
  sendMail,
};
