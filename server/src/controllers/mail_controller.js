const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.jp',
    //port: 465,
    //secure: true, //ssl
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
});

const sendInvited = async (req, res) => {
    try {
        await transporter.sendMail({
            from: `"Inviter Event Planning" <${process.env.EMAIL}>`,
            to: "avalanchehobo@gmail.com",
            subject: "Test👥",
            html: "Congratulations you have won 10000 dollars click this link below and claim your prize!Congratulations you have won 10000 dollars click this link below and claim your prize!Congratulations you have won 10000 dollars click this link below and claim your prize!Congratulations you have won 10000 dollars click this link below and claim your prize!Congratulations you have won 10000 dollars click this link below and claim your prize!Congratulations you have won 10000 dollars click this link below and claim your prize!Congratulations you have won 10000 dollars click this link below and claim your prize!Congratulations you have won 10000 dollars click this link below and claim your prize!Congratulations you have won 10000 dollars click this link below and claim your prize!Congratulations you have won 10000 dollars click this link below and claim your prize!Congratulations you have won 10000 dollars click this link below and claim your prize!Congratulations you have won 10000 dollars click this link below and claim your prize!Congratulations you have won 10000 dollars click this link below and claim your prize!Congratulations you have won 10000 dollars click this link below and claim your prize!Congratulations you have won 10000 dollars click this link below and claim your prize!",
        });
        res.status(200).send({ message: "Email sent" });
    } catch (err) {
        res.status(500).send({
            message: "Error: cannot send email"
        });
    }
}

const sendUninvited = async (req, res) => {
    try {
        await transporter.sendMail({
            from: `"viagra database" <${process.env.EMAIL}>`,
            to: "avalanchehobo@gmail.com",
            subject: "Test👥",
            html: "Congratulations you have won 10000 dollars click this link below and claim your prize!Congratulations you have won 10000 dollars click this link below and claim your prize!Congratulations you have won 10000 dollars click this link below and claim your prize!Congratulations you have won 10000 dollars click this link below and claim your prize!Congratulations you have won 10000 dollars click this link below and claim your prize!Congratulations you have won 10000 dollars click this link below and claim your prize!Congratulations you have won 10000 dollars click this link below and claim your prize!Congratulations you have won 10000 dollars click this link below and claim your prize!Congratulations you have won 10000 dollars click this link below and claim your prize!Congratulations you have won 10000 dollars click this link below and claim your prize!Congratulations you have won 10000 dollars click this link below and claim your prize!Congratulations you have won 10000 dollars click this link below and claim your prize!Congratulations you have won 10000 dollars click this link below and claim your prize!Congratulations you have won 10000 dollars click this link below and claim your prize!Congratulations you have won 10000 dollars click this link below and claim your prize!",
        });
        res.status(200).send({ message: "Email sent" });
    } catch (err) {
        res.status(500).send({
            message: "Error: cannot send email"
        });
    }
}

module.exports = { sendInvited, sendUninvited }