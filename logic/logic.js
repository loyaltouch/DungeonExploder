'use strict';

const items = require('../items.js');

module.exports = class Logic{
  constructor(){
    this.you = new Member("あなた", 12, 6, 9);
  }

  log(){
    console.log("logic class");
  }
}

class Member{
  constructor(name, vit, dex, lck){
    this.name = name;
    this.vit = vit;
    this.dex = dex;
    this.lck = lck;
    this.equip = items["(なし)"];
  }

  get_dex(){
    return this.dex + this.equip.value;
  }

  equip(item){
    
  }
}
