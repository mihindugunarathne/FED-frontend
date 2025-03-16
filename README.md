# E-Commerce Frontend Application

## Overview
React-based frontend for an e-commerce platform with Redux state management.

## Tech Stack
- React.js
- Redux Toolkit
- Tailwind CSS
- React Router DOM
- Clerk Authentication
- React Hook Form

## Setup
1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```
REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_key
REACT_APP_API_URL=http://localhost:5000
```

3. Start development server:
```bash
npm start
```

## Features
- Product Browsing & Filtering
- Shopping Cart Management
- User Authentication
- Order Processing
- Admin Dashboard
- Responsive Design

## Project Structure
```
src/
├── components/     # Reusable UI components
├── pages/         # Route components
├── features/      # Redux slices
├── services/      # API services
└── utils/         # Helper functions
```