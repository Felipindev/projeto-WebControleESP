import { onMessage, TOPICO_TEMPERATURA, TOPICO_UMIDADE } from "../services/mqttClient.js";

let temperatura = 'desconhecida';
let umidade = 'desconhecida';

// Registrar a função de escuta para o tópico de temperatura
onMessage(TOPICO_TEMPERATURA, (message) => {
    temperatura = message.toString();
    console.log(`Temperatura atual: ${temperatura}`);
})

// Registrar a função de escuta para o tópico de umidade
onMessage(TOPICO_UMIDADE, (message) => {
    umidade = message.toString();
    console.log(`Umidade atual: ${umidade}`);
})

class rotaSensor {
    static lerStatus(req, res) {
        try {
            res.status(200).json({
                temperatura,
                umidade
            });
            console.log('Status do sensor enviado:', { temperatura, umidade });
        } catch (error) {
            console.error('Erro ao ler status do sensor:', error);
            res.status(500).json({ message: 'Erro interno ao obter o status do sensor' });
        }
    }
}

export default rotaSensor;