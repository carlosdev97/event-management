import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { CardEvent } from "../../components/CardEvent/CardEvent";
import { TbPlus } from "react-icons/tb";
import { toast } from "react-hot-toast";

export const UserEvents = () => {
  const { user, logout } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();

  const handleDeleteEvent = async (id) => {
    try {
      await api.delete(
        `https://event-management-api-0kcl.onrender.com/api/events/${id}`
      );
      toast.success("¡Evento eliminado correctamente!");
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error("¡Error al eliminar el evento!");
      console.error("Error eliminando el evento:", error);
    }
  };

  useEffect(() => {
    const getUserEvents = async () => {
      if (!user) return;

      try {
        setLoading(true);

        const response = await api.get(
          `https://event-management-api-0kcl.onrender.com/api/events/${user.id}`
        );

        const data = await response.data.events;
        setEvents(data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          logout();
          toast.error("La sesión ha caducado");
          navigate("/login");
        } else {
          console.log(error);
        }
      } finally {
        setLoading(false);
      }
    };

    getUserEvents();
  }, [user, navigate, logout, refresh]);

  return (
    <div className="container min-vh-100 my-4">
      {loading ? (
        <div className="d-flex min-vh-100 justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
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
            <div className="container">
              <div className="row">
                {events.map((event) => (
                  <CardEvent
                    key={event._id}
                    event={event}
                    showActions={true}
                    onDelete={() => handleDeleteEvent(event._id)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <p>No hay eventos disponibles</p>
          )}
        </>
      )}
    </div>
  );
};
