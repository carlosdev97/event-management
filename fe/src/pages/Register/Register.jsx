import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
    };

    try {
      setLoading(true);
      await api.post("http://localhost:5000/api/users/register", user);
      navigate("/login");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container p-5">
      <div className="row justify-content-center">
        <form
          className="col-lg-5 shadow rounded-3 p-5 d-flex flex-column gap-2"
          onSubmit={handleRegister}
        >
          <div className="mb-3">
            <label htmlFor="inputName" className="form-label fw-bold">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              id="inputName"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label fw-bold">
              Correo Electronico
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label fw-bold">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              Registrarse
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
