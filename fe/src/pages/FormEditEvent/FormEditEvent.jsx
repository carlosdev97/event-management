import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-hot-toast";

export const FormEditEvent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state;
  const { logout } = useAuth();

  const [image, setImage] = useState(event.image);
  const [title, setTitle] = useState(event.title);
  const [date, setDate] = useState(event.date);
  const [time, setTime] = useState(event.time);
  const [locationEvent, setLocationEvent] = useState({
    place: event.location.place,
    address: event.location.address,
    city: event.location.city,
  });
  const [description, setDescription] = useState(event.description);
  const [loading, setLoading] = useState(false);

  if (!event) {
    navigate("/user-events");
    return null;
  }

  const handleLocationChange = (field, value) => {
    setLocationEvent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedEvent = {
      image,
      title,
      date,
      time,
      location: locationEvent,
      description,
      userId: localStorage.getItem("userId"),
    };

    console.log(updatedEvent);

    try {
      await api.put(
        `https://event-management-api-0kcl.onrender.com/api/events/${event._id}`,
        // `http://localhost:5000/api/events/${event._id}`
        updatedEvent
      );

      setLoading(false);
      toast.success("¡Evento actualizado exitosamente!");
      navigate("/user-events");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        logout();
        toast.error("La sesión ha caducado");
        navigate("/login");
      }
      toast.error("¡Error al actualizar el evento!");
    } finally {
      setLoading(false);
    }
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
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputEventDate" className="form-label fw-bold">
              Hora
            </label>
            <input
              type="time"
              className="form-control"
              id="inputEventDate"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="row col d-flex gap-2 gap-md-0">
            <div className="col-lg-4 mb-3">
              <label htmlFor="inputAddress" className="form-label fw-bold">
                Lugar
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="Dirección"
                value={locationEvent.place}
                onChange={(e) => handleLocationChange("place", e.target.value)}
              />
            </div>
            <div className="col-lg-4 mb-3">
              <label htmlFor="inputAddress" className="form-label fw-bold">
                Dirección
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="Dirección"
                value={locationEvent.address}
                onChange={(e) =>
                  handleLocationChange("address", e.target.value)
                }
              />
            </div>
            <div className="col-lg-4 mb-3">
              <label htmlFor="input" className="form-label fw-bold">
                Ciudad
              </label>
              <select
                className="form-select"
                aria-label="Selecciona una ciudad"
                value={locationEvent.city}
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
              className="btn bg-success text-white d-flex gap-2 align-items-center justify-content-center"
              type="button"
              disabled
            >
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              ></span>
              <span role="status">Actualizando...</span>
            </button>
          ) : (
            <button type="submit" className="btn bg-success text-white">
              Actualizar
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
