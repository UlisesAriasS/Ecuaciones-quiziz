const fs = require('fs');

let content = fs.readFileSync('js/app.js', 'utf-8');

content = content.replace(
    'const allOptions = [\n                { text: optionsData.correct, isCorrect: true },\n                ...optionsData.distractors.map(d => ({ text: d, isCorrect: false }))\n            ];\n            return {\n                topic: rule.topic,\n                options: shuffleArray(allOptions)\n            };',
    'const allOptions = [\n                { text: optionsData.correct, isCorrect: true, explanation: optionsData.explanation },\n                ...optionsData.distractors.map(d => ({ text: d, isCorrect: false }))\n            ];\n            return {\n                topic: rule.topic,\n                options: shuffleArray(allOptions),\n                explanation: optionsData.explanation\n            };'
);

content = content.replace(
    'const scoreDisplay = document.getElementById(\'score-display\');\n\n    let currentScore = 0;\n    let answered = false;',
    'const scoreDisplay = document.getElementById(\'score-display\');\n    const explanationBox = document.getElementById(\'explanation-box\');\n    const explanationText = document.getElementById(\'explanation-text\');\n\n    let currentScore = 0;\n    let answered = false;'
);

content = content.replace(
    'quizTitle.textContent = `Tema detectado: ${quizData.topic}`;\n        answered = false;',
    'quizTitle.textContent = `Tema detectado: ${quizData.topic}`;\n        answered = false;\n        explanationBox.style.display = \'none\';\n        resetBtn.style.backgroundColor = \'\';\n        resetBtn.style.color = \'\';'
);

content = content.replace(
    'renderizarOpciones(quizData.options);',
    'renderizarOpciones(quizData.options, quizData.explanation);'
);

content = content.replace(
    'function renderizarOpciones(opciones) {',
    'function renderizarOpciones(opciones, explicacion) {'
);

const oldClickEvent = `alert('¡Correcto! Esa es la fórmula adecuada. +10 puntos');
                } else {
                    btn.style.backgroundColor = '#f8d7da';
                    btn.style.borderColor = '#dc3545';
                    currentScore = Math.max(0, currentScore - 5);
                    scoreDisplay.textContent = currentScore;
                    alert('Incorrecto. Se restaron 5 puntos. La próxima vez lo harás mejor.');
                }
                
                // Mostrar el boton para probar otro problema visualmente mas llamativo si se desea
                resetBtn.style.backgroundColor = '#3498db';
                resetBtn.style.color = 'white';`;

const newClickEvent = `// alert quitado para dar paso a la explicación visual
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
                resetBtn.style.color = 'white';`;

content = content.replace(oldClickEvent, newClickEvent);

fs.writeFileSync('js/app.js', content, 'utf-8');
console.log('App.js patched successfully.');
