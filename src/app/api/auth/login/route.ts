import { NextResponse } from "next/server"
import prisma from "@/src/lib/prisma"
import bcrypt from "bcryptjs"
import { signToken } from "@/src/lib/auth"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) return NextResponse.json({ error: "Email e senha são obrigatórios" }, { status: 400 })

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 })

    const token = signToken({ id: user.id, email: user.email, role: user.role })
    const res = NextResponse.json({ id: user.id, email: user.email, name: user.name })
    res.headers.set("Set-Cookie", `app_token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Lax; Secure`)
    return res
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}
