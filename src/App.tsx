import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { ProtectedRoute } from '@/router/ProtectedRoute'
import { LoginPage } from '@/pages/LoginPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { PlaceholderPage } from '@/pages/PlaceholderPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route
            path="projects/*"
            element={
              <PlaceholderPage
                title="Project Management"
                description="Create and manage your conference projects, rooms, and devices from one place."
              />
            }
          />
          <Route
            path="rooms/*"
            element={
              <PlaceholderPage
                title="Room Management"
                description="Configure and manage conference rooms across your projects."
              />
            }
          />
          <Route
            path="devices/*"
            element={
              <PlaceholderPage
                title="Device Management"
                description="Register and manage devices associated with your conference rooms."
              />
            }
          />
          <Route
            path="settings/*"
            element={
              <PlaceholderPage
                title="Settings"
                description="Manage application settings and user preferences."
              />
            }
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
