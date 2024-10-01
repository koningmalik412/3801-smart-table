
const { app, BrowserWindow } = require("electron");

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Smart Table',
        width: 1920,
        height: 1080,
    });

    mainWindow.loadURL("http://localhost:3000")
};

app.whenReady().then(createMainWindow)