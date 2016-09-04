import { Subscriber, Observable, Operator } from "rxjs";

export interface Action<T> {
  type: string;
  payload: T;
}

function ofType<T>(actionType: string): Observable<T> {
  return this.lift(new OfTypeOperator(actionType));
}

class OfTypeOperator<A, T> implements Operator<A, T> {
  constructor(private actionType: string) {}
  call(subscriber: Subscriber<T>, source: any): any {
    return source._subscribe(new OfTypeSubscriber(subscriber, this.actionType));
  }
}

class OfTypeSubscriber<A extends Action<T>, T> extends Subscriber<A> {
  constructor(destination: Subscriber<T>, private actionType: string) {
    super(destination);
  }

  protected _next(value: A) {
    const { next } = this.destination;
    if (value.type === this.actionType && next) {
      next(value.payload);
    }
  }
}

export interface OfTypeSignature<T> {
  <T>(actionType: string): Observable<T>;
}

declare module "rxjs/Observable" {
  interface Observable<T> {
    ofType: OfTypeSignature<T>;
  }
}

Observable.prototype.ofType = ofType;
