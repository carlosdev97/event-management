import "./CardEvent.css";
import { TbCalendar, TbClock, TbMapPin, TbTrash, TbEdit } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
export const CardEvent = ({ event, showActions }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await api.delete(`http://localhost:5000/api/events/${event._id}`);
      window.location.reload();
    } catch (error) {
      console.error("Error eliminando el evento:", error);
    }
  };

  return (
    <div className="card mb-3" style={{ width: "100%" }}>
      <div className="row g-0">
        <div className="col-lg-2 col-sm-12">
          <img
            src={event.image}
            className="img-fluid rounded-start col-sm-12"
            alt="..."
          />
        </div>
        <div className="col-lg-10 d-block d-lg-flex">
          <div className="card-body col-lg-9">
            <h5 className="card-title">{event.title}</h5>
            <p className="card-text align-items-center d-flex gap-2 m-0">
              <TbCalendar className="fs-5" /> {event.eventDate}
            </p>
            <p className="card-text align-items-center d-flex gap-2 m-0">
              <TbClock className="fs-5" /> {event.eventTime}
            </p>
            <div className="d-flex gap-2">
              <TbMapPin className="fs-5" />
              <p className="card-text">
                {event.location.address}, {event.location.city},{" "}
                {event.location.country}
              </p>
            </div>
          </div>
          {showActions ? (
            <div className="col-lg-2 d-flex flex-lg-row justify-content-center">
              <div className="bg-success h-100 px-3 d-flex flex-column justify-content-center align-items-center rounded-2">
                <TbEdit />
                Editar
              </div>
              <div className="bg-danger h-100 flex-grow-1 px-3 d-flex flex-column justify-content-center align-items-center rounded-2">
                <TbTrash />
                Eliminar
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

// Boton Editar //

// onClick={() =>
//                   navigate(`/user-events/edit/${event._id}`, { state: event })
//                 }

// Boton Eliminar //

// onClick = { handleDelete };
