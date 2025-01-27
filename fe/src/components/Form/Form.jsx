import { useState } from "react";
import api from "../../services/api";
import "./Form.css";

export const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post(
        "http://localhost:5000/api/users/login",
        JSON.stringify({ email, password })
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container p-5">
      <div className="row justify-content-center">
        <form
          className="col-lg-5 shadow rounded-3 p-5 d-flex flex-column gap-2"
          onSubmit={login}
        >
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label fw-bold">
              Email
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
              Password
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
          <button
            type="submit"
            className="btn bg-black text-white"
            disabled={!email || !password}
          >
            Ingresar
          </button>
          <button type="button" className="btn btn-link">
            ¿Olvidaste tu contraseña?
          </button>
          <button type="button" className="btn btn-link">
            ¿No tienes cuenta? Registrate
          </button>
        </form>
      </div>
    </div>
  );
};
