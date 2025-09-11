import type { Route } from './+types/about-page';
import { AppNavbar } from '../components/shared/layout/AppNavbar';
import { AboutPage } from '../components/features/pages/AboutPage';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'About - GitHub Finder' },
    { name: 'description', content: 'About GitHub Finder application' },
  ];
}

export default function AboutPageRoute() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AppNavbar />
      <AboutPage />
    </div>
  );
}
