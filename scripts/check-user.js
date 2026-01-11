const { PrismaClient } = require('@prisma/client')

async function main() {
  const prisma = new PrismaClient()
  const user = await prisma.user.findUnique({ where: { email: 'usuarioteste@gmail.com' } })
  console.log(user)
  await prisma.$disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
