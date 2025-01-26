import { Link } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-md border-bottom border-1 border-gray navbar-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
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
          <a className="navbar-brand d-none d-md-block" href="#">
            Ocassio
          </a>
          <ul className="navbar-nav d-flex justify-content-center align-items-center">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/login">
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
        </div>
      </div>
    </nav>
  );
};
