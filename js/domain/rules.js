export const rules = [
    // --- ÁLGEBRA ---
    {
        id: 'diferencia_cuadrados',
        topic: 'Diferencia de Cuadrados',
        // Busca un patrón como x^2 - y^2 o a^2 - 16
        match: (latex) => {
            return latex.includes('^2') && latex.includes('-');
        },
        getOptions: () => {
            return {
                correct: 'a^2 - b^2 = (a - b)(a + b)',
                distractors: [
                    'a^2 - b^2 = (a - b)^2',
                    'a^2 - b^2 = a^2 - 2ab + b^2',
                    'a^2 - b^2 = (a + b)^2'
                ]
            };
        }
    },
    {
        id: 'binomio_cuadrado',
        topic: 'Binomio al Cuadrado',
        // Busca patrones como (x+y)^2
        match: (latex) => {
            return latex.includes(')^2') && (latex.includes('+') || latex.includes('-'));
        },
        getOptions: () => {
            return {
                correct: '(a \\pm b)^2 = a^2 \\pm 2ab + b^2',
                distractors: [
                    '(a \\pm b)^2 = a^2 \\pm b^2',
                    '(a \\pm b)^2 = a^2 \\pm ab + b^2',
                    '(a \\pm b)^2 = (a-b)(a+b)'
                ]
            };
        }
    },

    // --- INTEGRALES ---
    {
        id: 'integral_potencia',
        topic: 'Integral de una Potencia (Directa)',
        // Busca \int x^n dx
        match: (latex) => {
            return latex.includes('\\int') && latex.includes('^') && latex.includes('dx');
        },
        getOptions: () => {
            return {
                correct: '\\int u^n du = \\frac{u^{n+1}}{n+1} + C',
                distractors: [
                    '\\int u^n du = n u^{n-1} + C',
                    '\\int u^n du = \\ln|u| + C',
                    '\\int u^n du = \\frac{u^n}{n} + C'
                ]
            };
        }
    },
    {
        id: 'integral_partes',
        topic: 'Integración por Partes',
        // Busca funciones combinadas como \int x e^x dx o \int x \sin(x) dx
        match: (latex) => {
            return latex.includes('\\int') && 
                   (latex.includes('e^') || latex.includes('\\sin') || latex.includes('\\cos') || latex.includes('\\ln')) &&
                   latex.includes('dx');
        },
        getOptions: () => {
            return {
                correct: '\\int u \\, dv = u v - \\int v \\, du',
                distractors: [
                    '\\int u \\, dv = u + v - \\int du \\, dv',
                    '\\int u \\, dv = u v - \\frac{v^2}{2} + C',
                    '\\int u \\, dv = \\int u \\, du \\cdot \\int v \\, dv'
                ]
            };
        }
    }
];
