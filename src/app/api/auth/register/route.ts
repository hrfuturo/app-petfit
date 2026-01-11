import { NextResponse } from "next/server"
import prisma from "@/src/lib/prisma"
import bcrypt from "bcryptjs"
import { signToken, setTokenCookie } from "@/src/lib/auth"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, password } = body
    if (!email || !password) {
      return NextResponse.json({ error: "Email e senha são obrigatórios" }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: "Usuário já existe" }, { status: 409 })
    }

    const hashed = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({ data: { name, email, password: hashed } })
    const token = signToken({ id: user.id, email: user.email, role: user.role })

    const res = NextResponse.json({ id: user.id, email: user.email, name: user.name })
    // set cookie using header
    res.headers.set("Set-Cookie", `app_token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Lax; Secure`)
    return res
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}
