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
  apiKey: "AIzaSyAvDXrQwOOZx1AAytPB-epP480aXIoEHgQ",
  authDomain: "sameerswaraj.in",
  projectId: "sameerswaraj-bd0fa",
  storageBucket: "sameerswaraj-bd0fa.firebasestorage.app",
  messagingSenderId: "85687758148",
  appId: "1:85687758148:web:73ecf765b6d595aed73b11",
  measurementId: "G-62E66QHXS2"
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
