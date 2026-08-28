const rules = [
    // --- ÁLGEBRA ---
    {
        id: 'diferencia_cuadrados',
        topic: 'Diferencia de Cuadrados',
        match: (latex) => latex.includes('^2') && latex.includes('-'),
        getOptions: () => ({
            correct: 'a^2 - b^2 = (a - b)(a + b)',
            distractors: [
                'a^2 - b^2 = (a - b)^2',
                'a^2 - b^2 = a^2 - 2ab + b^2',
                'a^2 - b^2 = (a + b)^2'
            ]
        })
    },
    {
        id: 'binomio_cuadrado',
        topic: 'Binomio al Cuadrado',
        match: (latex) => latex.includes(')^2') && (latex.includes('+') || latex.includes('-')),
        getOptions: () => ({
            correct: '(a \\pm b)^2 = a^2 \\pm 2ab + b^2',
            distractors: [
                '(a \\pm b)^2 = a^2 \\pm b^2',
                '(a \\pm b)^2 = a^2 \\pm ab + b^2',
                '(a \\pm b)^2 = (a-b)(a+b)'
            ]
        })
    },
    // --- INTEGRALES ---
    {
        id: 'integral_potencia',
        topic: 'Integral de una Potencia (Directa)',
        match: (latex) => latex.includes('\\int') && latex.includes('^') && latex.includes('dx'),
        getOptions: () => ({
            correct: '\\int u^n du = \\frac{u^{n+1}}{n+1} + C',
            distractors: [
                '\\int u^n du = n u^{n-1} + C',
                '\\int u^n du = \\ln|u| + C',
                '\\int u^n du = \\frac{u^n}{n} + C'
            ]
        })
    },
    {
        id: 'integral_partes',
        topic: 'Integración por Partes',
        match: (latex) => latex.includes('\\int') && 
               (latex.includes('e^') || latex.includes('\\sin') || latex.includes('\\cos') || latex.includes('\\ln')) &&
               latex.includes('dx'),
        getOptions: () => ({
            correct: '\\int u \\, dv = u v - \\int v \\, du',
            distractors: [
                '\\int u \\, dv = u + v - \\int du \\, dv',
                '\\int u \\, dv = u v - \\frac{v^2}{2} + C',
                '\\int u \\, dv = \\int u \\, du \\cdot \\int v \\, dv'
            ]
        })
    }
];

function analyzeExpression(latex) {
    const normalized = latex.replace(/\s+/g, '');
    for (const rule of rules) {
        if (rule.match(normalized)) {
            const optionsData = rule.getOptions(normalized);
            const allOptions = [
                { text: optionsData.correct, isCorrect: true },
                ...optionsData.distractors.map(d => ({ text: d, isCorrect: false }))
            ];
            return {
                topic: rule.topic,
                options: shuffleArray(allOptions)
            };
        }
    }
    return null; 
}

function shuffleArray(array) {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
}

document.addEventListener('DOMContentLoaded', () => {
    const mathInput = document.getElementById('math-input');
    const latexPreview = document.getElementById('latex-preview');
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    const inputSection = document.getElementById('input-section');
    const quizSection = document.getElementById('quiz-section');
    const quizExpression = document.getElementById('quiz-expression');
    const optionsContainer = document.getElementById('options-container');
    const quizTitle = quizSection.querySelector('h2'); 

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

    startQuizBtn.addEventListener('click', () => {
        const latex = mathInput.value.trim();
        if (!latex) {
            alert('Por favor, ingresa una ecuación o integral válida en la caja de texto.');
            return;
        }

        const quizData = analyzeExpression(latex);

        if (!quizData) {
            alert('Aún no reconozco este tipo de ecuación. Prueba escribir: \\int x^2 dx');
            return;
        }

        quizTitle.textContent = `Tema detectado: ${quizData.topic}. ¿Cuál es la fórmula o método a aplicar?`;
        
        try {
            katex.render(latex, quizExpression, { throwOnError: false, displayMode: true });
        } catch(e) {}

        renderizarOpciones(quizData.options);

        inputSection.style.display = 'none';
        quizSection.style.display = 'block';
    });

    resetBtn.addEventListener('click', () => {
        quizSection.style.display = 'none';
        inputSection.style.display = 'block';
        mathInput.value = '';
        latexPreview.innerHTML = '\\text{Esperando ecuación...}';
    });

    function renderizarOpciones(opciones) {
        optionsContainer.innerHTML = ''; 
        
        opciones.forEach(opcion => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            
            katex.render(opcion.text, btn, { throwOnError: false });
            
            btn.addEventListener('click', () => {
                if (opcion.isCorrect) {
                    btn.style.backgroundColor = '#d4edda';
                    btn.style.borderColor = '#28a745';
                    alert('¡Correcto! Esa es la fórmula adecuada.');
                } else {
                    btn.style.backgroundColor = '#f8d7da';
                    btn.style.borderColor = '#dc3545';
                    alert('Incorrecto. Intenta nuevamente.');
                }
            });

            optionsContainer.appendChild(btn);
        });
    }
});
