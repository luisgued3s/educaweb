import notFoundFull from "../../assets/images/not-found.jpg";
import "./NotFound.css";

export function NotFound() {

  const path = window.location.pathname;
  const pathElements = path.split("/");
  const elementAfterSlash = pathElements[pathElements.length - 1];

  return (
    <>
      <section className="pageNotFound">
        <h1 className="not-found">Não encontramos sua página /<span class="elementAfterSlash">{elementAfterSlash}</span> <br />Vamos procurar melhor</h1>
        <img src={notFoundFull} alt="Pagina não encontrada" />
        <br />
      </section>
    </>
  )
}
