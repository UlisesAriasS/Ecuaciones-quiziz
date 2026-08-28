const rules = [
    // --- ÁLGEBRA ---
    {
        id: 'trinomio_cuadrado_perfecto',
        topic: 'Trinomio Cuadrado Perfecto',
        match: (latex) => latex.includes('^2') && (latex.includes('+2') || latex.includes('-2')),
        getOptions: () => ({
            correct: 'a^2 \\pm 2ab + b^2 = (a \\pm b)^2',
            distractors: [
                'a^2 \\pm 2ab + b^2 = a^2 \\pm b^2',
                'a^2 \\pm 2ab + b^2 = (a-b)(a+b)',
                'a^2 \\pm 2ab + b^2 = a^2 + b^2'
            ]
        })
    },
    {
        id: 'binomio_cubo',
        topic: 'Binomio al Cubo',
        match: (latex) => latex.includes(')^3'),
        getOptions: () => ({
            correct: '(a \\pm b)^3 = a^3 \\pm 3a^2b + 3ab^2 \\pm b^3',
            distractors: [
                '(a \\pm b)^3 = a^3 \\pm b^3',
                '(a \\pm b)^3 = (a \\pm b)(a^2 \\mp ab + b^2)',
                '(a \\pm b)^3 = a^3 + 3ab + b^3'
            ]
        })
    },
    {
        id: 'suma_diferencia_cubos',
        topic: 'Suma o Diferencia de Cubos',
        match: (latex) => latex.includes('^3') && (latex.includes('+') || latex.includes('-')) && !latex.includes(')^3'),
        getOptions: () => ({
            correct: 'a^3 \\pm b^3 = (a \\pm b)(a^2 \\mp ab + b^2)',
            distractors: [
                'a^3 \\pm b^3 = (a \\pm b)^3',
                'a^3 \\pm b^3 = (a - b)(a + b)^2',
                'a^3 \\pm b^3 = a^3 \\pm 3a^2b + 3ab^2 \\pm b^3'
            ]
        })
    },
    {
        id: 'diferencia_cuadrados',
        topic: 'Diferencia de Cuadrados / Binomio Conjugado',
        match: (latex) => latex.includes('^2') && latex.includes('-') && !latex.includes('+2') && !latex.includes('-2'),
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
    {
        id: 'division_polinomios',
        topic: 'División de Polinomios',
        match: (latex) => latex.includes('\\frac{') && latex.includes('x^'),
        getOptions: () => ({
            correct: '\\frac{P(x)}{Q(x)} = C(x) + \\frac{R(x)}{Q(x)}',
            distractors: [
                '\\frac{P(x)}{Q(x)} = P(x) - Q(x)',
                '\\frac{P(x)}{Q(x)} = P(x) \\cdot Q(x)^{-1}',
                '\\frac{P(x)}{Q(x)} = \\frac{P\'(x)}{Q\'(x)}'
            ]
        })
    },

    // --- INTEGRALES ---
    {
        id: 'integral_fracciones_parciales',
        topic: 'Integración por Fracciones Parciales',
        match: (latex) => latex.includes('\\int') && latex.includes('\\frac') && latex.includes(')('),
        getOptions: () => ({
            correct: '\\frac{P(x)}{Q(x)} = \\frac{A}{x-a} + \\frac{B}{x-b} + ...',
            distractors: [
                '\\int \\frac{u}{v} dx = \\ln|v|',
                '\\frac{P(x)}{Q(x)} = P(x) \\cdot Q(x)^{-1}',
                '\\int \\frac{1}{u^2+a^2} du = \\frac{1}{a}\\arctan(\\frac{u}{a})'
            ]
        })
    },
    {
        id: 'integral_partes',
        topic: 'Integración por Partes',
        match: (latex) => latex.includes('\\int') && 
               (latex.includes('e^') || latex.includes('\\sin') || latex.includes('\\cos') || latex.includes('\\ln')) &&
               latex.includes('dx') && !latex.includes('\\frac'),
        getOptions: () => ({
            correct: '\\int u \\, dv = u v - \\int v \\, du',
            distractors: [
                '\\int u \\, dv = u + v - \\int du \\, dv',
                '\\int u \\, dv = u v - \\frac{v^2}{2} + C',
                '\\int u \\, dv = \\int u \\, du \\cdot \\int v \\, dv'
            ]
        })
    },
    {
        id: 'integral_potencia',
        topic: 'Integral de una Potencia (Directa)',
        match: (latex) => latex.includes('\\int') && latex.includes('^') && latex.includes('dx') && !latex.includes('\\frac'),
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
        id: 'integral_sustitucion',
        topic: 'Cambio de Variable (Sustitución)',
        // Match general para integrales (las anteriores se evalúan primero)
        match: (latex) => latex.includes('\\int') && latex.includes('dx'),
        getOptions: () => ({
            correct: 'u = g(x) \\implies du = g\'(x)dx',
            distractors: [
                '\\int u \\, dv = uv - \\int v \\, du',
                '\\frac{A}{x-a} + \\frac{B}{x-b}',
                '\\int e^u du = e^u'
            ]
        })
    },

    // --- DERIVADAS ---
    {
        id: 'derivada_cadena',
        topic: 'Derivadas - Regla de la Cadena',
        match: (latex) => latex.includes('\\frac{d}{dx}') || latex.includes('\'('),
        getOptions: () => ({
            correct: '\\frac{d}{dx}[f(g(x))] = f\'(g(x))g\'(x)',
            distractors: [
                '\\frac{d}{dx}[f(x)g(x)] = f\'(x)g\'(x)',
                '\\frac{d}{dx}\\left[\\frac{f(x)}{g(x)}\\right] = \\frac{f\'(x)}{g\'(x)}',
                '\\frac{d}{dx}[f(g(x))] = f\'(x)g\'(x)'
            ]
        })
    },

    // --- TRIGONOMETRÍA E IDENTIDADES ---
    {
        id: 'identidad_pitagorica',
        topic: 'Identidades Trigonométricas (Pitagórica)',
        match: (latex) => (latex.includes('\\sin^2') || latex.includes('\\cos^2')) && latex.includes('+'),
        getOptions: () => ({
            correct: '\\sin^2(x) + \\cos^2(x) = 1',
            distractors: [
                '\\sin^2(x) - \\cos^2(x) = 1',
                '\\sin^2(x) + \\cos^2(x) = 0',
                '\\sin(x) + \\cos(x) = 1'
            ]
        })
    },

    // --- LOGARITMOS ---
    {
        id: 'propiedades_logaritmicas',
        topic: 'Propiedades Logarítmicas',
        match: (latex) => latex.includes('\\ln(') || latex.includes('\\log('),
        getOptions: () => ({
            correct: '\\ln(a \\cdot b) = \\ln(a) + \\ln(b)',
            distractors: [
                '\\ln(a + b) = \\ln(a) \\cdot \\ln(b)',
                '\\ln(a \\cdot b) = \\ln(a) \\cdot \\ln(b)',
                '\\ln(a + b) = \\ln(a) + \\ln(b)'
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
