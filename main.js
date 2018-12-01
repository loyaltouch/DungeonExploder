'use strict';

// アプリケーションをコントロールするモジュール
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;
const Logic = require('./logic.js');
const logic = new Logic();

// メインウィンドウはGCされないようにグローバル宣言
let mainWindow;

function load(fname){
  const FS = require('fs');
  return FS.readFileSync(`${__dirname}/scene/${fname}.json`, 'utf-8');
}

// 全てのウィンドウが閉じたら終了
app.on('window-all-closed', ()=> {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// Electronの初期化完了後に実行
app.on('ready', ()=> {
  // メイン画面の表示
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  //ウィンドウが閉じられたらアプリも終了
  mainWindow.on('closed', ()=> {
    mainWindow = null;
  });
});

// ipc.on(channel, listener) の形をとる。channel 名はなんでも良い。
ipc.on('load', (event, arg) => {
  const data = load(arg);
  event.returnValue = JSON.parse(data);
});