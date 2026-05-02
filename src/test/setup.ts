import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock fetch
global.fetch = vi.fn()
