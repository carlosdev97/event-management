import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { CardEvent } from "../../components/CardEvent/CardEvent";
import { TbPlus } from "react-icons/tb";

export const UserEvents = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserEvents = async () => {
      if (!user) return;

      try {
        setLoading(true);

        const response = await api.get(
          `http://localhost:5000/api/events/${user.id}`
        );

        const data = await response.data.events;
        setEvents(data);
      } catch (err) {
        console.error("Error al obtener eventos del usuario:", err);
      } finally {
        setLoading(false);
      }
    };

    getUserEvents();
  }, [user]);

  return (
    <div className="container my-4 d-flex justify-content-around flex-wrap align-items-center">
      <Link
        className="nav-link active col"
        aria-current="page"
        to="/user-events/add"
      >
        <button
          type="button"
          className="btn btn-success col-12 mb-4 d-flex align-items-center justify-content-center gap-2"
        >
          <TbPlus />
          Agregar evento
        </button>
      </Link>
      {events ? (
        events.map((event) => (
          <CardEvent key={event._id} event={event} showActions={true} />
        ))
      ) : (
        <p>No hay eventos disponibles</p>
      )}
    </div>
  );
};
