import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Contact } from '../models/contact.model';
import { ContactService } from './contact.service';

@Injectable({
  providedIn: 'root'
})
export class ContactResolverService implements Resolve<Promise<Contact>> {
  constructor(private contactService: ContactService) { }
  async resolve(route: ActivatedRouteSnapshot) {
    const _id = route.params._id
    const contact = await this.contactService.getContactById(_id);
    return contact;

  }
}
