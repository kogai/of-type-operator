import { TestScheduler } from "rxjs/testing/TestScheduler";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { deepStrictEqual } from "assert";

export type createColdObservable = (marbles: string, values?: any, error?: any) => Observable<any>;
export type createHotObservable = (marbles: string, values?: any, error?: any) => Subject<any>;

export interface TestSchedulers {
  testScheduler: TestScheduler;
  cold: createColdObservable;
  hot: createHotObservable;
}

export const createTestScheduler = (): TestSchedulers => {
  const testScheduler = new TestScheduler((actual, expected) => {
    /** デバッグする時によく使う
    console.log(actual.length, expected.length);
    actual.forEach((a: any, i: number) => {
      console.log("\nFRAME:", a.frame);
      console.log(a.notification.value);
    });
    */
    deepStrictEqual(actual, expected);
  });
  const cold: createColdObservable = testScheduler.createColdObservable.bind(testScheduler);
  const hot: createHotObservable = testScheduler.createHotObservable.bind(testScheduler);
  return {
    testScheduler,
    cold,
    hot,
  };
};
