# oha-web

Small React + TypeScript web app for browsing city data with filters.

## Prerequisites

- Node.js 22
- Yarn 4.x

## Setup

1. Install dependencies:

```bash
yarn install
```

2. Create `.env` from `.env.sample` file

I uploaded some images for the cities to my S3 bucket and made it public for read, please do not forget to set VITE_S3_SHARED_CITIES

Example minimal configuration:

```env
VITE_S3_SHARED_CITIES=https://oha-web-test-515966517637-eu-central-1-an.s3.eu-central-1.amazonaws.com/cities/
VITE_APP_ENV=dev
```

3. (optional) if you change default API port please update it in config file(src/config.tsx) as well(e.g baseApiUrl: "http://localhost:4000/api/v1")

## Run Locally

Start development server:

```bash
yarn start
```

Build for production:

```bash
yarn build
```

Preview production build:

```bash
yarn preview
```

## Testing

I use jest + react-testing-library here to cover everything by unit tests

You can use:

```bash
yarn test

or

yarn test:coverage
```

to run tests and check coverage

## Available Scripts

- `yarn start` - Run app in development mode
- `yarn build` - Type-check and create production build
- `yarn preview` - Preview production build locally
- `yarn test` - Run tests
- `yarn test:watch` - Run tests in watch mode
- `yarn test:coverage` - Generate test coverage report
- `yarn lint` - Run ESLint with auto-fix
- `yarn prettier` - Format code

## Functionality

- Dashboard route for browsing locations
- City list with responsive card layout
- Filtering by city name, country, and continent
- City details shown in a modal
- Empty state when no results are found
- Data fetching and caching with React Query
- Client-side routing with TanStack Router
