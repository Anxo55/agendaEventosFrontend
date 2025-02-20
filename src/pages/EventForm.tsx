import { useState } from "react";
import { createEvent } from "../services/events.service";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function EventForm() {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    location: "",
    imageUrl: "",
    date: ""
  });
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createEvent({
        ...event,
        imageUrl: event.imageUrl || "", // 👈 Si `imageUrl` es vacío, enviamos una cadena vacía en lugar de `undefined`
        date: new Date(event.date).toISOString() // 👈 Convertimos `date` en un formato compatible
    })
      toast.success("Evento creado con éxito");
      navigate("/eventsList");
    } catch (error) {
      console.error("Error al crear el evento:", error);
      toast.error("Error al crear el evento");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4  rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
        Crear Nuevo Evento
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Título"
          onChange={handleChange}
          className="w-full p-2 border rounded-2xl text-white placeholder:text-white"
          required
        />
        <textarea
          name="description"
          placeholder="Descripción"
          onChange={handleChange}
          className="w-full p-2 border rounded-2xl text-white placeholder:text-white"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Ubicación"
          onChange={handleChange}
          className="w-full p-2 border rounded-2xl text-white placeholder:text-white"
          required
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="URL de la Imagen"
          onChange={handleChange}
          className="w-full p-2 border rounded-2xl text-white placeholder:text-white"
        />
        <input
        type="datetime-local"
        name="date"
        onChange={handleChange}
        className="w-full p-2 border rounded-2xl text-white placeholder:text-white"
        required
    />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-2xl border-2 hover:bg-green-700"
        >
          Crear Evento
        </button>
      </form>
      <Link to="/eventsList"
      className="text-2xl bg-blue-600 hover:bg-blue-700 rounded-2xl border-2 border-white text-white m-4  grid place-items-center"
      >Volver</Link>
    </div>
  );
}
