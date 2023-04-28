const { app, BrowserWindow, globalShortcut } = require('electron');
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

  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadURL('https://discord.com/login');
  mainWindow.maximize();

  mainWindow.on('closed', () => {
    app.quit();
  });
  // Add custom CSS styles using insertCSS
  mainWindow.webContents.on('dom-ready', () => {
    mainWindow.webContents.insertCSS(`
    div.notice-2HEN-u.colorDefault-1e8tQv {
      display:none
    }
    div.image-20MDYu.marginBottom40-fvAlAV {
      background-image: url("https://c.tenor.com/cSLZcTAeNTAAAAAC/tenor.gif") !important
   }
    `);
  });
  // Register global shortcuts for keybindings
  globalShortcut.register('CmdOrCtrl+Shift+R', () => {
    mainWindow.reload();
  });
  globalShortcut.register('CmdOrCtrl+Shift+I', () => {
    mainWindow.webContents.toggleDevTools();
  });
});

// Unregister global shortcuts when the app is quitting
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});
