import { onMessage, STATUS_BOIA } from "../services/mqttClient.js";

let statusBoia = '';

onMessage(STATUS_BOIA, (mensagem) => {
    statusBoia = mensagem;
    console.log('Status da boia atualizado:', statusBoia);
})

class rotaBoia {
    static lerStatus(req, res){
        try {
            res.status(200).json({ 
                statusBoia
            });
            console.log('Status da boia enviado:', statusBoia);
        } catch (error) {
            console.error('Erro ao ler status da boia:', error);
            res.status(500).json({ message: 'Erro interno ao obter o status da boia' });
        }
    }
}

export default rotaBoia;