import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../services/api";

export const FormEditEvent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state;

  const [image, setImage] = useState(event.image);
  const [title, setTitle] = useState(event.title);
  const [eventDate, setEventDate] = useState(event.eventDate);
  const [eventTime, setEventTime] = useState(event.eventTime);
  const [locationEvent, setLocationEvent] = useState({
    address: event.location.address,
    city: event.location.city,
    country: event.location.country,
  });
  const [description, setDescription] = useState(event.description);
  const [loading, setLoading] = useState(false);

  if (!event) {
    navigate("/user-events");
    return null;
  }

  const handleLocationChange = (field, value) => {
    setLocationEvent((prev) => ({ ...prev.location, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedEvent = {
      image,
      title,
      eventDate,
      eventTime,
      location: locationEvent,
      description,
      userId: localStorage.getItem("userId"),
    };

    try {
      await api.put(
        `http://localhost:5000/api/events/${event._id}`,
        updatedEvent
      );

      setLoading(false);
      navigate("/user-events");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container p-5">
      <div className="row justify-content-center">
        <form
          className="col-lg-8 shadow rounded-3 p-5 d-flex flex-column gap-2"
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label htmlFor="inputImage" className="form-label fw-bold">
              Imagen URL
            </label>
            <input
              type="text"
              className="form-control"
              id="inputImage"
              placeholder="Imagen URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputTitle" className="form-label fw-bold">
              Titulo
            </label>
            <input
              type="text"
              className="form-control"
              id="inputTitle"
              placeholder="Titulo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputEventDate" className="form-label fw-bold">
              Fecha
            </label>
            <input
              type="date"
              className="form-control"
              id="inputEventDate"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputEventTime" className="form-label fw-bold">
              Hora
            </label>
            <input
              type="time"
              className="form-control"
              id="inputEventTime"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
            />
          </div>
          <div className="mb-3 row col d-flex">
            <div className="col-lg-4">
              <label htmlFor="inputAddress" className="form-label fw-bold">
                Dirección
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="Dirección"
                value={event.location.address}
                onChange={(e) =>
                  handleLocationChange("address", e.target.value)
                }
              />
            </div>
            <div className="col-lg-4">
              <label htmlFor="input" className="form-label fw-bold">
                Ciudad
              </label>
              <input
                type="text"
                className="form-control"
                id="inputTitle"
                placeholder="Ciudad"
                value={event.location.city}
                onChange={(e) => handleLocationChange("city", e.target.value)}
              />
            </div>
            <div className="col-lg-4">
              <label htmlFor="inputCountry" className="form-label fw-bold">
                País
              </label>
              <input
                type="text"
                className="form-control"
                id="inputCountry"
                placeholder="País"
                value={event.location.country}
                onChange={(e) =>
                  handleLocationChange("country", e.target.value)
                }
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="inputDescription" className="form-label fw-bold">
              Descripción
            </label>
            <textarea
              className="form-control"
              id="inputDescription"
              placeholder="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {loading ? (
            <button
              className="btn bg-black text-white d-flex gap-2 align-items-center justify-content-center"
              type="button"
              disabled
            >
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              ></span>
              <span role="status">Cargando...</span>
            </button>
          ) : (
            <button type="submit" className="btn bg-black text-white">
              Actualizar
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
