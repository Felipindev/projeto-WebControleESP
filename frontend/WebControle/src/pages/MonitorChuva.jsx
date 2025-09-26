import React, { useState, useEffect } from 'react';
import { enderecoServidor } from '../../utils';
import { CloudRain, Cloud, Droplets, Sun } from 'lucide-react';

export default function MonitorChuva() {
    const [statusSensor, setStatusSensor] = useState({});

    const buscarStatus = async () => {
        try {
            const resposta = await fetch(`${enderecoServidor}/api/monitorChuva`);
            const dados = await resposta.json();
            if (!resposta.ok) {
                throw new Error('Erro ao buscar status do sensor de chuva');
            }
            setStatusSensor(dados);
            console.log('Status do sensor:', dados.monitorChuva);
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    useEffect(() => {
        buscarStatus();
        const intervalo = setInterval(buscarStatus, 4000);
        return () => clearInterval(intervalo);
    }, []);

    // Ícone dinâmico para o status
    const renderIcon = () => {
        const condicao = statusSensor.monitorChuva || "";
        if (condicao.includes("Forte")) return <CloudRain className="w-12 h-12 text-blue-800 animate-bounce" />;
        if (condicao.includes("Fraca")) return <Droplets className="w-12 h-12 text-cyan-600 animate-pulse" />;
        if (condicao.includes("Garoa")) return <Cloud className="w-12 h-12 text-gray-500 animate-pulse" />;
        if (condicao.includes("Seco")) return <Sun className="w-12 h-12 text-yellow-500 animate-spin-slow" />;
        return <Cloud className="w-12 h-12 text-gray-400" />;
    };

    return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-100 via-orange-100 to-red-200 font-sans">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 border border-orange-200">
                
                {/* Cabeçalho */}
                <div className="flex flex-col items-center mb-8">
                    {renderIcon()}
                    <h1 className="text-3xl font-extrabold text-orange-700 mb-2 tracking-wide drop-shadow">
                        Monitor do Tempo
                    </h1>
                    <p className="text-gray-600 text-center text-base italic">
                        Veja em tempo real a condição do clima detectada pelo sensor.
                    </p>
                </div>

                {/* Status */}
                <div className="text-center mt-6">
                    <div className="mt-4 space-y-4 p-3 rounded-xl bg-orange-50 shadow-inner">
                        <div className="mb-4">
                            <span className="font-bold font-mono">Condição do Tempo:</span>
                            {statusSensor.monitorChuva ? (
                                <span className="bg-orange-200 rounded-full px-6 py-2 text-orange-800 font-extrabold text-xl shadow ml-2">
                                    {statusSensor.monitorChuva}
                                </span>
                            ) : (
                                <span className="text-red-600 font-bold animate-pulse text-xl ml-2">
                                    indisponível...
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Botão */}
                <div className="mt-10 flex justify-center">
                    <a
                        href="https://wokwi.com/projects/441276472167031809"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg shadow-lg hover:scale-105 transform transition duration-300 hover:shadow-2xl"
                    >
                        🌐 Ver Simulação no Wokwi
                    </a>
                </div>
            </div>
        </div>
    );
}
