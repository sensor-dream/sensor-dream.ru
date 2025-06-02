const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    secure: false,
    auth: {
      user: 'your@email.com',
      pass: 'password'
    }
  });

  const mailOptions = {
    from: email,
    to: 'recipient@example.com',
    subject: `New Message from ${name}`,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.send('Email sent: ' + info.response);
  });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
