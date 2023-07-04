import { Button, Container, Form, FormControl, InputGroup } from "react-bootstrap";
import "./login.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { loginGoogle, loginEmailSenha, loginTwitter } from "../../firebase/usuarios";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import educaweb from "../../assets/icons/educaWeb.png";

export function Login() {
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

  function onSubmit(data) {
    const { email, senha } = data;
    loginEmailSenha(email, senha)
      .then((usuario) => {
        const nomeUsuario = usuario.nome || "Usuário";
        toast.success(`Bem-vindo(a) ${nomeUsuario}`, {
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

  function onLoginGoogle() {
    loginGoogle()
      .then((usuario) => {
        const nomeUsuarioGoogle = usuario.displayName || "Usuário";
        toast.success(`Bem-vindo(a) ${nomeUsuarioGoogle}`, {
          position: "bottom-right",
          duration: 3000,
        });
        navigate("/");
      })
      .catch((erro) => {
        const errorMessages = {
          'auth/invalid-email': 'O endereço de e-mail informado é inválido',
          'auth/wrong-password': 'A senha informada está incorreta',
          'auth/user-not-found':
            'Não há registro de usuário correspondente a este e-mail',
          'auth/user-disabled': 'Este usuário foi desativado',
          'auth/email-already-in-use':
            'O endereço de e-mail informado já está em uso por outra conta',
          'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres',
          "auth/popup-closed-by-user": "Fechamento inesperado da página do Google",
          "auth/cancelled-popup-request": "Cancelamento inesperado de requisição da página do Google",
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
          'auth/invalid-email': 'O endereço de e-mail informado é inválido',
          'auth/wrong-password': 'A senha informada está incorreta',
          'auth/user-not-found':
            'Não há registro de usuário correspondente a este e-mail',
          'auth/user-disabled': 'Este usuário foi desativado',
          'auth/email-already-in-use':
            'O endereço de e-mail informado já está em uso por outra conta',
          'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres',
          "auth/popup-closed-by-user": "Fechamento inesperado da página do Facebook",
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

  if (usuarioLogado !== null) {
    return <Navigate to="/" />;
  }

  return (
    <section>
      <Container className="container-login d-flex align-items-center justify-content-center">
        <div className="container-secundario">
          <img src={educaweb} alt="" className="img-logo" />
          <h2 className="texto-titulo text-center mb-4">Já tem cadastro?</h2>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label className="form-email">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Digite seu email"
                className={errors.email ? "is-invalid" : ""}
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
              <button className="botao-enviar">ENTRAR</button>
            </div>
            <div className="social-login">
              <div>
                <button
                  className="button-social btn text-white"
                  type="button"
                  onClick={onLoginGoogle}
                >
                  <i className="bi bi-google"></i> Login com o Google
                </button>
              </div>
              <div>
                <button
                  className="button-social btn text-white"
                  type="button"
                  onClick={onLoginTwitter}
                >
                  <i className="bi bi-twitter"></i> Login com o Twitter
                </button>
              </div>
            </div>
            <div className="links d-flex justify-content-between">
              <Link to="/esquecisenha" className="form-esqueci-senha">
                Esqueci a senha
              </Link>
              <Link to="/cadastro" className="form-criar-conta">
                Criar conta
              </Link>
            </div>
          </Form>
        </div>
      </Container>
    </section>
  );
}
