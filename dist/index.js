"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var rxjs_1 = require("rxjs");
var OfTypeOperator = (function () {
    function OfTypeOperator(actionType, pickBy) {
        this.actionType = actionType;
        this.pickBy = pickBy;
    }
    OfTypeOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new OfTypeSubscriber(subscriber, this.actionType, this.pickBy));
    };
    return OfTypeOperator;
}());
var OfTypeSubscriber = (function (_super) {
    __extends(OfTypeSubscriber, _super);
    function OfTypeSubscriber(destination, actionType, pickBy) {
        _super.call(this, destination);
        this.actionType = actionType;
        this.pickBy = pickBy;
    }
    OfTypeSubscriber.prototype._next = function (action) {
        if (action.type === this.actionType && this.destination.next) {
            this.destination.next(this.pickBy(action));
        }
    };
    return OfTypeSubscriber;
}(rxjs_1.Subscriber));
function ofType(actionType, _pickBy) {
    var pickBy = _pickBy ? _pickBy : function (action) { return action.payload; };
    return this.lift(new OfTypeOperator(actionType, pickBy));
}
rxjs_1.Observable.prototype.ofType = ofType;
