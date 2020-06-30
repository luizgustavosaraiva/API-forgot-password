<p align="center">
  <h2 align="center">API Forgot Password</h2>
</p>

## :bulb:Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/index.html)
- [TypeORM](https://typeorm.io/#/)
- [Express](https://expressjs.com/pt-br/)
- [Postgres SQL](https://www.postgresql.org/)
- [Nodemailer](https://nodemailer.com/about/)

## 💻 Projeto

A **"API Forgot Password"** uma API simples que tem como intuito enviar um e-mail de recuperação de senha para usuários cadastrados em banco de dados.

## :memo: Como utilizar

### 📌Dependências e ferramentas de testes 🧪

1. Criação de uma conta gratuita na plataforma [MailTrap](https://mailtrap.io/register/signup?ref=header), para utilizarmos um servidor de e-mail e enviar e-mails de teste.
2. [Insomnia](https://insomnia.rest/download/) para plataformas 64bits ou [Postman](https://www.postman.com/) para plataformas 32bits.
3. Instalação do [Postgres SQL](https://www.postgresql.org/docs/current/tutorial.html) para o banco de dados.

### 🖐 Mão na massa

Após clonar o projeto, primeiro devemos configurar nossa conexão com o banco de dados através do arquivo **_ormconfig.json_** que está na raiz do nosso projeto, onde deve estar semelhante ao trecho de código abaixo:

```json
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "seu username de conexão com o banco de dados",
  "password": "sua senha de conexão com o banco de dados",
  "database": "sua database previamente criada",
  "synchronize": true,
  "logging": false,
  "entities": ["src/entity/**/*.ts"],
  "migrations": ["src/migration/**/*.ts"],
  "subscribers": ["src/subscriber/**/*.ts"],
  "cli": {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  }
}
```

Depois de configurado agora vamos configurar nossa conexão com o servidor smtp criado anteriormente, neste momento precisamos estar com os dados de conexão em mãos, para encontrar os dados faça login na plataforma [Mailtrap ](https://mailtrap.io/signin), vá até a aba **SMTP Settings/Mude o campo Integrations para Node.js** e copie o bloco de código e substitua dentro do método **_forgotPassword_** no arquivo **_UserController_** encontrado dentro de **_src/controller/_** , o seguinte trecho:

```js
const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'seu username',
    pass: 'sua senha',
  },
});
```

Ainda dentro do método **_forgotPassword_**, procure pelo bloco abaixo e altere o campo email para o encontrado na plataforma **Mailtrap** na aba **E-mail Address** terminado com **_@inbox.mailtrap.io_**

```js
transporter.sendMail({
  from: 'Administrador<seu email>',
  to: email,
  subject: 'Recuperação de Senha',
  html: `<p>A sua nova senha de acesso é: <b>${newPassword}</b> por favor, faça login em nosso sistema e a altere para uma senha de sua preferência.</p><br/><a href="https://google.com">Sistema<a>`,
});
```

E pronto...
Agora é só executar os comandos no terminal:

```js
//Para NPM
	npm install
	npm run dev
//Para Yarn
	yarn install
	yarn dev
```

## 🤔 Contribua e melhore o projeto, toda ajuda é bem vinda.

- Faça um fork desse repositório;
- Cria uma branch com a sua feature: `git checkout -b minha-feature`;
- Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça push para a sua branch: `git push origin minha-feature`.

Depois que o merge da sua pull request for feito, você pode deletar a sua branch.

## :memo: Licença

Esse projeto está sob a licença MIT. Made with 💛 by me.
