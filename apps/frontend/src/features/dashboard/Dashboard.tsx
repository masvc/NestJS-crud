import { useQueryClient } from '@tanstack/react-query';

export const Dashboard = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']) as { email: string; firstName?: string; lastName?: string } | null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow text-center">
        <h1 className="text-3xl font-bold mb-4">ようこそ！</h1>
        {user ? (
          <>
            <p className="mb-2">{user.firstName || ''} {user.lastName || ''} さん</p>
            <p className="mb-2">メール: {user.email}</p>
          </>
        ) : (
          <p>ユーザー情報が取得できませんでした。</p>
        )}
      </div>
    </div>
  );
}; 