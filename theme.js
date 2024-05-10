// adapted from four.lol
function getInitialColorMode() {
  const persistedColorPreference = window.localStorage.getItem("color-mode");
  const hasPersistedPreference = typeof persistedColorPreference === "string"; // If the user has explicitly chosen light or dark,
  // let's use it. Otherwise, this value will be null.
  if (hasPersistedPreference) {
    return persistedColorPreference;
  } // If they haven't been explicit, let's check the media
  // query
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  const hasMediaQueryPreference = typeof mql.matches === "boolean";
  if (hasMediaQueryPreference) {
    return mql.matches ? "dark" : "light";
  } // If they are using a browser/OS that doesn't support
  // color themes, let's default to 'light'.
  return "light";
}

function setColorsByTheme() {
  const colors = {
    bg: { light: "white", dark: "#282828" },
    text: { light: "black", dark: "#ebdbb2" },
    tagbg: { light: "#ccc", dark: "#555" },
    hoverbg: { light: "#ccc", dark: "#555" },
    easy: { light: "#00932c", dark: "#00ba38" },
    medium: { light: "#cc8400", dark: "#d38900" },
    hard: { light: "#ca1400", dark: "#d71600" },
    buttonborderthickness: { light: "1px", dark: "2px" },
  };
  const colorMode = getInitialColorMode();
  const root = document.documentElement;
  Object.entries(colors).forEach(([name, colorByTheme]) => {
    const cssVarName = `--color-${name}`;
    root.style.setProperty(cssVarName, colorByTheme[colorMode]);
  });
  root.style.setProperty("--initial-color-mode", colorMode);
  const imageURLS = {
    "cc-svg" : { light: "images/cc.svg", dark: "images/cc_dark.svg" },
    "by-svg" : { light: "images/by.svg", dark: "images/by_dark.svg" },
  };
  Object.entries(imageURLS).forEach(([name, colorByTheme]) => {
    var imageTags = document.getElementsByClassName(name);
    for (let imageTag of imageTags) {
      imageTag.src = colorByTheme[colorMode];
    }
  });
}

function toggleColorMode() {
    const colorMode = getInitialColorMode();
    if (colorMode == 'light') {
        window.localStorage.setItem('color-mode', 'dark');
    } else if (colorMode == 'dark') {
        window.localStorage.setItem('color-mode', 'light');
    } else {
        console.log(`Encountered strange color mode: ${colorMode}`);
    }
    setColorsByTheme();
}

setColorsByTheme();
