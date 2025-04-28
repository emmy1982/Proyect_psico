const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('.')); // Serve static files from current directory

// Configuración de nodemailer para enviar emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD // Contraseña de aplicación generada para Gmail
  }
});

// Endpoint para enviar email de confirmación
app.post('/api/sendEmailConfirmation', async (req, res) => {
  try {
    const { email, nombre, fecha, hora, tipoSesion } = req.body;
    
    // Configurar el email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Confirmación de Cita - Daniela Moreno Psicología',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #cbead6; border-radius: 5px;">
          <div style="background-color: #7ca98b; padding: 15px; text-align: center; border-radius: 5px 5px 0 0;">
            <h2 style="color: white; margin: 0;">Confirmación de Cita</h2>
          </div>
          <div style="padding: 20px;">
            <h3>¡Hola ${nombre}!</h3>
            <p>Tu cita ha sido confirmada con los siguientes detalles:</p>
            <div style="background-color: #f0f8f2; padding: 15px; border-radius: 5px;">
              <p><strong>Fecha:</strong> ${fecha}</p>
              <p><strong>Hora:</strong> ${hora}</p>
              <p><strong>Tipo de sesión:</strong> ${tipoSesion === 'presencial' ? 'Presencial' : 'Online'}</p>
              <p><strong>Dirección:</strong> ${tipoSesion === 'presencial' ? 'Calle Ejemplo 123, Madrid' : 'Se enviará un enlace 10 minutos antes de la sesión'}</p>
            </div>
            <p>Si necesitas cambiar o cancelar tu cita, por favor contáctanos con al menos 24 horas de antelación.</p>
            <p>Teléfono: +34 600 123 456</p>
            <p>Email: info@danielamoreno.com</p>
            <div style="text-align: center; margin-top: 30px;">
              <p>¡Gracias por confiar en nosotros para tu proceso terapéutico!</p>
              <p style="font-size: 0.9rem; color: #7ca98b;">© 2023 Daniela Moreno Psicología</p>
            </div>
          </div>
        </div>
      `
    };
    
    // Enviar el email
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ success: true, message: 'Email de confirmación enviado correctamente' });
  } catch (error) {
    console.error('Error al enviar email de confirmación:', error);
    res.status(500).json({ success: false, message: 'Error al enviar email de confirmación' });
  }
});

// Endpoint para enviar notificación por WhatsApp
app.post('/api/sendWhatsAppNotification', async (req, res) => {
  try {
    const { telefono, nombre, fecha, hora, tipoSesion } = req.body;
    const formattedPhone = telefono.replace(/\D/g, ''); // Eliminar caracteres no numéricos
    
    // Configuración para enviar mensaje por WhatsApp usando la API de Twilio
    // Asegúrate de tener estas variables configuradas en tu archivo .env
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER;
    
    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    const auth = {
      username: accountSid,
      password: authToken
    };
    
    // Mensaje que se enviará por WhatsApp
    const message = `
¡Hola ${nombre}!

Tu cita ha sido confirmada:
📅 Fecha: ${fecha}
⏰ Hora: ${hora}
📍 Tipo: ${tipoSesion === 'presencial' ? 'Presencial' : 'Online'}

Si necesitas cambiar o cancelar tu cita, por favor contáctanos con al menos 24 horas de antelación.

¡Gracias por confiar en nosotros para tu proceso terapéutico!
`;
    
    // Enviar mensaje por WhatsApp usando Twilio
    const response = await axios.post(url, 
      new URLSearchParams({
        To: `whatsapp:+${formattedPhone}`,
        From: `whatsapp:${fromNumber}`,
        Body: message
      }), 
      { auth }
    );
    
    res.status(200).json({ 
      success: true, 
      message: 'Notificación por WhatsApp enviada correctamente',
      sid: response.data.sid
    });
  } catch (error) {
    console.error('Error al enviar notificación por WhatsApp:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al enviar notificación por WhatsApp',
      error: error.response ? error.response.data : error.message
    });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
}); 