import { Title, Text, Stack, Group, SimpleGrid, Card, ThemeIcon, Box } from '@mantine/core'
import {
  IconFolderOpen,
  IconDoor,
  IconDeviceLaptop,
  IconArrowRight,
} from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthContext'

interface SummaryCardProps {
  icon: React.ComponentType<{ size?: number; color?: string }>
  label: string
  value: string
  description: string
  color: string
  path: string
}

function SummaryCard({ icon: Icon, label, value, description, color, path }: SummaryCardProps) {
  const navigate = useNavigate()

  return (
    <Card
      shadow="sm"
      radius="md"
      p="lg"
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E2E8F0',
        cursor: 'pointer',
        transition: 'box-shadow 120ms ease, transform 120ms ease',
      }}
      onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(15, 23, 42, 0.08)'
        e.currentTarget.style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.boxShadow = '0 1px 2px rgba(15, 23, 42, 0.05)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
      onClick={() => navigate(path)}
      role="link"
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') navigate(path)
      }}
    >
      <Group justify="space-between" align="flex-start">
        <Stack gap="xs">
          <ThemeIcon size={40} radius="md" style={{ backgroundColor: color + '1A' }}>
            <Icon size={20} color={color} />
          </ThemeIcon>
          <Text size="sm" fw={500} style={{ color: '#475569' }}>
            {label}
          </Text>
          <Text size="2xl" fw={700} style={{ color: '#0F172A', lineHeight: 1 }}>
            {value}
          </Text>
          <Text size="xs" style={{ color: '#64748B' }}>
            {description}
          </Text>
        </Stack>
        <IconArrowRight size={16} color="#CBD5E1" />
      </Group>
    </Card>
  )
}

export function DashboardPage() {
  const { user } = useAuth()

  return (
    <Stack gap="lg">
      <Box>
        <Title order={2} style={{ color: '#0F172A', fontWeight: 700, fontSize: 24 }}>
          Welcome back, {user?.name.split(' ')[0]}
        </Title>
        <Text size="sm" style={{ color: '#64748B' }} mt={4}>
          Here's an overview of your conference management workspace.
        </Text>
      </Box>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
        <SummaryCard
          icon={IconFolderOpen}
          label="Projects"
          value="—"
          description="Active conference projects"
          color="#0074CC"
          path="/projects"
        />
        <SummaryCard
          icon={IconDoor}
          label="Rooms"
          value="—"
          description="Conference rooms configured"
          color="#16A34A"
          path="/rooms"
        />
        <SummaryCard
          icon={IconDeviceLaptop}
          label="Devices"
          value="—"
          description="Devices registered"
          color="#F59E0B"
          path="/devices"
        />
      </SimpleGrid>
    </Stack>
  )
}
