// src/App.tsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Head from "./components/Head";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import { Usuario as UsuarioType } from "./Usuario";

const App: React.FC = () => {
  const [usuarios, setUsuarios] = useState<UsuarioType[]>([]);
  const [usuario, setUsuario] = useState<UsuarioType>({} as UsuarioType);

  useEffect(() => {
    const obtenerLS = () => {
      const usuariosLS = JSON.parse(localStorage.getItem("usuarios") || "[]");
      setUsuarios(usuariosLS);
    };
    obtenerLS();
  }, []);

  useEffect(() => {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }, [usuarios]);

  const eliminarUsuario = (id: string) => {
    const usuariosActualizados = usuarios.filter(
      (usuario) => usuario.id !== id
    );
    setUsuarios(usuariosActualizados);
  };

  return (
    <Router>
      <div className="container mx-auto mt-20">
        <Head />
        <div className="mt-12 md:flex">
          <Routes>
            <Route path="/" element={<UserForm usuarios={usuarios} setUsuarios={setUsuarios} usuario={usuario} setUsuario={setUsuario} />} />
            <Route path="/users" element={<UserTable usuarios={usuarios} setUsuarios={setUsuarios} setUsuario={setUsuario} eliminarUsuario={eliminarUsuario} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;