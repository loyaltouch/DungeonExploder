'use strict';

const electron = require('electron');
const ipc = electron.ipcRenderer;

/**
 * @param data 部屋描画パラメータの説明
 * 最初の2項目は、外周の横・縦長さ
 * 残りの項目は、[x座標,y座標,{0:横方向 1:縦方向}]の順番で
 * 壁の位置を描画
 */
function reflesh_room_image(canvas, data){
  try{
    // 最初の２つは外壁の描画
    canvas.strokeStyle = "black";
    canvas.fillStyle = "#dddddd";
    let x = data[0];
    let y = data[1];
    canvas.beginPath();
    canvas.fillRect(5, 5, x * 20, y * 20);
    canvas.strokeRect(5, 5, x * 20, y * 20);
    // 扉を描画
    let i = 0;
    for(i = 2; i < data.length; i++){
      let xx = data[i][0];
      let yy = data[i][1];
      let d = data[i][2];
      if(d == 0){
        // 横方向の扉
        canvas.moveTo(xx * 20 + 15, yy * 20);
        canvas.lineTo(xx * 20 + 15, yy * 20 + 10);
      }else{
        // 縦方向の扉
        canvas.moveTo(xx * 20 , yy * 20 + 15);
        canvas.lineTo(xx * 20 + 10, yy * 20 + 15);
      }
    }
    canvas.closePath();
    canvas.stroke();
  }catch(e){}
}


function build_select_tag(key, value){
  return `<li><a href='#' onclick='load_scene("${value}")'>${key}</a></li>`;
}

function reflesh_status(id, data){
  ["vit_now", "vit_max", "dex", "lck_now", "lck_max"].forEach(key => {
    if(data[key]){
      document.getElementById(`${id}_${key}`).innerText = data[key];
    }
  });
}

function reflesh_icon(canvas, url){
  let image = new Image();
  image.src = url;
  image.onload = function(){
    canvas.drawImage(image, 0, 0, 180, 180);
  }
}

function reflesh_image(data){
  let canvas = document.getElementById("canvas").getContext("2d");
  canvas.strokeStyle = "black";
  canvas.fillStyle = "white";
  canvas.fillRect(0, 0, 180, 180);
  if(data && data.room){
    reflesh_room_image(canvas, data.room);
  }
  if(data && data.icon){
    reflesh_icon(canvas, "res/" + data.icon);
  }
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
  reflesh_message(data.scene.message);
  reflesh_select(data.scene.select);
  reflesh_image(data.scene.image);
  reflesh_status("you", data.you);
}

function load_scene(scene_name) {
  const data = ipc.sendSync('load', scene_name);
  if(data){
    reflesh(data);
  }
}

window.onload = ()=>{
};