
# ![Arcade Progress Tracker](./public/icons/favicon.ico) Arcade Progress Tracker

[![License: Custom](https://img.shields.io/badge/License-Proprietary-red.svg)](./LICENSE.md)

A comprehensive tracking system for Google Cloud Arcade participants and facilitators to monitor progress in skill badges, quests, and lab-free courses.

## Overview

Arcade Progress Tracker is a Next.js web application designed to help participants track their journey through the Google Cloud Arcade program. The application provides detailed dashboards, progress visualization, and reporting tools for both participants and facilitators.

## Features

### For Participants
- **Personal Dashboard** - Visualize your progress with intuitive charts and statistics
- **Progress Tracking** - Monitor completed skill badges, quests, and lab-free courses
- **History Tracking** - View historical data and improvement over time
- **Profile Management** - Manage your personal information and Skill Boost profile links

### For Facilitators
- **Comprehensive Reporting** - Get insights into participant performance and completion rates
- **Participant Management** - View and manage all participants in your program
- **Data Visualization** - Access charts and statistics showing overall program success
- **Alternative Views** - Multiple ways to analyze and interpret participant data

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/)
*   **UI Library:** [ShadCN](https://ui.shadcn.com/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Backend & Database:** [Appwrite](https://appwrite.io/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Notifications:** [React Hot Toast](https://react-hot-toast.com/)
*   **Font:** [Geist](https://vercel.com/font) (via `next/font`)

## Getting Started

### Prerequisites
- Node.js 14.x or later
- npm/yarn/pnpm/bun package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/Saptarshi-Chakraborty/arcade-progress-tracker
cd arcade-progress-tracker
```

2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables
```
# Create a .env.local file with necessary configuration
```

### Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.


This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Structure

```
arcade-progress-tracker/
├── components/              # Reusable UI components
│   ├── common/              # Shared components across pages
│   ├── pages/               # Page-specific components
│   │   ├── Example/         # Example page components
│   │   └── Facilitator/     # Facilitator page components
│   └── UI/                  # UI components (buttons, inputs, etc.)
├── contexts/                # React context providers
├── data/                    # Static data and mocks
├── lib/                     # Utility libraries
│   └── appwrite.js          # Appwrite client configuration
├── pages/                   # Application pages
│   ├── example/             # Example pages
│   ├── facilitator/         # Facilitator pages
│   └── index.js             # Main dashboard page
└── public/                  # Static files
```

## Deployment

The application can be deployed on Vercel or any other hosting platform that supports Next.js.

## License

This project is proprietary and confidential. See the [LICENSE](./LICENSE.md) file for details.

