import "./CardEvent.css";
import { TbCalendar, TbClock, TbBuildings, TbMapPin } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-hot-toast";

export const CardEvent = ({ event, showActions }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await api.delete(
        `https://event-management-api-0kcl.onrender.com/api/events/${event._id}`
      );
      toast.success("¡Evento eliminado correctamente!");
      navigate("/user-events");
    } catch (error) {
      toast.error("¡Error al eliminar el evento!");
      console.error("Error eliminando el evento:", error);
    }
  };

  // Función para convertir la fecha a formato deseado

  function formatDate(date) {
    // Dividir la fecha en añ, mes y día

    const [year, month, day] = date.split("-");

    // Convertir el mes a nombre

    const months = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];

    const monthName = months[parseInt(month, 10) - 1];

    // Retornar la fecha en formato deseado

    return `${day} de ${monthName} de ${year}`;
  }

  // Función para convertir la hora a formato de 12 horas

  function convertTime(hour24) {
    // Dividir la hora y los minutos
    const [hour, minutes] = hour24.split(":");

    // Convertir la hora a número
    let hour12 = parseInt(hour, 10);

    // Determinar si es a.m. o p.m.
    const period = hour12 >= 12 ? "p.m." : "a.m.";

    // Convertir a formato de 12 horas
    if (hour12 > 12) {
      hour12 -= 12;
    } else if (hour12 === 0) {
      hour12 = 12; // Medianoche es 12 a.m.
    }

    // Retornar la hora en formato de 12 horas con a.m. o p.m.
    return `${hour12}:${minutes} ${period}`;
  }

  return (
    <div className="px-2 my-2 col-lg-4 col-md-6 col-sm-12">
      <div className="card p-0">
        <img src={event.image} className="card-img-top col" alt="..." />
        <div className="card-body">
          <h5 className="card-title text-truncate">{event.title}</h5>
          <div className="mb-3 d-flex flex-column gap-1">
            <span className="d-flex justify-content-start align-items-center gap-2">
              <TbCalendar className="fs-5" /> {formatDate(event.date)}
            </span>
            <span className="d-flex justify-content-start align-items-center gap-2">
              <TbClock className="fs-5" /> {convertTime(event.time)}
            </span>
            <span className="d-flex justify-content-start align-items-center gap-2">
              <TbBuildings className="fs-5" /> {event.location.place}
            </span>
            <span className="d-flex justify-content-start align-items-center gap-2">
              <TbMapPin className="fs-5" />
              {event.location.city}
            </span>
          </div>
          {showActions ? (
            <div className="col d-flex gap-2">
              <button
                className="btn btn-success"
                onClick={() => {
                  console.log(event);
                  navigate(`/user-events/edit/${event._id}`, { state: event });
                }}
              >
                Editar
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Eliminar
              </button>
            </div>
          ) : (
            <a href="#" className="btn btn-primary">
              Ver más
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
