import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getCursos } from '../../firebase/cursos';
import './AreaCriador.css';
import { Card } from '../../components/Card/Card';
import { auth } from '../../firebase/config';

export function AreaCriador() {
  const [cursos, setCursos] = useState([]);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/criador/cursos/novo');
  };

  useEffect(() => {
    async function fetchCursos() {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const listCursos = await getCursos();
          const cursosAutor = listCursos.filter(curso => curso.autor.id === user.uid);
          setCursos(cursosAutor);
        }
      });
    }
    fetchCursos();
  }, []);

  return (
    <Container className="backgroundPage" style={{minHeight:"100vh"}}>
      <h1 className="title">Área do criador</h1>
      <h2 className="title mb-3">Seus cursos</h2>
      <hr />
      {cursos.length > 0 ?
        <Row xl={4} md={2} xs={1} style={{ justifyContent: 'start' }}>
          {cursos.map((curso, index) => (
            <Col key={index}>
              <Card curso={curso} />
            </Col>
          ))}
        </Row>
        : <h4 className="title">Você ainda não tem nenhum curso cadastrado.</h4>}
      <hr />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px'
          }}
        >
          <h4 className="title" style={{ float: 'left', padding: '8px' }}>
            Deseja criar um novo curso?
          </h4>
          <Button className='padraoButton' onClick={handleClick}>Criar novo curso</Button>
        </div>
      </div>
    </Container>
  );
}


