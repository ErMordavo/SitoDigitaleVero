"use client"

import { useState, useEffect } from "react"
import { Save, User as UserIcon } from "lucide-react"
import { useCustomer } from "@/context/customer-context"

/**
 * ProfileTab - User profile editing form
 * 
 * Fields:
 * - name: Display name
 * - email: Email address
 * - avatar: Avatar URL (optional)
 * 
 * Data is persisted via CustomerContext (localStorage)
 */

export function ProfileTab() {
  const { customer, updateProfile } = useCustomer()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: "",
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")

  // Initialize form with customer data
  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name,
        email: customer.email,
        avatar: customer.avatar || "",
      })
    }
  }, [customer])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setSaveMessage("")

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    updateProfile({
      name: formData.name,
      email: formData.email,
      avatar: formData.avatar || undefined,
    })

    setIsSaving(false)
    setSaveMessage("Profilo aggiornato con successo!")

    // Clear message after 3 seconds
    setTimeout(() => setSaveMessage(""), 3000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Il Tuo Profilo</h1>
        <p className="mt-1 text-muted-foreground">
          Modifica le informazioni del tuo account.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Profile form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="font-display text-lg font-semibold text-foreground">
                Informazioni Personali
              </h2>

              <div className="mt-6 space-y-4">
                {/* Name field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground"
                  >
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Il tuo nome"
                    required
                  />
                </div>

                {/* Email field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="la-tua@email.com"
                    required
                  />
                </div>

                {/* Avatar URL field */}
                <div>
                  <label
                    htmlFor="avatar"
                    className="block text-sm font-medium text-foreground"
                  >
                    URL Avatar (opzionale)
                  </label>
                  <input
                    type="url"
                    id="avatar"
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="https://esempio.com/avatar.jpg"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Inserisci l&apos;URL di un&apos;immagine per il tuo avatar
                  </p>
                </div>
              </div>

              {/* Save button and message */}
              <div className="mt-6 flex items-center gap-4">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  {isSaving ? "Salvataggio..." : "Salva Modifiche"}
                </button>
                {saveMessage && (
                  <span className="text-sm text-green-600 dark:text-green-400">
                    {saveMessage}
                  </span>
                )}
              </div>
            </div>
          </form>

          {/* Danger zone */}
          <div className="mt-6 rounded-xl border border-destructive/30 bg-destructive/5 p-6">
            <h2 className="font-display text-lg font-semibold text-destructive">
              Zona Pericolosa
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Queste azioni sono irreversibili. Procedi con cautela.
            </p>
            <button
              type="button"
              className="mt-4 rounded-lg border border-destructive px-4 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground"
            >
              Elimina Account
            </button>
          </div>
        </div>

        {/* Avatar preview */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Anteprima Avatar
            </h2>
            <div className="mt-6 flex flex-col items-center">
              {formData.avatar ? (
                <img
                  src={formData.avatar}
                  alt="Avatar"
                  className="h-32 w-32 rounded-full object-cover"
                />
              ) : (
                <div
                  className="grid h-32 w-32 place-items-center rounded-full text-4xl font-bold text-white"
                  style={{
                    background: "linear-gradient(135deg, #ff6b4a 0%, #a855f7 100%)",
                  }}
                >
                  {formData.name ? formData.name.charAt(0).toUpperCase() : <UserIcon className="h-12 w-12" />}
                </div>
              )}
              <p className="mt-4 text-lg font-medium text-foreground">
                {formData.name || "Il tuo nome"}
              </p>
              <p className="text-sm text-muted-foreground">
                {formData.email || "la-tua@email.com"}
              </p>
            </div>
          </div>

          {/* Account info */}
          <div className="mt-4 rounded-xl border border-border bg-card p-6">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Info Account
            </h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">ID Utente</dt>
                <dd className="font-mono text-foreground">{customer?.id || "—"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Membro dal</dt>
                <dd className="text-foreground">
                  {customer?.createdAt
                    ? new Date(customer.createdAt).toLocaleDateString("it-IT")
                    : "—"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}