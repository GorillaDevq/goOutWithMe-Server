const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vaniamihalev7@gmail.com',
        pass: 'mugm adta betz qoon',
    },
});

app.get('/', (req, res) => {
    res.status(200).send('Сервак запущен');
})

app.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body;

    const mailOptions = {
        from: 'vaniamihalev7@gmail.com',
        to,
        subject,
        text,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});