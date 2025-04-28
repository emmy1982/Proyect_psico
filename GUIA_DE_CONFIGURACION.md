# Guía de Configuración Detallada

Esta guía te ayudará a configurar correctamente el sistema de envío de formulario con notificaciones por correo electrónico y WhatsApp.

## 1. Configuración del Entorno

### Paso 1: Crear el archivo .env

Crea un archivo llamado `.env` en la raíz del proyecto (al mismo nivel que server.js) con el siguiente contenido:

```
# Configuración del servidor
PORT=3000

# Configuración del correo (Hotmail)
EMAIL_PASSWORD=tu_contraseña_de_hotmail

# Configuración de Twilio para WhatsApp
TWILIO_ACCOUNT_SID=tu_account_sid_de_twilio
TWILIO_AUTH_TOKEN=tu_auth_token_de_twilio
```

### Paso 2: Instalar las dependencias

Abre una terminal en la carpeta del proyecto y ejecuta:

```
npm install
```

## 2. Configuración de Twilio para WhatsApp

### Paso 1: Crear una cuenta en Twilio

1. Ve a [Twilio](https://www.twilio.com/try-twilio) y crea una cuenta si aún no tienes una.
2. Una vez dentro de tu cuenta, ve al panel de control.

### Paso 2: Obtener las credenciales

1. En el panel de control de Twilio, busca tu **Account SID** y **Auth Token**.
   - El Account SID comienza con "AC" y se encuentra en la parte superior del Dashboard.
   - El Auth Token está oculto por defecto. Haz clic en "Show" o "Mostrar" para verlo.
2. Copia estos valores y reemplázalos en tu archivo `.env`:
   ```
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

### Paso 3: Configurar el Sandbox de WhatsApp

1. En el panel de control de Twilio, navega a "Messaging" → "Try it out" → "Send a WhatsApp message".
2. Si es la primera vez, verás una opción para configurar el Sandbox de WhatsApp. Haz clic en ese botón.
3. Twilio te mostrará un número de teléfono (como +14155238886) y un código único (como "join example-word").
4. **Importante**: Abre WhatsApp en tu teléfono.
5. Añade el número de teléfono de Twilio a tus contactos.
6. Envía el mensaje exacto que te muestra Twilio (por ejemplo, "join example-word") al número proporcionado.
7. Deberías recibir un mensaje de confirmación de Twilio en WhatsApp.

### Paso 4: Verificar la configuración del Sandbox

1. Una vez que hayas recibido la confirmación, vuelve al panel de control de Twilio.
2. Verifica que el estado del Sandbox muestra "Connected" o "Conectado".
3. Ahora tu número de WhatsApp está registrado en el Sandbox de Twilio.

### Paso 5: Configuración del número en el código

Tu número de Twilio ya está configurado en el código como: `+19787056482`

Este número ya tiene el formato correcto para ser usado con WhatsApp, ya que en el código se añade automáticamente el prefijo "whatsapp:" cuando se envían mensajes.

**Importante**: Recuerda que para probar la funcionalidad:
1. Solo puedes enviar mensajes a números que se hayan registrado en tu Sandbox de WhatsApp siguiendo el paso 3.
2. En modo Sandbox, Twilio solo permite enviar mensajes a números que previamente han enviado el mensaje de registro.

## 3. Configuración del Correo Electrónico (Hotmail)

### Paso 1: Configurar la cuenta de Hotmail

1. Asegúrate de que puedes acceder a la cuenta emmyjose82@hotmail.com.
2. Para mayor seguridad, activa la verificación en dos pasos:
   - Inicia sesión en tu cuenta de Microsoft.
   - Ve a "Seguridad" → "Verificación en dos pasos".
   - Sigue las instrucciones para activarla.

### Paso 2: Crear una contraseña de aplicación (recomendado)

Si has activado la verificación en dos pasos:

1. Ve a [Seguridad de la cuenta Microsoft](https://account.microsoft.com/security).
2. Selecciona "Opciones de seguridad avanzadas".
3. Desplázate hacia abajo hasta "Contraseñas de aplicación".
4. Selecciona "Crear una nueva contraseña de aplicación".
5. Copia esa contraseña y úsala en tu archivo `.env`:
   ```
   EMAIL_PASSWORD=tu_contraseña_de_aplicación
   ```

Si no has activado la verificación en dos pasos, usa tu contraseña normal de Hotmail.

### Paso 3: Configurar acceso de aplicaciones en Outlook/Hotmail

Microsoft ha aumentado la seguridad y puede bloquear aplicaciones "menos seguras". Para permitir que la aplicación envíe correos:

1. Inicia sesión en [outlook.live.com](https://outlook.live.com).
2. Haz clic en tu imagen de perfil y selecciona "Mi cuenta" o "Account".
3. Ve a "Seguridad" o "Security".
4. Busca "Seguridad de la aplicación" o "App security".
5. Asegúrate de que la opción "Permitir que las aplicaciones accedan a tu cuenta" esté activada.
6. Si no encuentras esta opción exacta, busca algo relacionado con "Acceso de aplicaciones" o "App access".

## 4. Ejecutar el Servidor

### Paso 1: Iniciar el servidor

Abre una terminal en la carpeta del proyecto y ejecuta:

```
npm start
```

O si quieres modo desarrollo con recarga automática:

```
npm run dev
```

### Paso 2: Verificar que el servidor está funcionando

Deberías ver un mensaje en la terminal que diga:

```
Servidor corriendo en http://localhost:3000
```

## 5. Probar el Formulario

1. Abre tu navegador y visita: `http://localhost:3000`
2. Navega a la sección de citas o haz clic en "PEDIR CITA".
3. Selecciona una fecha y hora disponible.
4. Completa el formulario con datos reales:
   - Usa un correo electrónico real donde quieras recibir la confirmación.
   - **MUY IMPORTANTE**: Usa el mismo número de teléfono con WhatsApp que registraste en el Sandbox de Twilio en el paso 3 de la sección 2.
5. Envía el formulario.

## Solución de Problemas

### Si no recibes el correo electrónico:

1. Verifica los logs del servidor para ver si hay errores.
2. Asegúrate de que la contraseña en el archivo `.env` sea correcta.
3. Comprueba la carpeta de spam/junk en tu correo.
4. Verifica que la cuenta emmyjose82@hotmail.com permite el acceso de aplicaciones.
5. Intenta con una contraseña de aplicación específica si has habilitado la verificación en dos pasos.

### Si no recibes el mensaje de WhatsApp:

1. Verifica que hayas completado correctamente el proceso de registro en el Sandbox de Twilio (enviando el mensaje "join xxx-xxx").
2. Asegúrate de que el Account SID y Auth Token en el archivo `.env` sean correctos.
3. Confirma que estás usando el mismo número de teléfono que registraste en el Sandbox de Twilio.
4. Verifica los logs del servidor para identificar posibles errores.
5. Recuerda que en modo Sandbox, las restricciones de Twilio solo permiten enviar mensajes a números previamente registrados.

### Error común: "The number +XXXXXXXXXXX is not a valid WhatsApp number"

1. Asegúrate de que el número al que estás enviando el mensaje está registrado en WhatsApp.
2. Verifica que hayas formateado correctamente el número (sin espacios, con código de país).
3. Confirma que ese número se unió previamente a tu Sandbox de Twilio enviando el mensaje "join xxx-xxx".

Si necesitas ver errores detallados, revisa la terminal donde está ejecutándose el servidor. Allí aparecerán mensajes de error que te ayudarán a diagnosticar el problema.

## Contacto para Soporte

Si sigues teniendo problemas, puedes contactar con soporte técnico en:
- Email: support@example.com
- WhatsApp: +1234567890 