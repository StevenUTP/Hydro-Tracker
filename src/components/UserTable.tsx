import { Usuario as UsuarioType } from "../Usuario";
import { useState } from "react";
import React from "react";

interface UserTableProps {
    usuarios: UsuarioType[];
    setUsuarios: React.Dispatch<React.SetStateAction<UsuarioType[]>>;
    setUsuario: React.Dispatch<React.SetStateAction<UsuarioType>>;
    eliminarUsuario: (id: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ usuarios, setUsuarios, setUsuario, eliminarUsuario }) => {
    const [mlTomados, setMlTomados] = useState(0);

    const handleAddMl = (usuario: UsuarioType, ml: number) => {
        const updatedUsuarios = usuarios.map((u) => 
            u.id === usuario.id ? { ...u, LitrosTomados: u.LitrosTomados + ml / 1000 } : u
        );
        setUsuarios(updatedUsuarios); // Actualiza el estado de los usuarios
        setUsuario({} as UsuarioType); // Clear the form
        setMlTomados(0); // Reset mlTomados
    };

    return (
        <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
            {usuarios && usuarios.length ? (
                <>
                    <h2 className="font-black text-3xl text-center">Listado Usuarios</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Administra tus{" "}
                        <span className="text-indigo-600 font-bold ">
                            Usuarios y sus metas
                        </span>
                    </p>

                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2">Nombre</th>
                                <th className="py-2">Meta Diaria (Litros)</th>
                                <th className="py-2">Litros Tomados</th>
                                <th className="py-2">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario) => (
                                <tr key={usuario.id}>
                                    <td className="border px-4 py-2">{usuario.Nombre}</td>
                                    <td className="border px-4 py-2">{usuario.MetaDiaria}</td>
                                    <td className="border px-4 py-2">
                                        {usuario.LitrosTomados}
                                        <div className="flex items-center mt-2">
                                            <input
                                                type="number"
                                                className="border-2 p-1 rounded-md mr-2"
                                                value={mlTomados}
                                                onChange={(e) => setMlTomados(Number(e.target.value))}
                                                placeholder="ml"
                                            />
                                            <button
                                                className="bg-green-500 text-white px-2 py-1 rounded"
                                                onClick={() => handleAddMl(usuario, mlTomados)}
                                            >
                                                Agregar ml
                                            </button>
                                        </div>
                                    </td>
                                    <td className="border px-4 py-2">
                                        <button
                                            className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                            onClick={() => setUsuario(usuario)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                            onClick={() => eliminarUsuario(usuario.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <>
                    <h2 className="font-black text-3xl text-center">No hay usuarios</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Agrega tus usuarios{" "}
                        <span className="text-indigo-600 font-bold ">
                            y aparecerán aquí
                        </span>
                    </p>
                </>
            )}
        </div>
    );
};

export default UserTable;