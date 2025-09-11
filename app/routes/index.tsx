import type { Route } from './+types/index';
import { AppNavbar } from '../components/shared/layout/AppNavbar';
import { GitHubUsersPage } from '../components/features/github-users/GitHubUsersPage';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'GitHub Finder' },
    { name: 'description', content: 'Find GitHub users and explore their profiles' },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AppNavbar />
      <GitHubUsersPage />
    </div>
  );
}
