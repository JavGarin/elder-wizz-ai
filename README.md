# ElderWizz AI - Code Assistant and Programming Mentor

ElderWizz AI is an interactive web application designed to help developers improve the quality of their code. Using the power of Google's generative AI, this tool analyzes your code, offers suggestions for best practices, and generates programming exercises so you can improve your skills.

This project was created with the purpose of being a portfolio piece, demonstrating not only the creation of a functional and creative tool, but also the implementation of good development practices, software architecture, and security.

---

### 🔗 [Link to Live Demo](https://elder-wizz-ai.vercel.app/)

### 📸 Screenshot

![Screenshot of ElderWizz AI](/public/screenshotelderwizz.png)

---

## ✨ Main Features

- **Intelligent Code Analysis:** Paste your code into the editor and receive a detailed analysis of possible improvements, errors, and application of best practices.
- **Daily Programming Exercises:** Generate unique programming exercises for three difficulty levels: Learning, Intermediate, and Advanced.
- **Retro GBA Style Interface:** A creative and friendly user interface, inspired by the aesthetics of Game Boy Advance consoles.
- **API Key Security:** The Google API key is managed securely through a backend proxy (serverless function), preventing its exposure on the client side.
- **Scalable Architecture:** The code is structured in reusable React components, following a clean and maintainable design pattern.

---

## 🛠️ Tech Stack

- **Frontend:**
  - **React:** Main library for building the user interface.
  - **Vite:** High-speed frontend development tool.
  - **TypeScript:** For more robust and maintainable code.
  - **Tailwind CSS:** CSS framework for fast and custom design.
- **Backend (Serverless):**
  - **Vercel Functions:** Serverless functions to act as a backend proxy and protect the API key.
  - **Node.js:** The runtime environment for serverless functions.
- **AI API:**
  - **Google Gemini API:** The large language model that powers the analysis and content generation.

---

## 📂 Project Structure

The source code is organized to be modular and scalable:

```
/root
├── api/                # Contains the serverless functions (the backend proxy)
│   └── generate.ts
├── public/             # Static files (images, etc.)
├── src/
│   ├── components/     # Reusable React components
│   │   ├── CodeEditor.tsx
│   │   ├── Exercise.tsx
│   │   ├── Header.tsx
│   │   ├── MarkdownRenderer.tsx
│   │   └── Suggestions.tsx
│   ├── App.tsx         # Main component that brings the application together
│   ├── main.tsx        # Application entry point
│   └── index.css       # Global and Tailwind styles
├── .env.local          # File for environment variables (ignored by Git)
├── README.md           # This file
└── ...                 # Other configuration files (Vite, Tailwind, etc.)
```
