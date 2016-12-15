import {Test} from "tape";
import { TestScheduler } from "rxjs/testing/TestScheduler";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

export type createColdObservable = (marbles: string, values?: any, error?: any) => Observable<any>;
export type createHotObservable = (marbles: string, values?: any, error?: any) => Subject<any>;

export interface TestSchedulers {
  testScheduler: TestScheduler;
  cold: createColdObservable;
  hot: createHotObservable;
}

export const createTestScheduler = (assert: Test): TestSchedulers => {
  const testScheduler = new TestScheduler((actual, expected) => {
    /**
    console.log(actual.length, expected.length);
    actual.forEach((a: any, i: number) => {
      console.log("\nFRAME:", a.frame);
      console.log(a.notification.value);
    });
    */
    assert.deepEqual(actual, expected);
  });
  const cold: createColdObservable = testScheduler.createColdObservable.bind(testScheduler);
  const hot: createHotObservable = testScheduler.createHotObservable.bind(testScheduler);
  return {
    testScheduler,
    cold,
    hot,
  };
};
