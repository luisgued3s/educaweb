import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form, FormSelect } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { publicarDespublicarCurso, updateCurso } from "../../../firebase/cursos";
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import './Modals.css';


function DeleteCursoModal({ curso }) {
  const { control, register, handleSubmit, formState: { errors } } = useForm();
  const [show, setShow] = useState(false);
  const [changeActive, setChangeActive] = useState(curso.active);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = () => {
    setChangeActive(!changeActive);
    publicarDespublicarCurso(curso.id, { active: !changeActive });
    handleClose();
    handleToast();
  };

  const handleToast = () => {
    toast.success(changeActive ? "Curso despublicado com sucesso!" : "Curso publicado com sucesso!", {
      position: "top-center",
      duration: 2500
    })
  }

  return (
    <>
      <Button variant="primary" size="lg" onClick={handleShow}>
        {changeActive ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
        {changeActive ? `Despublicar` : `Publicar`}
      </Button>

      <Modal className='modalBody' show={show} centered onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="modalText">Deletar uma aula</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalText">
          Tem certeza que deseja {changeActive ? "despublicar" : "publicar"} o curso <b>{curso.titulo}</b>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="warning" type="submit" onClick={() => handleDelete()}>
            {changeActive ? "Despublicar" : "Publicar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteCursoModal;