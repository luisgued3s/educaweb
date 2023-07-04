import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Menu.css';
import educaweb from '../../assets/icons/educaWeb.png';

import { auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { getUsuario } from '../../firebase/usuarios';
import { onAuthStateChanged } from 'firebase/auth';

export function Menu() {
  const [uidUsuario, setUidUsuario] = useState(null)
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUidUsuario(user.uid)
    })
  }, []);

  const definirUserName = async () => {
    if (uidUsuario) {
      const usuarioEncontrado = await getUsuario(uidUsuario);
      const { nome } = usuarioEncontrado;
      const primeiroNome = nome.split(" ")[0];
      setUserName(primeiroNome);
    }
  };

  useEffect(() => {
    definirUserName()
  }, [uidUsuario])

  function handleLogout() {
    auth
      .signOut()
      .then(() => {
        navigate('/login');
      })
      .catch(error => {
        console.log(error.message);
      });
  }


  function goProfile() {
    navigate("/perfil")
  }
  return (
    <>
      <Navbar collapseOnSelect expand="md" variant="dark">
        <Container className="NavBar">
          <Navbar.Brand href="/">
            <img
              alt="Logo EducaWeb"
              src={educaweb}
              width="160"
              height="50"
              object-fit="contain"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="bg-pc01"
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <NavDropdown title="Cursos" id="courses-dropdown">
                <NavDropdown.Item
                  href="/cursos"
                  className="dropdown-item"
                >
                  Cursos
                </NavDropdown.Item>

                <NavDropdown.Item href="/cursos/inscritos" className="dropdown-item">
                  Meus Cursos
                </NavDropdown.Item>

                <NavDropdown.Item href="/listadesejos" className="dropdown-item">
                  Lista de Desejos
                </NavDropdown.Item>
              </NavDropdown>


              <NavDropdown title="Criador" id="courses-dropdown">
                <NavDropdown.Item
                  href="/criador/cursos/novo"
                  className="dropdown-item"
                >
                  Novo Curso
                </NavDropdown.Item>
                <NavDropdown.Item href="/areacriador" className="dropdown-item">
                  Aréa do Criador
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Perfil" id="navbar-dropdown">
                <NavDropdown.Item href="/perfil" className="dropdown-item">
                  Ver Perfil
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="/perfil/editar"
                  className="dropdown-item"
                >
                  Editar
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={handleLogout}
                  className="dropdown-item"
                  style={{ color: '#f00' }}
                >
                  Sair
                </NavDropdown.Item>
              </NavDropdown>
              {userName && (
                <Nav.Item className="nav-user-name ms-lg-3" onClick={goProfile} style={{ cursor: 'pointer' }}>
                  Bem-vindo, {userName}!
                </Nav.Item>

              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
