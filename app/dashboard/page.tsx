import { redirect } from 'next/navigation'

export default function DashboardPage() {
  // Redirect to home since dashboard modules are accessed via main page
  redirect('/')
}
