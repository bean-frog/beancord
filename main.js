const { app, BrowserWindow } = require('electron');
const path = require('path');

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    webPreferences: {
        nodeIntegration: true,
        // Enable webviewTag to allow using <webview> tag in the renderer process
        webviewTag: true,
      preload: path.join(__dirname, 'preload.js') 
    }
  });

  mainWindow.loadURL('https://discord.com/login'); 

  mainWindow.on('closed', () => {
    app.quit();
  });
});
