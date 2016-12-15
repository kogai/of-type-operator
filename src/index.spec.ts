import { deepStrictEqual } from "assert";
import { TestScheduler } from "rxjs/testing/TestScheduler";
import { Observable } from "rxjs/Observable";

import "./";
import { createTestScheduler, TestSchedulers, createColdObservable } from "./test-helpers";

describe("ofTypeObservable", () => {
  let action$: Observable<any>;
  let testSchedulers: TestSchedulers;
  let testScheduler: TestScheduler;
  let cold: createColdObservable;

  beforeEach(() => {
    testSchedulers = createTestScheduler();
    testScheduler = testSchedulers.testScheduler;
    cold = testSchedulers.cold;
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

  it("can pick by own payload", () => {
    action$ = cold("ab", {
      a: { type: "foo", payload: "fooPayload" },
      b: { type: "bar", customPayload: "barPayload" },
    });
    const expect$ = action$.ofType("bar", (value: any) => value.customPayload);
    testScheduler.expectObservable(expect$).toBe("-a", { a: "barPayload" });
    testScheduler.flush();
  });
});