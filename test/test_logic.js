const assert = require('assert');
const Logic = require('../logic/logic');
var logic;

describe('Logic', ()=>{
  beforeEach(()=>{
    logic = new Logic();
  });

  it('you', ()=>{
    assert(logic.you.name == "あなた");
    assert(logic.you.vit == 12);
    assert(logic.you.dex == 6);
    assert(logic.you.lck == 9);
  });

  it('get_dex', ()=>{
    // 素手の場合
    assert(logic.you.get_dex() == 6);

    // ナイフを装備している場合
    logic.you.equip = logic.items.ナイフ;
    assert(logic.you.get_dex() == 7);

    // 更に魔法で攻撃力強化した場合
    logic.you.buff = 2;
    assert(logic.you.get_dex() == 9);
  });
});