const splashScriptUrl = document.currentScript.src;
const currentPage = window.location.pathname;

// check if already splash page
const isSplash =
currentPage.includes("splash/index.html");

// splash already shown?
const splashShown =
sessionStorage.getItem("splashShown");

if (!isSplash && !splashShown) {

    // mark splash shown
    sessionStorage.setItem("splashShown", "true");

    // save destination
    sessionStorage.setItem(
        "nextPage",
        window.location.href
    );

    // IMPORTANT:
    // relative path use karo
    window.location.href = new URL("index.html", splashScriptUrl).href;
}
