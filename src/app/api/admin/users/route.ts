import { NextResponse } from "next/server"
import { getTokenFromRequest, verifyToken } from "@/src/lib/auth"
import prisma from "@/src/lib/prisma"

export async function GET(req: Request) {
  const token = getTokenFromRequest(req)
  if (!token) return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  const payload: any = verifyToken(token)
  if (!payload) return NextResponse.json({ error: "Não autorizado" }, { status: 401 })

  if (payload.role !== 'ADMIN') return NextResponse.json({ error: "Acesso restrito" }, { status: 403 })

  const users = await prisma.user.findMany({ select: { id: true, email: true, name: true, role: true, createdAt: true } })
  return NextResponse.json({ users })
}
