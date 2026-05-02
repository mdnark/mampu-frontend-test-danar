import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UsersPage } from "@/features/users/components/UsersPage";
import { userRepository } from "@/features/users/hooks/useUsers";
import { mockUsersWithActivity } from "../mocks/handlers";

jest.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({ replace: jest.fn(), push: jest.fn() }),
}));

jest.mock("@/features/users/hooks/useUsers", () => ({
  userRepository: {
    hooks: {
      useUsers: jest.fn(),
      useUsersDetail: jest.fn(),
    },
  },
}));

const mockUseUsers = userRepository.hooks.useUsers as jest.Mock;

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('UsersPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    queryClient.clear()
  })

  it('renders users with activity signals', async () => {
    mockUseUsers.mockReturnValue({
      data: mockUsersWithActivity,
      isLoading: false,
      isError: false,
    })

    render(<UsersPage />, { wrapper: Wrapper })

    await waitFor(() => {
      expect(screen.getAllByText('Leanne Graham').length).toBeGreaterThan(0)
      expect(screen.getAllByText('Ervin Howell').length).toBeGreaterThan(0)
    })
  })

  it('shows loading skeleton when fetching', () => {
    mockUseUsers.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    })

    render(<UsersPage />, { wrapper: Wrapper })

    expect(screen.queryByText('Leanne Graham')).not.toBeInTheDocument()
  })

  it('shows error state when fetch fails', () => {
    mockUseUsers.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    })

    render(<UsersPage />, { wrapper: Wrapper })

    expect(screen.getAllByText(/failed to load/i).length).toBeGreaterThan(0)
  })

  it('filters users with no-completed filter', async () => {
    mockUseUsers.mockReturnValue({
      data: mockUsersWithActivity,
      isLoading: false,
      isError: false,
    })

    render(<UsersPage />, { wrapper: Wrapper })

    const filterBtn = screen.getByRole('button', { name: /no completed/i })
    fireEvent.click(filterBtn)

    await waitFor(() => {
      expect(screen.queryAllByText('Leanne Graham').length).toBe(0)
      expect(screen.getAllByText('Ervin Howell').length).toBeGreaterThan(0)
    })
  })

  it('shows empty state when filter has no results', async () => {
    mockUseUsers.mockReturnValue({
      data: [{ ...mockUsersWithActivity[0], completedTodos: 1 }],
      isLoading: false,
      isError: false,
    })

    render(<UsersPage />, { wrapper: Wrapper })

    const filterBtn = screen.getByRole('button', { name: /no completed/i })
    fireEvent.click(filterBtn)

    await waitFor(() => {
      expect(
        screen.getAllByText(/no users found|no results/i).length
      ).toBeGreaterThan(0)
    })
  })
})
