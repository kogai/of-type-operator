import { Operator } from "rxjs/Operator";
import { Subscriber } from "rxjs/Subscriber";
import { Observable } from "rxjs/Observable";

export type ActionType = string | number
export interface Action<T> {
  type: ActionType;
  payload?: T;
}

export type PickByFunction = <T>(action: Action<T>) => T

class OfTypeOperator<A extends Action<T>, T> implements Operator<A, T> {
  constructor(private actionType: ActionType, private pickBy: PickByFunction) {}
  call(subscriber: Subscriber<T>, source: any): any {
    return source._subscribe(new OfTypeSubscriber(subscriber, this.actionType, this.pickBy));
  }
}

class OfTypeSubscriber<A extends Action<T>, T> extends Subscriber<A> {
  constructor(destination: Subscriber<T>, private actionType: ActionType, private pickBy: PickByFunction) {
    super(destination);
  }

  protected _next(action: A) {
    if (action.type === this.actionType && this.destination.next) {
      this.destination.next(this.pickBy(action));
    }
  }
}

function ofType<T>(actionType: ActionType, _pickBy?: PickByFunction): Observable<T> {
  const pickBy = _pickBy ? _pickBy : (action: Action<T>) => action.payload;
  return this.lift(new OfTypeOperator(actionType, pickBy));
}

export interface OfTypeSignature<T> {
  <T>(actionType: ActionType, pickBy?: PickByFunction): Observable<T>;
}

declare module "rxjs/Observable" {
  interface Observable<T> {
    ofType: OfTypeSignature<T>;
  }
}

Observable.prototype.ofType = ofType;
