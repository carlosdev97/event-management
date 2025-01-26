import "./Form.css";
export const Form = () => {
  return (
    <div className="container p-5">
      <div className="row justify-content-center">
        <form className="col-lg-5 shadow rounded-3 p-5 d-flex flex-column gap-2">
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label fw-bold">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              placeholder="name@example.com"
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
            />
          </div>
          <button type="button" className="btn bg-black text-white">
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
