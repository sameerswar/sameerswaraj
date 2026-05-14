import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-analytics.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDm_EihRX8X3P6TIch0x9Q9whd-qS703lQ",
  authDomain: "sameerswaraj-6d046.firebaseapp.com",
  projectId: "sameerswaraj-6d046",
  storageBucket: "sameerswaraj-6d046.firebasestorage.app",
  messagingSenderId: "636602640511",
  appId: "1:636602640511:web:0fa6b3e476c9dc8a40374a",
  measurementId: "G-T9WSS531ZF"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const siteRoot = new URL("../", import.meta.url);
const authPage = new URL("auth/auth.html", siteRoot).href;
const homePage = new URL("index.html", siteRoot).href;

window.loginGoogle = () => {
  signInWithPopup(auth, provider)
    .then(() => {
      const nextPage = sessionStorage.getItem("nextPage") || homePage;
      window.location.href = nextPage;
    })
    .catch(err => alert(err.message));
};

window.checkAuth = () => {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      sessionStorage.setItem("nextPage", window.location.href);
      window.location.href = authPage;
    }
  });
};

window.logoutUser = () => {
  signOut(auth).then(() => {
    window.location.href = authPage;
  });
};
