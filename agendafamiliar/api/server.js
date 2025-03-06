const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const hostname = process.env.HOSTNAME || '0.0.0.0';

// Credenciales válidas
const secretKey = process.env.SECRET_KEY || 'mi_clave_secreta';
const validUser = process.env.VALID_USER || 'jorge76r@gmail.com';
const validPassword = process.env.VALID_PASSWORD || '1234';

// Logs de solicitudes entrantes
app.use((req, res, next) => {
    console.log(`Solicitud entrante: Método=${req.method}, Ruta=${req.path}, IP=${req.ip}`);
    next();
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta principal
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

// Ruta de login
app.post('/login', (req, res) => {
    console.log('Solicitud recibida en /login:', req.body);

    const { username, password } = req.body;

    if (!username || !password) {
        console.log('Error: Faltan credenciales');
        return res.status(400).json({ message: 'Faltan credenciales' });
    }

    if (username === validUser && password === validPassword) {
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
        console.log(`Inicio de sesión exitoso para: ${username}`);
        return res.json({ token });
    } else {
        console.log('Error: Credenciales inválidas');
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }
});

// Iniciar el servidor
app.listen(port, hostname, () => {
    console.log(`Servidor corriendo en http://${hostname}:${port}`);
});
