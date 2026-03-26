# Process Automation Frontend

Frontend application for the business process analysis and automation platform.

Built with **Next.js 14+**, **TypeScript**, **Tailwind CSS**, and **Shadcn/ui**.

## Features

- Process input with rich text editor
- NLP-powered process analysis visualization
- Automation scoring dashboard
- Recommendation display
- Interactive process flow visualization with React Flow

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/dhiaaissa/process-automation-frontend.git
cd process-automation-frontend
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── processes/          # Process management pages
│   ├── dashboard/          # Dashboard page
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # Shadcn/ui components
│   ├── process/            # Process-related components
│   ├── dashboard/          # Dashboard components
│   └── layout/             # Layout components
├── lib/
│   ├── api.ts              # API client
│   ├── utils.ts            # Utility functions
│   └── types.ts            # TypeScript types
└── hooks/                  # Custom React hooks
```

## Backend

See [process-automation-backend](https://github.com/dhiaaissa/process-automation-backend)

## License

MIT