'use strict';

const electron = require('electron');
const ipc = electron.ipcRenderer;

function build_select_tag(key, value){
  return `<li><a href='#' onclick='load_scene("${value}")'>${key}</a></li>`;
}

function reflesh_select(select){
  let tag = "";
  select.forEach((val, index, ar)=>{
    for(let key in val){
      tag += build_select_tag(key, val[key]);
    }
  });
  const doc_select = document.querySelector("#select");
  doc_select.innerHTML = tag;
}

function reflesh_message(message){
  const doc_msg = document.querySelector("#message");
  doc_msg.innerText = message;
}

function reflesh(data){
  reflesh_message(data.message);
  reflesh_select(data.select);
}

function load_scene(scene_name) {
  const msg = document.querySelector("#message");
  const data = ipc.sendSync('load', scene_name);
  reflesh(data);
}

window.onload = ()=>{
  //let msg = document.querySelector("#msg");
  //msg.innerText = "ここの文字列が変わります";
};