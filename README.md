# Skipli - Task Management Platform

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS + shadcn/ui components
- **Forms**: React Hook Form with Zod validation
- **State Management**: TanStack Query for server state
- **Database**: Firebase Firestore
- **Real-time**: Socket.io (for upcoming chat feature)

## 📁 Project Structure


```
src/
├── app/                  # App Router
│   ├── (protected)/      # Authentication routes
│   │   ├── chat/         # Chat feature (coming soon)
│   │   ├── dashboard/    # Owner dashboard
│   │   ├── tasks/        # Task management
│   │   └── layout.tsx    # Protected layout with auth check
│   ├── (public)/         # Public routes
│   │   └── auth/         # Authentication pages (login,login-email,verify-email)        
├── components/           # App components
│   ├── layout/           # Layout components (navbar, sidebar)
│   ├── ui/               # shadcn/ui components
│   └── providers/        # providers
├── hooks/                # Custom React hooks, React Query hooks
├── lib/                 
│   ├── api/             # Resuable API functions
│   └── utils/           # Helper functions
├── types/               # Type definitions
└── views/               # Page-specific components and logic
```

## 🔐 Authentication & Authorization

The app uses middleware to handle authentication and role-based routing:

- **Not logged in**: Redirected to `/auth/login`
- **Owner role**: Redirected to `/dashboard`
- **Employee role**: Redirected to `/tasks`

### Authentication Methods
- Phone number with SMS OTP verification
- Email and password login with Email OTP verification
- Email verification link for new accounts

## 👥 User Roles & Features

### Owner && Employee
- **Profile**: Access to personal information (phone, username, email, UID, role)

### Owner
- **Employee Management**: Add, edit, remove and manage all employees
- **Task Assignment**: Create and assign tasks to employees

### Employee
- **Tasks**: View assigned tasks from owner, Update task status and progress

## 🎯 Key Features

### Current Features
- ✅ Role-based authentication and authorization
- ✅ Employee management (Owner only)
- ✅ Task creation and assignment
- ✅ Kanban board for task visualization
- ✅ Form validation with React Hook Form
- ✅ Data fetching with React Query

### Coming Soon
- 💬 Real-time chat feature

## 🛠️ Development

### Prerequisites
- Node.js 18+ 
- pnpm

### Installation

```bash
# Clone the repository
cd skipli

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Start development server
pnpm dev
```

### Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_API_ENDPOINT=http://localhost:3001/api
```

### Available Scripts

```bash
pnpm dev         
pnpm build        
pnpm start      
pnpm lint         
```

