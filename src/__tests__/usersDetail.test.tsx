import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UsersDetailPage } from '@/features/users/components/UsersDetailPage'
import { mockUsers, mockPosts, mockTodos } from '../mocks/handlers'

jest.mock('@/features/users/hooks/useUsers', () => ({
  userRepository: {
    hooks: {
      useUsers: jest.fn(),
      useUsersDetail: jest.fn(),
    }
  }
}))

import { userRepository } from '@/features/users/hooks/useUsers'
const mockUseUsersDetail = userRepository.hooks.useUsersDetail as jest.Mock

jest.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({ push: jest.fn() }),
}))

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } }
})

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
)

describe('UsersDetailPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    queryClient.clear()
  })

  it('renders user detail with posts and todos', async () => {
    mockUseUsersDetail.mockReturnValue({
      users: mockUsers[0],
      posts: mockPosts.filter(p => p.userId === 1),
      todos: mockTodos.filter(t => t.userId === 1),
      isLoading: false,
      isError: false,
    })

    render(<UsersDetailPage id={1} />, { wrapper: Wrapper })

    await waitFor(() => {
      expect(screen.getByText('Leanne Graham')).toBeInTheDocument()
      expect(screen.getByText('Sincere@april.biz')).toBeInTheDocument()
      expect(screen.getByText('Post 1')).toBeInTheDocument()
      expect(screen.getByText('Todo 1')).toBeInTheDocument()
    })
  })

  it('shows loading state', () => {
    mockUseUsersDetail.mockReturnValue({
      users: undefined,
      posts: undefined,
      todos: undefined,
      isLoading: true,
      isError: false,
    })

    render(<UsersDetailPage id={1} />, { wrapper: Wrapper })

    expect(screen.queryByText('Leanne Graham')).not.toBeInTheDocument()
  })

  it('shows error state when user not found', () => {
    mockUseUsersDetail.mockReturnValue({
      users: undefined,
      posts: undefined,
      todos: undefined,
      isLoading: false,
      isError: true,
    })

    render(<UsersDetailPage id={999} />, { wrapper: Wrapper })

    expect(screen.getByText(/user not found/i)).toBeInTheDocument()
  })

  it('shows invalid id state for NaN id', () => {
    mockUseUsersDetail.mockReturnValue({
      users: undefined,
      posts: undefined,
      todos: undefined,
      isLoading: false,
      isError: false,
    })

    render(<UsersDetailPage id={NaN} />, { wrapper: Wrapper })

    expect(screen.getByText(/invalid user id/i)).toBeInTheDocument()
  })

  it('shows invalid id state for negative id', () => {
    mockUseUsersDetail.mockReturnValue({
      users: undefined,
      posts: undefined,
      todos: undefined,
      isLoading: false,
      isError: false,
    })

    render(<UsersDetailPage id={-1} />, { wrapper: Wrapper })

    expect(screen.getByText(/invalid user id/i)).toBeInTheDocument()
  })

  it('shows empty state when user has no posts', async () => {
    mockUseUsersDetail.mockReturnValue({
      users: mockUsers[0],
      posts: [],
      todos: mockTodos.filter(t => t.userId === 1),
      isLoading: false,
      isError: false,
    })

    render(<UsersDetailPage id={1} />, { wrapper: Wrapper })

    await waitFor(() => {
      expect(screen.getByText(/no posts found/i)).toBeInTheDocument()
    })
  })

  it('shows empty state when user has no todos', async () => {
    mockUseUsersDetail.mockReturnValue({
      users: mockUsers[0],
      posts: mockPosts.filter(p => p.userId === 1),
      todos: [],
      isLoading: false,
      isError: false,
    })

    render(<UsersDetailPage id={1} />, { wrapper: Wrapper })

    await waitFor(() => {
      expect(screen.getByText(/no todos found/i)).toBeInTheDocument()
    })
  })
})