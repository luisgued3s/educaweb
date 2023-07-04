import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "./ListaDesejos.css";
import { auth } from "../../firebase/config";
import { getCursosDesejados, removeDesejos } from "../../firebase/usuarios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import "./ListaDesejos.css";
import { BiTrash } from "react-icons/bi";

export function ListaDesejos() {
  const [desejos, setDesejos] = useState([]);

  useEffect(() => {
    initializeTable();
  }, []);

  function initializeTable() {
    const userId = auth.currentUser.uid;
    getCursosDesejados(userId)
      .then((listaDesejos) => {
        setDesejos(listaDesejos.reverse());
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleDelete(id, titulo) {
    const userId = auth.currentUser.uid;
    const deletar = window.confirm(`Tem certeza que deseja excluir o curso ${titulo} da lista de desejos?`);
    if (deletar) {
      removeDesejos(userId, id)
        .then(() => {
          toast.success(`Curso "${titulo}" removido da lista de desejos!`);
          initializeTable();
        })
        .catch((error) => {
          console.error(error);
          toast.error(`Erro ao remover o curso "${titulo}" da lista de desejos.`);
        });
    }
  }

  return (
    <div style={{minHeight: "100vh"}}>
      <h1 className="text-center titulo-desejos">Lista de Desejos</h1>

      <div className="tabela d-flex justify-content-center mb-5">
        {desejos.length > 0 ? (
          <Table striped bordered responsive="md" className="text-center mt-5 mb-5 table-responsive">
            <thead>
              <tr>
                <th>Nome do Curso</th>
                <th>Autor/es</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {desejos.map((curso) => (
                <tr key={curso.id}>
                  <td>
                    <Link className="link-curso" to={`/curso/${curso.id}`}>
                      {curso.titulo}
                    </Link>
                  </td>
                  <td>{curso.autor.nome}</td>
                  <td>
                    <BiTrash
                      size={24}
                      color="red"
                      onClick={() => handleDelete(curso.id, curso.titulo)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className="text-center mt-5">Lista de desejos vazia!</p>
        )}
      </div>
    </div>
  );
}
