import mqtt from 'mqtt';

//Configurações do broker
const MQTT_BROKER_HOST = '9d19cc700cc44018b16cc529b323fc9d.s1.eu.hivemq.cloud';
const MQTT_BROKER_PORT = 8883;
const MQTT_USERNAME = 'ricardodias';
const MQTT_PASSWORD = 'TesteSenai1';

//tópicos mqtt
const TOPICO_STATUS = 'aulaLed/05/status';
const TOPICO_COMANDO_LED = 'aulaLed/05/estadoLed';
const STATUS_BOIA = "projeto/05/statusBoia"
const TOPICO_TEMPERATURA = 'projeto/05/temperatura';
const TOPICO_UMIDADE = 'projeto/05/umidade';
const SENSOR_SOLO = 'projeto/05/sensorUmidade';
const CONDICAO_SOLO = 'projeto/05/condicaoSolo';
const MONITOR_CHUVA = 'projeto/05/monitorChuva';
const SISTEMA_DEFESA = 'projeto/05/sistemaDefesa';

let mqttClient;
let subscriptions = {};

//conexão
const mqttOptions = {
    port: MQTT_BROKER_PORT,
    username: MQTT_USERNAME,
    password: MQTT_PASSWORD,
    protocol: 'mqtts',
    reconnectPeriod: 1000,
};

function conectarMqtt(){
    console.log('TENTANDO CONECTAR AO BROKER MQTT...');
    mqttClient = mqtt.connect(`mqtts://${MQTT_BROKER_HOST}`, mqttOptions)

    mqttClient.on('connect', () => {
        console.log('CONECTADO COM SUCESSO');
        mqttClient.subscribe(TOPICO_STATUS, (err) => {
            if (!err){
                console.log(`INSCRITO NO TÓPICO: ${TOPICO_STATUS}`);
            }
            
        })
        mqttClient.subscribe(TOPICO_COMANDO_LED, (err) => {
            if (!err){
                console.log(`INSCRITO NO TÓPICO: ${TOPICO_COMANDO_LED}`);
            }

        })
        mqttClient.subscribe(STATUS_BOIA, (err) => {
            if (!err){
                console.log(`INSCRITO NO TÓPICO: ${STATUS_BOIA}`);
            }

        })
        mqttClient.subscribe(TOPICO_TEMPERATURA, (err) => {
            if (!err){
                console.log(`INSCRITO NO TÓPICO: ${TOPICO_TEMPERATURA}`);
            }

        })
        mqttClient.subscribe(TOPICO_UMIDADE, (err) => {
            if (!err){
                console.log(`INSCRITO NO TÓPICO: ${TOPICO_UMIDADE}`);
            }

        })
        mqttClient.subscribe(CONDICAO_SOLO, (err) => {
            if (!err){
                console.log(`INSCRITO NO TÓPICO: ${CONDICAO_SOLO}`);
            }

        })
        mqttClient.subscribe(SENSOR_SOLO, (err) => {
            if (!err){
                console.log(`INSCRITO NO TÓPICO: ${SENSOR_SOLO}`);
            }

        })
        mqttClient.subscribe(MONITOR_CHUVA, (err) => {
            if (!err){
                console.log(`INSCRITO NO TÓPICO: ${MONITOR_CHUVA}`);
            }

        })
        mqttClient.subscribe(SISTEMA_DEFESA, (err) => {
            if (!err){
                console.log(`INSCRITO NO TÓPICO: ${SISTEMA_DEFESA}`);
            }
        })

    })
    mqttClient.on('message', (topic, message)=> {
        // Verifica se existe um tópico na lista de assinaturas
        if (subscriptions[topic]) {
            // Chama a função de callback associada ao tópico
            subscriptions[topic](message.toString());
        } 
    })

    mqttClient.on('error', (error) => console.error('Erro de conexão:', error));
    mqttClient.on('close', () => console.error('Conexão MQTT fechada'));
    
}

//registrar uma função de callback para um tópico específico
function onMessage(topic, callback){
    subscriptions[topic] = callback;
}

//função para publicar mensagens
function publicar(topic, message){
    if (mqttClient && mqttClient.connected) {
        mqttClient.publish(topic, message, {retain: true});
        console.log(`Mensagem publicada no tópico ${topic}: ${message}`);
    }
    else {
        console.error('Erro: Cliente MQTT não está conectado.');
    }
}

conectarMqtt();
// Exporta as funções e constantes necessárias
export {onMessage, publicar, TOPICO_STATUS, TOPICO_COMANDO_LED, STATUS_BOIA, TOPICO_TEMPERATURA, TOPICO_UMIDADE, CONDICAO_SOLO, SENSOR_SOLO, MONITOR_CHUVA, SISTEMA_DEFESA};