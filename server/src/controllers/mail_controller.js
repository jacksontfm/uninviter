const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.jp',
    port: 465,
    secure: true, //ssl
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
});

const sendInvited = async (req, res) => {
    await transporter.sendMail({
        from: `"Inviter Event Planning" <${process.env.EMAIL}>`,
        to: "jackson.merle@gmail.com",
        subject: "Test",
        text: "Test viagra viagra penis enlargement viagra bitcoin",
        html: "<b>test viagra viagra penis enlargement viagra bitcoin</b>",
    });
    res.status(200).send({ message: "Email sent" });
}

const sendUninvited = async (req, res) => {

}

module.exports = { sendInvited, sendUninvited }