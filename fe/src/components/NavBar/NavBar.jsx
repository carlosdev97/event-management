import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { TbDoorExit, TbUserCircle } from "react-icons/tb";
import "./NavBar.css";

export const NavBar = () => {
  const [user, setUser] = useState(null);

  const { logout } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(null);
    }
  }, [location]);

  return (
    <nav className="navbar navbar-expand-md bg-black">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-theme="dark"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-toggler"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {user ? (
          <div className="d-md-none">
            <p className="text-white d-flex align-items-center m-0">
              Hola, {user.name.split(" ")[0]}
            </p>
          </div>
        ) : (
          <Link className="navbar-brand d-md-none text-white" to={"/"}>
            Ocassio
          </Link>
        )}
        <div
          className="collapse navbar-collapse justify-content-between align-items-center p-2"
          id="navbar-toggler"
        >
          <Link className="navbar-brand d-none d-md-block text-white" to={"/"}>
            Ocassio
          </Link>
          {user ? (
            <>
              <div className="text-white d-flex flex-column flex-md-row align-items-center gap-2">
                <TbUserCircle className="btn-user-custom fs-4 d-none d-md-block" />
                <p className="m-0 d-none d-md-block">
                  Hola, {user.name.split(" ")[0]}
                </p>
                <TbDoorExit
                  className="btn-logout-custom text-danger fs-4 cursor-pointer d-none d-md-block"
                  onClick={handleLogout}
                />
                <button
                  type="button"
                  className="btn btn-danger d-block d-md-none"
                  onClick={handleLogout}
                >
                  Salir
                </button>
              </div>
            </>
          ) : (
            <ul className="navbar-nav d-flex justify-content-center align-items-center">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/login"
                >
                  <button
                    type="button"
                    className="btn-custom btn btn-link text-decoration-none fw-bold"
                  >
                    Ingresar
                  </button>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  <button type="button" className="btn btn-primary fw-bold">
                    Registrarse
                  </button>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};
