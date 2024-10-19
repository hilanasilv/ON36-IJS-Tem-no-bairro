<h1 align=center> <strong>Tem no Bairro 📍</strong> </h1>

### **Descrição**
**Tem no Bairro** é uma API colaborativa desenvolvida para facilitar a busca por serviços, comércios e estabelecimentos locais, conectando os usuários a negócios próximos e promovendo o fortalecimento da comunidade. Com a possibilidade de filtragem por categoria e bairro, a API oferece uma solução centralizada que simplifica a vida de quem precisa encontrar serviços na sua região. 

### 💡 **Funcionalidades**
- **Busca de serviços locais**: Filtragem de estabelecimentos por bairro e categoria.
- **Cadastro de estabelecimentos**: Usuários podem registrar comércios, fornecendo nome, categoria, descrição, endereço e horário de funcionamento.

### 📌 **Objetivos**
- **Facilitar** a busca por serviços e comércios locais.
- **Impulsionar** o comércio local, oferecendo mais visibilidade para pequenos negócios.
- **Fortalecer** o senso de comunidade, incentivando a colaboração e apoio mútuo entre usuários e comerciantes.

### **Como Rodar o Projeto Localmente**

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/hilanasilv/tem-no-bairro.git
   cd tem-no-bairro
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Execute as migrations para configurar o banco de dados:**
   ```bash
   npm run migration:run
   ```

4. **Inicie o servidor:**
   ```bash
   npm run start:dev
   ```

5. **Acesse a API:**
   ```bash
   http://localhost:3000
   ```

### 📄 **Documentação da API**

A documentação completa da API pode ser acessada via Swagger na rota [http://localhost:3000/swagger](http://localhost:3000/swagger). Lá você encontrará exemplos de endpoints e detalhes sobre as requisições e respostas.

---

### 🛠️ **Tecnologias Utilizadas**
- **NestJS**
- **TypeScript**
- **TypeORM**
- **PostgreSQL**
- **Swagger**
- **AWS**

---
