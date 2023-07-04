import { Root } from './pages/Root/Root';
import { Cadastro } from './pages/Cadastro/Cadastro';
import { AreaCriador } from './pages/AreaCriador/AreaCriador';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Cursos } from './pages/Cursos/Cursos';
import { Toaster } from 'react-hot-toast';
import { NotFound } from './pages/NotFound/NotFound';
import { EditarPerfil } from './pages/EditarPerfil/EditarPerfil';
import { AdicionarCurso } from './pages/AdicionarCurso/AdicionarCurso';
import { Perfil } from './pages/Perfil/Perfil';
import { Login } from './pages/Login/Login';
import { AuthContext } from './context/AuthContext';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import { EsqueciSenha } from './pages/EsqueciSenha/EsqueciSenha';
import { PaginaAula } from './pages/PaginaAula/Aula';
import { ListaDesejos } from './pages/ListaDesejos/ListaDesejos';
import { Container } from 'react-bootstrap';
import  logo  from './assets/icons/educaWeb.png';
import { Loader } from './components/Loader/Loader';
import { CursoDetalhes } from './pages/CursoDetalhes/CursoDetalhes';
import { CursoInscrito } from './components/CursoInscrito/CursoInscrito';
import { Home } from './pages/Home/Home'

function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [estaLogado, setEstaLogado] = useState(false);

  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUsuarioLogado(user);
      setEstaLogado(!!user);
      setCarregando(false);
    });
  }, []);

  if (carregando) {
    return (
      <>
        <Container className=" d-flex flex-column  justify-content-center align-items-center mt-5">
          <img src={logo} alt="Imagem da logo EducaWeb" className="img-fluid"/>
          <h4>Aguarde um momento por favor </h4>
          <h5 className="ms-1">Carregando...</h5>
          <Loader />
        </Container>
      </>
    );
  }

  return (
    <>
      <AuthContext.Provider value={usuarioLogado}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Root />}>
              <Route path="/cursos" element={<Cursos />} />
              <Route path="/cursos/inscritos" element={<CursoInscrito />} />
              <Route path="/perfil/editar" element={<EditarPerfil />} />
              <Route path="/listadesejos" element={<ListaDesejos />} />
              <Route path="/criador/cursos/novo" element={<AdicionarCurso />} />
              <Route path="/curso/:idCurso" element={<CursoDetalhes />} />

              <Route path="/perfil" element={<Perfil />} />

              <Route path="/" element={<Home />} />

              <Route path="/areacriador" element={<AreaCriador />} />
              <Route path="/perfil" element={<Perfil />} />

              <Route
                path="/curso/:idCurso/aula/:idAula"
                element={<PaginaAula />}
              />
            </Route>
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/EsqueciSenha" element={<EsqueciSenha />} />
            <Route path="*" element={<NotFound />} />
            <Route
              path="/cadastro"
              element={!estaLogado ? <Cadastro /> : <Navigate to="/" replace />}
            />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
      <Toaster />
    </>
  );
}

export default App;
