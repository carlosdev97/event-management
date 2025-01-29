import { CardEvent } from "../../components/CardEvent/CardEvent";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../services/api";

export const UserEvents = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserEvents = async () => {
      if (!user) return;

      try {
        setLoading(true);
        setError(null);

        const response = await api.get(
          `http://localhost:5000/api/events/${user.id}`
        );

        const data = await response.data.events;
        setEvents(data); // Guardar los eventos en el estado
      } catch (err) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false); // Finalizar la carga
      }
    };

    getUserEvents();
  }, [user]); // Se ejecuta cuando `user` cambia

  // Renderizar diferentes estados
  if (loading) {
    return <div>Cargando eventos...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container my-4 d-flex justify-content-around flex-wrap align-items-center">
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
