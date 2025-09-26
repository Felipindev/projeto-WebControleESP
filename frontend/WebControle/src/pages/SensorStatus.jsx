import React, { useState, useEffect } from 'react';
import { enderecoServidor } from '../../utils';

export default function SensorStatus() {
    const [statusSensor, setStatusSensor] = useState({}); // Estado para armazenar o status do sensor

    const buscarStatus = async () => {
        try {
            const resposta = await fetch(`${enderecoServidor}/api/statusSensor`);
            const dados = await resposta.json();
            if (!resposta.ok) {
                throw new Error('Erro ao buscar status do sensor');
            }
            setStatusSensor(dados);
            console.log(dados);
            
        } catch (error) {
            console.error('Erro:', error);
            console.log(statusSensor);
            
        }
    }

    useEffect(() => {
        buscarStatus();
        const intervalo = setInterval(buscarStatus, 4000);
        return () => clearInterval(intervalo);
    }, []);

    return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-200 via-blue-100 to-indigo-100">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
                <div className="flex flex-col items-center mb-8">
                    <span className="inline-block text-5xl mb-2 text-blue-400 animate-pulse">🌡️</span>
                    <h1 className="text-2xl font-extrabold text-gray-800 mb-2 tracking-wide drop-shadow">Temperatura & Umidade</h1>
                    <p className="text-gray-500 text-center text-lg">Analise as métricas do sensor em tempo real.</p>
                </div>
                <div className="text-center mt-8">
                    <span className="font-semibold text-lg">Status:</span>
                    <div className='mt-4 space-y-4 p-3  rounded-lg bg-gray-50 shadow-inner justify-content-between'>
                        <div className='mb-4'>
                            <span className='font-bold font-mono '>Temperatura:</span>
                            {statusSensor.temperatura ? <span className='bg-blue-100 rounded-full px-6 py-2 text-blue-700 font-bold text-xl shadow animate-pulse'>{statusSensor.temperatura}° C</span> : <span className='text-red-600 font-bold animate-pulse text-xl ml-2'>indisponível...</span>}
                        </div>
                        <div>
                            <span className='font-bold font-mono '>Umidade:</span>
                            {statusSensor.umidade ? <span className='bg-blue-100 rounded-full px-6 py-2 text-blue-700 font-bold text-xl shadow animate-pulse'>{statusSensor.umidade}%</span> : <span className='text-red-600 font-bold animate-pulse text-xl ml-2'>indisponível...</span>}
                        </div>
                    </div>
                {/* 🔘 Botão estilizado para o projeto */}
                <div className="mt-10 flex justify-center">
                    <a
                        href="https://wokwi.com/projects/439918151790671873"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-lg shadow-lg hover:scale-105 transform transition duration-300 hover:shadow-2xl"
                    >
                        🔗 Ver Simulação no Wokwi
                    </a>
                </div>
                </div>
            </div>
        </div>
    )
}