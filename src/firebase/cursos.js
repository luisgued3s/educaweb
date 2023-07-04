import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { cursosCollection, usuariosCollection } from "./collections";
import { auth, storage } from "./config"
import { toast } from "react-hot-toast";
import { nanoid } from "nanoid";

export async function addCurso(data) {
  await addDoc(cursosCollection, data);
}

export async function getCursos() {
  const snapshot = await getDocs(cursosCollection);
  let cursos = [];
  snapshot.forEach(doc => {
    const data = { ...doc.data(), id: doc.id };
    cursos.push(data);
  })
  return cursos;
}

export async function getCurso(id) {
  const document = await getDoc(doc(cursosCollection, id));
  return { ...document.data(), id: document.id };
}

export async function publicarDespublicarCurso(idCurso, data) {
  await updateDoc(doc(cursosCollection, idCurso),data)
}

export async function atualizarCurso(idCurso, data) {
  await updateDoc(doc(cursosCollection, idCurso), data)
}

export async function updateCurso(id, data) {
  if (data.capa.length > 0) {
    const toastId = toast.loading("Fazendo upload da nova capa", {
      position: "top-center"
    })
    data.urlCapa = await uploadCapaCurso(data.capa[0]);
    delete data.capa
    toast.dismiss(toastId)
  } else {
    delete data.capa
  }
  const toastId = toast.loading("Editando informações do curso", {
    position: "top-center"
  })
  await updateDoc(doc(cursosCollection, id), data);
  toast.dismiss(toastId)
}

export async function addAulaCurso(id, data) {       // Função criada para adicionar aula com vídeo
  const toastId = toast.loading("Fazendo upload de Aula", {
    position: "top-center"
  })
  const document = await getDoc(doc(cursosCollection, id));
  const filename = data.video.item(0).name;
  const videoRef = ref(storage, `cursos/${filename}`);
  const result = await uploadBytes(videoRef, data.video.item(0), { contentType: "video/mp4" });
  data.video = await getDownloadURL(result.ref);
  data.id = nanoid();
  let documentData = document.data();
  let aulas = [];
  documentData.aulas.forEach(aula => {
    aulas.push(aula);
  })
  aulas.push(data);
  await updateDoc(doc(cursosCollection, id), { aulas });
  toast.dismiss(toastId)
}

export async function deleteAula(id, data) {
  const document = await getDoc(doc(cursosCollection, id));
  const documentData = document.data();
  let aulas = [];
  documentData.aulas.forEach(aula => {
    if (aula.id !== data.aula) {
      aulas.push(aula);
    }
  })
  await updateDoc(doc(cursosCollection, id), { aulas });
  return aulas;
}

export async function deleteCurso(id) {
  await deleteDoc(doc(cursosCollection, id));
}

export async function uploadCapaCurso(imagem) {
  const filename = imagem.name + Date.now();
  const imageRef = ref(storage, `cursos/capas/${filename}`);
  const result = await uploadBytes(imageRef, imagem);
  return await getDownloadURL(result.ref);
}

export async function uploadVideoAula(video) {
  const filename = video.name + Date.now();
  const videoRef = ref(storage, `cursos/videoAulas/${filename}`);
  const result = await uploadBytes(videoRef, video);
  return await getDownloadURL(result.ref);
}

export async function getCursoById(id) {
  const document = await getDoc(doc(cursosCollection, id));
  return { ...document.data(), id: document.id };
}

export async function inscreverCurso(idCurso, curso) {
  const userId = auth.currentUser.uid;
  const usuarioRef = doc(usuariosCollection, userId);
  const usuarioSnapshot = await getDoc(usuarioRef);
  const usuarioData = usuarioSnapshot.data();

  // Verifica se o usuário já está inscrito no curso
  const cursoInscrito = usuarioData.cursos && usuarioData.cursos.find(curso => curso.id === idCurso);
  if (cursoInscrito) {
    toast.error("Você já está inscrito neste curso.");
    return;
  }

  // Inicializa a propriedade 'cursos' como um array vazio caso ainda não exista
  if (!usuarioData.cursos) {
    usuarioData.cursos = [];
  }

  const novoCurso = {
    id: idCurso,
    titulo: curso.titulo,
    aulas: curso.aulas,
    finalizado: false,
    dataInicio: new Date(),
    dateTermino: null
  };

  usuarioData.cursos.push(novoCurso);

  await updateDoc(usuarioRef, {
    cursos: usuarioData.cursos
  });

  toast.success("Inscrição no curso realizada com sucesso!");
}

export async function adicionarAvaliacao(dadosDoDocumento, idCurso) {
  const cursoRef = doc(cursosCollection, idCurso);
  const cursoSnapshot = await getDoc(cursoRef);

  if (!cursoSnapshot.exists()) {
    throw new Error("Curso não encontrado.");
  }

  const cursoData = cursoSnapshot.data();
  const avaliacoes = cursoData.avaliacoes || []; // Verifica se o curso já possui avaliações

  avaliacoes.push(dadosDoDocumento);

  await updateDoc(cursoRef, {
    avaliacoes: avaliacoes,
  });
}


export async function atualizarMediaAvaliacoes(idCurso, novaMedia) {
  await updateDoc(doc(cursosCollection, idCurso), {
    mediaAvaliacoes: Number(novaMedia),
  });
}

export async function adicionarComentario(idCurso, novoComentario) {
  const cursoRef = doc(cursosCollection, idCurso);

  await updateDoc(cursoRef, {
    comentarios: arrayUnion(novoComentario)
  });
}

export async function listarComentarios(idCurso) {
  const cursoRef = doc(cursosCollection, idCurso);
  const cursoSnapshot = await getDoc(cursoRef);

  if (cursoSnapshot.exists()) {
    const cursoData = cursoSnapshot.data();
    return cursoData.comentarios || [];
  }

  return [];
}



