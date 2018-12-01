'use strict';

const electron = require('electron');
const ipc = electron.ipcRenderer;

function load_scene(scene_name) {
  const msg = document.querySelector("#msg");
  const data = ipc.sendSync('load', scene_name);
  
  msg.innerText = data.scene;
}

window.onload = ()=>{
  let msg = document.querySelector("#msg");
  msg.innerText = "ここの文字列が変わります";
};