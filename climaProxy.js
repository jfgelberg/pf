// server/climaProxy.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 3001;

const rapidApiHost = 'meteostat.p.rapidapi.com';
const rapidApiKey = '2c60a9a0a8msh29844562b8c4db9p16acc3jsn153dca1865e6'; // tu clave de RapidAPI

app.use(cors({
  origin: 'https://regionactiva.com', // o especificá: origin: 'https://regionactiva.com'
}));

app.get('/api/clima', async (req, res) => {
  const { lat, lon, start, end } = req.query;
  
  //console.log("Consulta recibida:", req.query);

  const url = `https://${rapidApiHost}/point/monthly?lat=${lat}&lon=${lon}&start=${start}&end=${end}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': rapidApiHost,
        'x-rapidapi-key': rapidApiKey
      }
    });

    const text = await response.text(); // para ver errores de HTML o vacíos
    //console.log("Respuesta cruda:", text);

    const data = JSON.parse(text);
    res.json(data);

  } catch (error) {
    //console.error('Error al consultar Meteostat (RapidAPI):', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(PORT, () => {
  //console.log(`Clima proxy (RapidAPI) corriendo en http://localhost:${PORT}`);
});
