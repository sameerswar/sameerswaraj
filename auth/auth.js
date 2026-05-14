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
  apiKey: "AIzaSyAvu--M7QJEV4_zxfd2cGaDOQdeQRV1Y1w",
  authDomain: "sameerswaraj-7a059.firebaseapp.com",
  projectId: "sameerswaraj-7a059",
  storageBucket: "sameerswaraj-7a059.firebasestorage.app",
  messagingSenderId: "401397860957",
  appId: "1:401397860957:web:83e08e8198ccf19a58dbb4",
  measurementId: "G-0YD08B11SD"
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
