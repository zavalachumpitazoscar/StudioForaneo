# Manual de Uso y Administración • Studio Foráneas

Bienvenida al sitio web y panel de control oficial de **Studio Foráneas**. Este proyecto ha sido desarrollado con tecnologías modernas (React, TypeScript, Tailwind CSS, Firebase Authentication y Firestore Database) para ser 100% autoadministrable, sin necesidad de escribir código.

---

## 1. ¿Cómo ingresar al Panel de Administración?

1. En la barra superior o en el pie de página del sitio web, haz clic en **"Acceso Administradora"**.
2. En la ventana emergente:
   - **Modo Demo Inmediato:** Puedes hacer clic en *"Ingresar como Administradora (Modo Demo)"* para explorar todas las herramientas de inmediato sin necesidad de contraseñas.
   - **Con Firebase:** Inicia sesión con tu correo y contraseña registrados.

---

## 2. Cómo usar fotos y videos desde Google Drive

Para no saturar ni pagar por almacenamiento en la nube, la plataforma permite usar enlaces directos de **Google Drive**, **YouTube** o **Vimeo**:

### Para Fotografías de Google Drive:
1. Sube tu fotografía a una carpeta en tu Google Drive.
2. Haz clic derecho sobre la foto > **Compartir > Compartir**.
3. En *"Acceso general"*, cámbialo a **"Cualquier persona con el enlace"** (como Lector).
4. Copia el enlace (ejemplo: `https://drive.google.com/file/d/1a2b3c4d5e.../view?usp=sharing`).
5. Pégalo directamente en el campo de imagen del panel. La plataforma lo convertirá automáticamente en una imagen de alta resolución para la web.

### Para Videos:
- Puedes pegar el enlace de cualquier video de **YouTube** (ej. `https://www.youtube.com/watch?v=...`), **Reel/Short**, o enlace público de **Google Drive**. El reproductor integrado se encargará de mostrarlo en formato cinematográfico.

---

## 3. Módulos del Panel de Administración

* **Dashboard:** Métricas generales, contador de solicitudes pendientes, accesos rápidos y solicitudes recientes.
* **Solicitudes de Clientes:** Tabla completa de personas que han solicitado cotizaciones desde la web. Puedes cambiar el estado a *PENDIENTE*, *CONTACTADO*, *COTIZADO*, *CONFIRMADO* o *FINALIZADO*, escribir notas internas y presionar el botón **WhatsApp** para abrir una conversación directa personalizada con el cliente.
* **Servicios & Packs:** Crea o modifica los planes de Redes Sociales, Cobertura de Eventos o Full Day Shoot. Puedes editar los precios visibles, qué incluye cada paquete y activar/ocultar servicios.
* **Portafolio:** Sube fotografías clasificadas por categorías (*Bodas*, *Eventos*, *Marcas*, *Retratos*) con visor Lightbox en pantalla completa.
* **Videos & Reels:** Muestra showreels y reels verticales u horizontales.
* **Promociones:** Activa promociones de temporada (como el descuento del 20% en bodas) con fechas de vigencia y botones de llamada a la acción.
* **Configuración del Sitio:** Cambia en cualquier momento los números de WhatsApp de Nathaly y Rosa, correo electrónico, lema, redes sociales y textos de portada.
* **Usuarios & RBAC:** Control de acceso estricto. Las cuentas nuevas requieren que una administradora activa las apruebe para poder entrar.
* **Guía Firebase:** Instrucciones detalladas con las reglas de seguridad de Firestore para desplegar a producción.

---

## 4. Despliegue en GitHub Pages

1. Sube este repositorio a tu cuenta de GitHub.
2. Ejecuta en tu terminal:
   ```bash
   npm run build
   ```
3. Se generará la carpeta `dist/` optimizada.
4. En GitHub > **Settings > Pages**, selecciona la rama de publicación para que tu sitio quede en línea de forma gratuita.
