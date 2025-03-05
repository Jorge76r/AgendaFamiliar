const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para analizar JSON
app.use(express.json());

console.log("El servidor está intentando iniciar...");

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    console.log("Solicitud recibida con:", { email, password });

    if (email === 'jorge76r@gmail.com' && password === '1234') {
        return res.json({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' });
    } else {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }
});

app.listen(PORT, () => {
    console.log(`API corriendo en http://localhost:${PORT}`);
});
