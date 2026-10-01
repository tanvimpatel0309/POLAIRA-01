import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import { store } from '@/app/store'
import { AuthProvider } from '@/features/auth/AuthContext'
import { theme } from '@/theme'
import { App } from './App'

const root = document.getElementById('root')
if (!root) throw new Error('Root element not found')

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <ModalsProvider>
          <Notifications position="top-right" zIndex={700} />
          <AuthProvider>
            <App />
          </AuthProvider>
        </ModalsProvider>
      </MantineProvider>
    </Provider>
  </StrictMode>,
)
