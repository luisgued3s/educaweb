import React, { useState, useEffect } from "react";
import {
  adicionarComentario,
  listarComentarios,
} from "../../firebase/comentario";
import { toast } from "react-hot-toast";
import { Button } from "react-bootstrap";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";

export const Comentarios = () => {
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState("");
  const [uidUsuario, setUidUsuario] = useState(null);

 
  function onSubmit() {
    if (novoComentario.trim() !== "") {
      const novoComentarioObj = { comentario: novoComentario }; // cria um objeto para o novo comentário
      adicionarComentario(novoComentarioObj)
        .then(() => {
          setComentarios([...comentarios, novoComentarioObj]); // atualiza a lista de comentários com o novo comentário
          setNovoComentario("");
        })
        .catch((error) => {
          toast.error(`um erro aconteceu ${error}`);
        });
    }
  }
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      console.log(user);
      setUidUsuario(user.uid);
  });

    listarComentarios()
      .then((resposta) => {
        console.log(resposta)
        if (resposta) {
          setComentarios([...novoComentario, ...resposta]);
        } else {
          console.error("Dados de comentários inválidos:", resposta);
        }
      })
      .catch((error) => {
        console.error("Erro ao obter comentários:", error);
      });
  }, []);
  
  return (
    <div>
      <div>
        <textarea
          rows="4"
          cols="50"
          value={novoComentario}
          onChange={(e) => setNovoComentario(e.target.value)}
        ></textarea>
        <br />
        <Button onClick={onSubmit}>Adicionar Comentário</Button>
      </div>
      <div>
        <h2>Comentários:</h2>
        {comentarios.length === 0 ? (
          <p>Nenhum comentário ainda.</p>
        ) : (
          <ul>
            {comentarios.map((comentario, index) => (
              <li key={index}>{comentario.comentario}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
            }