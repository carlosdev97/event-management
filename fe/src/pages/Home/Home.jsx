import { useEffect, useState } from "react";
import { CardEvent } from "../../components/CardEvent/CardEvent"; // Componente de tarjeta
import { FilterEvents } from "../../components/FilterEvents/FilterEvents"; // Componente para filtrar
import api from "../../services/api"; // Servicio de peticiones al servidor

export const Home = () => {
  // Componente "Home" exportado
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await api.get("http://localhost:5000/api/events/all");
        setEvents(response.data.events);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Finalizar la carga del evento
      }
    };

    getEvents();
  }, []);

  const handleFilter = async (search, city, date) => {
    const queryParams = {};

    if (search.trim()) queryParams.search = search.trim();
    if (city.trim()) queryParams.city = city.trim();
    if (date.trim()) queryParams.date = date.trim();

    const queryString = new URLSearchParams(queryParams).toString();

    try {
      const response = await api.get(
        `http://localhost:5000/api/events/filter?${queryString}`
      );
      setEvents(response.data.events);
    } catch (error) {
      console.error("Error al filtrar eventos:", error);
    }
  };

  return (
    <div className="container my-4 d-flex justify-content-around flex-wrap align-items-center">
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <FilterEvents onFilter={handleFilter} />
          {events && events.length > 0 ? (
            events.map((event) => (
              <CardEvent key={event._id} event={event} showActions={false} />
            ))
          ) : (
            <p>No hay eventos disponibles</p>
          )}
        </>
      )}
    </div>
  );
};
