const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

async function main() {
  const email = 'usuarioteste@gmail.com'
  const password = '123456'
  const hashed = await bcrypt.hash(password, 10)

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      name: 'Usuário Teste',
      email,
      password: hashed,
      role: 'ADMIN'
    }
  })

  console.log('Seed: usuário de teste criado (email: usuarioteste@gmail.com, senha: "123456")')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
