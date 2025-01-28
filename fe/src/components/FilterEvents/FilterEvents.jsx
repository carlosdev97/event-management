import { useState } from "react";
import api from "../../services/api";
export const FilterEvents = () => {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");

  const findQuery = async (event) => {
    event.preventDefault();

    const queryParams = {};

    if (search.trim()) queryParams.search = search.trim();
    if (city.trim()) queryParams.city = city.trim();
    if (date.trim()) queryParams.date = date.trim();

    const queryString = new URLSearchParams(queryParams).toString();

    console.log("Query string generada:", queryString);

    try {
      const response = await api.get(
        `http://localhost:5000/api/events/filter?${queryString}`
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="row w-100 d-flex justify-content-around">
      <form className="d-flex mb-4 col" role="search" onSubmit={findQuery}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Busca por evento, artista o lugar..."
          aria-label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="form-select me-2 d-none d-lg-block"
          aria-label="Selecciona una ciudad"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">Cualquier ciudad...</option>
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
          <option value="San José del Guaviare">San José del Guaviare</option>
          <option value="Santa Marta">Santa Marta</option>
          <option value="Sincelejo">Sincelejo</option>
          <option value="Tunja">Tunja</option>
          <option value="Valledupar">Valledupar</option>
          <option value="Villavicencio">Villavicencio</option>
          <option value="Yopal">Yopal</option>
        </select>

        <input
          className="form-control me-2 d-none d-lg-block"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button
          className="btn btn-outline-success d-none d-lg-block"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
};
