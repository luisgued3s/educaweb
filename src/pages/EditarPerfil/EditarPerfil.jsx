import React, { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import {
  atualizarPerfil,
  resetarSenha,
  updateUsuario,
} from "../../firebase/usuarios";
import { auth } from "../../firebase/config";
import { usuariosCollection } from "../../firebase/collections";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./EditarPerfil.css";

export function EditarPerfil() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const usuarioLogado = useContext(AuthContext);
  const [usuario, setUsuario] = useState(null);
  const [dadosUsuario, setDadosUsuario] = useState(null);
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);
  const [perfilAtualizado, setPerfilAtualizado] = useState(false);

  useEffect(() => {
    reset(usuarioLogado);
    setDadosUsuario(usuarioLogado);
  }, [reset, usuarioLogado]);

  useEffect(() => {
    async function buscarDadosUsuario() {
      const usuarioRef = doc(usuariosCollection, auth.currentUser.uid);
      const snapshot = await getDoc(usuarioRef);
      const dadosUsuario = snapshot.data();
      setUsuario(dadosUsuario);
    }

    buscarDadosUsuario();
  }, []);

  useEffect(() => {
    if (dadosUsuario) {
      setValue("nome", dadosUsuario.nome || "");
      setValue("dataNascimento", dadosUsuario.dataNascimento || "");
      setValue("formacaoAcademica", dadosUsuario.formacaoAcademica || "");
      setValue("telefone", dadosUsuario.telefone || "");
      setValue("biografia", dadosUsuario.biografia || "");
    }
  }, [dadosUsuario, setValue]);

  function atualizarPerfilHandler(data) {
    const telefoneValue = data.telefone.replace(/[^0-9]/g, "");

    if (telefoneValue.length === 0 || telefoneValue.length === 11) {
      atualizarPerfil(auth.currentUser, data)
        .then(() => {
          setPerfilAtualizado(true);
          toast.success("Perfil atualizado com sucesso!");
          setRedirect(true);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      toast.error("O telefone deve ter exatamente 11 dígitos ou estar vazio.");
    }
  }

  function resetarSenhaHandler() {
    resetarSenha(auth.currentUser.email)
      .then(() => {
        toast.success(
          "Um email para redefinir a senha foi enviado para o seu endereço de email."
        );
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  function onSubmit(data) {
    if (data.email) {
      updateUsuario(usuarioLogado, data)
        .then(() => {
          toast.success(
            "Email editado com sucesso! Um Email de confirmação foi enviado."
          );
          setRedirect(true);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      toast.error("Por favor, preencha o campo de novo email.");
    }
  }

  useEffect(() => {
    if (redirect && Object.keys(errors).length === 0 && perfilAtualizado) {
      const timer = setTimeout(() => {
        navigate("/perfil");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [redirect, errors, navigate, perfilAtualizado]);

  if (!dadosUsuario) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="perfil mb-4" style={{minHeight:"100vh"}}>
      <div className="container">
        <div className="editarPerfil">
          <h4>Editar Perfil</h4>

          <Form onSubmit={handleSubmit(atualizarPerfilHandler)}>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                {...register("nome", { maxLength: 130 })}
                defaultValue={dadosUsuario.nome}
                className={errors.nome ? "is-invalid" : ""}
              />
              {errors.nome && errors.nome.type === "maxLength" && (
                <span className="text-danger">
                  O nome deve ter no máximo 130 caracteres
                </span>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control
                type="date"
                {...register("dataNascimento")}
                defaultValue={dadosUsuario.dataNascimento}
                className={errors.dataNascimento ? "is-invalid" : ""}
              />
              {errors.dataNascimento && (
                <span className="text-danger">
                  A data de nascimento é obrigatória
                </span>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Formação Acadêmica</Form.Label>
              <Form.Select
                {...register("formacaoAcademica")}
                defaultValue={dadosUsuario.formacaoAcademica}
                className={errors.formacaoAcademica ? "is-invalid" : ""}
              >
                <option value="fundamental">Fundamental</option>
                <option value="médio">Médio</option>
                <option value="superior-incompleto">Superior Incompleto</option>
                <option value="superior-completo">Superior Completo</option>
                <option value="pós-graduação">Pós-graduação</option>
              </Form.Select>
              {errors.formacaoAcademica && (
                <span className="text-danger">
                  A formação acadêmica é obrigatória
                </span>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="text"
                {...register("telefone")}
                value={dadosUsuario.telefone || ""}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  const mascaraTel = value.replace(
                    /(\d{2})(\d{1})(\d{4})(\d{4})/,
                    "($1) $2 $3-$4"
                  );
                  setValue("telefone", mascaraTel, { shouldValidate: true });
                }}
                isInvalid={!!errors.telefone}
              />
              {errors.telefone && (
                <Form.Control.Feedback type="invalid">
                  O telefone deve ter exatamente 11 dígitos ou estar vazio.
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Biografia</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                {...register("biografia")}
                defaultValue={dadosUsuario.biografia}
              />
            </Form.Group>
            <Button className="perfilButton" variant="primary" type="submit">
              Editar
            </Button>
          </Form>

          <div className="dadosAcesso mt-4">
            <h4>Dados de acesso</h4>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Label>Nova Senha</Form.Label>
              <Button
                className="mb-4 perfilButton"
                onClick={resetarSenhaHandler}
              >
                Redefinir Senha
              </Button>
              <Form.Group>
                <Form.Label>Novo Email</Form.Label>
                <Form.Control
                  type="email"
                  {...register("email")}
                  defaultValue={dadosUsuario.email}
                  className={errors.email ? "is-invalid" : ""}
                />
                {errors.email && (
                  <span className="text-danger">
                    O novo email é obrigatório
                  </span>
                )}
              </Form.Group>
              <Button className="perfilButton" onClick={handleSubmit(onSubmit)}>
                Redefinir Email
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
