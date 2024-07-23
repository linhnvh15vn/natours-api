"use strict";

const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, text, html }) => {
  const transport = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  const mailOptions = {
    from: "Natours",
    to,
    subject,
    text,
    // html,
  };

  await transport.sendMail(mailOptions);
};

module.exports = sendEmail;
