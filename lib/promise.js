const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;

export default class Promise {
  constructor(resolver) {
    this._state = PENDING;
    this._result = undefined;
    this.__handlers__ = [];

    // resolver(this.fulfill.bind(this), this.reject.bind(this));

    this.resolve.apply(this, [resolver, this.fulfill.bind(this), this.reject.bind(this)]);
  }

  resolve(resolver, onFulfilled, onRejected) {
    try {
      resolver(function(value){
        onFulfilled(value)
      }, function(reason){
        onRejected(reason);
      })
    } catch (e) {
      onRejected(this._result);
    }
  }

  reject(reason) {
    if (this._state !== PENDING) { return; };

    this._state = REJECTED;
    this._result = reason;
    this.__handlers__.forEach(this.handle.bind(this));
  }

  fulfill(value){
    if (this._state !== PENDING) { return; };

    this._state = FULFILLED;
    this._result = value;
    this.__handlers__.forEach(this.handle.bind(this));
  }

  handle(handler){
    if (this._state == PENDING) {
      this.__handlers__.push(handler);
    } else {
      if (this._state == FULFILLED) {
	handler.onFulfilled(this._result);
      } else if (this._state == REJECTED) {
	handler.onRejected(this._result);
      }
    }
  }

  then(onFulfilled, onRejected) {
    return new Promise((resolve, reject) => {
      return this.done(function(value) {
	return resolve(onFulfilled(value))
      }, function(reason) {
	return reject(onRejected(reason))
      })
    });
  }

  done(onFulfilled, onRejected) {
    setTimeout(() => {
      this.handle({
	onFulfilled,
	onRejected
      });
    }, 0);
  }

}
