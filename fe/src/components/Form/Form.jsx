import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./Form.css";

export const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const { user, loading, login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const response = await login(email, password); // Asegúrate de que login sea asíncrono
    if (response === 404) {
      setEmailIsValid(false);
    } else if (response === 401) {
      setPasswordIsValid(false);
      console.log(passwordIsValid);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/user-events"); // Navegar si user está definido
    }
  }, [user, navigate]);

  return (
    <div className="container p-5">
      <div className="row justify-content-center">
        <form
          className="col-lg-5 shadow rounded-3 p-5 d-flex flex-column gap-2"
          onSubmit={handleLogin}
        >
          <div className="mb-2">
            <label htmlFor="inputEmail" className="form-label fw-bold">
              Email
            </label>
            <input
              type="email"
              className={`form-control ${emailIsValid ? "" : "is-invalid"}`}
              id="inputEmail"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value), setEmailIsValid(true);
              }}
            />
            {emailIsValid ? (
              <></>
            ) : (
              <div
                id="validationServerUsernameFeedback"
                className="invalid-feedback"
              >
                Por favor ingrese un correo válido.
              </div>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="inputPassword" className="form-label fw-bold">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${passwordIsValid ? "" : "is-invalid"}`}
              id="inputPassword"
              placeholder="********"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value), setPasswordIsValid(true);
              }}
            />
            {passwordIsValid ? (
              <></>
            ) : (
              <div
                id="validationServerUsernameFeedback"
                className="invalid-feedback"
              >
                Contraseña incorrecta.
              </div>
            )}
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
            <button
              type="submit"
              className="btn bg-black text-white"
              disabled={!email || !password}
            >
              Ingresar
            </button>
          )}
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
