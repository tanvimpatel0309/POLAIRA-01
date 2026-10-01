import { createSlice } from '@reduxjs/toolkit'

const SIDEBAR_STORAGE_KEY = 'ezyconf_sidebar_collapsed'

function loadCollapsed(): boolean {
  try {
    const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY)
    return stored === 'true'
  } catch {
    return false
  }
}

interface UiState {
  sidebarCollapsed: boolean
}

const initialState: UiState = {
  sidebarCollapsed: loadCollapsed(),
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed
      try {
        localStorage.setItem(SIDEBAR_STORAGE_KEY, String(state.sidebarCollapsed))
      } catch {
        // ignore
      }
    },
    setSidebarCollapsed(state, action: { payload: boolean }) {
      state.sidebarCollapsed = action.payload
      try {
        localStorage.setItem(SIDEBAR_STORAGE_KEY, String(action.payload))
      } catch {
        // ignore
      }
    },
  },
})

export const { toggleSidebar, setSidebarCollapsed } = uiSlice.actions
export default uiSlice.reducer
