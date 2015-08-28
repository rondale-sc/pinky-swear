import hello from '../pinky-swear/pinky-swear';
import { expect } from 'chai';

describe('test', function(){

  it('example', function(){
    expect(hello()).to.equal('hello world');
  });

});
