import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

export function DetalhesCursoNaoInscrito({ curso, inscrever, adicionarListaDesejos, cursoDesejado, formatarData, mediaAvaliacoes, comentarios }) {
    return (
        <Container className="curso-detalhes d-f" style={{ minHeight: "100vh" }}>
            <h3 className="detalhes-curso-titulo">{curso.titulo}</h3>
            <Row className="curso-info">


                <Col sm={12} md={4} className="curso-capa">
                    <div className="d-flex flex-column align-items-center">
                        <Image src={curso.urlCapa} alt={curso.titulo} fluid />
                        <div className="d-flex flex-wrap justify-content-center mt-3">
                            <Button variant="primary" className="padraoButton me-md-2 mb-2 mb-md-0" onClick={inscrever}>
                                Inscrever-se
                            </Button>

                            {cursoDesejado ? (
                                <Button variant="primary" className="padraoButton" onClick={adicionarListaDesejos}>
                                    <i className="bi bi-suit-heart-fill na-lista" />
                                    Remover da Lista de Desejos
                                </Button>
                            ) : (
                                <Button variant="primary" className="padraoButton" onClick={adicionarListaDesejos}>
                                    <i className="bi bi-heart fora-lista" />
                                    Adicionar à lista de desejos
                                </Button>
                            )}
                        </div>
                    </div>
                </Col>

                <Col sm={12} md={8} className="curso-descricao curso-descricao-mobile">
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
    );
}