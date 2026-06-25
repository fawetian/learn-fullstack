const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const Store = require('electron-store')

let mainWindow, noteWindow

const store = new Store()

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  mainWindow.loadFile('index.html')
}

function createNoteWindow() {
  noteWindow = new BrowserWindow({
    width: 400,
    height: 300,
    parent: mainWindow,
    modal: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  noteWindow.loadFile('note.html')
}

app.whenReady().then(createMainWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.handle('get-notes', () => {
  return store.get('notes', [])
})

ipcMain.on('save-note', (event, note) => {
  const notes = store.get('notes', [])
  notes.push(note)
  store.set('notes', notes)
  mainWindow.webContents.send('update-notes', notes)
})
