
import { useEffect, useState } from "react";
import Error from "./Erro";
import { Usuario as UsuarioType } from "../Usuario";

interface UserFormProps {
    usuarios: UsuarioType[];
    setUsuarios: React.Dispatch<React.SetStateAction<UsuarioType[]>>;
    usuario: UsuarioType;
    setUsuario: React.Dispatch<React.SetStateAction<UsuarioType>>;
}

const UserForm: React.FC<UserFormProps> = ({ usuarios, setUsuarios, usuario, setUsuario }) => {
    const [nombre, setNombre] = useState("");
    const [metaDiaria, setMetaDiaria] = useState(0);
    const [litrosTomados, setLitrosTomados] = useState(0);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (Object.keys(usuario).length > 0) {
            setNombre(usuario.Nombre);
            setMetaDiaria(usuario.MetaDiaria);
            setLitrosTomados(usuario.LitrosTomados);
        }
    }, [usuario]);

    const generarId = () => {
        const random = Math.random().toString(36).substr(2);
        const fecha = Date.now().toString(36);
        return fecha + random;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if ([nombre, metaDiaria, litrosTomados].includes("")) {
            console.log("Hay campos vacios");
            setError(true);
            return;
        }
        setError(false);

        const objetoUsuario: UsuarioType = {
            id: usuario.id || "",
            Nombre: nombre,
            MetaDiaria: metaDiaria,
            LitrosTomados: litrosTomados,
            LitrosTotales: (usuario.LitrosTotales || 0) + litrosTomados,
        };

        if (usuario.id) {
            // editar
            objetoUsuario.id = usuario.id;
            const usuariosActualizados = usuarios.map((usuarioState) =>
                usuarioState.id === usuario.id ? objetoUsuario : usuarioState
            );
            setUsuarios(usuariosActualizados);
            setUsuario({} as UsuarioType);
        } else {
            objetoUsuario.id = generarId();
            setUsuarios([...usuarios, objetoUsuario]);
        }

        //reiniciar form
        setNombre("");
        setMetaDiaria(0);
        setLitrosTomados(0);
    };

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Formulario</h2>

            <p className="text-lg mt-5 text-center mb-10">
                Añade usuarios y{" "}
                <span className="text-indigo-600 font-bold ">Adminístralos</span>
            </p>

            <form
                onSubmit={handleSubmit}
                action=""
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
            >
                {error && <Error mensaje="Todos los campos son obligatorios" />}

                <div className="mb-5">
                    <label
                        htmlFor="nombre"
                        className="block text-gray-700 uppercase font-bold"
                    >
                        Nombre
                    </label>

                    <input
                        id="nombre"
                        type="text"
                        placeholder="Nombre del usuario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={(e) => {
                            setNombre(e.target.value);
                        }}
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="metaDiaria"
                        className="block text-gray-700 uppercase font-bold"
                    >
                        Meta Diaria (Litros)
                    </label>

                    <input
                        id="metaDiaria"
                        type="number"
                        placeholder="Meta diaria en litros"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={metaDiaria}
                        onChange={(e) => {
                            setMetaDiaria(Number(e.target.value));
                        }}
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="litrosTomados"
                        className="block text-gray-700 uppercase font-bold"
                    >
                        Litros Tomados
                    </label>

                    <input
                        id="litrosTomados"
                        type="number"
                        placeholder="Litros tomados"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={litrosTomados}
                        onChange={(e) => {
                            setLitrosTomados(Number(e.target.value));
                        }}
                    />
                </div>

                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
                    value={usuario.id ? "Guardar Cambios" : "Agregar Usuario"}
                />
            </form>
        </div>
    );
};

export default UserForm;