import * as test from "tape";
import { deepStrictEqual } from "assert";
import { TestScheduler } from "rxjs/testing/TestScheduler";
import { Observable } from "rxjs/Observable";

import "./";
import { createTestScheduler, TestSchedulers, createColdObservable } from "./test-helpers";

const setup = (assert: test.Test) => {
  const testSchedulers = createTestScheduler(assert);
  const testScheduler = testSchedulers.testScheduler;
  const cold = testSchedulers.cold;
  const action$ = cold("abc", {
    a: { type: "foo", payload: "fooPayload" },
    b: { type: "bar", payload: "barPayload" },
    c: { type: "buzz", payload: "buzzPayload" },
  });
  return {
    testSchedulers, testScheduler, cold, action$,
  }
}

test("should filtering specific type", assert => {
  const {action$, testScheduler} = setup(assert)
  const expect$ = action$.ofType("bar");
  testScheduler.expectObservable(expect$).toBe("-a", { a: "barPayload" });
  testScheduler.flush();
  assert.end()
})

test("can pick by own payload", assert => {
  const {cold, testScheduler} = setup(assert)
  const action$ = cold("ab", {
    a: { type: "foo", payload: "fooPayload" },
    b: { type: "bar", customPayload: "barPayload" },
  });
  const expect$ = action$.ofType("bar", (value: any) => value.customPayload);
  testScheduler.expectObservable(expect$).toBe("-a", { a: "barPayload" });
  testScheduler.flush();
  assert.end()
})
