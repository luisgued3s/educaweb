import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCursoById, inscreverCurso } from "../../firebase/cursos";
import { auth } from "../../firebase/config";
import { addDesejos, getUsuario, removeDesejos } from "../../firebase/usuarios";
import { Loader } from "../../components/Loader/Loader";
import "./CursoDetalhes.css";
import { toast } from "react-hot-toast";
import {
  adicionarComentario,
  listarComentarios,
} from "../../firebase/cursos";
import { atualizarMediaAvaliacoes } from "../../firebase/cursos";
import { onAuthStateChanged } from "firebase/auth";
import { DetalhesCursoNaoInscrito } from "../../components/DetalhesCursoNaoInscrito/DetalhesCursoNaoInscrito";
import { DetalhesCursoInscrito } from "../../components/DetalhesCursoInscrito/DetalhesCursoInscrito";

export function CursoDetalhes() {
  const { idCurso } = useParams();
  const [curso, setCurso] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cursoDesejado, setCursoDesejado] = useState(false);
  const [comentarios, setComentarios] = useState([]);
  const [comentarioTexto, setComentarioTexto] = useState("");
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [mediaAvaliacoes, setMediaAvaliacoes] = useState(0);
  const [uidUsuario, setUidUsuario] = useState(null)
  const [cursosDoUsuario, setCursosDoUsuario] = useState([])

  useEffect(() => {
    async function buscarAvaliacoes() {
      // Obter as avaliações do curso
      const avaliacoesDoCurso = curso.avaliacoes || [];

      // Calcular a média das avaliações
      const somaAvaliacoes = avaliacoesDoCurso.reduce(
        (soma, avaliacao) => soma + avaliacao.nota,
        0
      );
      const novaMedia = avaliacoesDoCurso.length
        ? somaAvaliacoes / avaliacoesDoCurso.length
        : 0;

      setAvaliacoes(avaliacoesDoCurso);
      setMediaAvaliacoes(novaMedia);
      await atualizarMediaAvaliacoes(idCurso, novaMedia); // Atualizar a média no Firebase
    }

    if (curso) {
      buscarAvaliacoes();
    }
  }, [curso, idCurso]);

  useEffect(() => {
    async function buscarCurso() {
      const cursoData = await getCursoById(idCurso);
      const comentariosData = await listarComentarios(idCurso);

      setComentarios(comentariosData);
      setCurso(cursoData);
      setLoading(false);
    }
    buscarCurso();
  }, [idCurso]);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUidUsuario(user.uid)
    })
  }, [])

  const determinarInscricao = async () => {
    if(uidUsuario){
    const usuario = await getUsuario(uidUsuario)
    const { cursos } = usuario
    let cursosEncontrados = []
    if (cursos) {
      cursos.forEach(curso => {
        cursosEncontrados.push(curso.id)
      })
      setCursosDoUsuario(cursosEncontrados)
    }}
  }

  useEffect(() => {
    determinarInscricao()
  }, [uidUsuario])

  const determinarDesejos = async () => {
    if(uidUsuario){
    const usuario = await getUsuario(uidUsuario)
    const { listaDesejos } = usuario
    if (listaDesejos.includes(idCurso))
      setCursoDesejado(true)
  }}

  useEffect(() => {
    determinarDesejos()
  }, [uidUsuario])

  if (loading) {
    return <Loader />;
  }

  if (!curso) {
    return <div>O curso não foi encontrado.</div>;
  }

  const formatarData = (data) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const dataFormatada = new Date(data.seconds * 1000).toLocaleDateString(
      undefined,
      options
    );
    return dataFormatada;
  };

  const adicionarListaDesejos = async () => {
    const userId = auth.currentUser.uid;
    const cursoId = idCurso;

    if (cursoDesejado) {
      const estadoBotao = await removeDesejos(userId, cursoId);
      if (estadoBotao) {
        toast.success("Curso removido da lista de desejos!");
        setCursoDesejado(false);
      } else {
        toast.error("Erro ao remover o curso da lista de desejos.");
      }
    } else {
      const estadoBotao = await addDesejos(userId, cursoId);
      if (estadoBotao) {
        toast.success("Curso adicionado à lista de desejos!");
        setCursoDesejado(true);
      } else {
        toast.error("Erro ao adicionar o curso à lista de desejos.");
      }
    }
  };

  const inscrever = async () => {
    await inscreverCurso(idCurso, curso);
    determinarInscricao()
  };

  const handleComentarioChange = (event) => {
    setComentarioTexto(event.target.value);
  };

  const enviarComentario = async () => {
    const usuario = await getUsuario(uidUsuario)
    const { nome } = usuario
    const novoComentario = {
      comentario: {
        usuario: {
          idUsuario: uidUsuario,
          nome: nome
        },
        comentario: comentarioTexto,
        dataComentario: new Date(),
      },
    };

    await adicionarComentario(idCurso, novoComentario);
    setComentarioTexto("");

    // Atualize o estado local, adicionando o novo comentário à lista de comentários
    setComentarios([...comentarios, novoComentario]);
  };

  const adicionarAvaliacao = async (novaAvaliacao) => {
    await adicionarAvaliacao(novaAvaliacao); // Função para adicionar a avaliação no Firebase
    setAvaliacoes([...avaliacoes, novaAvaliacao]);

    const somaAvaliacoes = avaliacoes.reduce(
      (soma, avaliacao) => soma + avaliacao.nota,
      0
    );
    const novaMedia =
      (somaAvaliacoes + novaAvaliacao.nota) / (avaliacoes.length + 1);
    setMediaAvaliacoes(novaMedia);

    await atualizarMediaAvaliacoes(idCurso, novaMedia); // Atualizar a média no Firebase
  };

  console.log(cursosDoUsuario)

  if (cursosDoUsuario.indexOf(idCurso) !== -1) {
    return <DetalhesCursoInscrito curso={curso} formatarData={formatarData} adicionarAvaliacao={adicionarAvaliacao} mediaAvaliacoes={mediaAvaliacoes} comentarioTexto={comentarioTexto} handleComentarioChange={handleComentarioChange} enviarComentario={enviarComentario} comentarios={comentarios} idCurso={idCurso} />
  } else {
    return <DetalhesCursoNaoInscrito curso={curso} inscrever={inscrever} adicionarListaDesejos={adicionarListaDesejos} cursoDesejado={cursoDesejado} formatarData={formatarData} mediaAvaliacoes={mediaAvaliacoes} comentarios={comentarios} />
  }
}
