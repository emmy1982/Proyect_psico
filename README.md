# Daniela Moreno Psicología

Sitio web para la psicóloga Daniela Moreno con sistema de reserva de citas que incluye notificaciones por correo electrónico y WhatsApp.

## Características

- Sitio web responsive con Bootstrap
- Sistema de reserva de citas con calendario interactivo
- Selección de horarios disponibles
- Notificaciones por correo electrónico al cliente cuando reserva una cita
- Notificaciones por WhatsApp al cliente cuando reserva una cita

## Requisitos

- Node.js (versión 14 o superior)
- Cuenta de Gmail para enviar correos electrónicos
- Cuenta de Twilio para enviar mensajes de WhatsApp

## Instalación

1. Clona el repositorio:
```
git clone https://github.com/tu-usuario/daniela-moreno-psicologia.git
cd daniela-moreno-psicologia
```

2. Instala las dependencias:
```
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto con la siguiente información:
```
# Server configuration
PORT=3000

# Email configuration (Gmail)
EMAIL_USER=tu_correo@gmail.com
EMAIL_APP_PASSWORD=tu_contraseña_de_aplicacion

# WhatsApp configuration (Twilio)
TWILIO_ACCOUNT_SID=tu_account_sid
TWILIO_AUTH_TOKEN=tu_auth_token
TWILIO_WHATSAPP_NUMBER=+14155238886  # Este es el número de sandbox de Twilio WhatsApp
```

**Nota:** Para obtener la contraseña de aplicación de Gmail, necesitas activar la verificación en dos pasos y luego crear una contraseña de aplicación. Más información [aquí](https://support.google.com/accounts/answer/185833?hl=es).

## Configuración de WhatsApp con Twilio

1. Crea una cuenta en [Twilio](https://www.twilio.com/try-twilio)
2. Activa el Sandbox de WhatsApp en tu cuenta de Twilio
3. Sigue las instrucciones para unirte al sandbox desde tu teléfono
4. Copia el Account SID y Auth Token desde la consola de Twilio y agrégalos al archivo `.env`

## Ejecución

Para iniciar el servidor en modo desarrollo:
```
npm run dev
```

Para iniciar el servidor en modo producción:
```
npm start
```

## Uso

1. Accede a la página web desde `http://localhost:3000`
2. Navega hasta la sección de Citas o haz clic en "PEDIR CITA" en el menú
3. Selecciona una fecha y hora disponible
4. Completa el formulario con tus datos
5. Al enviar el formulario, recibirás un correo electrónico y un mensaje de WhatsApp con la confirmación de tu cita 