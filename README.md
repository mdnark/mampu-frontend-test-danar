# Mampu Frontend Test — M. Danar Kahfi

## Tech Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui
- TanStack Query (React Query)
- Jest + React Testing Library

## Getting Started

### Install dependencies
npm install

### Run development server
npm run dev

Open http://localhost:3000

### Run tests
npm test

## Features
- Users list with search, filter, sort, and pagination
- Activity signals per user (total posts, completed & pending todos)
- Filter by: has pending todos, no completed todos
- Responsive: table on desktop, cards on mobile
- User detail with posts and todos section
- Preserve search/filter state when navigating back from detail
- Loading skeletons, error states, empty states
- Edge case handling: invalid id, failed requests, empty results
- SEO metadata via generateMetadata
- 12 unit tests covering list and detail pages

## Project Structure
src/
├── app/                  # Next.js App Router pages
├── features/users/       # Feature-based architecture
│   ├── components/       # UI components
│   ├── hooks/            # React Query hooks
│   ├── services/         # API service layer
│   └── types/            # TypeScript types
├── shared/               # Shared components
├── mocks/                # Test mock data
└── __tests__/            # Unit tests