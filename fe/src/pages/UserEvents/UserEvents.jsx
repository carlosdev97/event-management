import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { CardEvent } from "../../components/CardEvent/CardEvent";
import { TbPlus } from "react-icons/tb";
import { toast } from "react-hot-toast";

export const UserEvents = () => {
  const { user, logout } = useAuth(); // Asegúrate de que tu AuthContext tenga una función logout
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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
        setEvents(data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Token expirado
          setError(
            "Tu sesión ha expirado. Por favor, inicia sesión nuevamente."
          );
          logout(); // Limpia el estado de autenticación
          toast.error(
            "Tu sesión ha expirado. Por favor, inicia sesión nuevamente."
          );
          navigate("/login"); // Redirige al componente de login
        } else {
          console.log(error);
          setError("Ocurrió un error al cargar los eventos.");
        }
      } finally {
        setLoading(false);
      }
    };

    getUserEvents();
  }, [user, navigate, logout]);

  return (
    <div className="container min-vh-100 my-4 d-flex justify-content-around flex-wrap">
      {loading ? (
        <div className="d-flex min-vh-100 justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
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
        </>
      )}
    </div>
  );
};
