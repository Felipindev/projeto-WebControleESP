import { onMessage, CONDICAO_SOLO, SENSOR_SOLO } from "../services/mqttClient.js";

let condicaoSolo = '';
let sensorUmidade = '';

onMessage(CONDICAO_SOLO, (mensagem) => {
    condicaoSolo = mensagem;
    console.log('Status da umidade atualizado:', condicaoSolo);
})

onMessage(SENSOR_SOLO, (mensagem) => {
    sensorUmidade = mensagem;
    console.log('Status da condição do solo atualizado:', sensorUmidade);
})

class rotaSensorSolo {
    static lerSensorSolo(req, res){
        try {
            console.log(`umidade solo: ${sensorUmidade}% e condicao: ${condicaoSolo}`);
            
            res.status(200).json({ 
                sensorUmidade: sensorUmidade,
                condicaoSolo: condicaoSolo,
            });
            console.log('Status enviado:', {umidade, condicaoSolo});
        } catch (error) {
            console.error('Erro ao ler status da boia:', error);
            res.status(500).json({ message: 'Erro interno ao obter o status da boia' });
        }
    }
}

export default rotaSensorSolo;