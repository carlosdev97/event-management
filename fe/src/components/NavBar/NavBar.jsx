import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { TbLogout } from "react-icons/tb";
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
      const userObj = JSON.parse(savedUser);
      setUser(userObj);
    }
  }, [location]);

  return (
    <nav className="navbar navbar-expand-md border-bottom border-1 border-gray bg-black">
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
        <div
          className="collapse navbar-collapse justify-content-between align-items-center p-2"
          id="navbar-toggler"
        >
          <a className="navbar-brand d-none d-md-block text-white" href="#">
            Ocassio
          </a>
          {location.pathname === "/user-events" && user ? (
            <>
              <div className="text-white d-flex align-items-center gap-2">
                Hola, {user.name.split(" ")[0]}
                <TbLogout
                  className="text-danger fs-4 cursor-pointer"
                  onClick={handleLogout}
                />
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
