import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDy0n67gbd9vf8gTd7OXwqqNp10-7Qj6V4",
  authDomain: "echoblog-authentication.firebaseapp.com",
  projectId: "echoblog-authentication",
  storageBucket: "echoblog-authentication.appspot.com",
  messagingSenderId: "1055433462005",
  appId: "1:1055433462005:web:0d6bf6aaa9ae4618a275bc",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
