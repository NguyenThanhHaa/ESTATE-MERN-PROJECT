
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "login-cc393.firebaseapp.com",
  projectId: "login-cc393",
  storageBucket: "login-cc393.appspot.com",
  messagingSenderId: "748233380782",
  appId: "1:748233380782:web:8f1f9540b101c4f8bfae3f"
};



// Initialize Firebase

export const app = initializeApp(firebaseConfig);
