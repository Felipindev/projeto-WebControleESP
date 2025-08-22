import React, { useState, useEffect } from 'react';
import { FaWater } from 'react-icons/fa';
import { enderecoServidor } from '../../utils';

export default function BoiaStatus() {
    const [statusBoia, setStatusBoia] = useState('...'); // Estado para armazenar o status da bóia

    const buscarStatus = async () => {
        try {
            const resposta = await fetch(`${enderecoServidor}/api/statusBoia`);
            const dados = await resposta.json();
            if (!resposta.ok) {
                throw new Error('Erro ao buscar status da bóia');
            }
            setStatusBoia(dados.statusBoia);
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    useEffect(()=> {
            buscarStatus();
            const intervalo = setInterval(buscarStatus, 4000);
            return () => clearInterval(intervalo);
    })

    return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-cyan-200 to-indigo-200">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
            <div className="flex flex-col items-center mb-8">
                <FaWater className={`text-5xl mb-2 ${statusBoia === 'ALTO' ? 'text-blue-700 animate-bounce' : 'text-blue-400 animate-pulse'}`} />
                <h1 className="text-2xl font-extrabold text-gray-800 mb-2 tracking-wide drop-shadow">Nível da Água</h1>
                <p className="text-gray-500 text-center">Acompanhe o status da bóia em tempo real.</p>
            </div>
            {/* desenho do tanque de agua */}
            <div className="relative h-48 w-32 mx-auto border-2 border-blue-300 rounded-xl bg-blue-50 shadow-inner">
                <div className={`absolute bottom-0 w-full rounded-b-xl transition-all duration-700 ${
                    statusBoia === "ALTO" ? "h-full rounded-2xl bg-blue-500" : "h-1/3 rounded-2xl bg-blue-300"
                }`}></div>
            </div>
            <div className="text-center mt-6">
                <span className="font-semibold text-lg">Status: </span>
                {statusBoia === "ALTO" ? (
                    <span className="text-red-600 font-bold animate-pulse text-xl">ALTO</span>
                ) : (
                    <span className="text-blue-600 font-bold animate-pulse text-xl">BAIXO</span>
                )}
            </div>
        </div>
    </div>
    )
}