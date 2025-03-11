import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAll } from "../services/quejas.service";

interface Queja {
  id: string;
  titulo: string;
  descripcion: string;
}

const ListarQuejas = () => {
  const [quejas, setQuejas] = useState<Queja[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuejas = async () => {
      try {
        const data = await getAll();
        setQuejas(data);
      } catch (error) {
        console.error("Error al obtener las quejas:", error);
      }
    };

    fetchQuejas();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Listado de Quejas</h1>
      <button
        onClick={() => navigate("/nueva-queja")}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Añadir Queja
      </button>

      <ul className="space-y-4">
        <ul>
        {quejas.map((queja) => (
        <li key={queja.id} className="border p-4 rounded-md shadow-md bg-white">
            <h2 className="text-lg font-semibold text-black">
                {queja.titulo}
            </h2>
            <p className="text-gray-700">
                {queja.descripcion }
            </p>
        </li>
    ))}
        </ul>
      </ul>
    </div>
  );
};

export default ListarQuejas;
