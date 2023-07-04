import {
  createUserWithEmailAndPassword,
  TwitterAuthProvider,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  updateEmail,
} from "firebase/auth";
import { auth } from "./config";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { usuariosCollection, cursosCollection } from "./collections";
// import { getCursos } from "./cursos";

export async function cadastrarUsuario(email, senha, nome, uid, fotoPerfil) {
  let authUser;
  if (uid) {
    authUser = { user: { uid } };
  } else {
    authUser = await createUserWithEmailAndPassword(auth, email, senha);
  }
  await updateProfile(authUser.user, { displayName: nome });

  const novoUsuarioData = {
    nome: nome,
    telefone: "",
    dataNascimento: "",
    formacaoAcademica: "",
    urlFoto: fotoPerfil || "",
    cursos: [],
    biografia: ""
  };

  try {
    const novoUsuarioRef = doc(usuariosCollection, authUser.user.uid);
    await setDoc(novoUsuarioRef, novoUsuarioData);
  } catch (error) {
    console.error(error);
    // Exiba ou registre o erro para fins de depuração
  }
}

export async function atualizarFotoPerfil(uid, fotoPerfil) {
  const usuarioRef = doc(usuariosCollection, uid);
  await updateDoc(usuarioRef, { fotoPerfil: fotoPerfil });
}

export async function cadastrarEmailSenha(email, senha) {
  const resultado = await createUserWithEmailAndPassword(auth, email, senha);
  return resultado.user;
}

export async function loginGoogle() {
  const provider = new GoogleAuthProvider();
  const resultado = await signInWithPopup(auth, provider);

  const user = resultado.user;
  const nome = user.displayName;

  if (nome) {
    const usuarioRef = doc(usuariosCollection, user.uid);
    const usuarioSnapshot = await getDoc(usuarioRef);

    if (!usuarioSnapshot.exists()) {
      const novoUsuarioData = { nome };
      await setDoc(usuarioRef, novoUsuarioData);
    }
  }

  return user;
}

export async function loginTwitter() {
  const provider = new TwitterAuthProvider();  
  const resultado = await signInWithPopup(auth, provider);

  const user = resultado.user;
  const nome = user.displayName;

  if (nome) {
    const usuarioRef = doc(usuariosCollection, user.uid);
    const usuarioSnapshot = await getDoc(usuarioRef);

    if (!usuarioSnapshot.exists()) {
      const novoUsuarioData = { nome };
      await setDoc(usuarioRef, novoUsuarioData);
    }
  }

  return user;
}

export async function loginEmailSenha(email, senha) {
  const resultado = await signInWithEmailAndPassword(auth, email, senha);
  const usuarioRef = doc(usuariosCollection, resultado.user.uid);
  const snapshot = await getDoc(usuarioRef);
  const dadosUsuario = snapshot.data();
  return { ...resultado.user, nome: dadosUsuario.nome };
}

export async function logout() {
  await signOut(auth);
}

export async function atualizarPerfil(data) {
  const usuarioRef = doc(usuariosCollection, auth.currentUser.uid);
  const usuarioSnapshot = await getDoc(usuarioRef);
  const usuarioData = usuarioSnapshot.data();

  const updateData = {};

  const camposAtualizaveis = [
    'nome',
    'dataNascimento',
    'formacaoAcademica',
    'telefone',
    'biografia',
    'listaDesejos'
  ];

  camposAtualizaveis.forEach(campo => {
    if (data[campo]) {
      updateData[campo] = data[campo];
    } else if (usuarioData[campo]) {
      updateData[campo] = usuarioData[campo];
    }
  });

  await updateDoc(usuarioRef, updateData);
}

export async function deletUsuario(user) {
  const resultado = await user.delete();
  return resultado.user;
}

export async function resetarSenha(email) {
  await sendPasswordResetEmail(auth, email);
}

export async function updateUsuario(user, newEmail) {
  await updateEmail(user, newEmail.email);
}

export async function atualizarEmail(user, email) {
  try {
    await auth.updateEmail(user, email);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getUsuario(id) {
  const usuario = await getDoc(doc(usuariosCollection, id));
  return { ...usuario.data(), id: usuario.id };
}


// Get para a lista de desejos
export async function getCursosDesejados(userId) {
  const cursosDesejados = [];

  try {
    const usuarioRef = doc(usuariosCollection, userId);
    const usuarioSnapshot = await getDoc(usuarioRef);
    const usuarioData = usuarioSnapshot.data();

    if (usuarioData && usuarioData.listaDesejos) {
      const listaDesejos = usuarioData.listaDesejos;

      for (const cursoId of listaDesejos) {
        const cursoRef = doc(cursosCollection, cursoId);
        const cursoSnapshot = await getDoc(cursoRef);
        const cursoData = cursoSnapshot.data();
        const cursoTitulo = cursoData.titulo;

      
        if (cursoData) {
          const curso = {
            id: cursoSnapshot.id,
            titulo: cursoTitulo,
            nome: cursoData.nome,
            autor: cursoData.autor,
            avaliacao: cursoData.avaliacao,
          };
      
          cursosDesejados.push(curso);
        }
      }
    }
  } catch (error) {
    console.error(error);
  }

  return cursosDesejados;
} 

// Adicionar para a lista de desejos

export async function addDesejos(userId, cursoId) {
  try {
    const usuarioRef = doc(usuariosCollection, userId);
    const usuarioSnapshot = await getDoc(usuarioRef);
    const usuarioData = usuarioSnapshot.data();

    if (!usuarioData.listaDesejos) {
      usuarioData.listaDesejos = [];
    }

    // Verifica se o curso já está na lista de desejos
    if (!usuarioData.listaDesejos.includes(cursoId)) {
      usuarioData.listaDesejos.push(cursoId);
    }

    await updateDoc(usuarioRef, {
      listaDesejos: usuarioData.listaDesejos
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// Remover da lista de desejos

export async function removeDesejos(userId, cursoId) {
  try {
    const usuarioRef = doc(usuariosCollection, userId);
    const usuarioSnapshot = await getDoc(usuarioRef);
    const usuarioData = usuarioSnapshot.data();

    if (!usuarioData.listaDesejos) {
      return true; 
    }

    // Verifica se o curso já está na lista de desejos
    const index = usuarioData.listaDesejos.indexOf(cursoId);
    if (index !== -1) {
      usuarioData.listaDesejos.splice(index, 1);
    }

    await updateDoc(usuarioRef, {
      listaDesejos: usuarioData.listaDesejos
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function updateCheckAula(idAula, cursoId) {
  const usuarioRef = doc(usuariosCollection, auth.currentUser.uid);
  const usuarioSnapshot = await getDoc(usuarioRef);
  const usuarioData = usuarioSnapshot.data()
  let cursos = usuarioData.cursos;
  cursos.map(curso => {
    if (curso.id === cursoId) {
      let aulasTotais = curso.aulas.length;
      curso.aulas.map(aula => {
        if (aula.id === idAula){
          aula.concluida = true;
        }
      })
      let aulasConcluidas = curso.aulas.filter(aula => aula.concluida === true);
      if (aulasTotais === aulasConcluidas.length) {
        curso.finalizado = true;
      }
    }
  })
  await updateDoc(usuarioRef, {cursos});
}
