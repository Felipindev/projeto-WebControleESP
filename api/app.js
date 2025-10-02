import rotaLed from "./routes/rotaLed.js";
import rotaBoia from "./routes/rotaBoia.js";
import rotaSensor from "./routes/rotaSensor.js";
import rotaSensorSolo from "./routes/rotaSensorSolo.js";
import rotaMonitorChuva from "./routes/RotaMonitorChuva.js";
import SistemaDefesa from "./routes/rotaSistemaDefesa.js";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json('API no ar!')
})

//rota para leitura do status do LED
app.get('/api/status', rotaLed.lerStatus)

//rota para publicar comando
app.post('/api/comando', rotaLed.enviaComando)

//rota para leitura do status da boia
app.get('/api/statusBoia', rotaBoia.lerStatus)

//rota para leitura do status do sensor
app.get('/api/statusSensor', rotaSensor.lerStatus)

//rota para leitura dos status do sensor de umidade
app.get('/api/sensorUmidade', rotaSensorSolo.lerSensorSolo )

//rota para leitura dos status do sensor de chuva
app.get('/api/monitorChuva', rotaMonitorChuva.lerMonitorChuva )

//rota para leitura dos status do sistema de defesa
app.get('/api/sistemaDefesa', SistemaDefesa.lerSistemaDefesa )

const porta = 3000;
app.listen(porta, () => {
    console.log(`Servidor rodando na porta: http://localhost:${porta}`);
});