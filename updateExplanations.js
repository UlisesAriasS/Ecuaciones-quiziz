const fs = require('fs');

let content = fs.readFileSync('js/app.js', 'utf-8');

// I will insert explanation into each rule manually or via script.
// To avoid messy AST parsing in a short script, let's just do targeted string replacements.

const replacements = {
    "correct: '\\\\frac{d}{dx}[f(g(x))] = f\\'(g(x)) \\\\cdot g\\'(x)',": 
    "correct: '\\\\frac{d}{dx}[f(g(x))] = f\\'(g(x)) \\\\cdot g\\'(x)',\n            explanation: 'La regla de la cadena nos dice que derivemos de afuera hacia adentro: derivas la función exterior y la multiplicas por la derivada de lo de adentro.',",

    "correct: '\\\\frac{d}{dx}[x^n] = n x^{n-1}',":
    "correct: '\\\\frac{d}{dx}[x^n] = n x^{n-1}',\n            explanation: 'Para derivar una potencia, bajas el exponente multiplicando al frente y le restas 1 al exponente original.',",

    "correct: '\\\\frac{P(x)}{(x-a)(x-b)} = \\\\frac{A}{x-a} + \\\\frac{B}{x-b}',":
    "correct: '\\\\frac{P(x)}{(x-a)(x-b)} = \\\\frac{A}{x-a} + \\\\frac{B}{x-b}',\n            explanation: 'Cuando tienes factores multiplicándose en el denominador, separas la fracción en sumas de fracciones más sencillas usando constantes A y B.',",

    "correct: '\\\\int u \\\\, dv = u v - \\\\int v \\\\, du',":
    "correct: '\\\\int u \\\\, dv = u v - \\\\int v \\\\, du',\n            explanation: 'Integración por partes: Recuerda la frase \"Un Día Vi Una Vaca Menos Vestida De Uniforme\". Se usa cuando hay multiplicación de funciones.',",

    "correct: '\\\\text{Si } u = g(x) \\\\implies du = g\\'(x)dx. \\\\text{ Balancear constante: } \\\\frac{1}{k}',":
    "correct: '\\\\text{Si } u = g(x) \\\\implies du = g\\'(x)dx. \\\\text{ Balancear constante: } \\\\frac{1}{k}',\n            explanation: 'Tomas la parte más compleja como u, la derivas para obtener du y agregas las constantes faltantes para que quede balanceada.',",

    "correct: '\\\\int f(g(x))g\\'(x)dx = \\\\int f(u)du',":
    "correct: '\\\\int f(g(x))g\\'(x)dx = \\\\int f(u)du',\n            explanation: 'Si ves una función anidada (adentro de otra) y su derivada multiplicándola afuera, puedes sustituir todo eso por u y du.',",

    "correct: '\\\\int x^n dx = \\\\frac{x^{n+1}}{n+1} + C \\\\quad (n \\\\neq -1)',":
    "correct: '\\\\int x^n dx = \\\\frac{x^{n+1}}{n+1} + C \\\\quad (n \\\\neq -1)',\n            explanation: 'Al revés de las derivadas: le sumas 1 al exponente, y el resultado lo pones dividiendo abajo.',",

    "correct: '\\\\sin^2(x) + \\\\cos^2(x) = 1',":
    "correct: '\\\\sin^2(x) + \\\\cos^2(x) = 1',\n            explanation: 'Esta es la identidad pitagórica principal, derivada del teorema de Pitágoras en un círculo unitario.',",

    "correct: '\\\\ln(a \\\\cdot b) = \\\\ln(a) + \\\\ln(b) \\\\quad \\\\text{y} \\\\quad \\\\ln\\\\left(\\\\frac{a}{b}\\\\right) = \\\\ln(a) - \\\\ln(b)',":
    "correct: '\\\\ln(a \\\\cdot b) = \\\\ln(a) + \\\\ln(b) \\\\quad \\\\text{y} \\\\quad \\\\ln\\\\left(\\\\frac{a}{b}\\\\right) = \\\\ln(a) - \\\\ln(b)',\n            explanation: 'Un logaritmo de una multiplicación se separa como suma de logaritmos. El de una división, como resta.',",

    "correct: '\\\\ln(a^k) = k \\\\cdot \\\\ln(a)',":
    "correct: '\\\\ln(a^k) = k \\\\cdot \\\\ln(a)',\n            explanation: 'El exponente dentro de un logaritmo \"se cae\" hacia el frente y pasa a multiplicar a todo el logaritmo.',",

    "correct: 'a^m \\\\cdot a^n = a^{m+n} \\\\quad \\\\text{y} \\\\quad (a^m)^n = a^{m \\\\cdot n}',":
    "correct: 'a^m \\\\cdot a^n = a^{m+n} \\\\quad \\\\text{y} \\\\quad (a^m)^n = a^{m \\\\cdot n}',\n            explanation: 'Si multiplicas bases iguales, sus exponentes se suman. Si elevas una potencia a otra potencia, se multiplican.',",

    "correct: '(a - b)(a + b) = a^2 - b^2',":
    "correct: '(a - b)(a + b) = a^2 - b^2',\n            explanation: 'Al multiplicar una suma por su respectiva resta (conjugados), el resultado es siempre el primer término al cuadrado menos el segundo al cuadrado.',",

    "correct: '(a \\\\pm b)^3 = a^3 \\\\pm 3a^2b + 3ab^2 \\\\pm b^3',":
    "correct: '(a \\\\pm b)^3 = a^3 \\\\pm 3a^2b + 3ab^2 \\\\pm b^3',\n            explanation: 'El cubo del primero, triple del cuadrado del primero por el segundo, triple del primero por el cuadrado del segundo, y el cubo del segundo.',",

    "correct: 'a^3 \\\\pm b^3 = (a \\\\pm b)(a^2 \\\\mp ab + b^2)',":
    "correct: 'a^3 \\\\pm b^3 = (a \\\\pm b)(a^2 \\\\mp ab + b^2)',\n            explanation: 'Extraes las raíces cúbicas y las multiplicas por un trinomio parecido al cuadrado perfecto, pero con el signo de en medio cambiado y sin el 2.',",

    "correct: '(a \\\\pm b)^2 = a^2 \\\\pm 2ab + b^2',":
    "correct: '(a \\\\pm b)^2 = a^2 \\\\pm 2ab + b^2',\n            explanation: 'El primero al cuadrado, MÁS O MENOS el doble del primero por el segundo, MÁS el segundo al cuadrado.',",

    "correct: 'a^2 - b^2 = (a - b)(a + b)',":
    "correct: 'a^2 - b^2 = (a - b)(a + b)',\n            explanation: 'Si tienes dos cuadrados que se están restando, los puedes factorizar abriendo dos paréntesis: en uno sumas sus raíces y en el otro las restas.',",

    "correct: 'a^2 \\\\pm 2ab + b^2 = (a \\\\pm b)^2',":
    "correct: 'a^2 \\\\pm 2ab + b^2 = (a \\\\pm b)^2',\n            explanation: 'Si el primer y tercer término tienen raíz cuadrada exacta y el del medio es el doble de multiplicar esas raíces, lo factorizas como Binomio al Cuadrado.',",

    "correct: '\\\\frac{P(x)}{Q(x)} = C(x) + \\\\frac{R(x)}{Q(x)}',":
    "correct: '\\\\frac{P(x)}{Q(x)} = C(x) + \\\\frac{R(x)}{Q(x)}',\n            explanation: 'Como en una división normal: el resultado es el cociente más el residuo dividido entre el divisor original.',"
};

for (const [key, value] of Object.entries(replacements)) {
    content = content.replace(key, value);
}

fs.writeFileSync('js/app.js', content, 'utf-8');
console.log('Explanations added to rules.');
