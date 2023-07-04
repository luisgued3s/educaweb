import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form, FormSelect } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { updateCurso } from "../../../firebase/cursos";
import { BsPencilSquare } from 'react-icons/bs';
import './Modals.css';


function EditarCursoModal({ curso }) {

  const { control, register, handleSubmit, formState: { errors } } = useForm();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleEdit = async (data) => {
    try {
      await updateCurso(curso.id, data)
      toast.success("Curso editado com sucesso!", {
        position: "top-center",
        duration: 2500
      })
      handleClose();
    } catch (erro) {
      toast.error(erro, {
        position: "top-center",
        duration: 2500
      })
    }
  }

  // const handleToast = () => {
  //   toast.success("Curso editado com sucesso!", {
  //     position: "top-center",
  //     duration: 2500
  //   });
  // }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <BsPencilSquare /> Curso
      </Button>

      <Modal className='modalBody' show={show} centered onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="modalText">Edite as informações do curso <b>{curso.titulo}</b></Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit((data) => handleEdit(data))}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="label">Título do Curso</Form.Label>
              <Form.Control type="text" {...register("titulo")} defaultValue={curso.titulo} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="label">Descrição</Form.Label>
              <Form.Control type="text" {...register("descricao")} defaultValue={curso.descricao} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="label">Categoria</Form.Label>
              <Form.Control type="text" {...register("categoria")} defaultValue={curso.categoria} />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label className="label">Faça upload da nova capa</Form.Label>
              <Form.Control type="file" {...register("capa")} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="warning" type="submit">
              Editar curso
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default EditarCursoModal;