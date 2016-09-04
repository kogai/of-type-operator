import { Observable } from "rxjs";
export interface Action<T> {
    type: string;
    payload?: T;
}
export declare type PickByFunction = <T>(action: Action<T>) => T;
export interface OfTypeSignature<T> {
    <T>(actionType: string, pickBy?: PickByFunction): Observable<T>;
}
declare module "rxjs/Observable" {
    interface Observable<T> {
        ofType: OfTypeSignature<T>;
    }
}
