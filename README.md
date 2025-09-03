# ElderWizz AI - Asistente de Código y Mentor de Programación

ElderWizz AI es una aplicación web interactiva diseñada para ayudar a los desarrolladores a mejorar la calidad de su código. Utilizando el poder de la IA generativa de Google, esta herramienta analiza tu código, ofrece sugerencias de buenas prácticas y genera ejercicios de programación para que puedas mejorar tus habilidades.

Este proyecto fue creado con el propósito de ser una pieza de portafolio, demostrando no solo la creación de una herramienta funcional y creativa, sino también la implementación de buenas prácticas de desarrollo, arquitectura de software y seguridad.

---

### 🔗 [Enlace a la Demo en Vivo](https://elderwizz-ai.vercel.app/)

### 📸 Screenshot

![Screenshot de ElderWizz AI](/public/screenshotelderwizz.png)

---

## ✨ Características Principales

- **Análisis de Código Inteligente:** Pega tu código en el editor y recibe un análisis detallado sobre posibles mejoras, errores y aplicación de buenas prácticas.
- **Ejercicios de Programación Diarios:** Genera ejercicios de programación únicos para tres niveles de dificultad: Aprendizaje, Intermedio y Avanzado.
- **Interfaz Retro Estilo GBA:** Una interfaz de usuario creativa y amigable, inspirada en la estética de las consolas Game Boy Advance.
- **Seguridad de la API Key:** La clave de la API de Google se gestiona de forma segura a través de un backend proxy (función serverless), evitando su exposición en el lado del cliente.
- **Arquitectura Escalable:** El código está estructurado en componentes de React reutilizables, siguiendo un patrón de diseño limpio y mantenible.

---

## 🛠️ Stack Tecnológico

- **Frontend:**
  - **React:** Biblioteca principal para la construcción de la interfaz de usuario.
  - **Vite:** Herramienta de desarrollo frontend de alta velocidad.
  - **TypeScript:** Para un código más robusto y mantenible.
  - **Tailwind CSS:** Framework de CSS para un diseño rápido y personalizado.
- **Backend (Serverless):**
  - **Vercel Functions:** Funciones sin servidor para actuar como backend proxy y proteger la API key.
  - **Node.js:** El entorno de ejecución para las funciones serverless.
- **API de IA:**
  - **Google Gemini API:** El modelo de lenguaje grande que potencia el análisis y la generación de contenido.

---

## 📂 Estructura del Proyecto

El código fuente está organizado para ser modular y escalable:

```
/root
├── api/                # Contiene las funciones serverless (el backend proxy)
│   └── generate.ts
├── public/             # Archivos estáticos (imágenes, etc.)
├── src/
│   ├── components/     # Componentes de React reutilizables
│   │   ├── CodeEditor.tsx
│   │   ├── Exercise.tsx
│   │   ├── Header.tsx
│   │   ├── MarkdownRenderer.tsx
│   │   └── Suggestions.tsx
│   ├── App.tsx         # Componente principal que une la aplicación
│   ├── main.tsx        # Punto de entrada de la aplicación
│   └── index.css       # Estilos globales y de Tailwind
├── .env.local          # Archivo para las variables de entorno (ignorado por Git)
├── README.md           # Este archivo
└── ...                 # Otros archivos de configuración (Vite, Tailwind, etc.)
```