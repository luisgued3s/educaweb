import React, { useState, useEffect } from "react";
import { Button, Container, ListGroup, Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { BiCheckCircle } from "react-icons/bi";
import { getCurso } from "../../firebase/cursos";
import "./Aula.css";
import { auth } from "../../firebase/config";
import { PorcentagemCurso } from "../../components/PorcentagemCurso/PorcentagemCurso";
import { getUsuario, updateCheckAula } from "../../firebase/usuarios";
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { Certificado } from "../../components/Certificado/Certificado";
import ReactPDF from '@react-pdf/renderer';

export function PaginaAula() {
  const { idCurso, idAula } = useParams();
  const [curso, setCurso] = useState({});
  const [currentAula, setCurrentAula] = useState({});
  const [cursoAluno, setCursoAluno] = useState([]);
  const [cursoAulas, setCursoAulas] = useState([]);
  const [aulaConcluida, setAulaConcluida] = useState(false);
  const [progressAulas, setProgressAulas] = useState(0);
  const [alunoConcluido, setAlunoConcluido] = useState({});

  const handleProgress = () => {
    auth.onAuthStateChanged(async (user) => {
      let cursoProgress = [];
      const findUser = await getUsuario(user.uid);  // Captura usuário autenticado
      const cursoInscrito = findUser.cursos.filter(cursoAtual => cursoAtual.id === idCurso);  // Encontra os cursos dentro usuário
      cursoProgress = cursoInscrito[0]; // Seta o curso atual
      setCursoAluno(cursoInscrito);
      const aulaAtual = cursoInscrito[0].aulas.filter(aulaCurso => aulaCurso.id === idAula); // Encontra as aulas dentro do curso
      setAulaConcluida(aulaAtual[0].concluida); 
      const aulasConcluidas = cursoProgress?.aulas.filter(aula => aula.concluida === true); // Encontra o aula.concluida
      const porcentagemAulas = parseInt(
        (aulasConcluidas?.length / cursoProgress?.aulas?.length) * 100 // Calculo da barra de progresso
      );
      setProgressAulas(porcentagemAulas);
    });
    
  };

  const getUserAulas = async () => {
    auth.onAuthStateChanged(async (user) => {
      setAlunoConcluido(user);
      const findUser = await getUsuario(user.uid);
      const cursoInscrito = findUser.cursos.filter(cursoAtual => cursoAtual.id === idCurso);
      setCursoAluno(cursoInscrito);        // setando o curso do meu aluno
      const aulaAtual = cursoInscrito[0].aulas.filter(aulaCurso => aulaCurso.id === idAula);
      setAulaConcluida(aulaAtual[0].concluida);   // setando a aula do curso concluida
    });
  };

  const handleCheckAula = async () => {
    await updateCheckAula(idAula, idCurso);
    handleProgress();
  };

  const plyrProps = {
    type: "video",
    sources: [
      {
        src: currentAula.urlVideo,
      },
    ],
  };

  useEffect(() => {
    async function fetchCurso() {
      const findCurso = await getCurso(idCurso);
      if (findCurso) {
        setCurso(findCurso);
        const findAula = findCurso.aulas.find((aula) => aula.id === idAula);
        if (findAula) {
          setCurrentAula(findAula);
        }
        setCursoAulas(
          findCurso.aulas.map((aula) => ({
            ...aula,
          }))
        );
      }
    }
    fetchCurso();
    getUserAulas();
  }, []);

  useEffect(() => {        // useEffect utilizado para a barra de progresso captar todas as informações da página, após o primeiro useEffect
    handleProgress();
    document.title = `Aula: ${currentAula.titulo}`;
  }, [currentAula]);

  return (
    <Container>
      <Row className="flex-column-reverse flex-xl-row">
        <Col xl={3}>
          <div className="blocoAulas">
            <div className="titleCurso">
              <h3>Curso: {curso.titulo}</h3>
              <PorcentagemCurso progress={progressAulas} />
              { progressAulas === 100 &&
                <PDFDownloadLink document={<Certificado usuario={alunoConcluido} curso={curso} />} fileName={`certificado_${curso.titulo}.pdf`}>
                {({ blob, url, loading, error }) =>
                  <Button className="buttonCertificado">Baixar certificado</Button>
                }
              </PDFDownloadLink>}
              <hr />
            </div>
            <div className="titleAulas">
              <h4>Aulas</h4>
            </div>
            <ListGroup as="ol" numbered>
              {cursoAluno[0]?.aulas.map((aula) => (
                <ListGroup.Item
                  variant="warning"
                  className="listaAulas"
                  as="li"
                  key={aula.id}
                >
                  <a href={`/curso/${idCurso}/aula/${aula.id}`}>
                    {aula.titulo}
                    
                    { aula.concluida &&
                      <BiCheckCircle className="concluido-icon concluido" />
                    }
                  </a>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Col>
        <Col xl={9}>
      <div className="areaVideo">
        <h1>Aula: {currentAula.titulo}</h1>
        {currentAula.urlVideo && <Plyr source={plyrProps}  />}
        <p className="descricao-aula">{currentAula.descricao}</p>
        { !aulaConcluida && 
          <div className="buttonConclude">
            <Button onClick={() => handleCheckAula()}>
              Marcar como concluída
            </Button>
          </div>
        }
      </div>
    </Col>
      </Row>
    </Container>
  );
}
export default PaginaAula;