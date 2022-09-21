// 必要な関数を import
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBxlW4Imesx3G1tPQthyiG3eRvMYOsNiQg",
  authDomain: "team3-originalapp.firebaseapp.com",
  projectId: "team3-originalapp",
  storageBucket: "team3-originalapp.appspot.com",
  messagingSenderId: "106853649958",
  appId: "1:106853649958:web:b3856c8056f265f21160e7",
  measurementId: "G-9JKED523FG",
}

// Firebaseアプリオブジェクトを初期化
const app = initializeApp(firebaseConfig)
// Firestoreを読み込み、db(databaseの略)として export
export const db = getFirestore(app)
export const auth = getAuth()
