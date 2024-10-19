<h1 align=center> <strong>Tem no Bairro 📍</strong> </h1>

### **Descrição**
**Tem no Bairro** é uma API colaborativa desenvolvida para facilitar a busca por serviços, comércios e estabelecimentos locais, conectando os usuários a negócios próximos e promovendo o fortalecimento da comunidade. Com a possibilidade de filtragem por categoria e bairro, a API oferece uma solução centralizada que simplifica a vida de quem precisa encontrar serviços na sua região.

### **Problema:**
A API visa solucionar a dificuldade que as pessoas enfrentam ao encontrar serviços, comércios e estabelecimentos locais. Encontrar um determinado tipo de serviço em um bairro específico pode ser uma tarefa demorada e frustrante. Além disso, a falta de um sistema centralizado para cadastro e gestão de estabelecimentos locais dificulta a divulgação desses serviços e a interação entre a comunidade.

### **Solução:**
A API oferece uma plataforma centralizada que permite:

- Busca por serviços locais: Os usuários podem realizar buscas por serviços, comércios e estabelecimentos, filtrando por categoria e bairro.
- Gerenciamento de informações: Os usuários que cadastraram seus estabelecimentos podem editar ou excluir suas informações a qualquer momento.

### 📌 **Objetivos**
- **Facilitar** a busca por serviços e comércios locais.
- **Impulsionar** o comércio local, oferecendo mais visibilidade para pequenos negócios.
- **Fortalecer** o senso de comunidade, incentivando a colaboração e apoio mútuo entre usuários e comerciantes.

## **Alinhamento**
ODS 11: Cidades e comunidades sustentáveis. Ao promover a descoberta de negócios locais, a API fortalece o comércio local e contribui para a economia circular.

### 🛠️ **Tecnologias Utilizadas**
- **NestJS**
- **TypeScript**
- **TypeORM**
- **PostgreSQL**
- **Swagger**
- **AWS**

### 💡 **Funcionalidades**
- **Busca de serviços locais**: Filtragem de estabelecimentos por bairro e categoria.
- **Cadastro de estabelecimentos**: Usuários podem registrar comércios, fornecendo nome, categoria, descrição, endereço e horário de funcionamento.

## **Funcionalidades futuras:**
- Autenticação de usuário para ter controle de quais informações são postadas e habilitar a opção de favoritar locais;
- Permitir acesso a localização do usuário.
- Cobertura de testes.

### **Como Rodar o Projeto Localmente**

1. **Clone o repositório:**
   ```bash
   https://github.com/hilanasilv/ON36-IJS-Tem-no-bairro.git
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

