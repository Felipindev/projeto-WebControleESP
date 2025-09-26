import { onMessage, MONITOR_CHUVA } from "../services/mqttClient.js";

let monitorChuva = '';


onMessage(MONITOR_CHUVA, (mensagem) => {
    monitorChuva = mensagem;
    console.log('Status da umidade atualizado:', monitorChuva);
})

class rotaMonitorChuva {
    static lerMonitorChuva(req, res){
        try {
            console.log(`condição do tempo: ${monitorChuva}`);
            
            res.status(200).json({ 
                monitorChuva: monitorChuva
            });
            console.log('Status enviado:', {monitorChuva});
        } catch (error) {
            console.error('Erro ao ler status do monitor chuva:', error);
            res.status(500).json({ message: 'Erro interno ao obter o status do monitor chuva' });
        }
    }
}

export default rotaMonitorChuva;