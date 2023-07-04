import { useEffect, useState } from "react";
import { Card, Container, FormControl, Row, Col } from "react-bootstrap";
import { Loader } from "../../components/Loader/Loader";
import { getCursos } from "../../firebase/cursos";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import "./Cursos.css";

export function Cursos() {
  const [loading, setLoading] = useState(true);
  const [cursos, setCursos] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function buscarCursos() {
      const cursosData = await getCursos();
      setCursos(cursosData);
      setLoading(false);
    }
    buscarCursos();
  }, []);

  function handleSearchTextChange(event) {
    setSearchText(event.target.value.toLowerCase());
  }

  const cursosFiltrados = cursos.filter(
    (curso) =>
      (curso.titulo.toLowerCase().includes(searchText) ||
      curso.descricao.toLowerCase().includes(searchText)) &&
      curso.active === true
  );
  

  function redirectToCursoDetalhes(idCurso) {
    navigate(`/curso/${idCurso}`);
  }

  return (
    <div className="cursos" style={{minHeight:"100vh"}}>
      <h3 className="titulo-cursos">Cursos</h3>
      <Container className="mb-2">
        <div className="input-barra-pesquisa">
          <FaSearch className="search-icon" />
          <FormControl
            type="search"
            placeholder="Pesquisar cursos"
            className="input-barra-pesquisa-input"
            aria-label="Search"
            value={searchText}
            onChange={handleSearchTextChange}
          />
        </div>
      </Container>

      <Container>
        <Row>
          <div className="container-cursos">
            {cursosFiltrados.slice(0, 9).map((curso) => (
              <Card
                key={curso.id}
                className="cardCurso"
                onClick={() => redirectToCursoDetalhes(curso.id)}
              >
                <div className="card-banner">
                  <Card.Img src={curso.urlCapa} />
                </div>
                <Card.Body>
                  <Card.Title>{curso.titulo}</Card.Title>
                  <Card.Text>{curso.descricao}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Row>
      </Container>

      {cursosFiltrados.length === 0 && !loading && (
        <Container>
          <p>Nenhum curso encontrado.</p>
        </Container>
      )}

      {loading && <Loader />}
    </div>
  );
}

