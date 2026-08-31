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
            explanation: `<b>Tipo:</b> Regla de Derivación<br><br><b>¿Por qué es correcto?</b> La regla de la cadena nos dice que derivemos de afuera hacia adentro: derivas la función exterior y la multiplicas por la derivada de lo de adentro.<br><br><b>Errores comunes:</b> Es incorrecto derivar ambas funciones por separado y multiplicarlas, siempre debes evaluar la derivada exterior usando la función interior original.`,
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
            explanation: `<b>Tipo:</b> Fórmula Directa<br><br><b>¿Por qué es correcto?</b> Para derivar una potencia, bajas el exponente multiplicando al frente y le restas 1 al exponente original.<br><br><b>Errores comunes:</b> No sumes 1 al exponente (eso se hace en las integrales), y recuerda siempre restar 1.`,
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
            explanation: `<b>Tipo:</b> Reordenamiento Algebraico (Previo a integrar)<br><br><b>¿Por qué es correcto?</b> Cuando tienes factores multiplicándose en el denominador, no hay fórmula directa. Debes separar la fracción en sumas de fracciones más sencillas usando constantes A y B.<br><br><b>Errores comunes:</b> Tratar de integrar el denominador directamente con logaritmo; primero debes separar las fracciones.`,
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
            explanation: `<b>Tipo:</b> Método de Integración<br><br><b>¿Por qué es correcto?</b> Se usa cuando hay multiplicación de funciones sin relación de derivada. Recuerda la mnemotecnia: "Un Día Vi Una Vaca Menos Vestida De Uniforme".<br><br><b>Errores comunes:</b> Integrar ambas funciones por separado y multiplicarlas es un error matemático muy grave.`,
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
            explanation: `<b>Tipo:</b> Identificación de Patrones<br><br><b>¿Por qué es correcto?</b> Tomas la parte más compleja como 'u', la derivas para obtener 'du' y si sobra una constante, la pasas dividiendo (balanceo) para que la ecuación no se altere.<br><br><b>Errores comunes:</b> Si intentas sustituir directamente sin calcular 'du', te faltará el balanceo de la constante de integración.`,
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
            explanation: `<b>Tipo:</b> Método de Sustitución (Cambio de variable)<br><br><b>¿Por qué es correcto?</b> Si ves una función anidada y su derivada multiplicándola afuera, puedes sustituir todo eso por 'u' y 'du' para transformarla en una integral básica.<br><br><b>Errores comunes:</b> Confundirlo con integración por partes. Aquí sí hay relación de derivada entre las partes de la función.`,
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
            explanation: `<b>Tipo:</b> Fórmula Directa<br><br><b>¿Por qué es correcto?</b> Es la operación inversa a la derivada: le sumas 1 al exponente, y el resultado lo pones dividiendo abajo.<br><br><b>Errores comunes:</b> Restar 1 al exponente (eso es derivar), o intentar usar esta regla cuando el exponente es -1 (eso da un logaritmo).`,
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
            explanation: `<b>Tipo:</b> Identidad Trigonométrica (Sustitución equivalente)<br><br><b>¿Por qué es correcto?</b> Esta no es una fórmula para "resolver", sino una equivalencia basada en el Teorema de Pitágoras. Te sirve para reescribir la ecuación y hacerla más fácil.<br><br><b>Errores comunes:</b> Creer que seno más coseno es 1, ¡tienen que estar al cuadrado!`,
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
            explanation: `<b>Tipo:</b> Propiedad Algebraica (Reescritura)<br><br><b>¿Por qué es correcto?</b> Los logaritmos transforman multiplicaciones internas en sumas externas, y divisiones en restas. Es una regla para desarmar ecuaciones.<br><br><b>Errores comunes:</b> Pensar que ln(a + b) es igual a ln(a) + ln(b). ¡La suma interna NO se puede separar!`,
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
            explanation: `<b>Tipo:</b> Propiedad Algebraica (Reescritura)<br><br><b>¿Por qué es correcto?</b> El exponente dentro de un logaritmo "se cae" hacia el frente y pasa a multiplicar a todo el logaritmo. Ayuda a eliminar exponentes molestos.<br><br><b>Errores comunes:</b> Confundir el exponente del argumento interno con elevar todo el logaritmo al cuadrado: ln(a^2) no es lo mismo que (ln(a))^2.`,
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
            explanation: `<b>Tipo:</b> Ley de los Exponentes (Aritmética básica)<br><br><b>¿Por qué es correcto?</b> Si multiplicas bases iguales, sus exponentes se suman. Si elevas una potencia a otra potencia, se multiplican.<br><br><b>Errores comunes:</b> Multiplicar los exponentes cuando se están sumando las bases, o sumarlos cuando es potencia de potencia.`,
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
            explanation: `<b>Tipo:</b> Producto Notable (Expansión rápida)<br><br><b>¿Por qué es correcto?</b> Al multiplicar una suma por su respectiva resta (conjugados), los términos del medio se cancelan, dejando solo el cuadrado del primero menos el cuadrado del segundo.<br><br><b>Errores comunes:</b> Creer que es igual a (a-b)^2, el cual generaría un trinomio.`,
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
            explanation: `<b>Tipo:</b> Producto Notable (Expansión rápida)<br><br><b>¿Por qué es correcto?</b> Sigue la regla fija: el cubo del primero, triple del cuadrado del primero por el segundo, triple del primero por el cuadrado del segundo, y el cubo del segundo.<br><br><b>Errores comunes:</b> Pensar que (a+b)^3 es simplemente a^3 + b^3. Te estás comiendo los términos del medio.`,
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
            explanation: `<b>Tipo:</b> Factorización (Reordenamiento algebraico)<br><br><b>¿Por qué es correcto?</b> Extraes las raíces cúbicas y las multiplicas por un trinomio parecido al cuadrado perfecto, pero con el signo de en medio cambiado y sin el 2.<br><br><b>Errores comunes:</b> Confundirlo con el binomio al cubo (a-b)^3.`,
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
            explanation: `<b>Tipo:</b> Producto Notable (Expansión rápida)<br><br><b>¿Por qué es correcto?</b> Al desarrollar (a+b)(a+b), obtienes: el primero al cuadrado, más el doble del primero por el segundo, más el segundo al cuadrado.<br><br><b>Errores comunes:</b> Escribir que (a+b)^2 = a^2 + b^2 (Error de novato muy común, falta el 2ab del medio).`,
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
            explanation: `<b>Tipo:</b> Factorización (Reordenamiento algebraico)<br><br><b>¿Por qué es correcto?</b> Si tienes dos cuadrados que se están restando, es el proceso inverso al binomio conjugado: abres dos paréntesis, en uno sumas sus raíces y en el otro las restas.<br><br><b>Errores comunes:</b> Intentar factorizar una SUMA de cuadrados (a^2 + b^2); eso no se puede factorizar en los números reales.`,
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
            explanation: `<b>Tipo:</b> Factorización (Reordenamiento algebraico)<br><br><b>¿Por qué es correcto?</b> Si el primer y tercer término tienen raíz cuadrada exacta y el del medio es el doble de multiplicar esas raíces, lo factorizas comprimiéndolo en un Binomio al Cuadrado.<br><br><b>Errores comunes:</b> Factorizarlo como si fuera una diferencia de cuadrados o no verificar que el término del medio sea exactamente el doble.`,
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
            explanation: `<b>Tipo:</b> Reordenamiento Algebraico (División larga)<br><br><b>¿Por qué es correcto?</b> Funciona exactamente igual que en primaria: el resultado total es el cociente obtenido más lo que sobró (residuo) dividido entre el divisor original.<br><br><b>Errores comunes:</b> Restar el numerador y denominador directamente, o cancelar términos que se están sumando.`,
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
                    explanationText.innerHTML = explicacion;
                    explanationBox.style.display = 'block';
                }

                resetBtn.style.backgroundColor = '#3498db';
                resetBtn.style.color = 'white';
            });

            optionsContainer.appendChild(btn);
        });
    }
});