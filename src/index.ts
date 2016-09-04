import { Subscriber, Observable, Operator } from "rxjs";

export interface Action<T> {
  type: string;
  payload?: T;
}

export type PickByFunction = <T>(action: Action<T>) => T

class OfTypeOperator<A, T> implements Operator<A, T> {
  constructor(private actionType: string, private pickBy: PickByFunction) {}
  call(subscriber: Subscriber<T>, source: any): any {
    return source._subscribe(new OfTypeSubscriber(subscriber, this.actionType, this.pickBy));
  }
}

class OfTypeSubscriber<A extends Action<T>, T> extends Subscriber<A> {
  constructor(destination: Subscriber<T>, private actionType: string, private pickBy: PickByFunction) {
    super(destination);
  }

  protected _next(action: A) {
    if (action.type === this.actionType && this.destination.next) {
      this.destination.next(this.pickBy(action));
    }
  }
}

function ofType<T>(actionType: string, _pickBy?: PickByFunction): Observable<T> {
  const pickBy = _pickBy ? _pickBy : (action: Action<T>) => action.payload;
  return this.lift(new OfTypeOperator(actionType, pickBy));
}

export interface OfTypeSignature<T> {
  <T>(actionType: string, pickBy?: PickByFunction): Observable<T>;
}

declare module "rxjs/Observable" {
  interface Observable<T> {
    ofType: OfTypeSignature<T>;
  }
}

Observable.prototype.ofType = ofType;
