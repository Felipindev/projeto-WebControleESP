import { FaPowerOff, FaLightbulb } from "react-icons/fa";
import React, {useEffect, useState} from "react";
import { enderecoServidor } from "../../utils";

export default function TelaLED() {
    const [statusLed, setStatusLed] = useState('desconhecido');

    const buscarStatus = async () => {
        try {
            const resposta = await fetch(`${enderecoServidor}/api/status`);
            const dados = await resposta.json();
            setStatusLed(dados.status);
        } catch (error) {
            console.log('Erro ao buscar status do LED:', error);
        }
    }

    const enviarComando = async (comando) => {
        try {
            const resposta = await fetch(`${enderecoServidor}/api/comando`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comando }),
            });
            const dados = await resposta.json();
            console.log(dados.message);
            buscarStatus();
        } catch (error) {
            console.error('Erro ao enviar comando:', error);
        }
    }

    useEffect(()=> {
        buscarStatus();
        const intervalo = setInterval(buscarStatus, 5000);
        return () => clearInterval(intervalo);
    })
    return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-red-200 to-pink-100">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 border border-gray-200">
                <div className="flex flex-col items-center mb-8">
                    <FaLightbulb className="text-yellow-400 text-5xl mb-2 animate-pulse" />
                    <h1 className="text-3xl font-extrabold text-gray-800 mb-2 tracking-wide">Controle de LED</h1>
                    <p className="text-gray-500 text-center">Gerencie o status do seu LED de forma simples e rápida.</p>
                </div>
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-700 text-center mb-2">STATUS:</h2>
                    <div className="flex justify-center items-center gap-2">
                        {statusLed === 'ligado' ? <span className="inline-block w-3 h-3 rounded-full bg-green-400 animate-pulse"></span> : <span className="inline-block w-3 h-3 rounded-full bg-red-400 animate-pulse"></span>}
                        {statusLed === 'ligado' ? <span className="text-green-600 font-bold">{statusLed}</span> : <span className="text-red-600 font-bold">{statusLed}</span>}
                        
                    </div>
                </div>
                <div className="flex gap-6 justify-center">
                    <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-300 hover:scale-105 ">
                        <FaPowerOff className="text-lg"
                        onClick={() => enviarComando('LIGADO')}
                        />
                        Ligar
                    </button>
                    <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300 hover:scale-105">
                        <FaPowerOff className="text-lg rotate-180" 
                        onClick={() => enviarComando('DESLIGADO')}
                        />
                        Desligar
                    </button>
                </div>
            </div>
        </div>
    )
}