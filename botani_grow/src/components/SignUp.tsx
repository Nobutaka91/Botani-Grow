import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Firebase';

export function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = formData; // 分割代入

  const navigate = useNavigate(); //ユーザー登録が完了してログイン後に画面を遷移させる

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    // ユーザーからの入力を保存
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // ユーザーがボタンを押したときの処理
    e.preventDefault(); // ユーザーがsubmitしたときの画面のリフレッッシュを防ぐ
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth, // firebaseに接続するための情報
        email,
        password
      );
      if (auth.currentUser) {
        // currentUserがnullでない場合のみ、updateProfileを呼び出す
        updateProfile(auth.currentUser, {
          displayName: name,
        });
      }
      navigate('/Plants'); // い所の処理が無事に完了した場合は、Infoディレクトリにリダイレクトされる
    } catch (error) {
      // firebaseへの登録が失敗した場合
      console.log(error);
    }
  };

  return (
    <div className="max-w-full max-h-full w-full h-full p-4 rounded-3xl">
      <form
        onSubmit={onSubmit}
        className="w-80 flex flex-col border  bg-sky-400 rounded-3xl items-center mx-auto"
      >
        <p className="font-sans	text-xl font-medium text-white">Sign Up</p>
        <input
          type="text"
          placeholder="😶 Name"
          id="name"
          value={name}
          required
          onChange={onChange}
          className="my-2 px-2 py-2 outline-none border-none  rounded-3xl text-base font-medium tracking-wide indent-7"
        />
        <input
          type="email"
          placeholder="📧 Email"
          id="email"
          value={email}
          required
          onChange={onChange}
          className="my-2 px-2 py-2 outline-none border-none  rounded-3xl text-base font-medium tracking-wide indent-7"
        />
        <input
          type="password"
          placeholder="🔑 password"
          id="password"
          value={password}
          required
          onChange={onChange}
          className="my-2 px-2 py-2 outline-none border-none  rounded-3xl text-base font-medium tracking-wide indent-7"
        />
        <button
          type="submit"
          className="my-2 px-2 py-2 outline-none border-none  rounded-3xl text-base bg-sky-600 hover:bg-sky-700 text-white font-medium uppercase cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
