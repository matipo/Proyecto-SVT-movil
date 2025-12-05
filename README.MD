<p align="center">
    <img src="https://i.ibb.co/HkPdbQD/ticket.png" alt="ticket" width="100">
</p>

<h1 align="center">TicketApp</h1>

<p align="center">
  Aplicación de gestión de tickets desarrollada con 
  <a href="https://nodejs.org/" target="_blank"><strong>Node.js</strong></a>, 
  <a href="https://expo.dev/" target="_blank"><strong>Expo</strong></a> y 
  <a href="https://yarnpkg.com/" target="_blank"><strong>Yarn</strong></a>.  
  Proyecto orientado a trabajo colaborativo entre desarrolladores.
</p>

<hr>

<h2>Descripción</h2>

<p>
TicketApp es una aplicación mobile orientada a la creación, visualización y gestión de tickets.
Este repositorio está destinado al uso interno del equipo de desarrollo para continuar su evolución,
mejoras de rendimiento, diseño e integración con servicios backend.
</p>

<hr>

<h2>Tecnologías utilizadas</h2>

<ul>
  <li><a href="https://expo.dev/" target="_blank">Expo</a></li>
  <li><a href="https://reactnative.dev/" target="_blank">React Native</a></li>
  <li><a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a></li>
  <li><a href="https://yarnpkg.com/" target="_blank">Yarn</a></li>
  <li><a href="https://axios-http.com/" target="_blank">Axios</a></li>
</ul>

<hr>

<h2>Requisitos previos</h2>

<p>Antes de comenzar, asegúrate de tener instalado:</p>

<ul>
  <li>
    <a href="https://nodejs.org/" target="_blank">Node.js</a> (versión recomendada: LTS)
  </li>
  <li>
    <a href="https://yarnpkg.com/" target="_blank">Yarn</a>
  </li>
  <li>
    <a href="https://expo.dev/client" target="_blank">Expo Go</a> en tu dispositivo móvil (opcional)
  </li>
</ul>

<hr>

<h2>Instalación</h2>

<ol>
  <li>
    Clona el repositorio:
    <pre><code>git clone -b dev https://github.com/matipo/Proyecto-SVT-movil</code></pre>
  </li>

  <li>
    Accede al directorio del proyecto:
    <pre><code>cd Proyecto-SVT-movil</code></pre>
  </li>

  <li>
    Instala las dependencias:
    <pre><code>yarn install</code></pre>
  </li>

  <li>
    Inicia el proyecto:
    <pre><code>yarn start</code></pre>
  </li>
</ol>

<hr>

<h2>Ejecución en dispositivos</h2>

<p>Una vez iniciado el servidor de Expo:</p>

<ul>
  <li>Escanea el código QR desde la app <strong>Expo Go</strong></li>
  <li>Presiona <strong>a</strong> para abrir en Android Emulator</li>
  <li>Presiona <strong>i</strong> para abrir en iOS Simulator</li>
</ul>

<hr>

<h2>Documentación oficial</h2>

<p>Consulta la documentación oficial de las tecnologías utilizadas en el proyecto:</p>

<ul>
  <li><a href="https://nodejs.org/en/docs" target="_blank">Documentación de Node.js</a></li>
  <li><a href="https://expo.dev/docs" target="_blank">Documentación de Expo</a></li>
  <li><a href="https://reactnative.dev/docs/getting-started" target="_blank">Documentación de React Native</a></li>
  <li><a href="https://www.typescriptlang.org/docs/" target="_blank">Documentación de TypeScript</a></li>
  <li><a href="https://yarnpkg.com/getting-started" target="_blank">Documentación de Yarn</a></li>
  <li><a href="https://axios-http.com/docs/intro" target="_blank">Documentación de Axios</a></li>
</ul>

<hr>

<h2>Prompt para generar commits con ChatGPT</h2>

<p>Utiliza este prompt para generar mensajes de commit automáticos.</p>
<p> Utiliza <code>git diff | clip</code> <strong>ANTES</strong> de usar un <code>git commit</code> y/o <code>git add</code>, esto te copiara un mensaje que debes enviarselo a ChatGPT con el siguiente promp:

<pre><code>
Genera un mensaje de commit profesional en formato:
tipo: descripción corta

Usa como base exclusivamente este git diff:

[PEGA AQUÍ EL CONTENIDO DE git diff]

Reglas:
- Usa prefijos como feat, fix, refactor, docs, style, chore
- No agregues información que no esté en el diff
- Sé claro, conciso y técnico
</code></pre>

<hr>

<h2>Variables de entorno</h2>

<p>
Este proyecto utiliza variables de entorno para manejar configuraciones sensibles como URLs de APIs,
claves privadas y entornos de ejecución. Estas variables <strong>no deben subirse al repositorio</strong>.
</p>

<h3>Archivo <code>.env</code></h3>

<p>
Debes crear un archivo <code>.env</code> en la raíz del proyecto con la siguiente estructura:
</p>

<pre><code>
EXPO_PUBLIC_API_URL=https://URL.DE.LAAPI
</code></pre>

<h3>Descripción de variables</h3>

<ul>
  <li>
    <strong>EXPO_PUBLIC_API_URL</strong>:  
    URL base del backend que consume la aplicación.
  </li>
</ul>
<p>
Al ser un proyecto con Expo, las variables públicas deben comenzar con
<code>EXPO_PUBLIC_</code> para que estén disponibles en la app.
</p>

<h3>Notas importantes</h3>

<ul>
  <li>No subir nunca el archivo <code>.env</code> al repositorio.</li>
  <li>Verificar que <code>.env</code> esté en el archivo <code>.gitignore</code>.</li>
  <li>Usar valores diferentes para desarrollo y producción.</li>
</ul>

<hr>
