import { deepStrictEqual } from "assert";
import { Observable } from "rxjs";

import "./";
import { testScheduler, cold } from "./test-helpers";

describe("ofTypeObservable", () => {
  let action$: Observable<any>;
  beforeEach(() => {
    action$ = cold("abc", {
      a: { type: "foo", payload: "fooPayload" },
      b: { type: "bar", payload: "barPayload" },
      c: { type: "buzz", payload: "buzzPayload" },
    });
  });

  it("should filtering specific type", () => {
    const expect$ = action$.ofType("bar");
    testScheduler.expectObservable(expect$).toBe("-a", { a: "barPayload" });
    testScheduler.flush();
  });

  it("should filtering multiple type", () => {
    const expect$ = action$.ofType("bar", "buzz");
    testScheduler.expectObservable(expect$).toBe("-ab", { a: "barPayload", b: "buzzPayload" });
    testScheduler.flush();
  });
});