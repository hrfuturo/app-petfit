"use client"

import { useEffect, useState } from "react"

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/users')
      .then(async (res) => {
        if (!res.ok) throw new Error((await res.json()).error || 'Não autorizado')
        return res.json()
      })
      .then((data) => setUsers(data.users || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="p-4">Carregando...</p>
  if (error) return <p className="p-4 text-red-600">Erro: {error}</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Painel Admin — Usuários</h1>
      <div className="overflow-auto rounded-lg border">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Nome</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Criado em</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="p-3">{u.id}</td>
                <td className="p-3">{u.name || '-'}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.role}</td>
                <td className="p-3">{new Date(u.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
