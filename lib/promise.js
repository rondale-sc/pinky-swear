const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;

export default class Promise {
  constructor(resolver) {
    this._state = PENDING;
    this._result = undefined;
    this.__handlers__ = [];

    resolver(this.fulfill.bind(this), this.reject.bind(this));
  }

  reject(reason) {
    if (this._state !== PENDING) { return; };

    this._state = REJECTED;
    this._result = reason;
  }

  fulfill(value){
    if (this._state !== PENDING) { return; };

    this._state = FULFILLED;
    this._result = value;
    this.__handlers__.forEach(this.handle);
  }

  handle(handler){
    if (this._state == PENDING) {
      this.__handlers__.push(handler);
    } else {
      if (this._state == FULFILLED) {
	handler.onFulfilled(this._result);
      }
    }
  }

  then(onFulfilled) {
    setTimeout(() => {
      this.handle({
	onFulfilled
      });
    }, 0);
  }

}
