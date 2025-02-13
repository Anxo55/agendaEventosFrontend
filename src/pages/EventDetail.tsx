import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getById } from "../services/events.service";

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState<{
    imageUrl?: string;
    title: string;
    description: string;
    location: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getById(Number(id));
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <p className="text-center text-gray-500">
        Cargando detalles del evento...
      </p>
    );
  }

  if (!event) {
    return <p className="text-center text-gray-500">Evento no encontrado.</p>;
  }

  return (
    <>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        {/* {event.imageUrl && (
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-64 object-cover rounded-t-lg"
          />
        )} */}
        <h2 className="text-3xl font-bold mt-4 text-gray-900">{event.title}</h2>
        <p className="text-gray-700 mt-2">{event.description}</p>
        <p className="text-gray-500 mt-2">📍 {event.location}</p>
        
        <Link to={""} className="mt-3 bg-blue-500 rounded-2xl border-1 m-20 hover:bg-blue-600 font-medium px-3 py-1">Comprar entrada evento</Link>
        {/* <Link to={""} className="mt-3 bg-red-500 rounded-2xl border-1 m-20 hover:bg-red-600 font-medium px-3 py-1">Descartar evento</Link>  */}
        
      </div>

      
        <Link to="/eventsList" className="mt-3 inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">Volver
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h14M5 12l4-4m-4 4 4 4"
          />
        </svg>
        </Link>
    </>
  );
}

export default EventDetail;
