# GitHub Finder

A modern GitHub user discovery application built with React Router v7, TypeScript, and Tailwind CSS.

## Features

- 🔍 Search GitHub users by username
- 👤 View detailed user profiles with statistics
- 📊 Display user repositories and activity
- 🎨 Modern, responsive design with dark mode support
- ⚡️ Built with React Router v7 and TypeScript
- 🎉 Beautiful Tailwind CSS styling
- 📱 Mobile-first responsive design

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

Install the dependencies:

```bash
pnpm install
```

### Environment Setup

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Get GitHub API credentials:
   - Go to [GitHub Developer Settings](https://github.com/settings/applications/new)
   - Create a new OAuth App
   - Copy the Client ID and Client Secret
   - Add them to your `.env` file:

```env
VITE_REACT_APP_CLIENT_ID=your_github_client_id_here
VITE_REACT_APP_CLIENT_SECRET=your_github_client_secret_here
```

**Note:** The app will work without these credentials, but you'll have rate limiting from GitHub's API.

### Development

Start the development server with HMR:

```bash
pnpm dev
```

Your application will be available at `http://localhost:5173`.

## Usage

1. **Search Users**: Enter a GitHub username in the search box to find users
2. **View Profiles**: Click "View Profile" on any user card to see detailed information
3. **Explore Repositories**: Browse the user's recent repositories and statistics
4. **Navigate**: Use the navigation bar to switch between Home and About pages

## Building for Production

Create a production build:

```bash
pnpm build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Technology Stack

- **React Router v7** - Modern routing and data loading
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **GitHub API** - User and repository data
- **Vite** - Fast build tool and dev server

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by Mahmudul Alam using React Router v7.
