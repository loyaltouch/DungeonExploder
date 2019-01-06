'use strict';

module.exports = class Logic{
  constructor(){
    this.you = new Member("あなた", 12, 6, 9);
    this.items = require('../items.js');
  }

  log(){
    console.log("logic class");
  }
}

/**
  * 敵や味方のキャラクターを表すクラス
  *
  * @class Member (キャラクター)
  */
class Member{
  
  constructor(name, vit, dex, lck){
    this.name = name;
    this.vit = vit;
    this.dex = dex;
    this.lck = lck;
    this.equip = { type: 1, value: 0, prise: 0, count: 0 };
    this.buff = 0;
  }

  /**
   * キャラクターの技量点を計算する
   * 
   * @method get_dex
   * @return {Int} 原技量点と武器点、魔法による技量追加の合計
   */
  get_dex(){
    return this.dex + this.equip.value + this.buff;
  }
}
