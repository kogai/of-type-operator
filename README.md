# ofTypeOperator

`RxJS`に`Observable.ofType`メソッドを追加するモジュール
redux-observableのofTypeオペレータに着想を得ている

## 使い方

```javascript
interface Action<P> {
  type: string;
  payload: P;
}
action$: Observable<Action>

import "OfTypeOperator"; // add Observable.prototype.ofType

const YOUR_ACTION_TYPE = "YOUR_ACTION_TYPE";
interface YourPayload {}

const payload$ = action$
  .ofType<YourPayload>(YOUR_ACTION_TYPE)
  .map(((payload: YourPayload) => payload)
  ;
```