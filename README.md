# Quiz Matemático

Un sistema interactivo para aprender matemáticas analizando el siguiente paso lógico en la resolución de problemas (Integrales, Derivadas, Álgebra).

## Arquitectura
El proyecto sigue una **Arquitectura Hexagonal**.

- `/backend`: Node.js, Express. Contiene la lógica del negocio puramente matemática.
- `/frontend`: Vanilla JS, HTML, CSS. Usa KaTeX para el renderizado matemático.

## Cómo ejecutar

### Backend
1. Navega a `backend/`
2. `npm install`
3. `npm run dev`

### Frontend
1. Abre `frontend/public/index.html` en un navegador, o utiliza un servidor de archivos estáticos ligero (como Live Server de VSCode o `npx serve frontend/public`).
