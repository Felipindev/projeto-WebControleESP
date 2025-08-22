import { onMessage, publicar, TOPICO_COMANDO_LED, TOPICO_STATUS } from "../services/mqttClient.js";

let ultimoStatus = 'desconhecido';
let ultimoEstadoLed = 'desconhecido';

//registrar a funcao de escuta para o topico de status
onMessage(TOPICO_STATUS, (message) => {
    ultimoStatus = message.toString();
    console.log(`Mensagem recebida no ${TOPICO_STATUS}: ${ultimoStatus}`);
})

onMessage(TOPICO_COMANDO_LED, (message) => {
    ultimoEstadoLed = message.toString();
    console.log(`Mensagem recebida no ${TOPICO_COMANDO_LED}: ${ultimoEstadoLed}`);
})

// Classe rotaLed para lidar com as requisições relacionadas ao LED
class rotaLed{
    static lerStatus(req, res) {
        try {
            console.log(`Status: ${ultimoStatus}`);
            res.status(200).json({
                status: ultimoStatus,
                estadoLed: ultimoEstadoLed
            });
        } catch (error) {
            console.error('Erro ao obter Status:', error);
            res.status(500).json({ message: 'Erro ao obter Status' });   
        }
    }

    static enviaComando(req, res) {
        const comando = req.body.comando

        try {
            if (!comando) {
                return res.status(400).json({ message: 'Comando não fornecido' });
            }
            //publicar o topico assinado
            publicar(TOPICO_STATUS, comando);
            const estadoLed = comando === 'LIGADO' ? '1' : '0';
            publicar(TOPICO_COMANDO_LED, estadoLed);
            res.status(200).json({ message: `Comando ${comando} enviado: com sucesso!` });
        } catch (error) {
            console.error('Erro ao enviar comando:', error);
            res.status(500).json({ message: 'Erro ao enviar comando' });
        }
    }
}

export default rotaLed;     