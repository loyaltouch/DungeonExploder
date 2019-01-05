const assert = require('assert');
const Logic = require('../logic/logic'); 

describe('Logic', ()=>{
  it('add', ()=>{
    l = new Logic();
    assert(l.add(4, 8) == 12);
  });
});