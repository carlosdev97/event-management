import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const { user, loading, login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const response = await login(email, password);
    if (response === 404) {
      setEmailIsValid(false);
    } else if (response === 401) {
      setPasswordIsValid(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/user-events");
    }
  }, [user, navigate]);

  return (
    <div className="container p-md-5">
      <div className="row vh-100 d-flex justify-content-center align-items-center">
        <form
          className="bg-white col-10 col-md-6 col-lg-4 shadow rounded-3 p-4 d-flex flex-column gap-3"
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
            <button type="submit" className="btn bg-black text-white">
              Ingresar
            </button>
          )}
          <button type="button" className="btn btn-link">
            ¿Olvidaste tu contraseña?
          </button>
          <button type="button" className="btn btn-link">
            <Link to={"/register"}>¿No tienes cuenta? Registrate</Link>
          </button>
        </form>
      </div>
    </div>
  );
};
