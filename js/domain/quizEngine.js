import { rules } from './rules.js';

/**
 * Analiza la expresión LaTeX y devuelve el tema detectado junto con las opciones de respuesta.
 */
export function analyzeExpression(latex) {
    // Normalizamos el string quitando espacios en blanco extra para facilitar el regex básico
    const normalized = latex.replace(/\s+/g, '');
    
    // Buscamos la primera regla que coincida
    for (const rule of rules) {
        if (rule.match(normalized)) {
            const optionsData = rule.getOptions(normalized);
            
            // Unimos la opción correcta con los distractores y mezclamos aleatoriamente
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
    
    // Si no coincide con ninguna regla
    return null; 
}

/**
 * Algoritmo de Fisher-Yates para mezclar el arreglo de opciones.
 */
function shuffleArray(array) {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
}
