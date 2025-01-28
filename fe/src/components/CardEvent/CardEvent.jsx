import "./CardEvent.css";
import { TbCalendar, TbClock, TbMapPin } from "react-icons/tb";
export const CardEvent = ({ event }) => {
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
        <div className="col-lg-10">
          <div className="card-body col-lg-12">
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
        </div>
      </div>
    </div>
  );
};
