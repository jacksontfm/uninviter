const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.mailersend.net',
    port: 587,
    secure: false, //ssl
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
});

const sendInvited = async (req, res) => {
    const templateText = req.body.text;
    let guestEmails = [];
    for (let guest of req.body.guests) {
        guestEmails.push(guest.guest_email);
    }
    try {
        await transporter.sendMail({
            from: `"Inviter Event Planning" <${process.env.EMAIL}>`,
            to: guestEmails,
            subject: "You're invited!",
            html: templateText,
        });
        res.status(200).send({ message: "Email sent" });
    } catch (err) {
        res.status(500).send({
            message: "Error: cannot send email"
        });
    }
}

const sendUninvited = async (req, res) => {
    const templateText = req.body.text;
    let guestEmails = [];
    for (let guest of req.body.guests) {
        guestEmails.push(guest.guest_email);
    }
    try {
        await transporter.sendMail({
            from: `"Inviter Event Planning Viagra" <${process.env.EMAIL}>`,
            to: guestEmails,
            subject: "You're invited!",
            html: templateText,
        });
        res.status(200).send({ message: "Email sent" });
    } catch (err) {
        res.status(500).send({
            message: "Error: cannot send email"
        });
    }
}

module.exports = { sendInvited, sendUninvited }