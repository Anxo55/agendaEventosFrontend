import { useState, useEffect } from "react";
import { deleteEvent, getAll } from "../services/events.service";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

interface Event {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  location: string;
}

function EventsList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAll();
        const filteredEvents = data.filter((event: Event) =>
          event.location.toLowerCase().includes(search.toLowerCase())
        );
        setEvents(filteredEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [search]);

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este evento?")) {
      try {
        await deleteEvent(id);
        setEvents(events.filter((event) => event.id !== id));
        toast.success("Evento eliminado con éxito");
      } catch (error) {
        console.error("Error eliminando evento:", error);
        toast.error("Error al eliminar el evento");
      }
    }
  };

  const handleViewEvent = (id: number) => {
    navigate(`/events/${id}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
        Eventos Disponibles
      </h2>
      <div className="flex justify-center border-white mb-4">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Buscar por localidad"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-white placeholder:text-gray-400 border-gray-400 text-2xl p-2 rounded-lg"
        />
      </div>
      <div className="flex justify-end mb-6">
        <Link
          to={"/eventForm"}
          className="text-white text-2xl bg-blue-600 rounded-2xl border-2 hover:bg-blue-700 px-3 py-1"
        >
          Añadir evento
        </Link>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Cargando eventos...</p>
      ) : events.length === 0 ? (
        <p className="text-center text-gray-500">No hay eventos disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              {event.imageUrl && (
                <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover rounded-t-lg" />
              )}
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{event.title}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{event.description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">📍 {event.location}</p>
                <button onClick={() => handleViewEvent(event.id)} className="mt-3 inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800">Comprar Entrada</button>
                <button onClick={() => handleDelete(event.id)} className="mt-3 ml-2 inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700">Descartar evento</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EventsList;
