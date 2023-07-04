import React from 'react';
import "./Card.css";
import { toast } from "react-hot-toast";
import AddAulaModal from "../Modals/Dashboard/addAula";
import DeleteAulaModal from "../Modals/Dashboard/deleteAula";
import DeletarCursoModal from "../Modals/Dashboard/deleteCurso";
import EditarCursoModal from "../Modals/Dashboard/editCurso";
import { Link } from "react-router-dom"

export function Card({curso}) {

  return (
    
    <div className="cardCursoCreator">
        <Link to={`/curso/${curso.id}`}>
            <div className="cardCursoImg">
                <img src={curso.urlCapa}/>
            </div>
        </Link>
        <div className="cardCursoText">
            <h4>{curso.titulo}</h4>
            <div className="cardCursoBadge">
                <span>{curso.categoria}</span>
            </div>
            <h5>{curso.descricao}</h5>
        </div>
        <div>
            <div className="cardCursoButtons">
                <AddAulaModal curso={curso} />
                <DeleteAulaModal curso={curso}/>
                <EditarCursoModal curso={curso} />
            </div>
            <div className="d-grid">
                <DeletarCursoModal curso={curso}/>
            </div>
        </div>
    </div>
    
  )
}