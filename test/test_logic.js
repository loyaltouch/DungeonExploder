const assert = require('assert');
const Logic = require('../logic/logic');
var logic;

describe('Logic', ()=>{
  beforeEach(()=>{
    logic = new Logic();
  });

  it('you', ()=>{
    assert(logic.you.name == "あなた");
    assert(logic.you.vit_max == 12);
    assert(logic.you.dex == 6);
    assert(logic.you.lck_max == 9);
    assert(logic.you.vit_now == 12);
    assert(logic.you.lck_now == 9);
  });

  it('get_dex', ()=>{
    // 素手の場合
    assert(logic.you.get_dex() == 6);

    // ナイフを装備している場合
    logic.you.equip = logic.items.ナイフ;
    assert.equal(logic.you.get_dex(), 7);

    // 更に魔法で攻撃力強化した場合
    logic.you.buff = 2;
    assert.equal(logic.you.get_dex(), 9);
  });

  it('dice', ()=>{
    // 2～12の乱数
    for(let i = 0; i < 100; i++){
      const ret = logic.rand();
      assert(ret >= 2);
      assert(ret <= 12);
    }
  });

  it('buttle', ()=>{
    let enemy = logic.create_member("ゴブリン", 8, 8, 0);
    let buttle = logic.create_buttle(enemy);
    assert.equal(buttle.you.name, "あなた");
    assert.equal(buttle.enm.name, "ゴブリン");
  });
});