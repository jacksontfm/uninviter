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
    let guestEmails = []
    for (let guest of req.body.guests) {
        guestEmails.push(guest.guest_email);
    }
    try {
        await transporter.sendMail({
            from: `"Inviter Event Planning" <${process.env.EMAIL}>`,
            to: guestEmails,
            subject: "You're invited!",
            html: "Congratulations you have won 10000 dollars click this link below and claim your prize!",
        });
        res.status(200).send({ message: "Email sent" });
    } catch (err) {
        res.status(500).send({
            message: "Error: cannot send email"
        });
    }
}

const sendUninvited = async (req, res) => {
    let guestEmails = []
    for (let guest of req.body.guests) {
        guestEmails.push(guest.guest_email);
    }
    try {
        await transporter.sendMail({
            from: `"Inviter Event Planning Viagra" <${process.env.EMAIL}>`,
            to: guestEmails,
            subject: "You're invited!",
            html: "Congratulations you have won 10000 dollars click this link below and claim your prize! <span style='display:inline-block; max-height:0; max-width:0;mso-font-width:0%;mso-style-textfill-type: none; white-space: nowrap;'><span style='max-height:1px; max-width:1px; display:inline-block; overflow:hidden; font-size:1px;color:rgba(0,0,0,0);text-indent:9px;'>hidden text</span></span>",
        });
        res.status(200).send({ message: "Email sent" });
    } catch (err) {
        res.status(500).send({
            message: "Error: cannot send email"
        });
    }
}

module.exports = { sendInvited, sendUninvited }