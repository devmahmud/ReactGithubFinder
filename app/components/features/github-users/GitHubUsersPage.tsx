import { useState, useEffect } from 'react';
import { GitHubUserSearch } from './GitHubUserSearch';
import { GitHubUserList } from './GitHubUserList';
import { LoadingIndicator } from '../../shared/ui/LoadingIndicator';

interface User {
  avatar_url: string;
  login: string;
}

interface UsersState {
  users: User[];
  loading: boolean;
  query: string;
}

export function GitHubUsersPage() {
  const [state, setState] = useState<UsersState>({
    users: [],
    loading: false,
    query: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (state.query) {
        setState({ ...state, loading: true });
        const response = await fetch(`https://api.github.com/search/users?q=${state.query}`);
        const users = await response.json();
        setState({ ...state, users: users.items, loading: false });
      }
    };
    fetchUser();
    //eslint-disable-next-line
  }, [state.query]);

  const handleSearch = (query: string) => {
    setState({ ...state, query: query });
  };

  const handleClear = () => {
    setState({ ...state, users: [] });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <GitHubUserSearch
        onSearch={handleSearch}
        onClear={handleClear}
        showClear={state.users.length > 1}
      />
      {state.loading && <LoadingIndicator />}
      {!state.loading && <GitHubUserList users={state.users} />}
    </div>
  );
}
