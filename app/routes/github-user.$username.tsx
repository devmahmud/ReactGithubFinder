import type { Route } from './+types/github-user.$username';
import { AppNavbar } from '../components/shared/layout/AppNavbar';
import { GitHubUserProfile } from '../components/features/pages/GitHubUserProfile';

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `${params.username} - GitHub Profile` },
    { name: 'description', content: `GitHub profile for ${params.username}` },
  ];
}

export default function UserDetailsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AppNavbar />
      <GitHubUserProfile />
    </div>
  );
}
