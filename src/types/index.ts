export interface User {
  id: string
  name: string
  email: string
  roles: string[]
}

export interface NavItem {
  label: string
  icon: React.ComponentType<{ size?: number | string; stroke?: number; className?: string }>
  path: string
  requiredRoles?: string[]
}
