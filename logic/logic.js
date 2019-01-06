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
  * 現在体力点および運点は原体力点・運点でリセットされる
  *
  * @class Member (キャラクター)
  * @constructor
  * @param name {String} 名前
  * @param vit {Int} 原体力点
  * @param dex {Int} 原技量点
  * @param lck {Int} 原運点 (主人公以外、初期値は0)
  */
class Member{
  
  constructor(name, vit, dex, lck){
    this.name = name;
    this.vit_max = vit;
    this.dex = dex;
    this.lck_max = lck;
    this.equip = { type: 1, value: 0, prise: 0, count: 0 };
    this.buff = 0;

    this.inn();
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

  /**
   * 宿屋に泊まる時の処理。現在の体力と運を原点に設定する
   * (引数および戻り値なし)
   * @method inn
   */
  inn(){
    this.vit_now = this.vit_max;
    this.lck_now = this.lck_max;
  }
}
