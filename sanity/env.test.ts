import { afterEach, beforeEach, expect, test, vi } from 'vitest'

// Snapshot and restore env across tests
const OLD_ENV = process.env

beforeEach(() => {
  vi.resetModules()
  process.env = { ...OLD_ENV }
})

afterEach(() => {
  process.env = OLD_ENV
})

test('loads projectId and dataset from env', async () => {
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'demo-project'
  process.env.NEXT_PUBLIC_SANITY_DATASET = 'production'

  const mod = await import('./env')
  expect(mod.projectId).toBe('demo-project')
  expect(mod.dataset).toBe('production')
  expect(typeof mod.apiVersion).toBe('string')
})

test('throws helpful error when required env is missing', async () => {
  delete process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  delete process.env.NEXT_PUBLIC_SANITY_DATASET

  await expect(import('./env')).rejects.toThrow(/Missing environment variable/)
})

