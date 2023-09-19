import { useState } from 'react';
import { auth } from '../config/Firebase';

import { useNavigate } from 'react-router-dom';

// ログイン済みユーザーの状態を読み込む & ログアウト
export function Main() {
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;
  const navigate = useNavigate();

  const onLogout = () => {
    // ログアウトの処理
    auth.signOut();
    navigate('/Home'); // ログアウト後にHomeに遷移
  };

  return (
    <div>
      <p>{name}</p>
      <p>{email}</p>

      <button type="button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}
