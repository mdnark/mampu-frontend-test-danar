export const mockUsers = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    phone: '1-770-736-0988',
    website: 'hildegard.org',
    company: { name: 'Romaguera-Crona', catchPhrase: 'Multi-layered' },
    address: { street: 'Kulas Light', suite: 'Apt. 556', city: 'Gwenborough', zipcode: '92998' }
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    phone: '010-692-6593',
    website: 'anastasia.net',
    company: { name: 'Deckow-Crist', catchPhrase: 'Proactive didactic' },
    address: { street: 'Victor Plains', suite: 'Suite 879', city: 'Wisokyburgh', zipcode: '90566' }
  },
]

export const mockPosts = [
  { id: 1, userId: 1, title: 'Post 1', body: 'Body 1' },
  { id: 2, userId: 1, title: 'Post 2', body: 'Body 2' },
  { id: 3, userId: 2, title: 'Post 3', body: 'Body 3' },
]

export const mockTodos = [
  { id: 1, userId: 1, title: 'Todo 1', completed: true },
  { id: 2, userId: 1, title: 'Todo 2', completed: false },
  { id: 3, userId: 2, title: 'Todo 3', completed: false },
  { id: 4, userId: 2, title: 'Todo 4', completed: false },
]

export const mockUsersWithActivity = [
  {
    ...mockUsers[0],
    totalPosts: 2,
    completedTodos: 1,
    pendingTodos: 1,
  },
  {
    ...mockUsers[1],
    totalPosts: 1,
    completedTodos: 0,
    pendingTodos: 2,
  },
]