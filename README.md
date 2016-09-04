# ofTypeOperator

A module for add ofType method to RxJS's Observable.
It inspired by redux-observable.

## usage

```javascript
import { Observable } "rxjs";
import { Action } "OfTypeOperator";

// this operator always expect `Observable<Action>` type.
const action$: Observable<Action> = createAction$();

// if you don't want annotate source Observable(like action$), it is only necessary to import module.
import "OfTypeOperator";

const YOUR_ACTION_TYPE = "YOUR_ACTION_TYPE";
interface YourPayload {}

const payload$ = action$
  .ofType<YourPayload>(YOUR_ACTION_TYPE)
  .map(((payload: YourPayload) => payload)
  ;
```