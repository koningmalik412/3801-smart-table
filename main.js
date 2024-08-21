

const { app, BrowserWindow } = require("electron");

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Smart Table',
        width: 1200,
        height: 800,
    });

    mainWindow.loadFile("index.html")
};

app.whenReady().then(createMainWindow)