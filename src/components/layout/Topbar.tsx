import { AppShell, Group, Text, Avatar, Menu, ActionIcon, Tooltip, Box, Divider } from '@mantine/core'
import {
  IconMenu2,
  IconChevronDown,
  IconUser,
  IconLogout,
  IconSettings,
} from '@tabler/icons-react'
import { useAuth } from '@/features/auth/AuthContext'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { toggleSidebar } from '@/features/ui/uiSlice'

export function Topbar() {
  const dispatch = useAppDispatch()
  const sidebarCollapsed = useAppSelector((s) => s.ui.sidebarCollapsed)
  const { user, logout } = useAuth()

  return (
    <AppShell.Header
      style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        boxShadow: '0 1px 2px rgba(15, 23, 42, 0.05)',
        zIndex: 300,
      }}
    >
      <Group h="100%" px="lg" justify="space-between" wrap="nowrap">
        <Group gap="sm" wrap="nowrap">
          <Tooltip
            label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            position="right"
          >
            <ActionIcon
              variant="subtle"
              color="gray"
              size="lg"
              onClick={() => dispatch(toggleSidebar())}
              aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              style={{ color: '#475569' }}
            >
              <IconMenu2 size={20} />
            </ActionIcon>
          </Tooltip>

          <Group gap="xs" wrap="nowrap">
            <Box
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                background: 'linear-gradient(135deg, #0074CC 0%, #4DA8F5 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Text size="xs" fw={700} c="white" style={{ letterSpacing: '-0.5px' }}>
                EC
              </Text>
            </Box>
            <Text
              size="md"
              fw={600}
              style={{ color: '#0F172A', letterSpacing: '-0.2px', whiteSpace: 'nowrap' }}
            >
              EzyConference
            </Text>
          </Group>
        </Group>

        <Menu shadow="md" width={200} position="bottom-end" offset={4}>
          <Menu.Target>
            <Group
              gap="xs"
              wrap="nowrap"
              style={{
                cursor: 'pointer',
                padding: '6px 10px',
                borderRadius: 6,
                border: '1px solid #E2E8F0',
                backgroundColor: '#F8FAFC',
                transition: 'background-color 120ms ease',
              }}
              role="button"
              aria-label="User menu"
              tabIndex={0}
              onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                if (e.key === 'Enter' || e.key === ' ') e.currentTarget.click()
              }}
            >
              <Avatar
                size={28}
                radius="full"
                color="brand"
                style={{ backgroundColor: '#EAF5FF', color: '#005799' }}
              >
                {user?.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2) ?? 'U'}
              </Avatar>
              <Box visibleFrom="sm">
                <Text size="sm" fw={500} style={{ color: '#0F172A', lineHeight: 1.2 }}>
                  {user?.name ?? 'User'}
                </Text>
                <Text size="xs" style={{ color: '#64748B', lineHeight: 1.2 }}>
                  {user?.email ?? ''}
                </Text>
              </Box>
              <IconChevronDown size={14} color="#64748B" />
            </Group>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Account</Menu.Label>
            <Menu.Item leftSection={<IconUser size={14} />} disabled>
              Profile
            </Menu.Item>
            <Menu.Item leftSection={<IconSettings size={14} />} disabled>
              Preferences
            </Menu.Item>
            <Divider />
            <Menu.Item
              leftSection={<IconLogout size={14} />}
              color="red"
              onClick={logout}
            >
              Log out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </AppShell.Header>
  )
}
