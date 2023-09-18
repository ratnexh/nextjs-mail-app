export default function (req, res) {
    require('dotenv').config()

    let nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.password,
        },
        secure: true,
    })
    const mailData = {
        from: req.body.name,
        to: 'thatgeralt@gmail.com',
        subject: `Message From ${req.body.name}`,
        text: req.body.message + " | Sent from: " + req.body.name,
        html: `<div>${req.body.message}</div>
        <p>Sent from: ${req.body.email}</p>`
    }
    transporter.sendMail(mailData, function (err) {
        if (err) {
            res.status(500).send('Error sending email')
        } else {
            res.status(200).send('Email sent successfully')
        }
    })
}