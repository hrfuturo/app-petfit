import jwt from "jsonwebtoken"
import { NextResponse } from "next/server"

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret"
const TOKEN_NAME = "app_token"

export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" })
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (e) {
    return null
  }
}

export function setTokenCookie(res: any, token: string) {
  // Set HttpOnly cookie
  res.headers.set("Set-Cookie", `${TOKEN_NAME}=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Lax; Secure`)
}

export function getTokenFromRequest(req: Request) {
  const cookie = req.headers.get("cookie") || ""
  const match = cookie.split(";").map(c => c.trim()).find(c => c.startsWith(`${TOKEN_NAME}=`))
  if (!match) return null
  return match.split("=")[1]
}
