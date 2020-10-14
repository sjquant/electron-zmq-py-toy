const { app, BrowserWindow } = require("electron");
try {
  require("electron-reloader")(module);
} catch (_) {}

try {
  require("dotenv").config();
} catch (_) {}

function createWindow() {
  const win = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    maxWidth: 800,
    maxHeight: 600,
    title: "Simple Calculator",
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.setMenuBarVisibility(false);
  win.loadFile("index.html");
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
