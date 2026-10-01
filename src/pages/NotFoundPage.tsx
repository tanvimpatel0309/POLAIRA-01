import { Stack, Title, Text, Button, Box, ThemeIcon } from '@mantine/core'
import { IconError404 } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <Box
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F8FAFC',
        padding: 24,
      }}
    >
      <Stack align="center" gap="md" style={{ maxWidth: 400, textAlign: 'center' }}>
        <ThemeIcon size={64} radius="xl" style={{ backgroundColor: '#F1F5F9', color: '#94A3B8' }}>
          <IconError404 size={36} />
        </ThemeIcon>
        <Title order={2} style={{ color: '#0F172A', fontWeight: 700 }}>
          Page not found
        </Title>
        <Text size="sm" style={{ color: '#64748B' }}>
          The page you're looking for doesn't exist or you don't have permission to access it.
        </Text>
        <Button
          variant="filled"
          radius="sm"
          onClick={() => navigate('/dashboard')}
          style={{ backgroundColor: '#0074CC' }}
        >
          Go to Dashboard
        </Button>
      </Stack>
    </Box>
  )
}
