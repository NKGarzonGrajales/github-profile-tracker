// 1. IMPORTACIONES (Traemos las herramientas al consultorio)
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
});