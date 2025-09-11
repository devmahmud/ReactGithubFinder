import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router';

interface UserProfile {
  avatar_url: string;
  name: string;
  location: string;
  hireable: boolean;
  bio: string;
  html_url: string;
  login: string;
  company: string;
  blog: string;
  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;
}

interface Repository {
  name: string;
  html_url: string;
}

interface UserDetailsState {
  profile: UserProfile;
  repository: Repository[];
  loading: boolean;
}

export function GitHubUserProfile() {
  const { username } = useParams();
  const [state, setState] = useState<UserDetailsState>({
    profile: {} as UserProfile,
    repository: [],
    loading: true,
  });

  useEffect(() => {
    const getUser = async (uid = username) => {
      if (!uid) return;

      const client_id = import.meta.env.VITE_REACT_APP_CLIENT_ID;
      const client_secret = import.meta.env.VITE_REACT_APP_CLIENT_SECRET;
      setState({ ...state, loading: true });

      const profileResponse = await fetch(
        `https://api.github.com/users/${uid}?client_id=${client_id}&client_secret=${client_secret}`
      );

      const repoResponse = await fetch(
        `https://api.github.com/users/${uid}/repos?per_page=5&sort=asc&client_id=${client_id}&client_secret=${client_secret}`
      );
      const profile = await profileResponse.json();
      const repos = await repoResponse.json();

      setState({ profile: profile, repository: repos, loading: false });
    };
    getUser();

    //eslint-disable-next-line
  }, [username]);

  if (state.loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center min-h-96">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                Loading user profile...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Search
        </Link>
      </div>

      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 animate-fade-in">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profile Image and Basic Info */}
          <div className="lg:w-1/3 text-center lg:text-left">
            <div className="relative inline-block">
              <img
                src={state.profile.avatar_url}
                alt={state.profile.name || state.profile.login}
                className="w-32 h-32 rounded-full border-4 border-gray-200 dark:border-gray-600 mx-auto lg:mx-0"
              />
              {state.profile.hireable && (
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
              {state.profile.name || state.profile.login}
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">@{state.profile.login}</p>

            {state.profile.location && (
              <p className="text-gray-600 dark:text-gray-400 mb-4 flex items-center justify-center lg:justify-start">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {state.profile.location}
              </p>
            )}

            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {state.profile.hireable ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Available for hire
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Not available for hire
                </span>
              )}
            </div>
          </div>

          {/* Bio and Details */}
          <div className="lg:w-2/3">
            {state.profile.bio && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Bio</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {state.profile.bio}
                </p>
              </div>
            )}

            <div className="mb-6">
              <a
                href={state.profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Visit GitHub Profile
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {state.profile.company && (
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <span className="font-medium">Company:</span>
                  <span className="ml-1">{state.profile.company}</span>
                </div>
              )}

              {state.profile.blog && (
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  <span className="font-medium">Website:</span>
                  <a
                    href={state.profile.blog}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    {state.profile.blog}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {state.profile.followers}
            </div>
            <div className="text-sm text-red-600 dark:text-red-400">Followers</div>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {state.profile.following}
            </div>
            <div className="text-sm text-green-600 dark:text-green-400">Following</div>
          </div>
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {state.profile.public_repos}
            </div>
            <div className="text-sm text-blue-600 dark:text-blue-400">Public Repos</div>
          </div>
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {state.profile.public_gists}
            </div>
            <div className="text-sm text-purple-600 dark:text-purple-400">Public Gists</div>
          </div>
        </div>
      </div>

      {/* Repositories */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Recent Repositories
        </h3>
        {state.repository && state.repository.length > 0 ? (
          <div className="space-y-3">
            {state.repository.map((repo, i) => (
              <div
                key={i}
                className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
                >
                  {repo.name}
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No repositories found.</p>
        )}
      </div>
    </div>
  );
}
