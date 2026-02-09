
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ejecuta vite directamente usando node para evitar restricciones de PowerShell
const viteBin = path.join(__dirname, 'node_modules', 'vite', 'bin', 'vite.js');

const child = spawn(process.execPath, [viteBin], {
  stdio: 'inherit',
  shell: true
});

child.on('error', (err) => {
  console.error('Error al iniciar el servidor:', err);
});

child.on('close', (code) => {
  console.log(`Servidor detenido con código ${code}`);
});
