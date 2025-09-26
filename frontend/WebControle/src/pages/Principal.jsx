import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { FaWifi } from "react-icons/fa";
import { IoIosWater } from "react-icons/io";
import { MdMenu, MdClose } from "react-icons/md";
import TelaLED from "./TelaLED";
import BoiaStatus from "./BoiaStatus";
import SensorStatus from "./SensorStatus"; // Importando o novo componente SensorStatus
import SensorSolo from "./SensorSolo";
import MonitorChuva from "./MonitorChuva";


export default function Principal() {
  const [menuAberto, setMenuAberto] = useState(false);
  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar Responsivo */}
      <div className={`fixed z-30 inset-y-0 left-0 transform md:relative md:translate-x-0 w-64 bg-gray-900 text-white p-4 transition-transform duration-300 ease-in-out
            ${menuAberto ? "translate-x-0" : "-translate-x-full"} `}>
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-bold">Menu</span>
          <button onClick={() => setMenuAberto(!menuAberto)} className="md:hidden">
            <MdClose className="w-5 h-5" />
          </button>
        </div>
        <nav className="space-y-4">
          <Link to="/TelaLED"
            className="flex items-center gap-4 hover:bg-gray-700 p-2 rounded"
            onClick={() => setMenuAberto(false)}>
            <FaWifi />
            <span>Tela LED</span>
          </Link> 
          <Link to="/BoiaStatus"
            className="flex items-center gap-4 hover:bg-gray-700 p-2 rounded"
            onClick={() => setMenuAberto(false)}>
            <IoIosWater />
            <span>Status Boia</span>
          </Link> 
          <Link to="/SensorStatus"
            className="flex items-center gap-4 hover:bg-gray-700 p-2 rounded"
            onClick={() => setMenuAberto(false)}>
            <IoIosWater />
            <span>Tela Temp e Umid</span>
          </Link> 
          <Link to="/SensorSolo"
            className="flex items-center gap-4 hover:bg-gray-700 p-2 rounded"
            onClick={() => setMenuAberto(false)}>
            <IoIosWater />
            <span>Sensor Solo</span>
          </Link> 
          <Link to="/MonitorChuva"
            className="flex items-center gap-4 hover:bg-gray-700 p-2 rounded"
            onClick={() => setMenuAberto(false)}>
            <IoIosWater />
            <span>Monitor Chuva</span>
          </Link> 
        </nav>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 p-6 bg-gray-100 text-black w-full overflow-auto">
        <button onClick={() => setMenuAberto(!menuAberto)} className="md:hidden mb-4 text-gray-900">
          <MdMenu className="w-6 h-6" />
        </button>
        <Routes>
          <Route path="/" element={<h1 className="text-2xl font-bold">Bem-vindo ao Painel de Controle</h1>} />
          <Route path="/TelaLED" element={<TelaLED />} />
          <Route path="/BoiaStatus" element={<BoiaStatus />} />
          <Route path="/SensorStatus" element={<SensorStatus />} />
          <Route path="/SensorSolo" element={<SensorSolo />} />
          <Route path="/MonitorChuva" element={<MonitorChuva />} />
        </Routes>
      </div>
    </div>
  );
}
