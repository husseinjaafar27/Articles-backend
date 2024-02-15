import nodeMailer from "nodemailer";

export const userNodemailer = (email, subject, html) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    type: "SMTP",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    html: html,
  };
  transporter.sendMail(mailOptions, (err, info) => {});
};
