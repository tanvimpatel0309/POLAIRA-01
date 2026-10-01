import { AppShell, Box } from '@mantine/core'
import { Outlet } from 'react-router-dom'
import { useAppSelector } from '@/app/hooks'
import { Topbar } from './Topbar'
import { Sidebar } from './Sidebar'

export function AppLayout() {
  const collapsed = useAppSelector((s) => s.ui.sidebarCollapsed)

  return (
    <AppShell
      header={{ height: 64 }}
      navbar={{
        width: collapsed ? 72 : 260,
        breakpoint: 'md',
        collapsed: { mobile: false },
      }}
      styles={{
        root: { backgroundColor: '#F8FAFC' },
        main: {
          backgroundColor: '#F8FAFC',
          paddingTop: 64,
          transition: 'padding-left 200ms ease',
        },
      }}
    >
      <Topbar />
      <Sidebar />
      <AppShell.Main>
        <Box
          style={{
            maxWidth: 1600,
            width: '100%',
            padding: 24,
            minHeight: 'calc(100vh - 64px)',
          }}
        >
          <Outlet />
        </Box>
      </AppShell.Main>
    </AppShell>
  )
}
