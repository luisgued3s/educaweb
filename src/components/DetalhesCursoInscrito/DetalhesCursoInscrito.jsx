import { Box } from "@mui/material";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { Avaliacao } from "../Avaliacao/Avaliacao";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

export function DetalhesCursoInscrito({ curso, formatarData, adicionarAvaliacao, mediaAvaliacoes, comentarioTexto, handleComentarioChange, enviarComentario, comentarios, idCurso }) {
    return (
        <Container className="curso-detalhes" style={{ minHeight: "100vh" }}>
            <h3 className="detalhes-curso-titulo">{curso.titulo}</h3>
            <Row className="curso-info">
                <Col sm={12} md={4} className="curso-capa">
                    <Image src={curso.urlCapa} alt={curso.titulo} fluid />
                    <div className="d-flex justify-content-between">
                        <Button variant="primary" className="mt-3" as={Link} to={`/curso/${idCurso}/aula/${curso.aulas[0].id}`}>
                            Iniciar Curso
                        </Button>
                    </div>
                </Col>
                <Col sm={12} md={8} className="curso-descricao">
                    <h1>{curso.descricao}</h1>
                    <div className="curso-detalhes-adicionais">
                        <p>Autor: {curso.autor.nome}</p>
                        <p>Categoria: {curso.categoria}</p>
                    </div>
                    <div className="curso-datas">
                        <p>Data de publicação: {formatarData(curso.dataPublicacao)}</p>
                        <p>Última atualização: {formatarData(curso.dataAtualizacao)}</p>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={12} className="avaliacao-container">
                    <Box component="fieldset" mb={3} borderColor="transparent">
                        <Avaliacao curso={curso} adicionarAvaliacao={adicionarAvaliacao} />
                    </Box>
                    <div
                        className="curso-avaliacoes"
                        style={{ fontSize: "14px", color: "#888" }}
                    >
                        <p>
                            Média de Avaliações: {mediaAvaliacoes.toFixed(1)}{" "}
                            <FaStar style={{ verticalAlign: "middle" }} />
                        </p>
                    </div>
                </Col>
                <Col md={12} className="comentarios-container">
                    <h4>Deixe um comentário:</h4>
                    <input
                        type="text"
                        value={comentarioTexto}
                        onChange={handleComentarioChange}
                        placeholder="Digite seu comentário"
                    />
                    <Button style={{width:"150px"}} variant="primary" onClick={enviarComentario}>
                        Comentar
                    </Button>
                    <div className="scrollable">
                        {comentarios.map((comentario, index) => (
                            <div className="comentario" key={index}>
                                <p className="nome-usuario">{comentario.comentario.usuario.nome} </p>
                                <p>{comentario.comentario.comentario}</p>
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}