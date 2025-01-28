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

  return (
    <div className="container my-4 d-flex justify-content-around flex-wrap">
      <FilterEvents />
      {events.map((event) => (
        <CardEvent key={event._id} event={event} />
      ))}
    </div>
  );
};
