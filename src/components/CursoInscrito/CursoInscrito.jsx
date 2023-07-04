import { useEffect, useState } from "react";
import { Card, Container, Row } from "react-bootstrap";
import { Loader } from "../../components/Loader/Loader";
import {
  getCursoById,
  getCursos,
} from "../../firebase/cursos";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../../firebase/config";
import "../../pages/Cursos/Cursos";
import { getUsuario } from "../../firebase/usuarios";

export function CursoInscrito({ curso }) {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [cursos, setCursos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCursos() {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const cursos = await getCursos(); 
          const usuario = await getUsuario(user.uid); 
          const cursosInscritos = usuario.cursos; 
          console.log(cursosInscritos);
          const cursoCapa = []
          for (let curso of cursosInscritos) {
            curso =  await getCursoById(curso.id);
            cursoCapa.push(curso)
          }
          console.log(cursoCapa);
          setCursos(cursoCapa);
        
        }
      });
    }
    fetchCursos();
  }, []);

  function redirectToCursoDetalhes(idCurso) {
    navigate(`/curso/${idCurso}`);
  }

  return (
    <div className="cursos" style={{minHeight:"100vh"}}>
      <h3 className="titulo-cursos">Meus Cursos</h3>      
      <Container>
        <Row>
          <div className="container-cursos">
            {cursos.map((curso) => (
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
    </div>
  );
}
