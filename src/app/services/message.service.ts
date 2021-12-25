import { Injectable } from '@angular/core';
import { BehaviorSubject, of} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }
  private _msgs$ = new BehaviorSubject([]);
  public msgs$ = this._msgs$.asObservable()

  private _msgsDb =['Hello']

  public save(msg:string){
    this._add(msg);
  }
  private _add(msg: string){
    this._msgsDb.push(msg)
    this._msgs$.next([msg])
    return of(msg)
  }
}
