# Autenticação — Instruções (local)

Passos para rodar o banco, migrações e seed localmente:

1. Copie o arquivo de exemplo de variáveis de ambiente:

   cp .env.example .env

2. Instale dependências:

   npm install

3. Gere o client do Prisma:

   npx prisma generate

4. Aplique migrações (cria o banco/arquivos):

   npx prisma migrate dev --name init

5. Rode o seed para criar o usuário de teste (ADMIN):

   npm run seed

   Credenciais:
   - email: `usuarioteste@gmail.com`
   - senha: `123456`

6. Execute a aplicação:

   npm run dev

Endpoints principais:

- POST /api/auth/register — body: { name, email, password }
- POST /api/auth/login — body: { email, password }
- GET /api/auth/me — obtém usuário atual (usa cookie)
- GET /api/admin/users — lista usuários (apenas ADMIN)
