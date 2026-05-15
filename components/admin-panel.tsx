"use client"

import { useEffect, useState } from "react"
import { Crown, LogIn, Pencil, Plus, RotateCcw, Save, Trash2, X } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useProducts } from "@/context/product-context"
import { useUI } from "@/context/ui-context"
import type { Product } from "@/lib/products"

const EMPTY_FORM: Omit<Product, "id"> = {
  name: "",
  price: 0,
  description: "",
  image: "/placeholder.svg?height=600&width=800",
  rating: 5,
  category: "ai-tools",
}

export function AdminPanel() {
  const { user } = useAuth()
  const { openAuth } = useUI()
  const { products, add, update, remove, reset } = useProducts()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<Omit<Product, "id">>(EMPTY_FORM)
  const [showForm, setShowForm] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <section className="px-4 pt-32 pb-24 md:px-6">
        <div className="mx-auto max-w-5xl text-center text-sm text-muted-foreground">
          Caricamento...
        </div>
      </section>
    )
  }

  if (!user) {
    return (
      <section className="grid min-h-[60vh] place-items-center px-4 pt-32 md:px-6">
        <div className="mx-auto max-w-md rounded-3xl border border-border bg-card/70 p-8 text-center backdrop-blur">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-muted">
            <LogIn className="h-6 w-6" />
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold">Accesso richiesto</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Per accedere al pannello admin devi essere loggato come amministratore.
          </p>
          <button
            type="button"
            onClick={openAuth}
            className="btn-liquid mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-primary-foreground"
          >
            <LogIn className="h-4 w-4" />
            Accedi
          </button>
        </div>
      </section>
    )
  }

  if (!user.isAdmin) {
    return (
      <section className="grid min-h-[60vh] place-items-center px-4 pt-32 md:px-6">
        <div className="mx-auto max-w-md rounded-3xl border border-border bg-card/70 p-8 text-center backdrop-blur">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-destructive/10 text-destructive">
            <X className="h-6 w-6" />
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold">
            Permessi insufficienti
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Il tuo account non ha i privilegi di amministratore. Effettua nuovamente il
            login con la password admin.
          </p>
        </div>
      </section>
    )
  }

  const startEdit = (product: Product) => {
    setEditingId(product.id)
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      rating: product.rating,
      category: product.category,
    })
    setShowForm(true)
  }

  const startCreate = () => {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setShowForm(true)
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      update(editingId, form)
    } else {
      add(form)
    }
    setShowForm(false)
    setEditingId(null)
    setForm(EMPTY_FORM)
  }

  return (
    <section className="px-4 pt-28 pb-24 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <span
              className="grid h-12 w-12 place-items-center rounded-2xl text-primary-foreground"
              style={{
                background: "linear-gradient(135deg, #ff6b4a 0%, #a855f7 100%)",
              }}
            >
              <Crown className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Admin
              </p>
              <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                Gestione prodotti
              </h1>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                if (confirm("Ripristinare il catalogo predefinito?")) reset()
              }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary"
            >
              <RotateCcw className="h-4 w-4" />
              Ripristina
            </button>
            <button
              type="button"
              onClick={startCreate}
              className="btn-liquid inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              <Plus className="h-4 w-4" />
              Nuovo prodotto
            </button>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-card/60 backdrop-blur">
          <table className="w-full">
            <thead className="border-b border-border bg-background/40">
              <tr className="text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3">Prodotto</th>
                <th className="hidden px-4 py-3 md:table-cell">Categoria</th>
                <th className="px-4 py-3">Prezzo</th>
                <th className="px-4 py-3 text-right">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-12 text-center text-sm text-muted-foreground"
                  >
                    Nessun prodotto.
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-border last:border-b-0 transition-colors hover:bg-muted/50"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.image || "/placeholder.svg"}
                          alt={p.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-medium">{p.name}</div>
                          <div className="line-clamp-1 max-w-xs text-xs text-muted-foreground">
                            {p.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-4 py-3 text-sm text-muted-foreground md:table-cell">
                      {p.category}
                    </td>
                    <td className="px-4 py-3 font-semibold text-primary">
                      €{p.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => startEdit(p)}
                          aria-label="Modifica"
                          className="grid h-9 w-9 place-items-center rounded-full hover:bg-primary/10 hover:text-primary"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Eliminare "${p.name}"?`)) remove(p.id)
                          }}
                          aria-label="Elimina"
                          className="grid h-9 w-9 place-items-center rounded-full hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[60] grid place-items-center px-4">
          <div
            aria-hidden="true"
            onClick={() => setShowForm(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <form
            onSubmit={submit}
            className="relative w-full max-w-xl rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setShowForm(false)}
              aria-label="Chiudi"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>
            <h2 className="font-display text-xl font-semibold">
              {editingId ? "Modifica prodotto" : "Nuovo prodotto"}
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="md:col-span-2">
                <span className="mb-1.5 block text-sm font-medium">Nome</span>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-medium">Prezzo (€)</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={form.price}
                  onChange={(e) =>
                    setForm({ ...form, price: parseFloat(e.target.value) || 0 })
                  }
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-medium">Categoria</span>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                >
                  <option value="ai-tools">AI & Bot</option>
                  <option value="templates">Template</option>
                  <option value="tools">Strumenti</option>
                  <option value="gaming">Gaming</option>
                  <option value="courses">Corsi</option>
                </select>
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-medium">
                  Valutazione (1-5)
                </span>
                <input
                  type="number"
                  min="1"
                  max="5"
                  required
                  value={form.rating}
                  onChange={(e) =>
                    setForm({ ...form, rating: parseInt(e.target.value, 10) || 5 })
                  }
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </label>
              <label className="md:col-span-2">
                <span className="mb-1.5 block text-sm font-medium">URL immagine</span>
                <input
                  required
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </label>
              <label className="md:col-span-2">
                <span className="mb-1.5 block text-sm font-medium">Descrizione</span>
                <textarea
                  required
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:border-destructive hover:text-destructive"
              >
                Annulla
              </button>
              <button
                type="submit"
                className="btn-liquid inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                <Save className="h-4 w-4" />
                Salva
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  )
}
