'use strict';

/**
 * ゲームのメインロジック
 *
 * @class Logic (メインロジック)
 */
module.exports = class Logic{
  constructor(){
    this.you = new Member("あなた", 12, 6, 9);
    this.emeny = null;
    this.items = require('../items.js');
    this.scene = new Scene("", null);
  }

  log(){
    console.log("logic class");
  }

  rand(){
    return this.randi(6) + this.randi(6);
  }

  randi(max){
    return Math.floor(Math.random() * max) + 1;
  }

  luck_test(roll){
    return this.you.lck_now-- >= roll;
  }

  create_member(name, vit, dex, lck){
    return new Member(name, vit, dex, lck);
  }

  create_buttle(enemy){
    return new Buttle(this, enemy);
  }

  new_scene(name, data){
    this.scene = new Scene(name, data);
  }

  get_gamedata(){
    let result = {};
    result.scene = this.scene;
    let status = {};
    status.you = this.you;
    status.enemy = this.enemy;
    result.status = status;
    return result;
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

/**
  * シーン管理をするクラス
  * 1シーンはゲームブックの1パラグラフに相当する
  * パラグラフによってはセーブが可能となる
  *
  * @class Scene (シーン)
  * @constructor
  * @param name {String} 名前
  * @param data_str {Object} シーンを管理するJSONテキストデータ
  */
class Scene{
  constructor(name, data_str){
    try{
    const data = JSON.parse(data_str);
      this.name = name;
      this.on_enter = null;
      this.on_exit = null;
      this.message = data.message || "";
      this.select = data.select || {};
      data.next && (this.select["≫次へ"] = data.next);
      data.prev && (this.select["≪戻る"] = data.prev);
      data.image && (this.image = data.image);
    }catch(e){
      console.log(e.message);
    }
  }
}

/**
  * 戦闘シーンを管理するクラス
  * 1パラグラフ内で戦闘する場合はこのクラスを利用する
  * 基本的に、自分が負けるか敵が負けた場合戦闘終了する
  *
  * @class Buttle (戦闘シーン特別管理)
  * @constructor
  * @param you {Object} プレイヤーのキャラクターオブジェクト
  * @param enm {Object} 敵のキャラクターオブジェクト
  */
class Buttle{
  constructor(logic, enm){
    this.logic = logic;
    this.you = this.logic.you;
    this.enm = enm;
    this.empty();
  }

  main(){
    if(!this.actor || !this.target){
      this.init_turn();
      return;
    }

    if(this.luck == 0){
      this.select_luck();
      return;
    }

    if(this.you.vit_now <= 0){
      this.lose();
    }else if(this.enm.vit_now <= 0){
      this.win();
    }

    this.end_turn();

  }

  empty(){
    this.actor = null;
    this.target = null;
    this.actor_damage = 2;
    this.tareget_damage = 2;
    this.luck = 0; // 0:運試し未決定 1:運試しする -1:運試ししない
  }

  init_turn(){
    this.logic.scene.select.push({
      "戦う": "buttle_attack",
      "装備を選ぶ": "equip"
    });
    const you_dex = this.you + this.logic.rand();
    const enm_dex = this.enm + this.logic.rand();

    this.logic.scene.msg += `${this.you.name}の攻撃力 : ${you_dex}\n`;
    this.logic.scene.msg += `${this.enm.name}の攻撃力 : ${enm_dex}\n`;

    if(you_dex >= enm_dex){
      this.actor = this.you;
      this.target = this.enm;
    }else{
      this.actor = this.enm;
      this.target = this.you;
    }
    this.logic.scene.msg += `${this.actor.name}の攻撃\n`;
    this.logic.scene.select.push({"≫次へ": "buttle_damage" });
    this.logic.scene.select.push({"運試し": "buttle_luck" });
  }

  select_luck(){
    const you_roll = this.logic.rand();
    this.logic.scene.msg += `あなたの運 : ${this.you.lck_now}\n`;
    this.logic.scene.msg += `運試し結果 : ${you_roll}\n`;
    const luck_test = this.logic.luck_test(you_roll);
    if(luck_test){
      this.logic.scene.msg += `運試し成功！\n`;
    }else{
      this.logic.scene.msg += `運試し失敗…\n`;
    }
  }
}
