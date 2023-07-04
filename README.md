<p align="center">
<img src=https://imgur.com/dqdUYOt.png>
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />  
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white" />
<img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white" />
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
<img src="https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white"> 
</p>

### Índice

- [Descrição](#descrição)
- [Visual do Projeto](#visual-do-projeto)
  - [Desktop](#desktop)
  - [Mobile](#mobile)
- [Deploy da Aplicação](#deploy-da-aplicação)
- [Tecnologias](#tecnologias)
  - [Construção do site](#construção-do-site)
  - [Banco de Dados](#banco-de-dados)
  - [Estilização](#estilização)
  - [IDE e Versionamento](#ide-e-versionamento)
- [Funcionalidades](#funcionalidades)
- [Rodando a Aplicação](#rodando-a-aplicação)
  - [1. Faça um clone do projeto](#1-faça-um-clone-do-projeto)
  - [2. Instale as dependências](#2-instale-as-dependências)
  - [3. Crie um novo projeto Firebase](#3-crie-um-novo-projeto-firebase)
  - [4. Configure os Provedores de Login](#4-configure-os-provedores-de-login)
  - [5. Execute o servidor](#5-execute-o-servidor)
- [Desenvolvedores](#desenvolvedores)
- [Licença](#licença)
- [Agradecimentos](#agradecimentos)

### Descrição

<p align="justify">
 EducaWeb é uma plataforma de cursos online gratuitos desenvolvida como trabalho de conclusão do bootcamp de Desenvolvimento em React e Node.js pela Soulcode Academy.
</p>

### Visual do Projeto

#### Desktop

<img src=https://imgur.com/W9rAdWN.png>
<img src=https://imgur.com/SQ8oUNs.png>
<img src=https://imgur.com/1prAttY.png>
<img src=https://imgur.com/jqfzXrs.png>

#### Mobile

<p align="center">
<img src=https://imgur.com/O5HsKnK.png>
<br>
<img src=https://imgur.com/mPtuqU1.png>
<br>
<img src=https://imgur.com/odubWKR.png>
<br>
<img src=https://imgur.com/byhH0MQ.png>
</p>

### Deploy da Aplicação

Disponível em: [https://educa-web.web.app/](https://educa-web.web.app/)
### Tecnologias

##### Construção do site

- [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [React](https://react.dev/)

##### Banco de Dados

- [Firebase](https://firebase.google.com/?hl=pt)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Firebase Firestore](https://firebase.google.com/docs/firestore)

##### Estilização

- [Bootstrap](https://getbootstrap.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Google Fonts](https://fonts.google.com)

##### IDE e Versionamento

- [Visual Studio Code](https://code.visualstudio.com)
- [Git](https://git-scm.com)
- [GitHub](https://github.com)

### Funcionalidades

1. **Cadastrar Usuário:** O usuário se cadastra no sistema informando nome, e-mail, senha, telefone, data de nascimento e formação acadêmica.

2. **Autenticar Usuário:** O usuário faz login no sistema informando e-mail e senha, acessando a plataforma de cursos em vídeo online.

3. **Acessar Informações de Perfil:** O usuário visualiza suas informações pessoais na área de perfil.

4. **Editar Informações de Perfil:** O usuário edita nome, telefone, data de nascimento e formação acadêmica.

5. **Editar Informações de Acesso:** O usuário edita e-mail e senha.

6. **Ver Cursos:** O usuário visualiza os cursos disponíveis na plataforma.

7. **Pesquisar Cursos:** O usuário pesquisa cursos específicos na plataforma.

8. **Visualizar Detalhes do Curso:** O usuário vê informações detalhadas sobre um curso, incluindo descrição, autor, duração e avaliação.

9. **Adicionar Curso à Lista de Desejos:** O usuário adiciona um curso à lista de desejos para assistir posteriormente.

10. **Acessar Lista de Desejos:** O usuário acessa sua lista de desejos para ver os cursos adicionados.

11. **Iniciar Curso:** O usuário inicia um curso selecionado na plataforma.

12. **Avaliar Curso:** O usuário avalia um curso com nota de 1 a 5 estrelas e deixa um comentário.

13. **Marcar Aula como Concluída:** O usuário marca uma aula como concluída após assisti-la.

14. **Acessar Histórico de Curso:** O usuário vê seu histórico de progresso em um curso na plataforma.

15. **Criar Curso:** O usuário cria um novo curso na plataforma, fornecendo nome, descrição, categoria e número de aulas.

16. **Adicionar Aula:** O usuário adiciona uma nova aula a um curso existente, informando nome, descrição e vídeo de ensino.

17. **Editar Curso:** O usuário edita um curso existente na plataforma, alterando nome, descrição, categoria e número de aulas.

18. **Remover Aula:** O usuário remove uma aula de um curso existente, selecionando-a e confirmando a ação.

19. **Publicar Curso:** O usuário publica um curso na plataforma para que outros usuários possam acessá-lo.

20. **Despublicar Curso:** O usuário retira a publicação de um curso previamente publicado, selecionando-o e confirmando a ação.

### Rodando a Aplicação

#### 1. Faça um clone do projeto

```sh
$ git clone https://github.com/soulcode-acad/educaweb.git
```

#### 2. Instale as dependências

```sh
$ npm install
```

#### 3. Crie um novo projeto Firebase

- Acesse a plataforma do [firebase](https://firebase.google.com/) e faça login.

- Na aba "Console", crie um novo projeto.

- Adicione e registre um novo aplicativo Web.

- Na seção de configuração e instalação do SDK, você encontrará um código semelhante a este:

  ```JS
  const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "PROJECT_ID.firebaseapp.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
  };
  ```
- Crie um arquivo .env e cole suas configurações do Firebase, seguindo o modelo disponível em .env.example, que está na pasta raiz do projeto.

#### 4. Configure os Provedores de Login

- Na aba "Authentication", adicione os provedores de login por Email/senha, Google e Twitter
- Para o Twitter, são necessárias configurações adicionais para seu funcionamento. Confira mais detalhes na  [documentação do Firebase](https://firebase.google.com/docs/auth/web/twitter-login?hl=pt-br) .


#### 5. Execute o servidor

```sh
$ npm start
```

### Desenvolvedores

| [<img src="https://avatars.githubusercontent.com/u/117326081?v=4" width=300><br><sub>Caio Dias</sub>](https://github.com/d-caio) | [<img src="https://avatars.githubusercontent.com/u/125271825?v=4" width=200><br><sub>Eurico Oliveira</sub>](https://github.com/EuricoOliveira) | [<img src="https://avatars.githubusercontent.com/u/107266472?v=4" width=200><br><sub>José Ailton</sub>](https://github.com/joseailtoncjr) | [<img src="https://avatars.githubusercontent.com/u/86631097?v=4" width=200><br><sub>José Augusto</sub>](https://github.com/JoseAugustoJasfarias) | [<img src="https://avatars.githubusercontent.com/u/107771309?v=4" width=200><br><sub>Lucas Damaso</sub>](https://github.com/luucdamaso) | [<img src="https://avatars.githubusercontent.com/u/111883029?v=4" width=200><br><sub>Lucas Magalhes</sub>](https://github.com/magalhes) | [<img src="https://avatars.githubusercontent.com/u/104780405?v=4" width=200><br><sub>Luis Guedes</sub>](https://github.com/luisgued3s) | [<img src="https://avatars.githubusercontent.com/u/105993860?v=4" width=200><br><sub>Marcos Wernek</sub>](https://github.com/marcoswernek) | [<img src="https://avatars.githubusercontent.com/u/115433447?v=4" width=200><br><sub>Vitor Santana</sub>](https://github.com/saantanavitor) |
| :------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------: |

### Licença

Esse projeto está sob a [licença MIT](/LICENSE.md).

### Agradecimentos

<p align="justify">
 Aos professores José Almir e Gabriel Braga e à Soulcode Academy pela bolsa fornecida.
</p>
