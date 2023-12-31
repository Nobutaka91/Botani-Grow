//  firebase関連のライブラリ
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  // signInWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, addDoc, collection } from 'firebase/firestore';

// 構成オブジェクトを作成
const firebaseConfig = {
  // Firebaseの機能をフロントから使用する時に必要
  apiKey: 'AIzaSyDVh2fwfN2Im3FjMe3K25T-pRmM8dQ18qc',
  authDomain: 'botani-grow.firebaseapp.com',
  projectId: 'botani-grow',
  storageBucket: 'botani-grow.appspot.com',
  messagingSenderId: '711308008244',
  appId: '1:711308008244:web:12774ef6639713ca5f6361',
};

const app = initializeApp(firebaseConfig); // firebaseの初期化
const auth = getAuth(app); // 認証の初期化
const db = getFirestore(app); // firestoreのインスタンス取得

export { app, auth, db };
