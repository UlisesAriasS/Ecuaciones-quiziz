// Importaciones de módulos (simuladas por ahora)
// Aquí importaremos después la lógica matemática de js/domain/

document.addEventListener('DOMContentLoaded', () => {
    const mathInput = document.getElementById('math-input');
    const latexPreview = document.getElementById('latex-preview');
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    const inputSection = document.getElementById('input-section');
    const quizSection = document.getElementById('quiz-section');
    const quizExpression = document.getElementById('quiz-expression');
    const optionsContainer = document.getElementById('options-container');

    // Renderizar LaTeX en tiempo real en la vista previa
    mathInput.addEventListener('input', () => {
        const latex = mathInput.value;
        try {
            // KaTeX está disponible globalmente desde el CDN
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

        // 1. Mostrar la expresión en el área de quiz
        try {
            katex.render(latex, quizExpression, { throwOnError: false, displayMode: true });
        } catch(e) {}

        // 2. Generar opciones mockeadas (aquí conectaremos la lógica real después)
        generarOpcionesMock();

        // 3. Cambiar vistas
        inputSection.style.display = 'none';
        quizSection.style.display = 'block';
    });

    // Reiniciar
    resetBtn.addEventListener('click', () => {
        quizSection.style.display = 'none';
        inputSection.style.display = 'block';
        mathInput.value = '';
        latexPreview.innerHTML = '';
    });

    function generarOpcionesMock() {
        optionsContainer.innerHTML = ''; // Limpiar anteriores
        
        const opciones = [
            '\\int u^n du = \\frac{u^{n+1}}{n+1}',
            '\\int e^u du = e^u',
            '\\text{Integración por Partes: } \\int u dv = uv - \\int v du',
            '\\text{Cambio de Variable ( } u \\text{ )}'
        ];

        opciones.forEach(opcionLatex => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            
            // Renderizar la fórmula en el botón
            katex.render(opcionLatex, btn, { throwOnError: false });
            
            btn.addEventListener('click', () => {
                alert('¡Opción seleccionada! Más adelante aquí validaremos si es correcta.');
            });

            optionsContainer.appendChild(btn);
        });
    }
});
