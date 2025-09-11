export function LoadingIndicator() {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Searching GitHub users...</p>
        </div>
      </div>
    </div>
  );
}
