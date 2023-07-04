import { Container, Form } from "react-bootstrap";
import "./../EsqueciSenha/esquecisenha.css";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { resetarSenha } from "../../firebase/usuarios";

export function EsqueciSenha() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  function onSubmit(data) {
    const { email } = data;
    if (email !== null && email !== "") {
      resetarSenha(email)
        .then(() => {
          toast.success(`Email de recuperação encaminhado para ${email}`, {
            position: "bottom-right",
            duration: 2500,
          });
          navigate("/login");
        })
        .catch((erro) => {
          toast.error(`Um erro aconteceu. Código: ${erro.code}`, {
            position: "bottom-right",
            duration: 2500,
          });
        });
    }
  }


  return (
    <section className="pagina">
      <Container className="container-login d-flex align-items-center justify-content-center">
        <div className="container-secundario">
          <h2 className="texto-titulo text-center mb-4">Redefinir senha</h2>
          <div className="container-titulo d-flex justify-content-center">
            <p className="descricao-senha">
              Forneça o e-mail da sua conta para redefinir a senha.
            </p>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="form-email">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Seu email"
                className={errors.email ? "is-invalid" : ""}
                {...register("email", { required: "Email é obrigatório" })}
              />
              <Form.Text className="invalid-feedback">
                {errors.email?.message}
              </Form.Text>
            </Form.Group>

            <div className="container-botao d-flex justify-content-center">
              <button className="botao-enviar">ENVIAR</button>
            </div>
            <div className="social-login">
              <div></div>
            </div>
          </Form>
        </div>
      </Container>
    </section>
  );
}
