import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export const FormAddEvent = () => {
  const [event, setEvent] = useState({
    image: "",
    title: "",
    description: "",
    eventDate: "",
    eventTime: "",
    location: {
      address: "",
      city: "",
      country: "",
    },
    userId: null, // Aquí se almacenará el id del usuario logueado
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setEvent((prev) => ({ ...prev, userId: parsedUser.id }));
    }
  }, []); // Se ejecuta solo una vez al montar el componente

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      console.log(typeof event);
      console.log(event);

      const response = await api.post(
        "http://localhost:5000/api/events/create",
        event
      );

      navigate("/user-events");
    } catch (err) {
      setError(err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  const handleLocationChange = (field, value) => {
    setEvent((prev) => ({
      ...prev,
      location: { ...prev.location, [field]: value },
    }));
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
              value={event.image}
              onChange={(e) =>
                setEvent((prev) => ({ ...prev, image: e.target.value }))
              }
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
              value={event.title}
              onChange={(e) =>
                setEvent((prev) => ({ ...prev, title: e.target.value }))
              }
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
              value={event.eventDate}
              onChange={(e) =>
                setEvent((prev) => ({ ...prev, eventDate: e.target.value }))
              }
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
              value={event.eventTime}
              onChange={(e) =>
                setEvent((prev) => ({ ...prev, eventTime: e.target.value }))
              }
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
              value={event.description}
              onChange={(e) =>
                setEvent((prev) => ({ ...prev, description: e.target.value }))
              }
            />
          </div>
          <button type="submit" className="btn bg-black text-white">
            Agregar
          </button>
        </form>
      </div>
    </div>
  );
};
