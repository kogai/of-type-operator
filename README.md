# of-type-operator

A module for add ofType method to RxJS's Observable.
It inspired by redux-observable.

[![npm version](https://badge.fury.io/js/of-type-operator.svg)](https://badge.fury.io/js/of-type-operator)

## usage

```javascript
import { Observable } "rxjs/Observable";
import { Action } "of-type-operator";

const YOUR_ACTION_TYPE = "YOUR_ACTION_TYPE";
interface YourPayload {}

// this operator always expect `Observable<Action>` type.
const action$: Observable<Action<YourPayload>> = createAction$();

// if you don't want annotate source Observable(like `action$: Observable<Action>`), import module is only necessary to add this operator.
import "of-type-operator";

const payload$ = action$
  .ofType<YourPayload>(YOUR_ACTION_TYPE)
  .subscribe(console.log) // log your payload
  ;

// if your action incompatible with Action type, you can pass pickBy function to pick for your own type.
const payload$ = action$
  .ofType<YourPayload>(YOUR_ACTION_TYPE, (action: YourSpecificAction) => action.yourSpecficProperty)
  .subscribe(console.log) // log your payload
  ;
```