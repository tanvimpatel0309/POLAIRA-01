import { AppShell, Stack, Tooltip, UnstyledButton, Text, Box, Divider, ScrollArea } from '@mantine/core'
import {
  IconLayoutDashboard,
  IconFolderOpen,
  IconDoor,
  IconDeviceLaptop,
  IconSettings,
} from '@tabler/icons-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from '@/app/hooks'
import { useAuth } from '@/features/auth/AuthContext'
import type { NavItem } from '@/types'

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', icon: IconLayoutDashboard, path: '/dashboard' },
  { label: 'Projects', icon: IconFolderOpen, path: '/projects' },
  { label: 'Rooms', icon: IconDoor, path: '/rooms' },
  { label: 'Devices', icon: IconDeviceLaptop, path: '/devices' },
]

const BOTTOM_ITEMS: NavItem[] = [
  { label: 'Settings', icon: IconSettings, path: '/settings', requiredRoles: ['admin'] },
]

interface NavButtonProps {
  item: NavItem
  collapsed: boolean
  active: boolean
  onClick: () => void
}

function NavButton({ item, collapsed, active, onClick }: NavButtonProps) {
  const Icon = item.icon

  const button = (
    <UnstyledButton
      onClick={onClick}
      aria-label={item.label}
      aria-current={active ? 'page' : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        padding: collapsed ? '10px 0' : '10px 12px',
        justifyContent: collapsed ? 'center' : 'flex-start',
        borderRadius: 8,
        backgroundColor: active ? '#EAF5FF' : 'transparent',
        color: active ? '#005799' : '#475569',
        fontWeight: active ? 600 : 400,
        transition: 'background-color 120ms ease, color 120ms ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = '#F1F5F9'
        }
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = 'transparent'
        }
      }}
    >
      <Icon size={20} stroke={active ? 2 : 1.5} />
      {!collapsed && (
        <Text size="sm" fw={active ? 600 : 400} style={{ color: 'inherit', lineHeight: 1.2 }}>
          {item.label}
        </Text>
      )}
    </UnstyledButton>
  )

  if (collapsed) {
    return (
      <Tooltip label={item.label} position="right" withArrow>
        {button}
      </Tooltip>
    )
  }

  return button
}

export function Sidebar() {
  const collapsed = useAppSelector((s) => s.ui.sidebarCollapsed)
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()

  function isActive(path: string) {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  function hasAccess(item: NavItem) {
    if (!item.requiredRoles) return true
    if (!user) return false
    return item.requiredRoles.some((r) => user.roles.includes(r))
  }

  return (
    <AppShell.Navbar
      style={{
        backgroundColor: '#FFFFFF',
        borderRight: '1px solid #E2E8F0',
        overflowX: 'hidden',
        width: collapsed ? 72 : 260,
        transition: 'width 200ms ease',
        display: 'flex',
        flexDirection: 'column',
      }}
      p={0}
    >
      <ScrollArea style={{ flex: 1 }} p="sm">
        <Stack gap={4}>
          {NAV_ITEMS.filter(hasAccess).map((item) => (
            <NavButton
              key={item.path}
              item={item}
              collapsed={collapsed}
              active={isActive(item.path)}
              onClick={() => navigate(item.path)}
            />
          ))}
        </Stack>
      </ScrollArea>

      <Box>
        <Divider color="#E2E8F0" />
        <Box p="sm">
          <Stack gap={4}>
            {BOTTOM_ITEMS.filter(hasAccess).map((item) => (
              <NavButton
                key={item.path}
                item={item}
                collapsed={collapsed}
                active={isActive(item.path)}
                onClick={() => navigate(item.path)}
              />
            ))}
          </Stack>
        </Box>
      </Box>
    </AppShell.Navbar>
  )
}
