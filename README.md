# Desafio Front-End: Galeria de Cupons Interativa

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/tecnologia-React-blue?style=for-the-badge">
  <img alt="Nível" src="https://img.shields.io/badge/nível-Pleno-orange?style=for-the-badge">
</p>

## 👋 Bem vindo ao nosso Desafio!

Olá, candidato(a)! Ficamos felizes com o seu interesse em fazer parte do nosso time.

Este desafio foi projetado para avaliarmos suas habilidades em desenvolvimento front-end com React. Queremos ver como você estrutura um projeto, componentiza a interface e lida com o estado da aplicação.

**Boa sorte!**

## 🎯 O Desafio

O objetivo é construir uma aplicação de página única (SPA) que exibe uma lista de cupons de desconto. O usuário deve ser capaz de clicar em um cupom para ver mais detalhes em um modal.

### Protótipo

[https://xd.adobe.com/view/b900a4f2-5a87-4ff4-8a8f-fcc52c83d9f7-ec53](https://xd.adobe.com/view/b900a4f2-5a87-4ff4-8a8f-fcc52c83d9f7-ec53/)

### Requisitos Funcionais

1.  **Listagem de Cupons:**

    - A página principal deve exibir uma grade (ou lista) de cards de cupons de acordo com o protótipo.
    - A listagem dos cupons pode ser consumida usando o endpoint abaixo.

    ```
    curl --location 'https://api.cuponeria.com.br/public/v4.2/loyalty/cuponeria/category/trend/offer/list?id=5827'
    ```

2.  **Modal de Detalhes:**
    - Ao clicar em um card de cupom, um modal deve ser aberto sobre a tela.
    - O modal deve exibir todas as informações do cupom selecionado de acordo com o protótipo.
    - O endpoint para consumir os detalhes está abaixo.
    ```
    curl --location 'https://api.cuponeria.com.br/public/v4.1/loyalty/cuponeria/offer?slug={SLUG}'
    ```
    - Use o endpoint abaixo para gerar o código
    ```
    public/v4.1/loyalty/cuponeria/offer/pick?slug={SLUG}
    ```

### Requisitos Técnicos

- **Framework/Biblioteca:** O projeto **deve** ser desenvolvido utilizando **React** ou **Next**.
- **Gerenciamento de Estado:** Você pode usar o estado local do React (`useState`, `useContext`) ou bibliotecas como Redux, Zustand, etc. A escolha é sua.
- **Estilização:** A escolha da abordagem de estilização é livre (CSS Modules, Styled-Components, Sass, Tailwind CSS, etc.). Dê preferência à que você tem mais familiaridade.
- **Responsividade:** A aplicação deve ser mobile, não precisa da versão desktop.

### O que será avaliado?

Nossa equipe irá avaliar os seguintes pontos:

- **Estrutura e Organização do Projeto:** Clareza na organização de pastas e arquivos.
- **Qualidade do Código:** Código limpo, legível, semântico e reutilizável.
- **Componentização:** Habilidade de dividir a UI em componentes lógicos e reutilizáveis.
- **Gerenciamento de Estado:** Lógica de controle do estado da aplicação (especialmente a abertura/fechamento e o conteúdo do modal).
- **Estilização e UI/UX:** Atenção aos detalhes visuais, consistência da interface e usabilidade.
- **Controle de Versão:** Clareza e organização dos commits no Git.

## 🚀 Como Começar

1.  **Fork este repositório:** Crie um fork deste repositório para a sua conta pessoal do GitHub.
2.  **Desenvolva a solução:** Crie seu código para atender a todos os requisitos listados.

## 📦 Entrega do Desafio

Para entregar seu desafio, siga os passos abaixo:

1.  **Abra um Pull Request (PR):** Crie um Pull Request do seu fork para o repositório original. O título do PR deve ser `Desafio Front-End - [Seu Nome Completo]`.
2.  **Envie o link do PR:** Responda ao e-mail de contato do processo seletivo com o link para o seu Pull Request.

_(Opcional: Se desejar, faça o deploy da sua aplicação em serviços como Vercel, Netlify ou GitHub Pages e inclua o link da aplicação funcionando no corpo do seu Pull Request.)_
