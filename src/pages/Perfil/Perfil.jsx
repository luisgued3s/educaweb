import { React, useState, useEffect } from "react";
import { Badge, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth, storage } from "../../firebase/config";
import { usuariosCollection } from "../../firebase/collections";
import { doc, getDoc } from "firebase/firestore";
import "./Perfil.css";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { atualizarFotoPerfil } from "../../firebase/usuarios";

export function Perfil() {
  
  const [usuario, setUsuario] = useState(null);
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [fotoPerfilAlterada, setFotoPerfilAlterada] = useState(false);

  useEffect(() => {
    async function buscarDadosUsuario() {
      const usuarioRef = doc(usuariosCollection, auth.currentUser.uid);
      const snapshot = await getDoc(usuarioRef);
      const dadosUsuario = snapshot.data();
      setUsuario(dadosUsuario);
      setFotoPerfil(dadosUsuario.fotoPerfil);
    }

    buscarDadosUsuario();
  }, []);

  function adicionarFoto(file) {
    const storageRef = ref(
      storage,
      `fotos-perfil/${auth.currentUser.uid}/${file.name}`
    );
    const imagem = uploadBytes(storageRef, file);
    imagem
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          atualizarFotoPerfil(auth.currentUser.uid, url)
            .then(() => {
              setFotoPerfil(url);
              setFotoPerfilAlterada(true);
            })
            .catch((error) => {
              console.error(error);
            });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    if (fotoPerfilAlterada) {
      window.location.reload();
    }
  }, [fotoPerfilAlterada]);

  if (!usuario) {
    return <div>Carregando...</div>;
  }
  return (
    <div className="container" style={{ minHeight: "100vh" }}>
      <div
        className="foto-container mt-4"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <img
          src={usuario.fotoPerfil}
          alt="Foto de perfil"
          className="foto-perfil"
        />
        <button
          className="addImagem"
          onClick={() => document.getElementById("input-file").click()}
        >
          <i className="bi bi-camera-fill"></i> Alterar foto
        </button>
        <input
          id="input-file"
          type="file"
          onChange={(e) => adicionarFoto(e.target.files[0])}
          style={{ display: "none" }}
        />
        <div className="tabelaDados mt-4 mb-4">
          <Table style={{ backgroundColor: "#3f3d40", color: "white", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td style={{ border: "none" }}>Nome:</td>
                <td style={{ border: "none" }}>{usuario.nome}</td>
              </tr>
              <tr>
                <td style={{ border: "none" }}>Data de nascimento:</td>
                <td style={{ border: "none" }}>
                  {new Date(usuario.dataNascimento).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                </td>

              </tr>


              <tr>
                <td style={{ border: "none" }}>Formação acadêmica:</td>
                <td style={{ border: "none" }}>{usuario.formacaoAcademica}</td>
              </tr>
              <tr>
                <td style={{ border: "none" }}>Telefone:</td>
                <td style={{ border: "none" }}>{usuario.telefone}</td>
              </tr>
              <tr>
                <td style={{ border: "none" }}>Biografia:</td>
                <td style={{ border: "none", maxWidth: "500px" }}>{usuario.biografia}</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="botoes">
          <Button
            as={Link}
            to={"/perfil/editar"}
            className="bi bi-person-fill perfilButton"
            style={{
              color: "#fff",
              backgroundColor: "#bf9460",
              borderColor: "#bf9460",
            }}
          >
            {" "}
            Editar perfil
          </Button>{" "}
        </div>
      </div>
    </div>
  );
}
