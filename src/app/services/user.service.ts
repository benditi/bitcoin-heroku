import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Contact } from '../models/contact.model';
import { Move } from '../models/move.model';
import { ContactService } from './contact.service';
import { httpService } from './http.service';
import storageService from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private contactService: ContactService) { }
  USER_KEY = 'loggedInUser'
  USERS = 'usersDb'
  private _isLoggedInDb = []
  private _isLoggedIn$ = new BehaviorSubject([]);
  public isLoggedIn$ = this._isLoggedIn$.asObservable()

  public saveIsLoggedIn(isLoggedIn: boolean) {
    this._add(isLoggedIn)
  }

  private _add(isLoggedIn: boolean) {
    this._isLoggedInDb.push(isLoggedIn)
    this._isLoggedIn$.next([isLoggedIn])
    return of(isLoggedIn)
  }
  public async getLoggedInUser() {
    const loggedInUser: any = sessionStorage.getItem(this.USER_KEY)
    console.log(this.USER_KEY, JSON.parse(loggedInUser));
    if (!loggedInUser) return null;
    return JSON.parse(loggedInUser);
  }

  public async login(name, password) {
    try {
      const loggedInUser = await httpService.post('auth/login', { name, password })
      console.log('succes loggedInUser', loggedInUser);
      sessionStorage.setItem(this.USER_KEY, JSON.stringify(loggedInUser)); //maybe change
      return (loggedInUser);
    } catch (err) {
      console.log('Request failed, error:', err);
      return Promise.reject(err)
    }
  }

  public async signup(name: string, password: string) {
    try {
      const loggedInUser = await httpService.post('auth/signup', { name, password })
      console.log('succes loggedInUser', loggedInUser);
      sessionStorage.setItem(this.USER_KEY, JSON.stringify(loggedInUser)); //maybe change
      return (loggedInUser);
    } catch (err) {
      console.log('Request failed, error:', err);
      return Promise.reject(err)
    }
  }
  public logout() {
    sessionStorage.setItem(this.USER_KEY, null)
  }

  public async addMove(transferAmount: number, toContact: Contact) {
    console.log('transferAmount', transferAmount);
    console.log('toContact', toContact);
    const sessionUser = JSON.parse(sessionStorage.getItem(this.USER_KEY))
    const users = await this.contactService.loadContacts()
    const loggedInUser = await this.getLoggedInUser()
    loggedInUser.coins -= transferAmount;
    toContact.coins += transferAmount;
    await this.contactService.saveContact(toContact)
    const newMove: Move = {
      toId: toContact._id,
      to: toContact.name,
      at: Date.now(),
      amount: transferAmount
    }
    loggedInUser.moves.push(newMove)
    await this.contactService.saveContact(loggedInUser);
    sessionStorage.setItem(this.USER_KEY, JSON.stringify(loggedInUser)); // to save in session storge
    newMove.toId = loggedInUser._id
    newMove.to = loggedInUser.name
    newMove.amount = -transferAmount
    toContact.moves.push(newMove)
    this.contactService.saveContact(toContact)
    console.log(loggedInUser);
  }

  // updateUser(loggedInUser: Contact, users: Array<Contact>) {
  //   const userIdx = users.findIndex(user => user._id === loggedInUser._id)
  //   users.splice(userIdx, 1, loggedInUser);
  //   storageService.saveToStorage(this.USERS, users);
  // }
  async getMovesList(currContact: Contact) {
    const loggedInUser: Contact = await this.getLoggedInUser()
    if (!currContact) {
      const contactMoves = loggedInUser.moves;
      console.log('service home moves', contactMoves);
      return contactMoves;
    }
    const contactMoves = loggedInUser.moves.filter(move => move.toId === currContact._id)
    console.log(contactMoves);
    if (contactMoves.length > 3) {
      console.log(contactMoves.length);
      contactMoves.splice(0, contactMoves.length - 3)
    }
    return contactMoves;
  }
}
