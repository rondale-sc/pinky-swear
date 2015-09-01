import { deferred } from '../pinky-swear/pinky-swear';
import { expect, assert } from 'chai';

const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;

describe('When fulfilled, a promise', function(){
  it('must not transition to any other state.', function(){
    const { promise, resolve, reject } = deferred();
    resolve('foo');
    resolve('bar');
    expect(promise._result).to.equal('foo');
    expect(promise._state).to.equal(FULFILLED);
  });
});

describe('When fulfilled, a promise', function(){
  it('must not transition to any other state.', function(){
    const { promise, resolve, reject } = deferred();
    reject('foo');
    reject('bar');
    expect(promise._result).to.equal('foo');
    expect(promise._state).to.equal(REJECTED);
  });
});

describe('When pending, a promise', function(){
  it('may transition to FULFILLED OR REJECTED', function(){
    const { promise, resolve, reject } = deferred();
    expect(promise._state).to.equal(PENDING);
    resolve('foo');
    expect(promise._state).to.equal(FULFILLED);
  });
});

describe('then', function(){
  it('', function(done){
    const { promise, resolve, reject } = deferred();

    promise.then(function(foo){
      expect(foo).to.equal('foo');
      done();
    }, null);

    resolve('foo');
  });
});
