import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv'

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // o el servicio de correo que prefieras
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Ruta para enviar correos electrónicos
app.post('/send-email', (req, res) => {
    const { name, lastName, email, phone, message } = req.body;

    const mailOptions = {
        //MODIFICAR
    from: 'candela.alfano1503@gmail.com',
    to: 'candela.alfano1503@gmail.com',
    subject: 'Formulario de cotización de Vicar',
    // FORMATO DEL CORREO QUE SE VA A ENVIAR
    text: `
    Nombre: ${name} 
    Apellido: ${lastName}
    Correo Electrónico: ${email}
    Teléfono: ${phone}
    Mensaje: ${message}
    `,
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
    return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
