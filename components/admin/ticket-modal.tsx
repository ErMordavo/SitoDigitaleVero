"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { cn } from "@/lib/utils"

const ticketSchema = z.object({
  title: z.string().min(3, "Il titolo deve avere almeno 3 caratteri"),
  email: z.string().email("Email non valida"),
  message: z.string().min(10, "Il messaggio deve avere almeno 10 caratteri"),
})

type TicketFormData = z.infer<typeof ticketSchema>

interface TicketModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: TicketFormData) => void
  initialData?: { title: string; email: string; message: string } | null
}

export function TicketModal({ isOpen, onClose, onSubmit, initialData }: TicketModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
    defaultValues: initialData || { title: "", email: "", message: "" },
  })

  useEffect(() => {
    if (initialData) {
      reset(initialData)
    } else {
      reset({ title: "", email: "", message: "" })
    }
  }, [initialData, reset])

  const handleFormSubmit = (data: TicketFormData) => {
    onSubmit(data)
    reset()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card rounded-2xl p-6 max-w-md w-full border border-border"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                {initialData ? "Modifica Ticket" : "Nuovo Ticket"}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Titolo</label>
                <input
                  {...register("title")}
                  type="text"
                  placeholder="Oggetto del ticket"
                  className={cn(
                    "w-full px-4 py-2.5 rounded-xl",
                    "bg-background border border-input",
                    "focus:outline-none focus:ring-2 focus:ring-primary/50",
                    "transition-all",
                    errors.title && "border-destructive"
                  )}
                />
                {errors.title && (
                  <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Email</label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="email@esempio.com"
                  className={cn(
                    "w-full px-4 py-2.5 rounded-xl",
                    "bg-background border border-input",
                    "focus:outline-none focus:ring-2 focus:ring-primary/50",
                    "transition-all",
                    errors.email && "border-destructive"
                  )}
                />
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Messaggio</label>
                <textarea
                  {...register("message")}
                  rows={4}
                  placeholder="Descrivi il problema o la richiesta..."
                  className={cn(
                    "w-full px-4 py-2.5 rounded-xl resize-none",
                    "bg-background border border-input",
                    "focus:outline-none focus:ring-2 focus:ring-primary/50",
                    "transition-all",
                    errors.message && "border-destructive"
                  )}
                />
                {errors.message && (
                  <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-border hover:bg-muted transition-colors"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "flex-1 px-4 py-2.5 rounded-xl",
                    "bg-primary text-primary-foreground",
                    "hover:opacity-90 transition-opacity",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  {isSubmitting ? "Salvataggio..." : initialData ? "Aggiorna" : "Crea"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
