import { onMessage, SISTEMA_DEFESA } from "../services/mqttClient.js";

let sistemaDefesa = '';

onMessage(SISTEMA_DEFESA, (mensagem) => {
    sistemaDefesa = mensagem;
    console.log('Status do sistema de defesa atualizado:', sistemaDefesa);
})

class rotaSistemaDefesa {
    static lerSistemaDefesa(req, res){
        try {
            console.log(`sistema defesa: ${sistemaDefesa}`);
            res.status(200).json({
                sistemaDefesa: sistemaDefesa,
            });
            console.log('Status enviado:', {sistemaDefesa});
        } catch (error) {
            console.error('Erro ao ler status do sistema de defesa:', error);
            res.status(500).json({ message: 'Erro interno ao obter o status do sistema de defesa' });
        }
    }
}

export default rotaSistemaDefesa;