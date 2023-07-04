import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form, FormSelect } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { updateCurso, deleteAula } from "../../../firebase/cursos";
import { BsFillTrashFill } from 'react-icons/bs';
import './Modals.css';


function DeleteAulaModal({curso}) {

  const { control, register, handleSubmit, formState: { errors } } = useForm();

  const [show, setShow] = useState(false);
  const [aulas, setAulas] = useState(curso.aulas);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDeleteAula = async (data) => {
    let deletar = await deleteAula(curso.id, data);
    setAulas(deletar);
    handleClose();
    handleToast();
  }

  const handleToast = () => {
    toast.success('Aula deletada com sucesso!', {
      position: "top-center",
      duration: 2500
  })
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <BsFillTrashFill/> Aula
      </Button>

      <Modal className='modalBody' show={show} centered onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="modalText">Deletar uma aula do curso <b>{curso.titulo}</b></Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit((data) => handleDeleteAula(data))}>
        <Modal.Body>
            <Form.Group className="mb-3" >
            <Form.Label className="label">Escolha uma aula para deletar</Form.Label>
            <Form.Select {...register("aula")} required>
             <option value="">Escolha uma aula</option>
              {aulas.map((aula, index) =>
                  <option value={aula.id} key={index}>{aula.titulo}</option>
                  )}
              </Form.Select>
              </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="warning" type="submit">
            Deletar aula
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default DeleteAulaModal;