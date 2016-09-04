import { Observable } from "rxjs";
export interface Action<T> {
    type: string;
    payload: T;
}
export interface OfTypeSignature<T> {
    <T>(actionType: string): Observable<T>;
}
declare module "rxjs/Observable" {
    interface Observable<T> {
        ofType: OfTypeSignature<T>;
    }
}
