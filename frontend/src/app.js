// Lógica principal de UI
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('math-input');
    const preview = document.getElementById('latex-preview');
    const analyzeBtn = document.getElementById('analyze-btn');

    // Renderizar LaTeX en tiempo real
    input.addEventListener('input', () => {
        const latex = input.value;
        try {
            katex.render(latex || '...', preview, {
                throwOnError: false,
                displayMode: true
            });
        } catch (e) {
            console.error("Error al renderizar KaTeX:", e);
        }
    });

    analyzeBtn.addEventListener('click', async () => {
        const latex = input.value;
        if (!latex.trim()) {
            alert('Por favor ingresa una expresión');
            return;
        }

        try {
            // Ejemplo de llamada a la API (el backend aún no implementa este endpoint)
            /*
            const response = await fetch('http://localhost:3000/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ expression: latex })
            });
            const data = await response.json();
            */
            
            alert('Llamada al backend pendiente de implementar. ¡Conexión lista!');
        } catch (error) {
            console.error('Error:', error);
            alert('Error al conectar con el servidor.');
        }
    });
});
