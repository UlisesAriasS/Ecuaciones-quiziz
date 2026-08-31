const rules = [
    // ==========================================
    // 1. DERIVADAS
    // ==========================================
    {
        id: 'derivada_cadena',
        topic: 'Derivadas - Regla de la Cadena',
        match: (latex) => (latex.includes('\\frac{d}{dx}') || latex.includes('\'(')) && 
                          (latex.includes('(') || latex.includes('^') || latex.includes('\\sin') || latex.includes('\\cos') || latex.includes('\\ln')),
        getOptions: () => ({
            correct: '\\frac{d}{dx}[f(g(x))] = f\'(g(x)) \\cdot g\'(x)',
            explanation: 'La regla de la cadena nos dice que derivemos de afuera hacia adentro: derivas la función exterior y la multiplicas por la derivada de lo de adentro.',
            distractors: [
                '\\frac{d}{dx}[f(x)g(x)] = f\'(x)g\'(x)',
                '\\frac{d}{dx}\\left[\\frac{f(x)}{g(x)}\\right] = \\frac{f\'(x)}{g\'(x)}',
                '\\frac{d}{dx}[f(g(x))] = f\'(x)g\'(x)'
            ]
        })
    },
    {
        id: 'derivada_potencia',
        topic: 'Derivadas - Regla de la Potencia',
        match: (latex) => latex.includes('\\frac{d}{dx}') || latex.includes('\''),
        getOptions: () => ({
            correct: '\\frac{d}{dx}[x^n] = n x^{n-1}',
            explanation: 'Para derivar una potencia, bajas el exponente multiplicando al frente y le restas 1 al exponente original.',
            distractors: [
                '\\frac{d}{dx}[x^n] = \\frac{x^{n+1}}{n+1}',
                '\\frac{d}{dx}[x^n] = n x^n',
                '\\frac{d}{dx}[x^n] = x^{n-1}'
            ]
        })
    },

    // ==========================================
    // 2. INTEGRALES
    // ==========================================
    {
        id: 'integral_fracciones_parciales',
        topic: 'Integración por Fracciones Parciales',
        match: (latex) => latex.includes('\\int') && latex.includes('\\frac') && (latex.includes(')(') || latex.includes(')(x')),
        getOptions: () => ({
            correct: '\\frac{P(x)}{(x-a)(x-b)} = \\frac{A}{x-a} + \\frac{B}{x-b}',
            explanation: 'Cuando tienes factores multiplicándose en el denominador, separas la fracción en sumas de fracciones más sencillas usando constantes A y B.',
            distractors: [
                '\\int \\frac{u}{v} dx = \\ln|v| + C',
                '\\frac{P(x)}{Q(x)} = P(x) - Q(x)',
                '\\int \\frac{1}{u^2+a^2} du = \\frac{1}{a}\\arctan\\left(\\frac{u}{a}\\right) + C'
            ]
        })
    },
    {
        id: 'integral_partes',
        topic: 'Integración por Partes (ILATE)',
        match: (latex) => latex.includes('\\int') && 
                          (latex.includes('e^') || latex.includes('\\sin') || latex.includes('\\cos') || latex.includes('\\ln') || latex.includes('\\arctan')) &&
                          latex.includes('x') && !latex.includes('\\frac'),
        getOptions: () => ({
            correct: '\\int u \\, dv = u v - \\int v \\, du',
            explanation: 'Integración por partes: Recuerda la frase "Un Día Vi Una Vaca Menos Vestida De Uniforme". Se usa cuando hay multiplicación de funciones.',
            distractors: [
                '\\int u \\, dv = u + v - \\int du \\, dv',
                '\\int u \\, dv = u v - \\frac{v^2}{2} + C',
                '\\int u \\, dv = \\int u \\, du \\cdot \\int v \\, dv'
            ]
        })
    },
    {
        id: 'integral_completar_diferencial',
        topic: 'Identificar si el Diferencial está Completo (Sustitución)',
        match: (latex) => latex.includes('\\int') && 
                          (latex.includes('2x') || latex.includes('3x') || latex.includes('4x') || latex.includes('5x') || (latex.includes('^2') && latex.includes('x\\'))) &&
                          latex.includes('dx'),
        getOptions: () => ({
            correct: '\\text{Si } u = g(x) \\implies du = g\'(x)dx. \\text{ Balancear constante: } \\frac{1}{k}',
            explanation: 'Tomas la parte más compleja como u, la derivas para obtener du y agregas las constantes faltantes para que quede balanceada.',
            distractors: [
                '\\text{No se puede resolver por sustitución directa}',
                '\\int f(g(x)) dx = F(g(x)) + C',
                '\\int u \\, du = u^2 + C'
            ]
        })
    },
    {
        id: 'integral_sustitucion_general',
        topic: 'Cambio de Variable (Sustitución u-du)',
        match: (latex) => latex.includes('\\int') && (latex.includes('(') || latex.includes('\\sqrt')) && latex.includes('dx'),
        getOptions: () => ({
            correct: '\\int f(g(x))g\'(x)dx = \\int f(u)du',
            explanation: 'Si ves una función anidada (adentro de otra) y su derivada multiplicándola afuera, puedes sustituir todo eso por u y du.',
            distractors: [
                '\\int u \\, dv = uv - \\int v \\, du',
                '\\int f(x)g(x)dx = \\int f(x)dx \\cdot \\int g(x)dx',
                '\\int \\frac{du}{u} = \\arctan(u) + C'
            ]
        })
    },
    {
        id: 'integral_potencia',
        topic: 'Integral de una Potencia (Directa)',
        match: (latex) => latex.includes('\\int') && latex.includes('dx'),
        getOptions: () => ({
            correct: '\\int x^n dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)',
            explanation: 'Al revés de las derivadas: le sumas 1 al exponente, y el resultado lo pones dividiendo abajo.',
            distractors: [
                '\\int x^n dx = n x^{n-1} + C',
                '\\int x^n dx = \\ln|x| + C',
                '\\int x^n dx = \\frac{x^n}{n} + C'
            ]
        })
    },

    // ==========================================
    // 3. IDENTIDADES TRIGONOMÉTRICAS Y LOGARITMOS
    // ==========================================
    {
        id: 'identidad_pitagorica',
        topic: 'Identidades Trigonométricas (Pitagórica)',
        match: (latex) => (latex.includes('\\sin^2') || latex.includes('\\cos^2') || latex.includes('\\tan^2') || latex.includes('\\sec^2')),
        getOptions: () => ({
            correct: '\\sin^2(x) + \\cos^2(x) = 1',
            explanation: 'Esta es la identidad pitagórica principal, derivada del teorema de Pitágoras en un círculo unitario.',
            distractors: [
                '\\sin^2(x) - \\cos^2(x) = 1',
                '\\sin^2(x) + \\cos^2(x) = 0',
                '\\tan^2(x) + 1 = \\sin^2(x)'
            ]
        })
    },
    {
        id: 'propiedades_logaritmicas_producto',
        topic: 'Propiedades de los Logaritmos (Producto y Cociente)',
        match: (latex) => (latex.includes('\\ln') || latex.includes('\\log')) && (latex.includes('\\cdot') || latex.includes('*') || latex.includes('\\frac')),
        getOptions: () => ({
            correct: '\\ln(a \\cdot b) = \\ln(a) + \\ln(b) \\quad \\text{y} \\quad \\ln\\left(\\frac{a}{b}\\right) = \\ln(a) - \\ln(b)',
            explanation: 'Un logaritmo de una multiplicación se separa como suma de logaritmos. El de una división, como resta.',
            distractors: [
                '\\ln(a \\cdot b) = \\ln(a) \\cdot \\ln(b)',
                '\\ln(a + b) = \\ln(a) + \\ln(b)',
                '\\ln\\left(\\frac{a}{b}\\right) = \\frac{\\ln(a)}{\\ln(b)}'
            ]
        })
    },
    {
        id: 'propiedades_logaritmicas_potencia',
        topic: 'Propiedad de Logaritmo de una Potencia',
        match: (latex) => (latex.includes('\\ln') || latex.includes('\\log')) && latex.includes('^'),
        getOptions: () => ({
            correct: '\\ln(a^k) = k \\cdot \\ln(a)',
            explanation: 'El exponente dentro de un logaritmo "se cae" hacia el frente y pasa a multiplicar a todo el logaritmo.',
            distractors: [
                '\\ln(a^k) = (\\ln(a))^k',
                '\\ln(a^k) = k + \\ln(a)',
                '\\ln(a^k) = e^{k \\ln(a)}'
            ]
        })
    },

    // ==========================================
    // 4. ÁLGEBRA Y PRODUCTOS NOTABLES
    // ==========================================
    {
        id: 'ley_exponentes',
        topic: 'Leyes de los Exponentes',
        match: (latex) => {
            const expMatches = (latex.match(/\^/g) || []).length;
            return expMatches >= 2 || (latex.includes('^') && (latex.includes('\\cdot') || latex.includes('*') || latex.includes(')(')));
        },
        getOptions: () => ({
            correct: 'a^m \\cdot a^n = a^{m+n} \\quad \\text{y} \\quad (a^m)^n = a^{m \\cdot n}',
            explanation: 'Si multiplicas bases iguales, sus exponentes se suman. Si elevas una potencia a otra potencia, se multiplican.',
            distractors: [
                'a^m \\cdot a^n = a^{m \\cdot n}',
                'a^m + a^n = a^{m+n}',
                '(a^m)^n = a^{m+n}'
            ]
        })
    },
    {
        id: 'binomio_conjugado',
        topic: 'Binomios Conjugados',
        match: (latex) => (latex.includes('(') && latex.includes(')') && latex.includes('-') && latex.includes('+')) || latex.includes('(a-b)(a+b)'),
        getOptions: () => ({
            correct: '(a - b)(a + b) = a^2 - b^2',
            explanation: 'Al multiplicar una suma por su respectiva resta (conjugados), el resultado es siempre el primer término al cuadrado menos el segundo al cuadrado.',
            distractors: [
                '(a - b)(a + b) = (a - b)^2',
                '(a - b)(a + b) = a^2 + b^2',
                '(a - b)(a + b) = a^2 - 2ab + b^2'
            ]
        })
    },
    {
        id: 'binomio_cubo',
        topic: 'Binomio al Cubo',
        match: (latex) => latex.includes(')^3'),
        getOptions: () => ({
            correct: '(a \\pm b)^3 = a^3 \\pm 3a^2b + 3ab^2 \\pm b^3',
            explanation: 'El cubo del primero, triple del cuadrado del primero por el segundo, triple del primero por el cuadrado del segundo, y el cubo del segundo.',
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
            explanation: 'Extraes las raíces cúbicas y las multiplicas por un trinomio parecido al cuadrado perfecto, pero con el signo de en medio cambiado y sin el 2.',
            distractors: [
                'a^3 \\pm b^3 = (a \\pm b)^3',
                'a^3 \\pm b^3 = (a - b)(a + b)^2',
                'a^3 \\pm b^3 = a^3 \\pm 3a^2b + 3ab^2 \\pm b^3'
            ]
        })
    },
    {
        id: 'binomio_cuadrado',
        topic: 'Binomio al Cuadrado',
        match: (latex) => latex.includes(')^2') && (latex.includes('+') || latex.includes('-')),
        getOptions: () => ({
            correct: '(a \\pm b)^2 = a^2 \\pm 2ab + b^2',
            explanation: 'El primero al cuadrado, MÁS O MENOS el doble del primero por el segundo, MÁS el segundo al cuadrado.',
            distractors: [
                '(a \\pm b)^2 = a^2 \\pm b^2',
                '(a \\pm b)^2 = a^2 \\pm ab + b^2',
                '(a \\pm b)^2 = (a-b)(a+b)'
            ]
        })
    },
    {
        id: 'diferencia_cuadrados',
        topic: 'Diferencia de Cuadrados',
        match: (latex) => latex.includes('^2') && latex.includes('-') && !latex.includes('('),
        getOptions: () => ({
            correct: 'a^2 - b^2 = (a - b)(a + b)',
            explanation: 'Si tienes dos cuadrados que se están restando, los puedes factorizar abriendo dos paréntesis: en uno sumas sus raíces y en el otro las restas.',
            distractors: [
                'a^2 - b^2 = (a - b)^2',
                'a^2 - b^2 = a^2 - 2ab + b^2',
                'a^2 - b^2 = (a + b)^2'
            ]
        })
    },
    {
        id: 'trinomio_cuadrado_perfecto',
        topic: 'Trinomio Cuadrado Perfecto (TCP)',
        match: (latex) => latex.includes('^2') && (latex.includes('+') || latex.includes('-')),
        getOptions: () => ({
            correct: 'a^2 \\pm 2ab + b^2 = (a \\pm b)^2',
            explanation: 'Si el primer y tercer término tienen raíz cuadrada exacta y el del medio es el doble de multiplicar esas raíces, lo factorizas como Binomio al Cuadrado.',
            distractors: [
                'a^2 \\pm 2ab + b^2 = a^2 \\pm b^2',
                'a^2 \\pm 2ab + b^2 = (a-b)(a+b)',
                'a^2 \\pm 2ab + b^2 = a^2 + b^2'
            ]
        })
    },
    {
        id: 'division_polinomios',
        topic: 'División de Polinomios',
        match: (latex) => latex.includes('\\frac{') && latex.includes('x^'),
        getOptions: () => ({
            correct: '\\frac{P(x)}{Q(x)} = C(x) + \\frac{R(x)}{Q(x)}',
            explanation: 'Como en una división normal: el resultado es el cociente más el residuo dividido entre el divisor original.',
            distractors: [
                '\\frac{P(x)}{Q(x)} = P(x) - Q(x)',
                '\\frac{P(x)}{Q(x)} = P(x) \\cdot Q(x)^{-1}',
                '\\frac{P(x)}{Q(x)} = \\frac{P\'(x)}{Q\'(x)}'
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
                { text: optionsData.correct, isCorrect: true, explanation: optionsData.explanation },
                ...optionsData.distractors.map(d => ({ text: d, isCorrect: false }))
            ];
            return {
                topic: rule.topic,
                options: shuffleArray(allOptions),
                explanation: optionsData.explanation
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
    const scoreDisplay = document.getElementById('score-display');
    const explanationBox = document.getElementById('explanation-box');
    const explanationText = document.getElementById('explanation-text');

    let currentScore = 0;
    let answered = false;

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

        quizTitle.textContent = `Tema detectado: ${quizData.topic}`;
        answered = false;
        explanationBox.style.display = 'none';
        resetBtn.style.backgroundColor = '';
        resetBtn.style.color = '';
        
        try {
            katex.render(latex, quizExpression, { throwOnError: false, displayMode: true });
        } catch(e) {}

        renderizarOpciones(quizData.options, quizData.explanation);

        inputSection.style.display = 'none';
        quizSection.style.display = 'block';
    });

    resetBtn.addEventListener('click', () => {
        quizSection.style.display = 'none';
        inputSection.style.display = 'block';
        mathInput.value = '';
        latexPreview.innerHTML = '\\text{Esperando ecuación...}';
    });

    function renderizarOpciones(opciones, explicacion) {
        optionsContainer.innerHTML = ''; 
        
        opciones.forEach(opcion => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            
            katex.render(opcion.text, btn, { throwOnError: false });
            
            btn.addEventListener('click', () => {
                if (answered) return; // Evitar multiples clicks
                answered = true;

                if (opcion.isCorrect) {
                    btn.style.backgroundColor = '#d4edda';
                    btn.style.borderColor = '#28a745';
                    currentScore += 10;
                    scoreDisplay.textContent = currentScore;
                } else {
                    btn.style.backgroundColor = '#f8d7da';
                    btn.style.borderColor = '#dc3545';
                    currentScore = Math.max(0, currentScore - 5);
                    scoreDisplay.textContent = currentScore;
                }
                
                if (explicacion) {
                    explanationText.textContent = explicacion;
                    explanationBox.style.display = 'block';
                }

                resetBtn.style.backgroundColor = '#3498db';
                resetBtn.style.color = 'white';
            });

            optionsContainer.appendChild(btn);
        });
    }
});