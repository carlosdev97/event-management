import "./CardEvent.css";
import { TbCalendar, TbClock, TbMapPin, TbTrash, TbEdit } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
export const CardEvent = ({ event, showActions }) => {
  const navigate = useNavigate();

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
            <div className="col-lg-3 p-2 d-flex flex-lg-column gap-4 justify-content-center">
              <button
                type="button"
                className="btn btn-info d-flex align-items-center justify-content-center gap-2"
                onClick={() =>
                  navigate(`/user-events/edit/${event._id}`, { state: event })
                }
              >
                <TbEdit className="fs-4" />
                Editar
              </button>
              <button
                type="button"
                className="btn btn-danger d-flex align-items-center justify-content-center gap-2"
              >
                <TbTrash className="fs-4" />
                Eliminar
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
