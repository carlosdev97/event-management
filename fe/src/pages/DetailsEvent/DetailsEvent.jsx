import "./DetailsEvent.css";
import { useLocation } from "react-router-dom";

export const DetailsEvent = () => {
  const location = useLocation();
  const event = location.state;

  return (
    <div className="container min-vh-100 event-details d-flex">
      <img className="w-25 h-25" src={event.image} alt="" />
      <div>
        <h2>{event.title}</h2>
        <p>{event.description}</p>
        <p>Date: {event.date}</p>
      </div>
    </div>
  );
};
