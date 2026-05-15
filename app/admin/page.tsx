import { LayoutShell } from "@/components/layout-shell"
import { AdminPanel } from "@/components/admin-panel"

export const metadata = {
  title: "Admin · Toolnest",
}

export default function AdminPage() {
  return (
    <LayoutShell>
      <AdminPanel />
    </LayoutShell>
  )
}
