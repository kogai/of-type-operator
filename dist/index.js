"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var rxjs_1 = require("rxjs");
function ofType(actionType) {
    return this.lift(new OfTypeOperator(actionType));
}
var OfTypeOperator = (function () {
    function OfTypeOperator(actionType) {
        this.actionType = actionType;
    }
    OfTypeOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new OfTypeSubscriber(subscriber, this.actionType));
    };
    return OfTypeOperator;
}());
var OfTypeSubscriber = (function (_super) {
    __extends(OfTypeSubscriber, _super);
    function OfTypeSubscriber(destination, actionType) {
        _super.call(this, destination);
        this.actionType = actionType;
    }
    OfTypeSubscriber.prototype._next = function (value) {
        if (value.type === this.actionType && this.destination.next) {
            this.destination.next(value.payload);
        }
    };
    return OfTypeSubscriber;
}(rxjs_1.Subscriber));
rxjs_1.Observable.prototype.ofType = ofType;
