"use strict";
const rxjs_1 = require("rxjs");
function ofType(actionType) {
    return this.lift(new OfTypeOperator(actionType));
}
class OfTypeOperator {
    constructor(actionType) {
        this.actionType = actionType;
    }
    call(subscriber, source) {
        return source._subscribe(new OfTypeSubscriber(subscriber, this.actionType));
    }
}
class OfTypeSubscriber extends rxjs_1.Subscriber {
    constructor(destination, actionType) {
        super(destination);
        this.actionType = actionType;
    }
    _next(value) {
        const { next } = this.destination;
        if (value.type === this.actionType && next) {
            next(value.payload);
        }
    }
}
rxjs_1.Observable.prototype.ofType = ofType;
