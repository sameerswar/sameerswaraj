// ===== HOME PAGE =====
const siteRoot = new URL("../", import.meta.url);
const homePage = new URL("index.html", siteRoot).href;

// 🔴 IMPORTANT: yahan apna Google OAuth Client ID daalo
const clientId = "549064586468-9v0ctirunkuqvolghu49bt70jimtcjq7.apps.googleusercontent.com";

// ===== INIT GOOGLE GIS =====
window.onload = () => {
  google.accounts.id.initialize({
    client_id: clientId,
    callback: handleCredentialResponse,
  });
};

// ===== LOGIN BUTTON CLICK =====
window.loginGoogle = () => {
  google.accounts.id.prompt(); // Google account chooser open
};

// ===== LOGIN SUCCESS CALLBACK =====
function handleCredentialResponse(response) {
  try {
    const user = parseJwt(response.credential);

    console.log("Logged in user:", user);

    // save user in session
    sessionStorage.setItem("user", JSON.stringify(user));

    // redirect to home
    window.location.href = homePage;

  } catch (err) {
    console.error("Login error:", err);
    alert("Login failed");
  }
}

// ===== JWT DECODE FUNCTION =====
function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(atob(base64));
}

// ===== GET CURRENT USER (optional helper) =====
window.getCurrentUser = () => {
  return JSON.parse(sessionStorage.getItem("user"));
};

// ===== LOGOUT =====
window.logoutUser = () => {
  sessionStorage.removeItem("user");
  window.location.href = "auth/auth.html";
};
