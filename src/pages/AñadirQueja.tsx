import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQueja } from "../services/quejas.service";

const AñadirQueja = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await createQueja({ title, description });
            navigate("/quejas"); // Redirige al listado después de añadir la queja
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Añadir Nueva Queja</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-semibold">Título</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border p-2 w-full rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold">Descripción</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border p-2 w-full rounded-md"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                    Guardar Queja
                </button>
            </form>
        </div>
    );
};

export default AñadirQueja;
