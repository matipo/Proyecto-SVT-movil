/** @type {import('tailwindcss').Config} */
module.exports = {
  // Agrega './app/**/*.{js,ts,tsx}' o la ruta donde esté tu _layout.tsx
  content: [
    './App.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './app/**/*.{js,ts,tsx}', // <--- AGREGA ESTA LÍNEA
    './src/**/*.{js,ts,tsx}'   // <--- O ESTA si usas carpeta src
  ],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  plugins: [],
};