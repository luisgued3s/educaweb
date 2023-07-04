import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import { Button, Container, Form } from "react-bootstrap";

import { auth } from "../../firebase/config";
import { getUsuario } from "../../firebase/usuarios";
import {
  addCurso,
  uploadCapaCurso,
  uploadVideoAula,
} from "../../firebase/cursos";

import "./AdicionarCurso.css";
import { nanoid } from "nanoid";

export function AdicionarCurso() {
  const [uidUsuario, setUidUsuario] = useState(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      aulas: [
        {
          titulo: "",
          descricao: "",
          video: [],
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "aulas",
    rules: {
      required: "Cadastre ao menos uma aula no curso",
    },
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUidUsuario(user.uid);
    });
  }, []);

  const navigate = useNavigate();

  const clicarNoBotaoCadastrarCurso = (dadosDoFormulario) => {
    const imgCapa = dadosDoFormulario.imgCapa[0];
    let { aulas } = dadosDoFormulario;
    getUsuario(uidUsuario).then(async (usuario) => {
      if (aulas.length > 0) {
        for (let aula of aulas) {
          const toastId = toast.loading(
            `Fazendo upload da aula "${aula.titulo}"`,
            {
              position: "top-center",
              duration: 2500,
            }
          );
          const urlVideo = await uploadVideoAula(aula.video[0]);
          aula.urlVideo = urlVideo;
          delete aula.video;
          toast.dismiss(toastId);
        }
      }
      if (imgCapa) {
        const toastId = toast.loading("Fazendo upload da capa", {
          position: "top-center",
          duration: 2500,
        });
        const urlCapa = await uploadCapaCurso(imgCapa);
        toast.dismiss(toastId);
        dadosDoFormulario.urlCapa = urlCapa;
      } else {
        dadosDoFormulario.urlCapa =
          "https://firebasestorage.googleapis.com/v0/b/educaweb-6582d.appspot.com/o/cursos%2Fsem-capa.jpg?alt=media&token=0c91d07b-4c9c-4db8-a791-4ea6204c88ed";
      }
      delete dadosDoFormulario.imgCapa;
      const novoCurso = {
        ...dadosDoFormulario,
        categoria: categoriaSelecionada, // Adicione a categoria selecionada
        aulas,
        active: false,
        autor: {
          id: usuario.id,
          nome: usuario.nome,
        },
        dataPublicacao: new Date(),
        dataAtualizacao: new Date(),
      };
      addCurso(novoCurso)
        .then(() => {
          toast.success(`Curso adicionado com sucesso!`, {
            position: "top-center",
            duration: 2500,
          });
          navigate(`/areacriador`);
        })
        .catch((erro) => {
          toast.error(`Um erro aconteceu.`, {
            position: "top-center",
            duration: 2500,
          });
        });
    });
  };

  return (
    <div className="add-curso">
      <Container fluid="md">
        <div className="titulo mt-5 mx-4 mb-4 text-center">
          <h1>Adicionar Curso</h1>
        </div>

        <div className="formulario">
          <Form
            encType="multipart/form-data"
            onSubmit={handleSubmit(clicarNoBotaoCadastrarCurso)}
          >
            <fieldset className="mb-3">
              <Form.Group className="mb-3 mx-4">
                <Form.Label className="label">Título</Form.Label>

                <Form.Control
                  type="text"
                  className={errors.titulo && "is-invalid"}
                  placeholder="Digite aqui o título do curso"
                  {...register("titulo", {
                    required: "Título é obrigatório",
                    maxLength: {
                      value: 130,
                      message: "Limite de 130 caracteres",
                    },
                  })}
                />

                <Form.Text className="invalid-feedback">
                  {errors.titulo?.message}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3 mx-4">
                <Form.Label className="label">Descrição</Form.Label>

                <Form.Control
                  as="textarea"
                  rows={5}
                  className={errors.descricao && "is-invalid"}
                  placeholder="Digite aqui a descrição do seu curso"
                  {...register("descricao", {
                    required: "Descrição é obrigatória",
                    maxLength: {
                      value: 255,
                      message: "Limite de 255 caracteres",
                    },
                  })}
                />

                <Form.Text className="invalid-feedback">
                  {errors.descricao?.message}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3 mx-4">
                <Form.Label className="label">Categoria</Form.Label>
                <Form.Control
                  as="select"
                  className={errors.categoria && "is-invalid"}
                  {...register("categoria", {
                    required: "Categoria é obrigatória",
                  })}
                  value={categoriaSelecionada}
                  onChange={(e) => setCategoriaSelecionada(e.target.value)}
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="Desenvolvimento de Software">
                    Desenvolvimento de Software
                  </option>
                  <option value="Ciência de Dados">Ciência de Dados</option>
                  <option value="Design Gráfico">Design Gráfico</option>
                  <option value="Marketing Digital">Marketing Digital</option>
                  <option value="Gestão de Projetos">Gestão de Projetos</option>
                  <option value="Negócios">Negócios</option>
                  <option value="Finanças">Finanças</option>
                  <option value="Empreendedorismo">Empreendedorismo</option>
                  <option value="Economia">Economia</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Publicidade">Publicidade</option>
                  <option value="Redes de Computadores">
                    Redes de Computadores
                  </option>
                  <option value="Segurança da Informação">
                    Segurança da Informação
                  </option>
                  <option value="Inteligência Artificial">
                    Inteligência Artificial
                  </option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Deep Learning">Deep Learning</option>
                  <option value="Web Design">Web Design</option>
                  <option value="Desenvolvimento Web">
                    Desenvolvimento Web
                  </option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Arquitetura">Arquitetura</option>
                  <option value="Engenharia Civil">Engenharia Civil</option>
                  <option value="Engenharia Mecânica">
                    Engenharia Mecânica
                  </option>
                  <option value="Engenharia Elétrica">
                    Engenharia Elétrica
                  </option>
                  <option value="Engenharia de Software">
                    Engenharia de Software
                  </option>
                  <option value="Engenharia de Produção">
                    Engenharia de Produção
                  </option>
                  <option value="Engenharia de Alimentos">
                    Engenharia de Alimentos
                  </option>
                  <option value="Engenharia Química">Engenharia Química</option>
                  <option value="Engenharia Biomédica">
                    Engenharia Biomédica
                  </option>
                </Form.Control>
                <Form.Text className="invalid-feedback">
                  {errors.categoria?.message}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3 mx-4">
                <Form.Label>Duração</Form.Label>

                                <Form.Control type='text' className={errors.duracao && "is-invalid"} placeholder='Informe a duração do curso' {...register("duracao", {required: "A duração do curso é obrigatória", minLength: {value: 3, message: "Mínimo de 3 caracteres"}, maxLength: {value: 5, message: "Máximo de 5 caracteres"}})} />

                <Form.Text className="invalid-feedback">
                  {errors.duracao?.message}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3 mx-4">
                <Form.Label className="label">Imagem de Capa</Form.Label>

                <Form.Control
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  className={errors.imgCapa && "is-invalid"}
                  {...register("imgCapa")}
                />
                <Form.Text className="invalid-feedback">
                  {errors.imgCapa?.message}
                </Form.Text>
              </Form.Group>
            </fieldset>

            {fields.map((field, index) => {
              return (
                <fieldset key={field.id} className="add-aula mb-4">
                  <div className="titulo text-center mx-4 mb-3">
                    <h5 className="mt-3">{`Adicionar Aula ${index + 1}`}</h5>
                  </div>

                  <Form.Group className="mb-3 mx-4">
                    <Form.Label className="label">Título</Form.Label>

                    <Form.Control
                      type="text"
                      className={errors.aulas?.[index].titulo && "is-invalid"}
                      placeholder="Digite aqui o título da aula"
                      {...register(`aulas.${index}.titulo`, {
                        required: "O título da aula é obrigatório",
                        maxLength: {
                          value: 130,
                          message: "Limite de 130 caracteres",
                        },
                      })}
                    />

                    <Form.Text className="invalid-feedback">
                      {errors.aulas?.[index].titulo?.message}
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3 mx-4">
                    <Form.Label className="label">Descrição</Form.Label>

                    <Form.Control
                      as="textarea"
                      rows={3}
                      className={
                        errors.aulas?.[index].descricao && "is-invalid"
                      }
                      placeholder="Digite aqui a descrição da aula"
                      {...register(`aulas.${index}.descricao`, {
                        required: "A descrição da aula é obrigatória",
                        maxLength: {
                          value: 255,
                          message: "Limite de 255 caracteres",
                        },
                      })}
                    />

                    <Form.Text className="invalid-feedback">
                      {errors.aulas?.[index].descricao?.message}
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3 mx-4">
                    <Form.Label className="label">Arquivo de vídeo</Form.Label>

                    <Form.Control
                      type="file"
                      accept="video/*"
                      name="video"
                      className={errors.aulas?.[index].video && "is-invalid"}
                      {...register(`aulas.${index}.video`, {
                        required: "O vídeo da aula é obrigatório",
                      })}
                    />

                    <Form.Text className="invalid-feedback">
                      {errors.aulas?.[index].video?.message}
                    </Form.Text>
                  </Form.Group>

                  <Form.Control
                    type="hidden"
                    value={nanoid()}
                    {...register(`aulas.${index}.id`)}
                  />

                                    <div className="d-flex justify-content-around mb-3 mx-4">
                                        <Button
                                            className="botao-aula mx-4"
                                            onClick={() => append({ titulo: '', descricao: '', video: [] })}
                                        >
                                            Adicionar aula
                                        </Button>

                                        {fields.length > 1 && <Button
                                            className="botao-aula"
                                            onClick={() => remove(index)}
                                        >
                                            Remover
                                        </Button>}
                                    </div>
                                </fieldset>
                            );
                        })}

                        <div className="text-center">
                            <Button
                                type="submit"
                                className="botao-submit mb-5 mt-5"
                                style={{
                                    color: '#fff',
                                    backgroundColor: '#a68a56',
                                    borderColor: '#a68a56',
                                    width: '100%'
                                }}
                            >
                                Cadastrar Curso
                            </Button>
                        </div>
                    </Form>
                </div>
            </Container>
        </div>
    );
}
