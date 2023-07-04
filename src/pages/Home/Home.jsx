import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Button, Carousel } from "react-bootstrap";
import {
  BsFillFilePlayFill,
  BsFillFileSlidesFill,
  BsReply,
  BsAward,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { getCursos, uploadCapaCurso } from "../../firebase/cursos";
import home1 from "../../assets/images/home1.png";
import "./Home.css";

export const Home = () => {
  const [cursos, setCursos] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetchCursos();
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleResize = (e) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  const fetchCursos = async () => {
    const cursosData = await getCursos();
    const cursosWithImageURLs = await Promise.all(
      cursosData.map(async (curso) => {
        const cursoWithImageURL = { ...curso };
        if (curso.capa) {
          cursoWithImageURL.capaURL = await uploadCapaCurso(curso.capa);
        }
        return cursoWithImageURL;
      })
    );
    setCursos(cursosWithImageURLs);
  };

  const renderCursosCarousel = () => {
    const cursosToShow = cursos.slice(0, 3);

    return (
      <Carousel
        interval={3000}
        pause
        className={isMobile ? "mobile-carousel" : ""}
      >
        {cursosToShow.map((curso) => (
          <Carousel.Item key={curso.id}>
            <div className="carousel-card">
              <img src={curso.urlCapa} alt={curso.titulo} />
              <div className="carousel-card-body">
                <h3 className="card-title">{curso.titulo}</h3>
                <p className="card-description">
                  {curso.descricao.substring(0, 50)}...
                </p>
                <Link to="/cursos" className="saiba-mais-link">
                  Saiba Mais
                </Link>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    );
  };

  const Comentarios = () => {
    const comentarios = [
      {
        id: 1,
        nome: "John Doe",
        foto: "https://i.imgur.com/Ur43esv.jpg",
        comentario:
          "O EducaWeb mudou minha vida! Aprendi programação de forma gratuita e hoje sou desenvolvedor.",
      },
      {
        id: 2,
        nome: "Tom Smith",
        foto: "https://i.imgur.com/8RKXAIV.jpg",
        comentario:
          "O curso de Gestão de Projetos do EducaWeb me abriu portas no mercado de trabalho.",
      },
      {
        id: 3,
        nome: "Mika Johnson",
        foto: "https://i.imgur.com/J6l19aF.jpg",
        comentario: "Estou impressionada com a qualidade dos cursos do EducaWeb. Recomendo a todos!",
      },
    ];

    return (
      <Container>
        <Row className="comentarios-container2">
          {comentarios.map((comentario) => (
            <Col key={comentario.id} sm={4} className="comentario-col">
              <Card className="comentario-card">
                <Card.Img
                  variant="top"
                  src={comentario.foto}
                  className="comentario-img"
                />
                <Card.Body>
                  <Card.Title className="comentario-titulo">
                    {comentario.nome}
                  </Card.Title>
                  <Card.Text className="comentario-texto">
                    {comentario.comentario}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  };

  return (
    <>
      {/* Header */}
      <header>
        <Container>
          <Row className="gx-5 align-items-center justify-content-center">
            <Col lg={8} xl={7} xxl={6} md={6}>
              <div className="my-5 text-center text-xl-start">
                <h1 className="display-5 fw-bolder  mb-2">
                  Bem-vindo à Plataforma de Educação Online
                </h1>
                <p className="lead fw-normal text-white-50 mb-4">
                  Aprenda no seu próprio ritmo, em qualquer lugar.
                </p>
                <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                  <Button
                    className="btn-header btn-lg px-4 me-sm-3"
                    href="/cursos"
                  >
                    Ir Cursos
                  </Button>
                </div>
              </div>
            </Col>
            <Col xl={5} xxl={6} md={6} className="text-center">
              <img
                className="img-fluid rounded-3 my-5"
                src={home1}
                alt="imagem de exemplo"
              />
            </Col>
          </Row>
        </Container>
      </header>

      {/* Conteúdo */}
      <Container className="conteudo">
        <Row className="gx-5">
          <Col lg={4} className="mb-5 mb-lg-0">
            <h1 className="fw-bolder mb-0">
              Crie e compartilhe suas aulas em vídeo.
            </h1>
          </Col>
          <Col lg={8}>
            <Row className="gx-5 row-cols-1 row-cols-md-2">
              <Col className="mb-5 h-100 d-flex align-items-center">
                <div className="feature  text-white rounded-circle d-flex align-items-center justify-content-center mb-3 mx-auto">
                  <BsFillFilePlayFill size={50} />
                </div>
                <div className="ms-3">
                  <h1 className="h5">Crie suas aulas</h1>
                  <p className="mb-0">
                    Crie conteúdo educativo em vídeo para compartilhar seus
                    conhecimentos com o mundo. Inspire e ajude outras pessoas a
                    aprenderem.
                  </p>
                </div>
              </Col>
              <Col className="mb-5 h-100 d-flex align-items-center">
                <div className="feature  text-white rounded-circle d-flex align-items-center justify-content-center mb-3 mx-auto">
                  <BsFillFileSlidesFill size={50} />
                </div>
                <div className="ms-3">
                  <h1 className="h5">Personalize suas aulas</h1>
                  <p className="mb-0">
                    Adicione recursos interativos, como quizzes, exercícios e
                    materiais complementares, para enriquecer a experiência de
                    aprendizado dos seus alunos.
                  </p>
                </div>
              </Col>
              <Col className="mb-5 mb-md-0 h-100 d-flex align-items-center">
                <div className="feature  text-white rounded-circle d-flex align-items-center justify-content-center mb-3 mx-auto">
                  <BsReply size={50} />
                </div>
                <div className="ms-3">
                  <h1 className="h5">Interaja com seus alunos</h1>
                  <p className="mb-0">
                    Mantenha-se conectado com seus alunos por meio de recursos
                    de mensagens e fóruns de discussão. Responda a dúvidas,
                    forneça feedback e promova a colaboração.
                  </p>
                </div>
              </Col>
              <Col className="h-100 d-flex align-items-center">
                <div className="feature  text-white rounded-circle d-flex align-items-center justify-content-center mb-3 mx-auto">
                  <BsAward size={50} />
                </div>
                <div className="ms-3">
                  <h1 className="h5">Reconhecimento e premiações</h1>
                  <p className="mb-0">
                    Receba reconhecimento pelos seus cursos com certificados
                    personalizados e obtenha premiações com base no desempenho e
                    no engajamento dos alunos.
                  </p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      {/* Carousel de Cursos */}
      <Container fluid className="carousel-container">
        <h1 className="carousel-title">Cursos em Destaque</h1>
        {renderCursosCarousel()}
      </Container>

      {/* Comentários */}
      <Container fluid className="comentarios-container2">
        <h1 className="comentarios-title">O que os alunos estão dizendo</h1>
        <Comentarios />
      </Container>
    </>
  );
};
