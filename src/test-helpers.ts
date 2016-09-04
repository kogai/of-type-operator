import { Observable, Subject, TestScheduler } from "rxjs";
import { deepStrictEqual } from "assert";

export type createColdObservable = (marbles: string, values?: any, error?: any) => Observable<any>;
export type createHotObservable = (marbles: string, values?: any, error?: any) => Subject<any>;

export const testScheduler = new TestScheduler((actual, expected) => {
  /** デバッグする時によく使う
  console.log(actual.length, expected.length);
  actual.forEach((a: any, i: number) => {
    console.log("\nFRAME:", a.frame);
    console.log(a.notification.value);
  });
  */
  deepStrictEqual(actual, expected);
});

export const cold: createColdObservable = testScheduler.createColdObservable.bind(testScheduler);
export const hot: createHotObservable = testScheduler.createHotObservable.bind(testScheduler);
