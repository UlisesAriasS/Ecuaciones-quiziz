import { analyzeExpression } from './domain/quizEngine.js';

document.addEventListener('DOMContentLoaded', () => {
    const mathInput = document.getElementById('math-input');
    const latexPreview = document.getElementById('latex-preview');
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    const inputSection = document.getElementById('input-section');
    const quizSection = document.getElementById('quiz-section');
    const quizExpression = document.getElementById('quiz-expression');
    const optionsContainer = document.getElementById('options-container');
    const quizTitle = quizSection.querySelector('h2'); // El título de la sección del quiz

    // Renderizar LaTeX en tiempo real en la vista previa
    mathInput.addEventListener('input', () => {
        const latex = mathInput.value;
        try {
            katex.render(latex || '\\text{Esperando ecuación...}', latexPreview, {
                throwOnError: false,
                displayMode: true
            });
        } catch (error) {
            console.error("Error renderizando KaTeX:", error);
        }
    });

    // Iniciar el Quiz
    startQuizBtn.addEventListener('click', () => {
        const latex = mathInput.value.trim();
        if (!latex) {
            alert('Por favor, ingresa una ecuación o integral válida.');
            return;
        }

        // Analizar la expresión con el motor matemático
        const quizData = analyzeExpression(latex);

        if (!quizData) {
            alert('Aún no reconozco este tipo de ecuación o no tengo reglas para ella. Prueba con una Diferencia de Cuadrados (x^2 - y^2) o una Integral básica (\\int x^2 dx).');
            return;
        }

        // Mostrar la expresión y el tema detectado
        quizTitle.textContent = `Tema detectado: ${quizData.topic}. ¿Cuál es la fórmula o método a aplicar?`;
        
        try {
            katex.render(latex, quizExpression, { throwOnError: false, displayMode: true });
        } catch(e) {}

        // Generar botones de opciones
        renderizarOpciones(quizData.options);

        // Cambiar vistas
        inputSection.style.display = 'none';
        quizSection.style.display = 'block';
    });

    // Reiniciar
    resetBtn.addEventListener('click', () => {
        quizSection.style.display = 'none';
        inputSection.style.display = 'block';
        mathInput.value = '';
        latexPreview.innerHTML = '\\text{Esperando ecuación...}';
    });

    function renderizarOpciones(opciones) {
        optionsContainer.innerHTML = ''; // Limpiar anteriores
        
        opciones.forEach(opcion => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            
            // Renderizar la fórmula LaTeX dentro del botón
            katex.render(opcion.text, btn, { throwOnError: false });
            
            btn.addEventListener('click', () => {
                if (opcion.isCorrect) {
                    btn.style.backgroundColor = '#d4edda'; // Verde éxito
                    btn.style.borderColor = '#28a745';
                    alert('¡Correcto! Esa es la fórmula adecuada.');
                } else {
                    btn.style.backgroundColor = '#f8d7da'; // Rojo error
                    btn.style.borderColor = '#dc3545';
                    alert('Incorrecto. Intenta nuevamente.');
                }
            });

            optionsContainer.appendChild(btn);
        });
    }
});
