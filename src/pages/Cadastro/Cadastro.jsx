import React, { useState, useContext } from "react";
import { Button, Container, Form, FormControl, InputGroup } from "react-bootstrap";
import { Navigate, useNavigate, Link } from "react-router-dom";
import "./Cadastro.css";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  cadastrarUsuario,
  loginGoogle,
  loginTwitter,
} from "../../firebase/usuarios";
import { usuariosCollection } from "../../firebase/collections";
import validator from "validator";
import { doc, setDoc } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import educaweb from "../../assets/icons/educaWeb.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";


export function Cadastro() {

  const [showPassword, setShowPassword] = useState(false);

  function togglePasswordVisibility() {
    setShowPassword((prevState) => !prevState);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const usuarioLogado = useContext(AuthContext);

  if (usuarioLogado !== null) {
    return <Navigate to="/" />;
  }

  const onSubmit = (data) => {
    const { nome, email, senha } = data;
    return new Promise((resolve, reject) => {
      cadastrarUsuario(email, senha, nome)
        .then(() => {
          toast.success(`Bem-vindo(a) ao EducaWeb`, {
            position: "bottom-right",
            duration: 3000,
          });
          navigate("/");
          resolve();
        })
        .catch((erro) => {
          const errorMessages = {
            "auth/invalid-email": "O endereço de e-mail informado é inválido",
            "auth/wrong-password": "A senha informada está incorreta",
            "auth/user-not-found":
              "Não há registro de usuário correspondente a este e-mail",
            "auth/user-disabled": "Este usuário foi desativado",
            "auth/email-already-in-use":
              "O endereço de e-mail informado já está em uso por outra conta",
            "auth/weak-password": "A senha deve ter pelo menos 6 caracteres",
            default:
              "Ocorreu um erro ao tentar cadastrar usuário. Tente novamente mais tarde.",
          };
          const errorMessage =
            errorMessages[erro.code] || errorMessages["default"];
          toast.error(errorMessage, {
            position: "bottom-right",
            duration: 3000,
          });
          reject(erro);
        });
    });
  };

  function onLoginGoogle() {
    loginGoogle()
      .then(async (user) => {
        const { displayName, email, uid } = user;

        if (!validator.isEmail(email)) {
          throw new Error("Endereço de email inválido");
        }

        const novoUsuarioRef = doc(usuariosCollection, uid);
        await setDoc(novoUsuarioRef, { nome: displayName });

        const nomeUsuarioGoogle = user.displayName || "Usuário";
        toast.success(`Bem-vindo(a) ${nomeUsuarioGoogle}`, {
          position: "bottom-right",
          duration: 3000,
        });
        navigate("/");
      })
      .catch((erro) => {
        const errorMessages = {
          "auth/invalid-email": "O endereço de e-mail informado é inválido",
          "auth/wrong-password": "A senha informada está incorreta",
          "auth/user-not-found":
            "Não há registro de usuário correspondente a este e-mail",
          "auth/user-disabled": "Este usuário foi desativado",
          "auth/email-already-in-use":
            "O endereço de e-mail informado já está em uso por outra conta",
          "auth/weak-password": "A senha deve ter pelo menos 6 caracteres",
          "auth/popup-closed-by-user":
            "Fechamento inesperado da página do google",
        };
        const errorMessage =
          errorMessages[erro.code] ||
          `Ocorreu um erro ao tentar fazer login. ${erro.message}`;
        toast.error(`Um erro aconteceu. ${errorMessage}`, {
          position: "bottom-right",
          duration: 3000,
        });
      });
  }

  function onLoginTwitter() {
    loginTwitter()
      .then((usuario) => {
        const nomeUsuarioTwitter = usuario.displayName || "Usuário";
        toast.success(`Bem-vindo(a) ${nomeUsuarioTwitter}`, {
          position: "bottom-right",
          duration: 3000,
        });
        navigate("/");
      })
      .catch((erro) => {
        const errorMessages = {
          "auth/invalid-email": "O endereço de e-mail informado é inválido",
          "auth/wrong-password": "A senha informada está incorreta",
          "auth/user-not-found":
            "Não há registro de usuário correspondente a este e-mail",
          "auth/user-disabled": "Este usuário foi desativado",
          "auth/email-already-in-use":
            "O endereço de e-mail informado já está em uso por outra conta",
          "auth/weak-password": "A senha deve ter pelo menos 6 caracteres",
          "auth/popup-closed-by-user":
            "Fechamento inesperado da página do Facebook",
          "auth/cancelled-popup-request": "Cancelamento de Solicitação",
          default:
            "Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.",
        };
        const errorMessage =
          errorMessages[erro.code] ||
          `Ocorreu um erro ao tentar fazer login. ${erro.message}`;
        toast.error(`Um erro aconteceu. ${errorMessage}`, {
          position: "bottom-right",
          duration: 3000,
        });
      });
  }

  return (
    <Container className="container-login d-flex align-items-center justify-content-center">
      <div className="container-secundario">
        <img src={educaweb} alt="" className="img-logo" />
        <h2 className="texto-titulo text-center mb-4">Cadastre-se</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label className="form-nome">Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Seu nome"
              className={errors.nome && "is-invalid"}
              {...register("nome", {
                required: "O nome é obrigatorio",
                maxLength: { value: 130, message: "Limite de 130 caracteres" },
              })}
            />
            <Form.Text className="invalid-feedback">
              {errors.nome?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label className="form-email">Email</Form.Label>
            <Form.Control
              type="email"
              className={errors.email && "is-invalid"}
              placeholder="Seu email"
              {...register("email", { required: "O email é obrigatório" })}
            />
            <Form.Text className="invalid-feedback">
              {errors.email?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="senha">
              <Form.Label className="form-senha d-flex align-items-center">
                Senha
              </Form.Label>
                  <InputGroup className="input-group-password">
                  <div style={{width:"100%"}} className="d-flex flex-wrap align-items-cente">
                  <Form.Control
                    style={{width:"90%"}}
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua senha"
                    className={`custom-input ${errors.senha ? "is-invalid" : ""}`}
                    {...register("senha", { required: "Senha é obrigatória",
                    minLength: {
                      value: 6,
                      message: "A senha deve ter entre 6 e 30 caracteres",
                    },
                    maxLength: {
                      value: 30,
                      message: "A senha deve ter entre 6 e 30 caracteres",
                    } })}
                  />
                  <Button
                    style={{width:"10%"}}
                    variant="light"
                    className="senha-icone-olho"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
              <FormControl.Feedback className="invalid-feedback">
                {errors.senha?.message}
              </FormControl.Feedback>
                </div>
              </InputGroup>
            </Form.Group>

          <div className="container-botao">
            <Button className="botao-enviar" type="submit">
              CADASTRAR
            </Button>
          </div>
        </Form>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <br />
          <div className="social-cadastro">
            <button
              className="button-social btn text-white"
              type="button"
              onClick={onLoginGoogle}
            >
              <i className="bi bi-google"></i> Cadastro com Google
            </button>

            <button
              className="button-social btn text-white"
              type="button"
              onClick={onLoginTwitter}
            >
              <i className="bi bi-twitter"></i> Cadastro com Twitter
            </button>
          </div>
        </div>
        <div className="link-login d-flex justify-content-between">
          <Link to="/login" className="form-login">
            Faça login
          </Link>
        </div>
      </div>
    </Container>
  );
}
