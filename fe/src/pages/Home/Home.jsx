import { useEffect, useState } from "react";
import { CardEvent } from "../../components/CardEvent/CardEvent";
import { FilterEvents } from "../../components/FilterEvents/FilterEvents";
import api from "../../services/api";

export const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await api.get("http://localhost:5000/api/events/all");
        setEvents(response.data.events);
      } catch (error) {
        console.error(error);
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
      <FilterEvents onFilter={handleFilter} />
      {events ? (
        events.map((event) => (
          <CardEvent key={event._id} event={event} showActions={false} />
        ))
      ) : (
        <p>No hay eventos disponibles</p>
      )}
    </div>
  );
};
