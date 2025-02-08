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
            <div className="col-lg-2 d-flex flex-lg-column justify-content-center gap-lg-2 mx-lg-2">
              <div
                className="btn-actions bg-transparent px-3 py-2 d-flex justify-content-center align-items-center rounded-5 border border-2 border-success text-success gap-2 flex-grow-1 flex-lg-grow-0"
                onClick={() =>
                  navigate(`/user-events/edit/${event._id}`, { state: event })
                }
              >
                <TbEdit />
                Editar
              </div>
              <div
                className="btn-actions bg-transparent px-3 py-2 d-flex justify-content-center align-items-center rounded-5 border border-2 border-danger text-danger gap-2 flex-grow-1 flex-lg-grow-0"
                onClick={handleDelete}
              >
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

//

// Boton Eliminar //

// onClick = { handleDelete };
