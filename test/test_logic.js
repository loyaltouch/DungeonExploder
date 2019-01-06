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
    assert(logic.you.get_dex() == 6);
  });
});