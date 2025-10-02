export default function TelasWokwi() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-white p-8">
      <div className="bg-white rounded-2xl shadow-lg w-80 p-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Simulação Wokwi
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Clique no botão abaixo para acessar a simulação do projeto Braço Robo
        </p>
        <button
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-full shadow transition-all duration-200"
          onClick={() =>
            window.open(
              "https://wokwi.com/projects/443724980002947073",
              "_blank"
            )
          }
        >
          Acessar Braço Robo
        </button>
      </div>
    </div>
  );
}
