import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import type { UpdateUserDto } from '../../types/auth';

export const Dashboard = () => {
  const queryClient = useQueryClient();
  const { updateUser, deleteUser, logout } = useAuth();
  const user = queryClient.getQueryData(['user']) as { email: string; firstName?: string; lastName?: string } | null;
  const [form, setForm] = useState<UpdateUserDto>({
    email: user?.email || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    password: '',
  });
  const [showConfirm, setShowConfirm] = useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const data: UpdateUserDto = {
      email: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
    };
    if (form.password) data.password = form.password;
    updateUser.mutate(data);
    setForm({ ...form, password: '' });
  };

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    deleteUser.mutate();
    setShowConfirm(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow text-center">
        <h1 className="text-3xl font-bold mb-4">ようこそ！</h1>
        {user ? (
          <>
            <p className="mb-2">{user.firstName || ''} {user.lastName || ''} さん</p>
            <p className="mb-2">メール: {user.email}</p>
            <form className="space-y-4 mt-6" onSubmit={handleUpdate}>
              <input
                type="email"
                className="w-full border rounded px-3 py-2"
                placeholder="メールアドレス"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
              />
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="名"
                value={form.firstName}
                onChange={e => setForm({ ...form, firstName: e.target.value })}
              />
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="姓"
                value={form.lastName}
                onChange={e => setForm({ ...form, lastName: e.target.value })}
              />
              <input
                type="password"
                className="w-full border rounded px-3 py-2"
                placeholder="新しいパスワード（空欄なら変更なし）"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
              />
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                disabled={updateUser.isPending}
              >
                {updateUser.isPending ? '更新中...' : '情報を更新'}
              </button>
            </form>
            <button
              className="w-full mt-6 bg-red-500 text-white py-2 rounded hover:bg-red-600"
              onClick={handleDelete}
              disabled={deleteUser.isPending}
            >
              アカウント削除
            </button>
            {showConfirm && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded shadow text-center">
                  <p className="mb-4">本当にアカウントを削除しますか？</p>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                    onClick={confirmDelete}
                  >
                    削除する
                  </button>
                  <button
                    className="bg-gray-300 px-4 py-2 rounded"
                    onClick={() => setShowConfirm(false)}
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            )}
            <button
              className="w-full mt-4 bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
              onClick={() => logout.mutate()}
            >
              ログアウト
            </button>
          </>
        ) : (
          <p>ユーザー情報が取得できませんでした。</p>
        )}
      </div>
    </div>
  );
}; 