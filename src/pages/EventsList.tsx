import { useState, useEffect } from "react";
import { deleteEvent, getAll } from "../services/events.service";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAll(); 
        setEvents(data); 
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchEvents();
  }, []);  

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este evento?")) {
      try {
        await deleteEvent(id);
        setEvents(events.filter(event => event.id !== id));
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
      
      {loading ? (
        <p className="text-center text-gray-500">Cargando eventos...</p>
      ) : events.length === 0 ? (
        <p className="text-center text-gray-500">No hay eventos disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">  
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
            >
              {event.imageUrl && (
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}

              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {event.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {event.description}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  📍 {event.location}
                </p>
                <button
                  onClick={() => handleViewEvent(event.id)}
                  className="mt-3 inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Comprar Entrada
                  <svg
                    className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </button>
                <button
                onClick={() => handleDelete(event.id)}
                  className="mt-3 inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-500 dark:hover:bg-red-600 cursor-pointer m-10"
                >
                  Descartar evento
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EventsList;
