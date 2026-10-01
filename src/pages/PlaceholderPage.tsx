import { Stack, Title, Text, ThemeIcon, Box } from '@mantine/core'
import { IconHammer } from '@tabler/icons-react'

interface PlaceholderPageProps {
  title: string
  description?: string
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <Box
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 160px)',
      }}
    >
      <Stack align="center" gap="md" style={{ maxWidth: 400, textAlign: 'center' }}>
        <ThemeIcon size={56} radius="xl" style={{ backgroundColor: '#EAF5FF', color: '#0074CC' }}>
          <IconHammer size={28} />
        </ThemeIcon>
        <Title order={3} style={{ color: '#0F172A', fontWeight: 600 }}>
          {title}
        </Title>
        <Text size="sm" style={{ color: '#64748B' }}>
          {description ?? 'This module is under development and will be available soon.'}
        </Text>
      </Stack>
    </Box>
  )
}
