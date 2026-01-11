import { NextResponse } from "next/server"
import { getTokenFromRequest, verifyToken } from "@/src/lib/auth"
import prisma from "@/src/lib/prisma"

export async function GET(req: Request) {
  const token = getTokenFromRequest(req)
  if (!token) return NextResponse.json({ user: null })
  const payload: any = verifyToken(token)
  if (!payload) return NextResponse.json({ user: null })

  const user = await prisma.user.findUnique({ where: { id: payload.id } })
  if (!user) return NextResponse.json({ user: null })

  return NextResponse.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role } })
}
