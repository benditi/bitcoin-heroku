import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { ChangeFriend } from '../models/changeFriend.model';
import { Contact } from '../models/contact.model';
import { Filter } from '../models/filterBy.model';
import { httpService } from './http.service';
const CONTACTS = [
  {
    "_id": "5a56640269f443a5d64b32ca",
    "name": "Ochoa Hyde",
    "email": "ochoahyde@renovize.com",
    "phone": "+1 (968) 593-3824",
    "coins": 100,
    "moves": [{
      toId: '',
      to: '',
      at: 0,
      amount: 0
    }]
  },
  {
    "_id": "5a5664025f6ae9aa24a99fde",
    "name": "Hallie Mclean",
    "email": "halliemclean@renovize.com",
    "phone": "+1 (948) 464-2888",
    "coins": 100,
    "moves": []
  },
  {
    "_id": "5a56640252d6acddd183d319",
    "name": "Parsons Norris",
    "email": "parsonsnorris@renovize.com",
    "phone": "+1 (958) 502-3495",
    "coins": 100,
    "moves": []
  },
  {
    "_id": "5a566402ed1cf349f0b47b4d",
    "name": "Rachel Lowe",
    "email": "rachellowe@renovize.com",
    "phone": "+1 (911) 475-2312",
    "coins": 100,
    "moves": []
  },
  {
    "_id": "5a566402abce24c6bfe4699d",
    "name": "Dominique Soto",
    "email": "dominiquesoto@renovize.com",
    "phone": "+1 (807) 551-3258",
    "coins": 100,
    "moves": []
  },
  {
    "_id": "5a566402a6499c1d4da9220a",
    "name": "Shana Pope",
    "email": "shanapope@renovize.com",
    "phone": "+1 (970) 527-3082",
    "coins": 100,
    "moves": []
  },
  {
    "_id": "5a566402f90ae30e97f990db",
    "name": "Faulkner Flores",
    "email": "faulknerflores@renovize.com",
    "phone": "+1 (952) 501-2678",
    "coins": 100,
    "moves": []
  },
  {
    "_id": "5a5664027bae84ef280ffbdf",
    "name": "Holder Bean",
    "email": "holderbean@renovize.com",
    "phone": "+1 (989) 503-2663",
    "coins": 100,
    "moves": []
  },
  {
    "_id": "5a566402e3b846c5f6aec652",
    "name": "Rosanne Shelton",
    "email": "rosanneshelton@renovize.com",
    "phone": "+1 (968) 454-3851",
    "coins": 100,
    "moves": []
  },
  {
    "_id": "5a56640272c7dcdf59c3d411",
    "name": "Pamela Nolan",
    "email": "pamelanolan@renovize.com",
    "phone": "+1 (986) 545-2166",
    "coins": 100,
    "moves": []
  },
  {
    "_id": "5a5664029a8dd82a6178b15f",
    "name": "Roy Cantu",
    "email": "roycantu@renovize.com",
    "phone": "+1 (929) 571-2295",
    "coins": 100,
    "moves": []
  },
  {
    "_id": "5a5664028c096d08eeb13a8a",
    "name": "Ollie Christian",
    "email": "olliechristian@renovize.com",
    "phone": "+1 (977) 419-3550",
    "coins": 100,
    "moves": []
  },
  {
    "_id": "5a5664026c53582bb9ebe9d1",
    "name": "Nguyen Walls",
    "email": "nguyenwalls@renovize.com",
    "phone": "+1 (963) 471-3181",
    "coins": 100,
    "moves": []
  },
  {
    "_id": "5a56640298ab77236845b82b",

    "name": "Glenna Santana",
    "email": "glennasantana@renovize.com",
    "phone": "+1 (860) 467-2376",
    "coins": 100,
    "moves": []
  },
  {
    "_id": "5a56640208fba3e8ecb97305",
    "name": "Malone Clark",
    "email": "maloneclark@renovize.com",
    "phone": "+1 (818) 565-2557",
    "coins": 100,
    "moves": []
  },
  {
    "_id": "5a566402abb3146207bc4ec5",
    "name": "Floyd Rutledge",
    "email": "floydrutledge@renovize.com",
    "phone": "+1 (807) 597-3629",
    "coins": 100,
    "moves": []
  },
  {
    "_id": "5a56640298500fead8cb1ee5",
    "name": "Grace James",
    "email": "gracejames@renovize.com",
    "phone": "+1 (959) 525-2529",
    "coins": 100,
    "moves": []
  },
  {
    "_id": "5a56640243427b8f8445231e",
    "name": "Tanner Gates",
    "email": "tannergates@renovize.com",
    "phone": "+1 (978) 591-2291",
    "coins": 100,
    "moves": []
  },
  {
    "_id": "5a5664025c3abdad6f5e098c",
    "name": "Lilly Conner",
    "email": "lillyconner@renovize.com",
    "phone": "+1 (842) 587-3812",
    "coins": 100,
    "moves": []
  }
];

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private _contactsDb: Contact[]
  private _contacts$ = new BehaviorSubject<Contact[]>([])
  public contacts$ = this._contacts$.asObservable()
  private _myContacts$ = new BehaviorSubject<Contact[]>([])
  public myContacts$ = this._myContacts$.asObservable()
  private _filterBy$ = new BehaviorSubject({ term: '' });
  public filterBy$ = this._filterBy$.asObservable()
  constructor() {
  }

  public async loadContacts(): Promise<Contact[]> {
    const filterBy = this._filterBy$.getValue()
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'))
    console.log('contact service loggedInUser:', loggedInUser);
    this._contactsDb = await httpService.get('contact')
    const term = filterBy.term.toLocaleLowerCase()
    const filterdContacts = this._contactsDb.filter(contact => {
      return contact._id !== loggedInUser._id && (contact.name.toLocaleLowerCase().includes(term) ||
        contact.phone.toLocaleLowerCase().includes(term) ||
        contact.email.toLocaleLowerCase().includes(term))
    })
    console.log('filterdContacts', filterdContacts);
    const myContacts = [];
    let generalContacts = [];
    const contactsIds = loggedInUser.myContacts
    if (contactsIds.length) {
      filterdContacts.forEach(contact => {
        for (let i = 0; i < contactsIds.length; i++) {
          if (contact._id === loggedInUser._id) continue
          if (contactsIds[i] === contact._id) {
            myContacts.push(contact);
            return
          }
          else if (i === contactsIds.length - 1) generalContacts.push(contact)
  
        };
      })
    } else {
      generalContacts = this._contactsDb
    }
    console.log('myContacts:', myContacts);
    console.log('generalContacts:', generalContacts);
    this._contacts$.next(this._sort(generalContacts))
    this._myContacts$.next(myContacts);

    return filterdContacts
  }


  public async getContactById(id: string): Promise<Contact> {
    try {
      const contact = await httpService.get(`contact/${id}`)
      return contact;
    } catch (err) {
      console.log('Request failed, error:', err);
      return null;
    }
  }

  public deleteContact(id: string) {
    //mock the server work
    this._contactsDb = this._contactsDb.filter(contact => contact._id !== id)

    // change the observable data in the service - let all the subscribers know
    this._contacts$.next(this._contactsDb)
  }

  public saveContact(contact: Contact) {
    console.log('service save contact', contact);

    return contact._id ? this._updateContact(contact) : this._addContact(contact)
  }

  private async _updateContact(contact: Contact) {
    try {
      const updatedContact = await httpService.put(`contact/${contact._id}`, contact)
      this._contactsDb = this._contactsDb.map(c => updatedContact._id === c._id ? updatedContact : c)
      // change the observable data in the service - let all the subscribers know
      this._contacts$.next(this._sort(this._contactsDb))
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  private async _addContact(contact: Contact) {
    try {
      const answer = await httpService.post(`contact`, contact)
      if (answer.insertedId) {
        contact.coins = 100;
        console.log(contact);
        this._contactsDb.push(contact)
        this._contacts$.next(this._sort(this._contactsDb))
      } else {
        console.log('Had issues with the server');
        return null;
      }
    } catch (err) {
      console.log(err);
      return null;

    }
  }

  private _sort(contacts: Contact[]): Contact[] {
    return contacts.sort((a, b) => {
      if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
        return -1;
      }
      if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
        return 1;
      }

      return 0;
    })
  }
  public setFilter(filterBy: Filter) {
    console.log('service setFilter -> filterBy', filterBy)
    this._filterBy$.next(filterBy)
    this.loadContacts()

  }
  public getEmptyContact() {
    console.log('entered empty func');

    return { name: '', phone: '', email: '', coins: 100, moves: [] }
  }

  public async addFriend(data: ChangeFriend) {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'))
    if (data.status) loggedInUser.myContacts.push(data.contactId)
    else {
      loggedInUser.myContacts = loggedInUser.myContacts.filter(id => id !== data.contactId)
    }
    await this._updateContact(loggedInUser)
    sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    await this.loadContacts()
    return;
  }

  public checkIfFriend(contactId){
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'))
    const isFriend = loggedInUser.myContacts.some(id=>id===contactId)
    return isFriend;
  }
  private _filter(contacts: Array<Contact>, term: string) {
    term = term.toLocaleLowerCase()
    return contacts.filter(contact => {
      return contact.name.toLocaleLowerCase().includes(term) ||
        contact.phone.toLocaleLowerCase().includes(term) ||
        contact.email.toLocaleLowerCase().includes(term)
    })
  }
}