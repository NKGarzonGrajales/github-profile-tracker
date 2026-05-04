require('dotenv').config(); // Abre la caja fuerte (.env)
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); // Importa la conexión a Postgres

const app = express();

// Middlewares (Los recepcionistas)
//app.use(cors());
// CAMBIO 1: Activamos la configuración detallada de CORS para que Vercel no se bloquee
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());


// Configuración de la base de datos usando la llave secreta
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Ruta (Endpoint) para registrar una nueva visita
app.post('/api/visits', async (req, res) => {
    try {
        // 1. Identificamos quién nos visita (por ahora usamos la IP)
        const userIp = req.ip || 'ip_desconocida';

        // CAMBIO 2: Ajustamos para detectar la IP real cuando el servidor está en la nube (Render)
        const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'ip_desconocida';

        // 2. El Deportólogo anota la visita en la libreta (Base de Datos)
        await pool.query(
            'INSERT INTO visits (ip_hash) VALUES ($1)',
            [userIp]
        );

        // 3. El Deportólogo cuenta cuántas visitas hay en total
        const result = await pool.query('SELECT COUNT(*) FROM visits');
        const totalVisits = result.rows[0].count;

        // 4. Le respondemos a React con el número exacto
        res.json({ success: true, totalVisits: parseInt(totalVisits) });

    } catch (error) {
        console.error('Error en la base de datos:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
});

// Encender el servidor
// CAMBIO 3: Aseguramos que use el puerto que Render le asigne automáticamente
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`¡Deportólogo encendido y escuchando en el puerto ${PORT}! 🚀`);
});




/*// 1. IMPORTACIONES (Traemos las herramientas al consultorio)
const express = require('express'); // Express: El sistema de recepción del consultorio
const cors = require('cors');       // Cors: El permiso para que los pacientes de React puedan entrar

// 2. INICIALIZACIÓN
const app = express();
const PORT = 3001; // El número de consultorio donde atiende el deportólogo

// 3. MIDDLEWARES (Reglas de la recepción)
app.use(cors()); // Permite peticiones desde otros dominios (esencial para cuando conectemos React)
app.use(express.json()); // Permite entender información en formato JSON

// 4. MEMORIA TEMPORAL (La libreta de papel del deportólogo)
// OJO: Hoy usamos una variable, pero mañana la cambiaremos por la Base de Datos SQL
let contadorVisitas = 0;

// 5. RUTAS / ENDPOINTS (Las puertas de atención)

// Puerta A: Aquí es donde llamará el sensor de tu perfil de GitHub
app.get('/', (req, res) => {
    contadorVisitas++; // Sumamos 1 a la libreta
    console.log(`¡Nueva visita registrada! Total: ${contadorVisitas}`);

    // Como GitHub espera una imagen, le devolvemos un "Badge" visual (un formato SVG)
   // res.setHeader('Content-Type', 'image/svg+xml');
    res.send(`Backend is up and running!`);
});

// Puerta B: Esta puerta la usaremos después para que React (la sala de monitoreo) lea los datos
app.get('/api/stats', (req, res) => {
    res.json({ total: contadorVisitas });
});

// 6. ABRIR EL CONSULTORIO
app.listen(PORT, () => {
    console.log(`🏥 El Deportólogo está atendiendo en http://localhost:${PORT}`);
});*/