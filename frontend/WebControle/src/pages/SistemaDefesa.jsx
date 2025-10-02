import React, { useState, useEffect } from "react";
import { enderecoServidor } from "../../utils";

export default function SistemaDefesa() {
  const [statusSensor, setStatusSensor] = useState({});

  const buscarStatus = async () => {
    try {
      const resposta = await fetch(`${enderecoServidor}/api/sistemaDefesa`);
      const dados = await resposta.json();
      if (!resposta.ok) {
        throw new Error("Erro ao buscar status do sensor de chuva");
      }
      setStatusSensor(dados);
      console.log("Status do sensor:", dados.sistemaDefesa);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  useEffect(() => {
    buscarStatus();
    const intervalo = setInterval(buscarStatus, 4000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-200 via-cyan-100 to-indigo-100">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <span className="inline-block text-5xl mb-2 text-blue-400 animate-bounce">
            🛡️
          </span>
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2 tracking-wide drop-shadow">
            Sistema de Defesa
          </h1>
          <p className="text-gray-500 text-center text-lg">
            Monitoramento ativo contra enchentes.
            <br />
            Acompanhe o status em tempo real.
          </p>
        </div>
        {statusSensor.sistemaDefesa ? (
          <div className="mt-6 flex flex-col items-center gap-4">
            <span className="font-semibold text-lg">Status Atual:</span>
            <span className="bg-blue-100 rounded-full px-6 py-2 text-blue-700 font-bold text-xl shadow animate-pulse">
              {statusSensor.sistemaDefesa}
            </span>
            {/* Barra de proteção animada */}
            <div className="w-full flex flex-col items-center mt-4">
              <span className="text-sm text-gray-500 mb-1">Nível de proteção:</span>
              <div className="w-48 h-4 bg-blue-200 rounded-full overflow-hidden shadow-inner">
                <div className={`h-4 rounded-full bg-green-400 animate-pulse transition-all duration-700`} style={{width: statusSensor.sistemaDefesa === 'Alerta' ? '100%' : '40%'}}></div>
              </div>
            </div>
            {/* Mensagem motivacional */}
            <div className="mt-4 text-center">
              <span className="inline-block text-lg text-indigo-600 font-semibold">{statusSensor.sistemaDefesa === 'Alerta' ? 'Tudo sob controle! Seu sistema está protegendo a cidade.' : 'Atenção! O sistema está em modo de espera.'}</span>
            </div>
          </div>
        ) : (
          <span className="text-gray-400 font-bold animate-pulse text-xl ml-2">
            Carregando status do sistema de defesa...
          </span>
        )}

        <div className="mt-10 flex justify-center">
          <a
            href="https://wokwi.com/projects/443718793007296513"
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
