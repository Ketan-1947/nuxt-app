import { describe, it, expect, vi, beforeAll } from 'vitest'

// mock mongoose before any imports
vi.mock('mongoose', () => {
  const mockSave = vi.fn().mockResolvedValue({})
  const mockFindOne = vi.fn()

  function MockModel(this: any) {
    this.save = mockSave
  }
  MockModel.findOne = mockFindOne

  return {
    default: {
      Schema: vi.fn().mockImplementation(() => ({})),
      model: vi.fn().mockReturnValue(MockModel)
    }
  }
})

describe('createUser', () => {
  it('should return 409 if user already exists', async () => {
    const mongoose = await import('mongoose')
    const USER = mongoose.default.model('user', {} as any)
    // @ts-ignore
    USER.findOne = vi.fn().mockResolvedValue({ id: 'test', password: '1234' })

    const { createUser } = await import('../../server/services/userLogic.js')
    const result = await createUser({ id: 'test', password: '1234' })

    expect(result.code).toBe(409)
    expect(result.error).toBe('user already exists!')
  })

  it('should return 404 if user does not exist', async () => {
    const mongoose = await import('mongoose')
    const USER = mongoose.default.model('user', {} as any)
    // @ts-ignore
    USER.findOne = vi.fn().mockResolvedValue(null)

    const { createUser } = await import('../../server/services/userLogic.js')
    const result = await createUser({ id: 'newuser', password: '1234' })

    expect(result.code).toBe(200)
    expect(result.status).toBe(true)
  })
})