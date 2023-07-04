import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form, FormSelect } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { updatecurso, addAulaCurso } from "../../../firebase/cursos";
import { AiOutlinePlus } from 'react-icons/ai';
import './Modals.css';

function AddAulaModal({curso}) {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleButtonSubmit = async (data) => {    
    await addAulaCurso(curso.id, data);
    handleToast();
    setShow(false);
  }

  const handleCloseCancel = () => {
    setShow(false);
  }

  const handleToast = () => {
    toast.success('Aula adicionada com sucesso!', {
      position: "top-center",
      duration: 2500
  })
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
      <AiOutlinePlus /> Aula
      </Button>

      <Modal className="modalBody" show={show} centered onHide={handleCloseCancel}>
        <Modal.Header closeButton>
          <Modal.Title className="modalText">Adicionar uma nova aula no curso <b>{curso.titulo}</b></Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit((data) => handleButtonSubmit(data))}>
        <Modal.Body>
        <Form.Group className="mb-3">
                <Form.Label className="label">Título da aula</Form.Label>
                <Form.Control type="text" className={errors.titulo && "is-invalid"} 
                                {...register("titulo", { required: "O nome da aula é obrigatório!", 
                                maxLength: { value: 255, message: "Limite de 255 caracteres!" } })} />
                <Form.Text className="invalid-feedback">
                  {errors.titulo?.message}
                </Form.Text>
                </Form.Group>
            
              <Form.Group className="mb-3">
                <Form.Label className="label">Descrição</Form.Label>
                <Form.Control type="text" className={errors.descricao && "is-invalid"} 
                                {...register("descricao", { required: "A descrição é obrigatória!", 
                                maxLength: { value: 255, message: "Limite de 255 caracteres!" } })} />
                <Form.Text className="invalid-feedback">
                  {errors.descricao?.message}
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label className="label">Faça upload do vídeo</Form.Label>
                <Form.Control type="file" accept="video/mp4" className={errors.video && "is-invalid"} 
                                {...register("video", { required: "O vídeo é obrigatório!", 
                                maxLength: { value: 255, message: "Limite de 255 caracteres!" } })} />
                  <Form.Text className="invalid-feedback">
                  {errors.video?.message}
                </Form.Text>
                </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCancel}>
            Cancelar
          </Button>
          <Button variant="warning" type="submit">
             Inserir nova aula
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default AddAulaModal;