import { Container, Spinner } from 'react-bootstrap';
import "./Loader.css"

export function Loader() {
    return (
        <Container className="d-flex flex-column  justify-content-center align-items-center">
            <Spinner className='loaderColor'></Spinner>
            <span className="ms-1">Carregando...</span>
        </Container>
    );
}
