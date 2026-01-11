import { PrismaClient } from "@prisma/client"

declare global {
  // allow global prisma during dev to avoid hot-reload issues
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

const client = global.prisma || new PrismaClient()
if (process.env.NODE_ENV === "development") global.prisma = client

export default client
