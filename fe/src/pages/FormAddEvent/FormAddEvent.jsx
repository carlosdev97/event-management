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
    <div className="container p-md-5">
      <div className="row py-4 p-md-0 justify-content-center align-items-center">
        <form
          className="bg-white col-11 col-lg-8 shadow rounded-3 p-4 d-flex flex-column gap-2"
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
              <select
                className="form-select"
                aria-label="Selecciona una ciudad"
                value={event.location.city}
                onChange={(e) => handleLocationChange("city", e.target.value)}
              >
                <option value="">Ciudad</option>
                <option value="Arauca">Arauca</option>
                <option value="Armenia">Armenia</option>
                <option value="Barranquilla">Barranquilla</option>
                <option value="Bogotá">Bogotá</option>
                <option value="Bucaramanga">Bucaramanga</option>
                <option value="Cali">Cali</option>
                <option value="Cartagena">Cartagena</option>
                <option value="Cúcuta">Cúcuta</option>
                <option value="Florencia">Florencia</option>
                <option value="Inírida">Inírida</option>
                <option value="Ibagué">Ibagué</option>
                <option value="Leticia">Leticia</option>
                <option value="Manizales">Manizales</option>
                <option value="Medellín">Medellín</option>
                <option value="Mitú">Mitú</option>
                <option value="Mocoa">Mocoa</option>
                <option value="Montería">Montería</option>
                <option value="Neiva">Neiva</option>
                <option value="Pasto">Pasto</option>
                <option value="Pereira">Pereira</option>
                <option value="Popayán">Popayán</option>
                <option value="Puerto Carreño">Puerto Carreño</option>
                <option value="Quibdó">Quibdó</option>
                <option value="Riohacha">Riohacha</option>
                <option value="San Andrés">San Andrés</option>
                <option value="San José del Guaviare">
                  San José del Guaviare
                </option>
                <option value="Santa Marta">Santa Marta</option>
                <option value="Sincelejo">Sincelejo</option>
                <option value="Tunja">Tunja</option>
                <option value="Valledupar">Valledupar</option>
                <option value="Villavicencio">Villavicencio</option>
                <option value="Yopal">Yopal</option>
              </select>
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
              className="form-control resize-none"
              id="inputDescription"
              placeholder="Descripción"
              value={event.description}
              onChange={(e) =>
                setEvent((prev) => ({ ...prev, description: e.target.value }))
              }
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
              Agregar
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
