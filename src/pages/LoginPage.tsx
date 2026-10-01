import { useState } from 'react'
import {
  Box,
  Card,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Alert,
  Group,
} from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthContext'

export function LoginPage() {
  const { login, isLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setEmailError('')
    setPasswordError('')

    let valid = true
    if (!email.trim()) {
      setEmailError('Email is required')
      valid = false
    }
    if (!password) {
      setPasswordError('Password is required')
      valid = false
    }
    if (!valid) return

    try {
      await login(email.trim(), password)
      navigate(from, { replace: true })
    } catch {
      setError('Invalid credentials. Please try again.')
    }
  }

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
      <Box style={{ width: '100%', maxWidth: 400 }}>
        <Stack align="center" gap="xs" mb="xl">
          <Box
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #0074CC 0%, #4DA8F5 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text size="lg" fw={700} c="white" style={{ letterSpacing: '-0.5px' }}>
              EC
            </Text>
          </Box>
          <Text size="xl" fw={700} style={{ color: '#0F172A', letterSpacing: '-0.3px' }}>
            EzyConference
          </Text>
          <Text size="sm" style={{ color: '#64748B' }}>
            Sign in to your account
          </Text>
        </Stack>

        <Card shadow="md" radius="lg" p="xl" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
          <form onSubmit={handleSubmit} noValidate>
            <Stack gap="md">
              {error && (
                <Alert
                  icon={<IconAlertCircle size={16} />}
                  color="red"
                  radius="sm"
                  variant="light"
                >
                  {error}
                </Alert>
              )}

              <TextInput
                label="Email address"
                placeholder="you@example.com"
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
                error={emailError}
                autoComplete="email"
                autoFocus
                required
                styles={{
                  label: { color: '#334155', fontWeight: 500, fontSize: 14, marginBottom: 4 },
                }}
              />

              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
                error={passwordError}
                autoComplete="current-password"
                required
                styles={{
                  label: { color: '#334155', fontWeight: 500, fontSize: 14, marginBottom: 4 },
                }}
              />

              <Button
                type="submit"
                fullWidth
                loading={isLoading}
                size="md"
                radius="sm"
                mt="xs"
                style={{ backgroundColor: '#0074CC' }}
              >
                Sign in
              </Button>
            </Stack>
          </form>
        </Card>

        <Group justify="center" mt="lg">
          <Text size="xs" style={{ color: '#94A3B8' }}>
            Authentication secured by Keycloak/OIDC
          </Text>
        </Group>
      </Box>
    </Box>
  )
}
