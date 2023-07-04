import { collection } from "firebase/firestore"

import { db } from "./config"

export const usuariosCollection = collection(db, "usuarios")
export const cursosCollection = collection(db, "cursos")