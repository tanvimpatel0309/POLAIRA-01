import { createTheme, type MantineColorsTuple } from '@mantine/core'

const brandColors: MantineColorsTuple = [
  '#EAF5FF',
  '#D6EBFF',
  '#ADD7FF',
  '#80C1FF',
  '#4DA8F5',
  '#0074CC',
  '#0066B3',
  '#005799',
  '#00487F',
  '#003A66',
]

const slateColors: MantineColorsTuple = [
  '#F8FAFC',
  '#F1F5F9',
  '#E2E8F0',
  '#CBD5E1',
  '#94A3B8',
  '#64748B',
  '#475569',
  '#334155',
  '#1E293B',
  '#0F172A',
]

export const theme = createTheme({
  primaryColor: 'brand',
  colors: {
    brand: brandColors,
    slate: slateColors,
  },
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
  },
  radius: {
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  shadows: {
    sm: '0 1px 2px rgba(15, 23, 42, 0.05)',
    md: '0 4px 12px rgba(15, 23, 42, 0.08)',
    lg: '0 10px 24px rgba(15, 23, 42, 0.10)',
    xl: '0 20px 40px rgba(15, 23, 42, 0.12)',
  },
  components: {
    Button: {
      defaultProps: {
        radius: 'sm',
      },
    },
    TextInput: {
      defaultProps: {
        radius: 'sm',
      },
    },
    PasswordInput: {
      defaultProps: {
        radius: 'sm',
      },
    },
    Select: {
      defaultProps: {
        radius: 'sm',
      },
    },
    Card: {
      defaultProps: {
        radius: 'md',
        shadow: 'sm',
      },
    },
    Modal: {
      defaultProps: {
        radius: 'lg',
        centered: true,
      },
    },
    Tooltip: {
      defaultProps: {
        withArrow: true,
      },
    },
  },
})
